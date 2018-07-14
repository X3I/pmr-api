window.botScript = function(username, password, server, modifications) {
   var self       = this;
   self.utilities = new window.botUtilities();
   self.data      = new window.botData();
   self.parser    = new window.botParser(self.utilities, self.data);
   self.socket    = new window.botSocket(server, self.parser);
   self.api       = new window.botApi(self.utilities, self.data, self.socket);
   self.session   = self.utilities.getCookie('session');
   (self.session && self.utilities.deleteCookie('PHPSESSID'));
   self.socket.socketReady(function() {
      self.api.login(username, password, function(token) {
         (self.session && self.utilities.setCookie('PHPSESSID', self.sessionId));
         console.log('bot logged in!');
         self.api.authenticate(token, function() {
            console.log('bot authenticated!');
            modifications(self);
         });
      });
   });
};
