import DS from 'ember-data';

var LoadBalancer = DS.Model.extend({
  service: DS.attr('string'), // TODO: I think this should be a relation?
  backends: DS.attr()

  // TODO: none of these are really model properties are they?
  //displayName: function() {
    //var service = this.get('service'), 
        //dns = this.get('dns'), 
        //publicFacing = this.get('publicFacing');

    //if (publicFacing) {
      //return service + '.' + dns;
    //} else {
      //return service;
    //}
  //}.property('service', 'dns', 'publicFacing'),

  //currentSessions: function() {
    //return this.get('backends.current.hosts').reduce(function(prev, host) {
      //return prev + host.sessions;
    //}, 0);
  //}.property('backends.current.hosts.@each.sessions'),

  //nextSessions: function() {
    //return this.get('backends.next.hosts').reduce(function(prev, host) {
      //return prev + host.sessions;
    //}, 0);
  //}.property('backends.next.hosts.@each.sessions'),

  //currentQueued: function() {
    //return this.get('backends.current.hosts').reduce(function(prev, host) {
      //return prev + host.queuedRequests;
    //}, 0);
  //}.property('backends.current.hosts.@each.queuedRequests'),

  //nextQueued: function() {
    //return this.get('backends.next.hosts').reduce(function(prev, host) {
      //return prev + host.queuedRequests;
    //}, 0);
  //}.property('backends.next.hosts.@each.queuedRequests')
});

/* jshint quotmark: false */

LoadBalancer.reopenClass({
  FIXTURES: [
  {
    "id": "6770361ab0b049eda35d4ac58d9043d5",
    "service": "api",
    "dns": "lukeb0nd.com",
    "publicFacing": true,
    "backends": {
      "current": {
        "version": "1.0.1",
        "weighting": 85,
        "hosts": [
        {
          "unit": "api-1.0.1-1",
          "host": "172.17.8.101",
          "port": "49165",
          "sessions": 5,
          "queuedRequests": 3
        },
        {
          "unit": "api-1.0.1-2",
          "host": "172.17.8.102",
          "port": "49166",
          "sessions": 3,
          "queuedRequests": 2
        },
        {
          "unit": "api-1.0.1-3",
          "host": "172.17.8.103",
          "port": "49167",
          "sessions": 2,
          "queuedRequests": 1
        }
        ]
      },
      "next": {
        "version": "1.0.2",
        "weighting": 15,
        "hosts": [
        {
          "unit": "api-1.0.2-1",
          "host": "172.17.8.101",
          "port": "49168",
          "sessions": 3,
          "queuedRequests": 2
        },
        {
          "unit": "api-1.0.2-2",
          "host": "172.17.8.102",
          "port": "49169",
          "sessions": 2,
          "queuedRequests": 1
        },
        {
          "unit": "api-1.0.2-3",
          "host": "172.17.8.103",
          "port": "49170",
          "sessions": 1,
          "queuedRequests": 0
        }
        ]
      }
    }
  }
  ]
});

/* jshint quotmark: true */

export default LoadBalancer;
