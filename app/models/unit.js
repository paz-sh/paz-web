import DS from 'ember-data';

var Unit = DS.Model.extend({
  service: DS.belongsTo('service', {async: false}),
  version: DS.attr('string'),
  instance: DS.attr('number'),
  activeState: DS.attr('string'),
  loadState: DS.attr('string'),
  machineState: DS.attr(),
  subState: DS.attr('string'),
  host: DS.belongsTo('host', {async: false}),
  unitHash: DS.attr('string'),
  CadvisorIP: DS.attr('string'),

  loadHealthy: function() {
    return Em.isEqual(this.get('loadState'), 'loaded');
  }.property('loadState'),

  activeHealthy: function() {
    return (Em.isEqual(this.get('activeState'), 'active') || Em.isEqual(this.get('activeState'), 'activating'));
  }.property('activeState'),

  subHealthy: function() {
    return (Em.isEqual(this.get('subState'), 'running') || Em.isEqual(this.get('subState'), 'start-pre'));
  }.property('subState'),

  healthy: function() {
    var healths = [this.get('loadHealthy'), this.get('activeHealthy'), this.get('subHealthy')];

    return healths.every(function(health) {
      return health === true;
    });
  }.property('loadHealthy', 'activeHealthy', 'subHealthy'),

  name: function() {
    return this.get('id').split('-').filter(function(part) {
      return isNaN(parseInt(part));
    }).join('-');
  }.property('id'),

  cadvisorGet: function() {
    var host = this.get('host');
    var url = 'http://' + host.get('PublicIP') + ':8080/containers/system.slice/' + this.get('id') + '.service';
    return url;
  }.property('CadvisorIP')
});

export default Unit;
