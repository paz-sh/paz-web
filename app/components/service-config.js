import Ember from 'ember';

export default Ember.Component.extend({
  keys: function() {
    var env = this.get('config.env');

    if (Ember.isBlank(env)) { return []; }

    return Ember.keys(env).map(function(item) {
      return {'key': item, 'value': env[item]};
    });

  }.property('config.env')
});
