import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    addPorts: function(config) {
      if(!config.get('ports')) {
        config.set('ports', [{
          container: '',
          host: ''
        }]);
      } else {
        config.get('ports').pushObject({
          container: '',
          host: ''
        });
      }
    },
    removePort: function(config, port) {
      config.get('ports').removeObject(port);
    },
    addEnvKey: function(config) {
      if(!config.get('env')) {
        config.set('env', [{
          key: '',
          value: ''
        }]);
      } else {
        config.get('env').pushObject({
          key: '',
          value: ''
        });
      }
    },
    removeEnvKey: function(config, envKey) {
      config.get('env').removeObject(envKey);
    }
  }
});
