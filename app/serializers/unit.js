import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'name',
  normalizePayload: function(payload) {
    payload.host = payload.machineState.ID;

    return { unit: payload };
  }
});
