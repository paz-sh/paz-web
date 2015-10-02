import Adapter from './scheduler';

export default Adapter.extend({
  pathForType: function(type) {
    return (type);
  }
});
