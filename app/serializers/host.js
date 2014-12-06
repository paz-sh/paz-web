import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'ID',
  normalizePayload: function(payload) {
    return { hosts: payload };
  }
});
