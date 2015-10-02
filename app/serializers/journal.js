import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  normalizePayload: function(payload) {
    payload.doc.forEach(function(journal) {
      // set id
      journal.id = journal.config.id = journal.timestamp;
      // transform environment variable objects
      var envKeys = [];
      var envkeysObject = journal.config.env;
      Object.keys(envkeysObject).map(function(data) {
        envKeys.push({
          key: data,
          value: envkeysObject[data]
        });
      });
      journal.config.env = envKeys;
    });
    return { journal: payload.doc };
  },
  attrs: {
    config: {embedded: 'always'},
  }
});
