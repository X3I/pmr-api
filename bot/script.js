window.botScript = function(username, password, server, modifications) {
   var utilities   = new window.botUtilities();
   var data        = new window.botData();
   var socket      = new window.botSocket(server, utilities, data);
   var api         = new window.botApi(utilities, data, socket);
   var cookies     = document.cookie;
   document.cookie = '';
   api.login(username, password, function(token) {
      console.log('bot logged in!');
      api.authenticate(token, function() {
         document.cookie = cookies;
         console.log('bot authenticated!');
         modifications(utilities, data, socket, api);
      });
   });
};
