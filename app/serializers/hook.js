import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  normalizePayload: function(payload) {
    return {hook: payload};
  },
  serialize: function(snapshot) {
    delete(snapshot['statusCode']);
    return snapshot;
  }
});
