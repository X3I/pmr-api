window.pokeApi = function(server, utilities) {
   var self       = this;
   self.socket    = false;
   self.setSocket = function(socket) {
      self.socket = socket;
   };
   self.parsePacket = function(data) {
      console.log(JSON.stringify(data));
   };
   utilities.interceptSocket(server, self.setSocket, self.parsePacket);
};
