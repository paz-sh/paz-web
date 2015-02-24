import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

// Register handlebars helper to print booleans
Ember.Handlebars.helper('toString', function returnToString(x){
  return ( x === void 0  ) ? 'undefined' : x.toString();
});

var App = Ember.Application.extend({
  modulePrefix: 'paz-ember', // TODO: loaded via config
  Resolver: Resolver,

  // ember-sockets stuff for Socket.io
  Socket: EmberSockets.extend({
    host: PazEmberENV.APP.ORCHESTRATOR_SOCKET.split(':')[0],
    port: Number(PazEmberENV.APP.ORCHESTRATOR_SOCKET.split(':')[1]),
    controllers: ['services', 'host', 'unit'],
    autoConnect: true
  })
});

loadInitializers(App, 'paz-ember');

export default App;
