(function() {
   'use strict';
   botModules.create('bot', function(server, username, password, callback) {

      var self       = this;
      self.utilities = botModules.require('utilities', []);
      self.data      = botModules.require('data',      []);
      self.parser    = botModules.require('parser',    [self.utilities, self.data]);
      self.socket    = botModules.require('socket',    [server, self.parser]);
      self.api       = botModules.require('api',       [self.utilities, self.data, self.socket]);

      var open = function() {
         console.log('socket opened!');
         self.api.login(username, password, function() {
            console.log('logged in!');
            callback(self);
         });
      };
      var close = function() {
         console.log('socket closed!');
         self.socket.open(open, close);
      };

      self.socket.open(open, close);

   });
})();
