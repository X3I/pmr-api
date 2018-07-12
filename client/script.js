window.pokeScript = function(server, modifications) {
   var utilities = new window.pokeUtilities();
   var data      = new window.pokeData();
   var parser    = new window.pokeParser(utilities, data);
   var api       = new window.pokeApi(server, utilities, data, parser);
   modifications(utilities, data, api);
};
