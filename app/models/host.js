import DS from 'ember-data';

var Host = DS.Model.extend({
  PublicIP: DS.attr('string'),
  CadvisorIP: DS.attr('string'),
  Metadata: DS.attr(),
  Version: DS.attr('string'),
  TotalResources: DS.attr(),
  Services: DS.attr(),
  Healthy: DS.attr('boolean'),
  LoadedUnits: DS.attr('number'),
  units: DS.hasMany('unit', {async: true}),
  isExpanded: true,

  computedHealth: function() {
    return this.get('units').every(function(u) {
      return u.get('healthy');
    });
  }.property('units.@each.healthy'),
  
  cadvisorGet: function() {
    var url = 'http://' + this.get('PublicIP') + ':8080';
    return url;
  }.property('CadvisorIP')
});

export default Host;
