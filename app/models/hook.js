import DS from 'ember-data';

var Hook = DS.Model.extend({
  serviceName: DS.attr('string'),
  dockerRepository: DS.attr('string'),
  pushedAt: DS.attr('number'),
  statusCode: DS.attr('number')
});

export default Hook;
