import { test, moduleFor } from 'ember-qunit';

moduleFor('serializer:config', 'Config Serializer', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var serializer = this.subject();
  ok(serializer);
});

test('transform env object into env array', function() {
  var serializer = this.subject();
  var payload = {
    doc: {
      env: {foo: 'bar'}
    }
  };
  var normalizedPayload = serializer.transformEnvObject(payload);
  var envArray = [{key: 'foo', value: 'bar'}];
  deepEqual(normalizedPayload.env, envArray, 'transform env object');
});

test('transform volume object into volume array', function() {
  var serializer = this.subject();
  var payload = {
    doc: {
      volume: {foo: 'bar'}
    }
  };
  var normalizedPayload = serializer.transformVolumeObject(payload);
  var volumeArray = [{key: 'foo', value: 'bar'}];
  deepEqual(normalizedPayload.volume, volumeArray, 'transform volume object');
});
