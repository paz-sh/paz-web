import DS from 'ember-data';

var Config = DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    return { config: this.transformEnvObject(payload) };
  },
  transformEnvObject: function(payload) {
    var envKeys = [];
    var envkeysObject = payload.doc.env;
    Object.keys(envkeysObject).map(function(data) {
      envKeys.push({
        key: data,
        value: envkeysObject[data]
      });
    });
    payload.doc.env = envKeys;
    return payload.doc;
  },
  extractSingle: function(store, primaryType, payload, recordId) {
    payload.doc.id = recordId;
    return this._super(store, primaryType, payload, recordId);
  },
  serialize: function(post) {
    var envKeys = post.attr('env') || {};
    var ports = post.attr('ports') || [];
    var publicFacing = post.attr('publicFacing') || false;
    var numInstances= post.attr('numInstances') || 1;

    var json = {
      publicFacing: publicFacing,
      numInstances: numInstances,
      ports: ports.map(function(port) {
        return {
          container: Number(port.container),
          host: Number(port.host)
        };
      }),
      env : envKeys.reduce(function(memo, k) {
        memo[k.key] = k.value;
        return memo;
      }, {})
    };

    return json;
  }
});

export default Config;
