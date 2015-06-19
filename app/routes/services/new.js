import Ember from 'ember';
import { validatePorts, validateEnvKeys, validateVolumeKeys } from 'paz-ember/helpers/validators';

export default Ember.Route.extend({
  model: function() {
    var service = this.store.createRecord('service');

    // Set default values
    service.set('numInstances', '1');

    return service;
  },

  isNew: true,

  deactivate: function() {
    var model = this.currentModel;
    if (model && model.get('isNew') && !model.get('isSaving')) {
      model.destroyRecord();
    }
  },

  actions: {
    save: function(model) {
      var that = this;
      var id = model.get('name');

      if(model.get('isValid')) {
        // Check ports/env/volume (can't get validator to run on them)
        var ports = model.get('ports'),
            portsValid = true,
            env = model.get('env'),
            envKeysValid = true,
            volume = model.get('volume'),
            volumeKeysValid = true;

        if(ports) {
          portsValid = validatePorts(ports);
        }

        if(env) {
          envKeysValid = validateEnvKeys(env);
        }

        if(volume) {
          volumeKeysValid = validateVolumeKeys(volume);
        }

        if(portsValid && envKeysValid && volumeKeysValid) {
          model.save().then(function() {
            that.transitionTo('service', id).then(function() {
              that.store.push('service', {id: id, configNext: id});
            });
          });
        } else if (!portsValid) {
          Ember.$('#other-errors').html('Ports invalid');
        } else if (!envKeysValid) {
          Ember.$('#other-errors').html('Environment keys invalid');
        } else if (!volumeKeysValid) {
          Ember.$('#other-errors').html('Volumes invalid');
        }
      } else {
        Ember.$('#other-errors').html('Name, Description and Docker Repository are required.');
      }
    }
  }
});
