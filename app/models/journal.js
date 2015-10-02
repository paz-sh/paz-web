import DS from 'ember-data';

var Journal = DS.Model.extend({
  serviceName: DS.attr('string'),
  event: DS.attr('string'),
  version: DS.attr('string'),
  timestamp: DS.attr('number'),
  config: DS.belongsTo('config')
});

export default Journal;
