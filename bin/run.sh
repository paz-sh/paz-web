#!/bin/bash
perl -pi -e "s/localhost:9000/$PAZ_ORCHESTRATOR_URL/g" assets/paz-ember-*.js
perl -pi -e "s/localhost:1337/$PAZ_ORCHESTRATOR_SOCKET/g" assets/paz-ember-*.js
harp server -p 80 .
