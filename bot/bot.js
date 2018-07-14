(function() {
   'use strict';
   botModules.create('bot', function(server, username, password, callback) { 
      var self       = this;
      self.utilities = modules.require('utilities', []);
      self.data      = modules.require('data',      []);
      self.parser    = modules.require('parser',    [self.utilities, self.data]);
      self.socket    = modules.require('socket',    [server, self.parser]);
      self.api       = modules.require('api',       [self.utilities, self.data, self.socket]);
      self.socket.open(function() {
         console.log('socket opened!');
         self.api.login(username, password, function() {
            console.log('logged in!');
            callback(self);
         });
      }, function() {
         console.log('socket closed!');
      });
   });
})();
