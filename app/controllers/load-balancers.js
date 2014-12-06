import Ember from 'ember';

function toArray(obj) {
  var arr = [];

  Object.keys(obj).forEach(function(key) {
    obj[key].order = Ember.String.capitalize(key);
    arr.push(obj[key]);
  });

  return arr;
}

export default Ember.ArrayController.extend({
  sockets: {
    // This is just a heartbeat to send stats info over a socket to the Ember app every second.
    'haproxy': function(balancers) {
      var self = this;

      var storedBalancers = this.store.all('load-balancer');

      balancers.forEach(function(balancer) {
        storedBalancers.forEach(function(storedBalancer) {
          var id = storedBalancer.get('id');
          var hasBackends = false;

          if(id === balancer.service) {
            balancer.id = balancer.service;
            delete balancer.service;

            balancer.backends = toArray(balancer.backends);

            self.store.update('load-balancer', balancer);
          }

          storedBalancer.get('backends').forEach(function() {
            hasBackends = true;
          });

          if(!hasBackends) {
            self.store.unloadRecord(storedBalancer);
          }
        });

        if(!balancer.id && Object.keys(balancer.backends).length > 0) {
          self.store.pushPayload('load-balancer', [balancer]);
        }
      });
    }
  }
});
