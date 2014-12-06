import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  primaryKey: 'service',
  normalizePayload: function(payload) {
    payload.forEach(function(balancer) {
      var arr = [];

      Object.keys(balancer.backends).forEach(function(key) {
        balancer.backends[key].order = Ember.String.capitalize(key);
        arr.push(balancer.backends[key]);
      });

      balancer.backends = arr;
    });

    return { 'load-balancer': payload };
  }
});
