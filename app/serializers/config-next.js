import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizePayload: function(payload) {
    return { configNext: payload.doc };
  },
  extractSingle: function(store, primaryType, payload, recordId) {
    payload.doc.id = recordId;
    return this._super(store, primaryType, payload, recordId);
  }
});

