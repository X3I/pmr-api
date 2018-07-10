window.pokeApi = function(utilities, socket) {
   var self      = this;
   self.register = function(username, password, email, pokemonId, success, error) {
      utilities.postRequest('/ajax/register', utilities.queryString({
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
      utilities.postRequest('/ajax/account/complete', utilities.queryString({
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
      utilities.postRequest('/', utilities.queryString({
         'username': username,
         'password': password
      }), function(data) {
         ((match = data.match(/token\s*=\s*.([0-9a-z]*)/i)) ? (success && success(match['1'])) : (error && error()));
      });
   };
   self.authenticate = function(token, callback) {
      socket.send({'a': 'auth', 'p': {'token': token}}, callback);
   };
   self.useEmote = function(emote) {
      socket.send({'a': 'emote', 'p': {'style': emote}});
   };
   self.moveAvatar = function(x, y) {
      socket.send({'a': 'target', 'direct': 0, 'p': {'x': x, 'y': y}});
   };
   self.addFriend = function(username) {
      socket.send({'a': 'friend_request', 'p': {'name': username}});
   };
   self.privateMessage = function(username, text) {
      socket.send({'a': 'message', 'p': {'chatroom': '1', 'text': '/pm' + ' ' + username + ' ' + text}});
   };
   self.globalMessage = function(text) {
      socket.send({'a': 'message', 'p': {'chatroom': '1', 'text': text}});
   };
   self.guildMessage = function(text) {
      socket.send({'a': 'message', 'p': {'chatroom': 'P', 'text': text}});
   };
   self.tradeRequest = function(username) {
      socket.send({'a': 'trade_request', 'p': {'name': username}});
   };
   self.tradeStart = function(userId) {
      socket.send({'a': 'trade_start', 'p': {'with': userId}});
   };
   self.tradeMoney = function(amount) {
      socket.send({'a': 'trade_update', 'p': {'action': 'money', 'money': amount}});
   };
   self.lockTrade = function() {
      socket.send({'a': 'trade_update', 'p': {'action': 'lock'}});
   };
   self.acceptTrade = function() {
      socket.send({'a': 'trade_update', 'p': {'action': 'accept'}});
   };
   self.speakToNpc = function(npc) {
      socket.send({'a': 'action', 'p': {'npc': npc}});
   };
   self.useMasterBall = function(target) {
      socket.send({'a': 'pokeball', 'p': {'t': target, 'i': 1}});
   };
   self.useUltraBall = function(target) {
      socket.send({'a': 'pokeball', 'p': {'t': target, 'i': 2}});
   };
   self.useGreatBall = function(target) {
      socket.send({'a': 'pokeball', 'p': {'t': target, 'i': 3}});
   };
   self.usePokeBall = function(target) {
      socket.send({'a': 'pokeball', 'p': {'t': target, 'i': 4}});
   };
   self.withdrawPokemon = function(position, id) {
      socket.send({'a': 'call', 'p': {'position': position, 'pk': id, 'action': 'withdraw'}});
   };
   self.sendoutPokemon = function(position, id) {
      socket.send({'a': 'call', 'p': {'position': position, 'pk': id, 'action': 'sendout'}});
   };
   self.changeSkill = function(id, index) {
      socket.send({'a': 'skill', 'p': {'pk': id, 'index': index}});
   };
};
