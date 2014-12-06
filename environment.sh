#Might need to change this eventually
ETCD=178.62.3.75:4001
export PAZ_ORCHESTRATOR_URL=http://$(etcdctl --peers=$ETCD get /paz/services/paz-orchestrator)
export PAZ_ORCHESTRATOR_SOCKET=$(etcdctl --peers=$ETCD get /paz/services/paz-orchestrator-socket)
