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
    var envKeys = post.get('envKeys') || {};

    var ports = post.get('ports') || [];

    for(var i=0; i<ports.length; i++) {
      ports[i].container = Number(ports[i].container);
      ports[i].host = Number(ports[i].host);
    }

    var env = {};

    for (var k=0; k<envKeys.length; k++) {
      env[envKeys[k].key] = envKeys[k].value;
    }

    var json = {
      name: post.get('name'),
      description: post.get('description') || '',
      dockerRepository: post.get('dockerRepository'),
      publicFacing: post.get('publicFacing') || false,
      numInstances: Number(post.get('numInstances')) || 1,
      ports: ports,
      env : env
    };

    return json;
  }
});
