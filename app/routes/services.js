import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('service');
  },
  actions: {
    destroy: function(model) {
      if(confirm('Are you sure you want to delete this service?')) {
        model.destroyRecord();
        this.transitionTo('services');
      }
    }
  }
});
