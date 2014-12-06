import Ember from 'ember';

export default Ember.Controller.extend({
  sockets: {
    'unit.add': function(unit) {
      var units = this.store.all('unit'),
          newUnit = true;

      units.forEach(function(localUnit) {
        if(localUnit.get('unitHash') === unit.hash && 
           localUnit.get('instance' === unit.instance)) {
          newUnit = false;
        }
      });

      if(newUnit) {
        unit.id = unit.name;
        var toPush = this.store.push('unit', unit);
        var hosts = this.store.all('host');

        hosts.forEach(function(host) {
          if(host.get('id') === unit.machineState.ID) {
            host.get('units').addObject(toPush);
          }
        });
      }
    },
    'unit.remove': function(name) {
      var shouldDestroy = true;

      var unit = this.store.getById('unit', name),
          hosts = this.store.all('host');

      if(unit.get('activeState') === 'activating') {
        shouldDestroy = false;
      }
      if(unit.get('activeState') === 'inactive') {
        shouldDestroy = false;
      }


      if(shouldDestroy) {
        hosts.forEach(function(host) {
          if(host.get('id') === unit.get('machineState.ID')) {
            host.get('units').removeObject(unit);
          }
        });
      }
    }
  }
});
