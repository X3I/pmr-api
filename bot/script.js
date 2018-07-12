window.botScript = function(username, password, server, modifications) {
   var utilities = new window.botUtilities();
   var data      = new window.botData();
   var socket    = new window.botSocket(server, utilities, data);
   var api       = new window.botApi(utilities, data, socket);
   utilities.blockCookies();
   api.login(username, password, function(token) {
      console.log('logged in!');
      api.authenticate(token, function() {
         console.log('authenticated!');
         modifications(utilities, data, socket, api);
      });
   });
};
