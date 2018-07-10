window.pokeSocket = function(server, utilities, data) {
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
         console.log(JSON.parse(event.data));
      };
   };
   self.receive = function(packet) {
      console.log(packet);
      if ( packet.id in self.callbacks ) {
         self.callbacks[packet.id](packet);
         delete self.callbacks[packet.id];
      }
      else {
      }
   };
   self.send = function(packet, callback) {
      packet.id = 'P' + self.sentCount;
      self.ws.send(JSON.stringify(packet));
      ++self.sentCount;
      if ( callback ) {
         self.callbacks[packet.id] = callback;
      }
   };
   self.open();
};
