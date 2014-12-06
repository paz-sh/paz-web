import Ember from 'ember';

export default Ember.Controller.extend({
  developmentMode: function() {
    return PazEmberENV.environment === 'development';
  }.property()
});
