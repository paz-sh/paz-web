import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    'expand': function(model) {
      model.toggleProperty('isExpanded');
    }
  }
});
