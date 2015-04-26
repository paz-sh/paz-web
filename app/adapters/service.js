import Adapter from './orchestrator';

export default Adapter.extend({
  buildURL: function(type, id) {
    var url = this._super(type, id);

    // Just add a noEmit flag so the orchestrator knows not to tell us something happened
    return url + '?noEmit=true';
  }
});
