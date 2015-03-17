import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: 'name',
  normalizePayload: function(payload) {
    for (var i = 0; i < payload.doc.length; i++) {
      payload.doc[i].configNext = payload.doc[i].name;
      payload.doc[i].configLast = payload.doc[i].name;
    }

    return { services: payload.doc };
  },
  serializeIntoHash: function(hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  },

  // Custom serialize function for POST data since ember would give other properties in model by default
  serialize: function(post) {
    var envKeys = post.attr('envKeys') || [];

    var ports = post.attr('ports') || [];

    var json = {
      name: post.attr('name'),
      description: post.attr('description') || '',
      dockerRepository: post.attr('dockerRepository'),
      publicFacing: post.attr('publicFacing') || false,
      numInstances: Number(post.attr('numInstances')) || 1,
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
