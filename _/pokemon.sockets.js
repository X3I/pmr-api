window.pSocket = function(proto, host, port, suffix) {
   var self       = this;
   self.proto     = proto;
   self.host      = host;
   self.port      = port;
   self.suffix    = suffix;
   self.ws        = false;
   self.connected = false;
   self.sendCount = 0;
   self.callbacks = {};
   self.open      = function() {
      self.ws = new WebSocket(self.proto + '://' + self.host + ':' + self.port + '/' + self.suffix);
   };
   self.setEvents = function() {
      self.ws.onopen = function() {
      	self.connected = true;
      };
      self.ws.onclose = function() {
      	self.connected = false;
      };
      self.ws.onmessage = function(event) {
         var data = JSON.parse(event.data);
         if ( data.id in self.callbacks ) {
            self.callbacks[data.id](data);
            delete self.callbacks[data.id];
         }
         else {
            //console.log(data);
         }
      };
   };
   self.packet = function(packet, callback) {
   	packet.id = 'P' + (self.sendCount++);
   	self.ws.send(JSON.stringify(packet));
   	if ( callback ) {
   	   self.callbacks[packet.id] = callback;
   	}
   };
   self.open();
   self.setEvents();
};
