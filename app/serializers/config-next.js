import Config from './config';

var ConfigNext = Config.extend({
  normalizePayload: function(payload) {
    return { configNext: this.transformEnvObject(payload) };
  }
});

export default ConfigNext;
