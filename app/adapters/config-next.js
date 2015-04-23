import Adapter from './application';
import Ember from 'ember';

var get = Ember.get;

export default Adapter.extend({
  namespace: 'services',
  buildURL: function(type, id) {
    var url = [],
        host = get(this, 'host'),
        prefix = this.urlPrefix();

    if (id && !Ember.isArray(id)) { url.push(id); }
    url.push('config', 'next');

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  },
  // Override to PATCH instead of PUT
  updateRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);

    serializer.serializeIntoHash(data, type, record._createSnapshot());

    var service_name = get(record, 'id');

    data.configNext.numInstances = Number(data.configNext.numInstances);

    return this.ajax(this.buildURL(type.typeKey, service_name, record), 'PATCH', { data: data.configNext });
  }
});
