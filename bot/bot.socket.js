(function() {
   'use strict';
   botModules.create('socket', function(server, parser) {
      var self       = this;
      self.ws        = false;
      self.connected = false;
      self.sentCount = 0;
      self.callbacks = {};
      self.open      = function(openCallback, closeCallback) {
         self.ws        = new WebSocket(server);
         self.ws.onopen = function() {
            self.connected = true;
            openCallback();
         };
         self.ws.onclose = function() {
            self.connected = false;
            closeCallback();
         };
         self.ws.onmessage = function(event) {
            self.receivePacket(event.data);
         };
      };
      self.sendPacket = function(packet, callback) {
         packet.id = 'P' + self.sentCount;
         self.ws.send(JSON.stringify(packet));
         ++self.sentCount;
         if ( callback ) {
            self.callbacks[packet.id] = callback;
         }
      };
      self.receivePacket = function(packet) {
         packet = JSON.parse(packet);
         if ( 'id' in packet && packet.id in self.callbacks ) {
            self.callbacks[packet.id](packet);
            delete self.callbacks[packet.id];
         }
         else {
            parser.parsePacket(packet);
         }
      };
   });
})();
