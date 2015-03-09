import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model: function() {
    var that = this;

    return this.store.findAll('service').then(function(services) {
      services.forEach(function(service) {
        // XXX Very hacky. Would like to fix.
        Ember.$.getJSON(config.APP.ORCHESTRATOR_URL + '/services/' + service.get('id') + '/units').then(function(units) {
          for (var u = 0; u < units.length; u++) {
            units[u].id = units[u].name;
            units[u].host = units[u].machineState.ID;
            var unit = that.store.push('unit', units[u]);
            service.get('units').addObject(unit);
          }
        });
      });
      return services;
    });
  },
  actions: {
    'expand': function(model) {
      model.toggleProperty('isExpanded');
    }
  }
});
