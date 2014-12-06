import Ember from 'ember';

export default Ember.ArrayController.extend({
  sockets: {
    'service.create': function(service) {
      this.store.push('service', {
        id: service.name, 
        description: service.description,
        configNext: service.name
      });
    },
    'service.del': function(name) {
      var that = this;

      this.store.find('service', name).then(function(service) {
        that.store.unloadRecord(service);
      });
    },
    'service.modifyConfig': function(name, config) {
      this.store.find('service', name).then(function(model) {
        model.get('configNext').then(function(model) {
          for(var attr in config) {
            if(config.hasOwnProperty(attr)) {
              model.set(attr, config[attr]);
            }
          }
        });
      });
    }
  }
});
