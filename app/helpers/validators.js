function validatePorts(ports) {
  var validateport = function (port) {
    return(port > 0 && port < 65536);
  };
  for(var p=0; p<ports.length; p++) {
    var container = Number(ports[p].container);
    var host = Number(ports[p].host);
    if(!validateport(container) || !validateport(host)){
      return false;
    }
  }
  return true;
}

function validateEnvKeys(envKeys) {
  for(var i=0; i<envKeys.length; i++) {
    if(!envKeys[i].key.match(/^[a-zA-Z_]+[a-zA-Z0-9_]*/)) {
      return false;
    }
  }
  return true;
}

function validateVolumeKeys(volumeKeys) {
  for(var i=0; i<volumeKeys.length; i++) {
    if(!volumeKeys[i].key.match(/^[/a-zA-Z_]+[/a-zA-Z0-9_]*/)) {
      return false;
    }
  }
  return true;
}

export { validatePorts, validateEnvKeys, validateVolumeKeys };
