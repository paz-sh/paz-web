import Config from './config';
import Ember from 'ember';
import 'bower_components/ember-validations/index';

var ConfigNext = Config.extend(Ember.Validations.Mixin, {
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
