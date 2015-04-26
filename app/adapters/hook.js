import Adapter from './scheduler';

export default Adapter.extend({
  namespace: 'hooks',
  buildURL: function(type, id, snapshot) {
    var s = this._super(type, id, snapshot);
    return s;
  },
  createRecord: function(store, type, snapshot) {
    var serializer = store.serializerFor(type.typeKey);
    var data = serializer.serialize(snapshot.toJSON());
    return this.ajax( this.buildURL() + '/deploy', 'POST', {data: data});
  },
  updateRecord: function(store, type, snapshot) {
    return this.createRecord(store, type, snapshot);
  }
});
