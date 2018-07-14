window.pokeScript = function(server, modifications) {
   var self       = this;
   self.utilities = new window.pokeUtilities();
   self.data      = new window.pokeData();
   self.parser    = new window.pokeParser(self.utilities, self.data);
   self.api       = new window.pokeApi(server, self.utilities, self.data, self.parser);
   self.utilities.setCookie('session', self.utilities.getCookie('PHPSESSID'));
   self.api.socketReady(function() {
      modifications(self);
   });
};
