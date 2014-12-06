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
    url.push('config', 'last'); 

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }
});
