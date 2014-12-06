import Adapter from './application';
import Ember from 'ember';

export default Adapter.extend({
  namespace: 'cluster',
  buildURL: function(type, id) {
    var url = [],
        host = Ember.get(this, 'host'),
        prefix = this.urlPrefix();

    if (id && !Ember.isArray(id)) { url.push(id); }
    url.push('load-balancers'); 

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }
});
