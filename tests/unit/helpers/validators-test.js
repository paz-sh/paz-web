import { test, moduleFor } from 'ember-qunit';
import { validatePorts, validateEnvKeys } from 'paz-ember/helpers/validators';

test('env validation', function() {
  ok(validateEnvKeys, 'validateEnvKeys exists');
  var envCreator = function(key, value) {
    return [{key: key, value: value}];
  };
  equal(validateEnvKeys(envCreator('foo', 'bar')), true, 'valid env');
  equal(validateEnvKeys(envCreator('1foo', 'bar')), false, 'begin with a number');
});

test('port validation', function() {
  ok(validatePorts, 'validateEnvKeys exists');
  var portCreator = function(container, host) {
    return [{container: container, host: host}];
  };
  equal(validatePorts(portCreator(9000, 80)), true, 'valid port');
  equal(validatePorts(portCreator('foo', 'bar')), false, 'not a number');
  equal(validatePorts(portCreator('80', '65536')), false, 'not in range');
});
