import DS from 'ember-data';
import EmberValidations from 'ember-validations';

var Config = DS.Model.extend(EmberValidations.Mixin, {
  publicFacing: DS.attr('boolean'),
  ports: DS.attr(),
  env: DS.attr(),
  numInstances: DS.attr('number'),
  validations: {
    numInstances: {
      numericality: {
        allowBlank: true,
        onlyInteger: true
      }
    }
  }
});

export default Config;
