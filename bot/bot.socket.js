window.botSocket = function(server, utilities, data, parser) {
   var self       = this;
   self.ws        = false;
   self.connected = false;
   self.sentCount = 0;
   self.callbacks = {};
   self.open      = function() {
      self.ws        = new WebSocket(server);
      self.ws.onopen = function() {
         self.connected = true;
      };
      self.ws.onclose = function() {
         self.connected = false;
      };
      self.ws.onmessage = function(event) {
         self.receivePacket(event.data);
      };
   };
   self.sendPacket = function(packet, callback) {
      packet.id = 'P' + self.sentCount;
      packet    = JSON.stringify(packet);
      self.ws.send(packet);
      ++self.sentCount;
      if ( callback ) {
         self.callbacks[packet.id] = callback;
      }
   };
   self.receivePacket = function(packet) {
      packet = JSON.parse(packet);
      if ( packet.id in self.callbacks ) {
         self.callbacks[packet.id](packet);
         delete self.callbacks[packet.id];
      }
      else {
         parser.parsePacket(packet);
      }
   };
   self.open();
};
