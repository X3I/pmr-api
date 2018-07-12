window.botScript = function(username, password, server, modifications) {
   var utilities = new window.botUtilities();
   var data      = new window.botData();
   var socket    = new window.botSocket(server, utilities, data);
   var api       = new window.botApi(utilities, data, socket);
   modifications(utilities, data, socket, api);
};
