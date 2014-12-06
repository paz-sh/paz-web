import DS from 'ember-data';

var Config = DS.Model.extend({
  publicFacing: DS.attr('boolean'),
  ports: DS.attr(),
  env: DS.attr(),
  numInstances: DS.attr('number')
});

 
export default Config;
