import DS from 'ember-data';
import EmberValidations from 'ember-validations';

var Service = DS.Model.extend(EmberValidations.Mixin, {
  name: DS.attr('string'),
  description: DS.attr('string'),
  dockerRepository: DS.attr('string'),
  configNext: DS.belongsTo('configNext', {async: true}),
  configLast: DS.belongsTo('configLast', {async: true}),
  configEdit: DS.belongsTo('configEdit', {async: true}),
  isExpanded: true,
  dockerLink: function() {
    var repo = this.get('dockerRepository');
    var url = 'https://registry.hub.docker.com/u/' + repo;
    return url;
  }.property('dockerRepository'),

  // Properties only used on service submission (stored in configs on retrieval). Maybe should be separate model?
  publicFacing: DS.attr('boolean'),
  numInstances: DS.attr('number'),
  ports: DS.attr(),
  env: DS.attr(),
  units: DS.hasMany('unit'),
  computedHealth: function() {
    return this.get('units').every(function(u) {
      return u.get('healthy');
    });
  }.property('units.@each.healthy'),

  validations: {
    name: {
      presence: true,
      length: { minimum: 3 },
      format: {
        with: /^([a-zA-Z]|\d|\-)+$/,
        message: 'Only letters and numbers allowed.'
      }
    },
    description: {
      presence: true
    },
    dockerRepository: {
      presence: true
    },
    numInstances: {
      numericality: {
        allowBlank: true,
        onlyInteger: true
      }
    }
  }
});

export default Service;
