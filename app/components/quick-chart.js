import Ember from 'ember';

export default Ember.Component.extend({
  style: function() {
    var current = this.get('current');
    var total = current + this.get('next');
    var percent = (current / total) * 100;

    return 'width:' + percent + '%;';
  }.property('current')
});
