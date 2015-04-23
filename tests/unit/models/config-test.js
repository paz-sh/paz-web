import { test, moduleForModel } from 'ember-qunit';

moduleForModel('config', 'Config Model', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  ok(model);
});

test('config model', function() {
  var data = {
    publicFacing: true,
    ports: [{container: 9000, host: 80}],
    env: {foo: 'bar'},
    numInstances: 3
  };
  var config = this.subject(data);
  ok(config instanceof DS.Model);
  equal(config.get('publicFacing'), data.publicFacing, 'should set publicFacing');
  equal(config.get('env'), data.env, 'should set env');
  equal(config.get('ports'), data.ports, 'should set ports');
  equal(config.get('numInstances'), data.numInstances, 'should set numInstances');
});
