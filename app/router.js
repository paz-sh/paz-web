import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('dashboard', function() {
    this.resource('hosts');
    this.resource('units');
  });

  this.resource('services', function() {
    this.route('new');
    this.resource('service', { path: '/:service_name' }, function() {
      this.route('edit');
    });
  });
  this.route('services/new');

  this.resource('monitoring', function() {
    this.route('host', { path: '/:machine_id' });
    this.route('unit', { path: '/:unit_id' });
  });
  this.route('service/edit');
  if (config.environment === 'development') {
    this.route('styleguide');
  }
});

export default Router;
