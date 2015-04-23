import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('service-edit', 'ServiceEditComponent', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function() {
  var component = this.subject();
  ok(component);
});

test('add ports', function() {
  var component = this.subject();
  var port = {container: '', host: ''};
  var config = Ember.Object.create({ports:[]});

  component.send('addPorts', config);
  deepEqual(config.ports, [port], 'add port');

  component.send('addPorts', config);
  deepEqual(config.ports, [port, port], 'add another port');
});

test('remove port', function() {
  var component = this.subject();
  var port1 = {container: '1', host: '1'};
  var port2 = {container: '2', host: '2'};
  var config = Ember.Object.create({ports:[port1, port2]});

  component.send('removePort', config, port1);
  deepEqual(config.ports, [port2], 'remove port1');

  component.send('removePort', config, port2);
  deepEqual(config.ports, [], 'remove port2');
});

test('add env key', function() {
  var component = this.subject();
  var env = {key: '', value: ''};
  var config = Ember.Object.create({env:[]});

  component.send('addEnvKey', config);
  deepEqual(config.env, [env], 'add env key');
});

test('remove env', function() {
  var component = this.subject();
  var env1 = {key: '', value: ''};
  var env2 = {key: '', value: ''};
  var config = Ember.Object.create({env:[env1, env2]});

  component.send('removeEnvKey', config, env1);
  deepEqual(config.env, [env2], 'remove env1');

  component.send('removeEnvKey', config, env2);
  deepEqual(config.env, [], 'remove env2');
});
