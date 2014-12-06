import Ember from 'ember';

export default Ember.Controller.extend({
  sockets: {
    'unit.add': function(unit) {
      var that = this;

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
        var services = this.store.all('service');

        services.forEach(function(service) {
          if(service.get('id') === unit.service.get('id')) {
            service.get('units').addObject(that.store.push('unit', unit));
          }
        });
      }
    },
    'unit.remove': function(name) {
      var shouldDestroy = true;

      var unit = this.store.getById('unit', name),
          services = this.store.all('service');

      if(unit.get('activeState') === 'activating') {
        shouldDestroy = false;
      }
      if(unit.get('activeState') === 'inactive') {
        shouldDestroy = false;
      }

      if(shouldDestroy) {
        services.forEach(function(service) {
          var unitService = unit.get('service');
          if(service.id === unitService.id) {
            service.get('units').removeObject(unit);
          }
        });
      }
    }
  }
});
