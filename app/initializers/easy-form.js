import Ember from 'ember';
import 'bower_components/ember-easyForm/index';

export default {
  name: 'configure-easy-form',

  initialize: function() {
    var options = {};
    Ember.EasyForm.Config.registerWrapper('default', options);
  }
};
