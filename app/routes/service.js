import Ember from 'ember';
import { validatePorts, validateEnvKeys, validateVolumeKeys } from 'paz-ember/helpers/validators';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('service', params.service_name);
  },
  deactivate: function() {
    var configEdit = this.currentModel.get('configEdit.content');
    if(configEdit != null) {
      configEdit.destroyRecord();
    }
  },
  actions: {
    edit: function(model) {
      // Copy configNext to configEdit
      var configCopy = model.get('configNext.content').toJSON();
      configCopy = JSON.stringify(configCopy);
      configCopy = JSON.parse(configCopy);
      configCopy = Ember.Object.create(configCopy);
      if(model.get('configEdit.content') == null) {
        model.set('configEdit', this.store.createRecord('configEdit'));
      }
      var configEdit = model.get('configEdit');
      configEdit.content.set('id', model.get('id'));
      configEdit.content.set('isEditing', true);
      configEdit.content.setProperties(configCopy);
    },
    save: function(model) {
      var configEdit = model.get('configEdit.content');
      var configNext = model.get('configNext.content');

      if(configEdit.get('isValid')) {
        // Check ports/env/volume (can't get validator to run on them)
        var ports = configEdit.get('ports'),
            portsValid = true,
            envKeys = configEdit.get('env'),
            envKeysValid = true,
            volume = configEdit.get('volume'),
            volumeKeysValid = true;

        if(ports) {
          portsValid = validatePorts(ports);
        }

        if(envKeys) {
          envKeysValid = validateEnvKeys(envKeys);
        }

        if(volume) {
          volumeKeysValid = validateVolumeKeys(volumeKeys);
        }

        if(portsValid && envKeysValid && volumeKeysValid) {
          // Copy configEdit to configNext and save
          configEdit.set('isEditing', false);
          configNext.setProperties(configEdit.toJSON());
          configNext.save();
        } else if (!portsValid) {
          Ember.$('#other-errors').html('Ports invalid');
        } else if (!envKeysValid) {
          Ember.$('#other-errors').html('Environment keys invalid');
        } else if (!volumeKeysValid) {
          Ember.$('#other-errors').html('Volumes invalid');
        }
      } else {
        Ember.$('#other-errors').html('Instances invalid');
      }
    },
    cancel: function(model) {
      model.set('configEdit.isEditing', false);
    }
  }
});
