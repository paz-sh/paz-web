import Config from './config';

var ConfigLast = Config.extend({
  normalizePayload: function(payload) {
    return { configLast: this.transformEnvObject(payload) };
  }
});

export default ConfigLast;
