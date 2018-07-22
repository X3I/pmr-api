(function() {
   'use strict';
   window.modules.create('utilities', function() {
      var self      = this;
      self.isNumber = function(number) {
         return (typeof number == 'number');
      };
      self.isString = function(string) {
         return (typeof string == 'string');
      };
      self.isObject = function(object) {
         return (object !== null && typeof object == 'object');
      };
      self.isArray = function(array) {
         return (array instanceof Array);
      };
      self.keysInObject = function(object, keys) {
         for ( var i = 0, length = keys.length; self.isObject(object) && i < length; i++ ) {
            if ( !(keys[i] in object) ) {
               return false;
            }
         }
         return true;
      };
      self.sumKeys = function(object, keys) {
         for ( var i = 0, length = keys.length, sum = 0; self.isObject(object) && i < length; i++ ) {
            sum += object[keys[i]];
         }
         return sum;
      };
      self.sortBy = function(array, key, descending) {
         return array.sort(function(a, b) {
            return (descending ? b[key] - a[key] : a[key] - b[key]);
         });
      };
      self.findBy = function(array, key, value) {
         for ( var i = 0, length = array.length; i < length; i++ ) {
            if ( array[i][key] == value ) {
               return array[i];
            }
         }
      };
      self.deleteBy = function(array, key, value) {
         for ( var i = 0, length = array.length; i < length; i++ ) {
            if ( array[i][key] == value ) {
               array.splice(i, 1);
               break;
            }
         }
      };
      self.createElement = function(tag, attributes, value, onclick) {
         var element       = document.createElement(tag);
         element.innerHTML = value   || '';
         element.onclick   = onclick || null;
         for ( var i = 0, length = attributes.length; i < length; i += 2 ) {
            element.setAttribute(attributes[i], attributes[i + 1]);
         }
         return element;
      };
      self.appendChildren = function(element, children) {
         for ( var i = 0, length = children.length; i < length; i++ ) {
            element.appendChild(children[i]);
         }
      };
      self.removeChildren = function(element) {
         while ( element.hasChildNodes() ) {
            element.removeChild(element.lastChild);
         }
      };
      self.interceptSocket = function(url, set, parse) {
         var websocket    = window.WebSocket;
         window.WebSocket = function(server) {
            var socket = new websocket(server);
            if ( url == server ) {
               set(socket);
               socket.addEventListener('message', function(event) {
                  parse(event.data);
               });
            }
            return socket;
         };
         window.WebSocket.prototype = websocket.prototype;
      };
   });
})();
