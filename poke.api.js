window.pokeApi = function(utilities, data, socket) {
   var self       = this;
   self.utilities = utilities;
   self.data      = data;
   self.socket    = socket;
   self.register  = function(username, password, email, pokemonId, success, error) {
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
   self.authenticate = function(token, callback) {
      self.socket.send({'a': 'auth', 'p': {'token': token}}, callback);
   };
   self.useEmote = function(emote) {
      self.socket.send({'a': 'emote', 'p': {'style': emote}});
   };
   self.moveAvatar = function(x, y) {
      self.socket.send({'a': 'target', 'direct': 0, 'p': {'x': x, 'y': y}});
   };
   self.addFriend = function(username) {
      self.socket.send({'a': 'friend_request', 'p': {'name': username}});
   };
   self.privateMessage = function(username, text) {
      self.socket.send({'a': 'message', 'p': {'chatroom': '1', 'text': '/pm' + ' ' + username + ' ' + text}});
   };
   self.globalMessage = function(text) {
      self.socket.send({'a': 'message', 'p': {'chatroom': '1', 'text': text}});
   };
   self.guildMessage = function(text) {
      self.socket.send({'a': 'message', 'p': {'chatroom': 'P', 'text': text}});
   };
   self.tradeRequest = function(username) {
      self.socket.send({'a': 'trade_request', 'p': {'name': username}});
   };
   self.tradeStart = function(userId) {
      self.socket.send({'a': 'trade_start', 'p': {'with': userId}});
   };
   self.tradeMoney = function(amount) {
      self.socket.send({'a': 'trade_update', 'p': {'action': 'money', 'money': amount}});
   };
   self.tradePokemon = function(id) {
      self.socket.send({'a': 'trade_update', 'p': {'action': 'pokemon_add', 'pk': id}});
   };
   self.tradeItem = function(id) {
      self.socket.send({'a': 'trade_update', 'p': {'action': 'item_add', 'pk': id}});
   };
   self.lockTrade = function() {
      self.socket.send({'a': 'trade_update', 'p': {'action': 'lock'}});
   };
   self.acceptTrade = function() {
      self.socket.send({'a': 'trade_update', 'p': {'action': 'accept'}});
   };
   self.speakToNpc = function(npc) {
      self.socket.send({'a': 'action', 'p': {'npc': npc}});
   };
   self.useMasterBall = function(target) {
      self.socket.send({'a': 'pokeball', 'p': {'t': target, 'i': 1}});
   };
   self.useUltraBall = function(target) {
      self.socket.send({'a': 'pokeball', 'p': {'t': target, 'i': 2}});
   };
   self.useGreatBall = function(target) {
      self.socket.send({'a': 'pokeball', 'p': {'t': target, 'i': 3}});
   };
   self.usePokeBall = function(target) {
      self.socket.send({'a': 'pokeball', 'p': {'t': target, 'i': 4}});
   };
   self.withdrawPokemon = function(position, id) {
      self.socket.send({'a': 'call', 'p': {'position': position, 'pk': id, 'action': 'withdraw'}});
   };
   self.sendoutPokemon = function(position, id) {
      self.socket.send({'a': 'call', 'p': {'position': position, 'pk': id, 'action': 'sendout'}});
   };
   self.evolvePokemon = function(id, from, to) {
      self.socket.send({'a': 'evo', 'p': {'pk': id, 'from': from, 'to': to}});
   };
   self.changeSkill = function(id, index) {
      self.socket.send({'a': 'skill', 'p': {'pk': id, 'index': index}});
   };
   self.dumpData = function() {
      console.log(self.data);
   };
};
