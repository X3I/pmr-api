window.botScript = function(username, password, server, modifications) {
   var utilities   = new window.botUtilities();
   var data        = new window.botData();
   var socket      = new window.botSocket(server, utilities, data);
   var api         = new window.botApi(utilities, data, socket);
   var sessionId   = utilities.getCookie('PHPSESSID');
   utilities.deleteCookie();
   api.login(username, password, function(token) {
      utilities.setCookie('PHPSESSID', sessionId);
      api.authenticate(token, function() {
         console.log('bot authenticated!');
         modifications(utilities, data, socket, api);
      });
   });
};
