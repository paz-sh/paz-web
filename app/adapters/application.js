import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: PazEmberENV.APP.ORCHESTRATOR_URL
});
