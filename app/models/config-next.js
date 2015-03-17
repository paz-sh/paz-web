import Config from './config';
import EmberValidations from 'ember-validations';

var ConfigNext = Config.extend(EmberValidations.Mixin, {
  validations: {
    numInstances: {
      format: {
        allowBlank: true,
        with: /^\d+$/
      }
    }
  }
});

export default ConfigNext;
