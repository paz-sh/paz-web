#!/bin/bash
echo "Connecting to orchestrator at $PAZ_ORCHESTRATOR_URL & $PAZ_ORCHESTRATOR_SOCKET"
perl -pi -e "s/localhost:9000/$PAZ_ORCHESTRATOR_URL/g" assets/paz-ember-*.js
perl -pi -e "s/localhost:9002/$PAZ_SCHEDULER_URL/g" assets/paz-ember-*.js
perl -pi -e "s/localhost:1337/$PAZ_ORCHESTRATOR_SOCKET:80/g" assets/paz-ember-*.js
perl -pi -e "s/localhost%3A9000/$PAZ_ORCHESTRATOR_URL/g" index.html
perl -pi -e "s/localhost%3A9002/$PAZ_SCHEDULER_URL/g" index.html
perl -pi -e "s/localhost%3A1337/$PAZ_ORCHESTRATOR_SOCKET%3A80/g" index.html
harp server -p 80 .
