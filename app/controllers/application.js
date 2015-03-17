import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  developmentMode: function() {
    return config.environment === 'development';
  }.property()
});
