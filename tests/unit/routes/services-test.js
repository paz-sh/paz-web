import { test, moduleFor } from 'ember-qunit';

moduleFor('route:services', 'ServicesRoute', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function() {
  var route = this.subject();
  ok(route);

  equal(find('h1').text(), 'Services');
});
