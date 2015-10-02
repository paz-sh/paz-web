import Ember from "ember";
import momentjs from 'moment';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  return momentjs.apply(this, [value]).format('YYYY-MM-DD HH:mm:ss');
});
