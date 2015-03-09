import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

// Register handlebars helper to print booleans
Ember.Handlebars.helper('toString', function returnToString(x){
  return ( x === void 0  ) ? 'undefined' : x.toString();
});

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,

  // ember-sockets stuff for Socket.io
  Socket: EmberSockets.extend({
    host: config.APP.ORCHESTRATOR_SOCKET.split(':')[0],
    port: Number(config.APP.ORCHESTRATOR_SOCKET.split(':')[1]),
    controllers: ['services', 'host', 'unit'],
    autoConnect: true
  })
});

loadInitializers(App, 'paz-ember');

export default App;
