window.pokeScript = function(server, modifications) {
   var utilities = new window.pokeUtilities();
   var data      = new window.pokeData();
   var api       = new window.pokeApi(server, utilities, data);
   modifications(utilities, data, api);
};
