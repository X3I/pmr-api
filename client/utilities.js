(function() {
   'use strict';
   window.modules.create('utilities', function() {
      var self          = this;
      self.keysInObject = function(object, keys) {
         for ( var i = 0; i < keys.length; i++ ) {
            if ( !(keys[i] in object) ) {
               return false;
            }
         }
         return true;
      };
      self.sumKeys = function(object, keys) {
         for ( var sum = 0, i = 0; i < keys.length; i++ ) {
            sum += object[keys[i]];
         }
         return sum;
      };
      self.findBy = function(array, key, value) {
         for ( var i = 0; i < array.length; i++ ) {
            if ( array[i][key] == value ) {
               return array[i];
            }
         }
      };
      self.deleteBy = function(array, key, value) {
         for ( var i = 0; i < array.length; i++ ) {
            if ( array[i][key] == value ) {
               array.splice(i, 1);
               break;
            }
         }
      };
      self.interceptSocket = function(url, set, parse) {
         var websocket    = window.WebSocket;
         window.WebSocket = function(server) {
            var ws = new websocket(server);
            (url == server && set(ws));
            ws.addEventListener('message', function(event) {
               (url == this.url && parse(event.data));
            });
            return ws;
         };
         window.WebSocket.prototype = websocket.prototype;
      };
      self.socketReady = function(socket, callback) {
         console.log('test');
         if ( socket && socket.readyState == 1 ) {
            callback();
         }
         else {
            setTimeout(function() {
               self.socketReady(socket, callback);
            }, 1000);
         }
      };
   });
})();
