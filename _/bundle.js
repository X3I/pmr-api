(function() {


   /*
   * UTILITIES | private
   */
   var utilities = function() {
      var self         = this;
      self.queryString = function(object) {
         var query = '';
         for ( var key in object ) {
            query += key         + '=';
            query += object[key] + '&';
         }
         return query.slice(0, -1);
      };
      self.httpRequest = function(method, url, headers, post, callback) {
         var request = new XMLHttpRequest();
         request.onreadystatechange = function() {
            (this.readyState == 4 && callback(this.responseText));
         };
         request.open(method, url, true);
         for ( var i = 0; i < headers.length; i += 2 ) {
            request.setRequestHeader(headers[i], headers[i + 1]);
         }
         request.send(post);
      };
      self.getRequest = function(url, callback) {
         self.httpRequest('GET', url, [], null, callback);
      };
      self.postRequest = function(url, post, callback) {
         self.httpRequest('POST', url, ['X-Requested-With', 'XMLHttpRequest', 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'], post, callback);
      };
   };


   /*
   * SOCKET | private
   */
   var socket = function(proto, host) {
      var self       = this;
      self.proto     = proto;
      self.host      = host;
      self.ws        = false;
      self.connected = false;
      self.sentCount = 0;
      self.callbacks = {};
      self.open      = function() {
         self.ws = new WebSocket(self.proto + '://' + self.host);
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
               // console.log(data);
            }
         };
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
      self.setEvents();
   };


   /*
   * API | public
   */
   window.api = function(proto, host) {
      var self       = this;
      self.utilities = new utilities();
      self.socket    = new socket(proto, host);
      self.useEmote  = function(emote) {
         self.socket.send({
            'a': 'emote',
            'p': {
               'style': emote
            }
         }, callback);
      };
      self.changeLocation = function(x, y) {
         self.socket.send({
            'a':      'target',
            'direct': 0,
            'p':      {
               'x': x,
               'y': y
            }
         }, callback);
      };
      self.addFriend = function(username) {
         self.socket.send({
            'a': 'friend_request',
            'p': {
               'name': username
            }
         }, callback);
      };
      self.sendoutPokemon = function(position, pokemonId) {
         self.socket.send({
            'a': 'call',
            'p': {
               'action':   'sendout'
               'position': position,
               'pk':       pokemonId
            }
         }, callback);
      };
      self.withdrawPokemon = function(position, pokemonId) {
         self.socket.send({
            'a': 'call',
            'p': {
               'action':   'withdraw'
               'position': position,
               'pk':       pokemonId
            }
         }, callback);
      };
      self.privateMessage = function(username, text) {
         self.socket.send({
            'a': 'message',
            'p': {
               'chatroom': '1'
               'text':     '/pm ' + username + ' ' + text
            }
         }, callback);
      };
      self.globalMessage = function(text) {
         self.socket.send({
            'a': 'message',
            'p': {
               'chatroom': '1'
               'text':     text
            }
         }, callback);
      };
      self.guildMessage = function(text) {
         self.socket.send({
            'a': 'message',
            'p': {
               'chatroom': 'P'
               'text':     text
            }
         }, callback);
      };
      self.startTrade = function(username, text) {
         self.socket.send({
            'a': 'trade_request',
            'p': {
               'name': username
            }
         }, callback);
      };
      self.speakToNpc = function(npc) {
         self.socket.send({
            'a': 'action',
            'p': {
               'npc': npc
            }
         }, callback);
      };
      self.register = function(username, password, email, pokemonId, success, error) {
         self.utilities.postRequest('/ajax/register', self.utilities.queryString({
            'subscribe': 'on',
            'username':  username,
            'password1': password,
            'password2': password,
            'email':     email,
            'monster':   pokemonId
         }), function(data) {
            ((data = JSON.parse(data)) && 'result' in data && data.result ? (success && success()) : (error && error()));
         });
      };
      self.activate = function(gender, body, hair, shirt, pants, shoes, token, success, error) {
         self.utilities.postRequest('/ajax/account/complete', self.utilities.queryString({
            'gender': gender,
            'body':   body,
            'hair':   hair,
            'shirt':  shirt,
            'pants':  pants,
            'shoes':  shoes,
            'token':  token
         }), function(data) {
            ((data = JSON.parse(data)) && 'result' in data && data.result ? (success && success()) : (error && error()));
         });
      };
      self.login = function(username, password, success, error) {
         self.utilities.postRequest('/', self.utilities.queryString({
            'username': username,
            'password': password
         }), function(data) {
            ((match = data.match(/token\s*=\s*.([0-9a-z]*)/i)) ? (success && success(match['1'])) : (error && error()));
         });
      };
   };


})();
