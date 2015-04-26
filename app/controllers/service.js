import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    deploy: function() {
      if(this.get('isDeploying')) {
        return;
      }
      this.set('isDeploying', true);

      var service = this.get('model');

      if(service.get('hook.content') == null) {
        service.set('hook', this.store.createRecord('hook'));
      }
      var hook = service.get('hook.content');
      hook.set('serviceName', service.get('id'));
      hook.set('dockerRepository', service.get('dockerRepository'));
      hook.set('pushedAt', 0);

      var that = this;
      hook.save().then(function(hook) {
        // On success
        if (hook.get('statusCode') === 200) {
          // Reload last config
          that.store.find('configLast', service.get('id')).then(function(configLast) {
            service.set('configLast', configLast);
          });

          that.set('isDeploying', false);
          that.set('isDeployFailed', false);
          that.set('isDeploySuccess', true);

        } else {
          // On error
          that.set('isDeploying', false);
          that.set('isDeployFailed', true);
          that.set('isDeploySuccess', false);
        }
      }, function(){
        // On error
        that.set('isDeploying', false);
        that.set('isDeployFailed', true);
        that.set('isDeploySuccess', false);
      });
    }
  }
});
