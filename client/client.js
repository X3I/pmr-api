(function() {
   'use strict';
   window.modules.create('client', function(server, callback) {
      var self       = this;
      self.utilities = window.modules.require('utilities', []);
      self.data      = window.modules.require('data',      []);
      self.parser    = window.modules.require('parser',    [self.utilities, self.data]);
      self.api       = window.modules.require('api',       [server, self.utilities, self.data, self.parser]);
      console.log(callback);
      self.utilities.socketReady(self.api.socket, function() {
         callback(self);
      });
   });
})();
