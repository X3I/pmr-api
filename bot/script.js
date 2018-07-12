window.botScript = function(username, password, server, modifications) {
   var utilities = new window.botUtilities();
   var data      = new window.botData();
   var socket    = new window.botSocket(server, utilities, data);
   var api       = new window.botApi(utilities, data, socket);
   api.login(username, password, function(token) {
      console.log('bot logged in!' + token);
      api.authenticate(token, function() {
         console.log('bot authenticated!');
         modifications(utilities, data, socket, api);
      });
   });
};
