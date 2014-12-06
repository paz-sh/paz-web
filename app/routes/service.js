import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('service', params.service_name);
  },
  actions: {
    edit: function(model, config) {
      model.set(config + '.isEditing', true);
    },

    save: function(model, config) {
      // TODO: persist edit
      model.set(config + '.isEditing', false);

      // This seems hacky, not sure how I'm *supposed* to do this. 
      var service_name = model.get('id');
      config = model.get(config);

      config.content.set('service_name', service_name);
      config.content.save();
    },

    cancel: function(model, config) {
      // TODO: rollback edit
      model.set(config + '.isEditing', false);
    }
  }
});
