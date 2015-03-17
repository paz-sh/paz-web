import Ember from 'ember';

function validatePorts(ports) {
  for(var p=0; p<ports.length; p++) {
    if(!ports[p].container.match(/^\d+$/)) {
      return false;
    }
    if(!ports[p].host.match(/^\d+$/)) {
      return false;
    }
  }

  return true;
}

function validateEnvKeys(envKeys) {
  for(var i=0; i<envKeys.length; i++) {
    if(!envKeys[i].key.match(/^([a-zA-Z]|\d|\-)+$/)) {
      return false;
    }
  }

  return true;
}

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
        // Check ports/env (can't get validator to run on them)
        var ports = model.get('ports'),
            portsValid = true,
            envKeys = model.get('envKeys'),
            envKeysValid = true;

        if(ports) {
          portsValid = validatePorts(ports);
        }

        if(envKeys) {
          envKeysValid = validateEnvKeys(envKeys);
        }

        if(portsValid && envKeysValid) {
          model.save().then(function() {
            that.transitionTo('service', id).then(function() {
              that.store.push('service', {id: id, configNext: id});
            });
          });
        } else if (!portsValid) {
          Ember.$('#other-errors').html('Ports invalid');
        } else if (!envKeysValid) {
          Ember.$('#other-errors').html('Environment keys invalid');
        }
      } else {
        Ember.$('#other-errors').html('Name, Description and Docker Repository are required.');
      }
    },
    addPorts: function(model) {
      if(!model.get('ports')) {
        model.set('ports', [{
          container: '',
          host: ''
        }]);
      } else {
        model.get('ports').pushObject({
          container: '',
          host: ''
        });
      }
    },
    removePort: function(model, port) {
      model.get('ports').removeObject(port);
    },
    addEnvKey: function(model) {
      if(!model.get('envKeys')) {
        model.set('envKeys', [{
          key: '',
          value: ''
        }]);
      } else {
        model.get('envKeys').pushObject({
          key: '',
          value: ''
        });
      }
    },
    removeEnvKey: function(model, envKey) {
      model.get('envKeys').removeObject(envKey);
    },
  }
});
