window.botApi = function(utilities, data, socket) {
   var self        = this;
   self.sendPacket = function(action, packet, callback) {
      if ( socket.connected ) {
         socket.send({'a': action, 'p': packet}, callback || false);
      }
      else {
         setTimeout(function() {
            self.sendPacket(action, packet, callback);
         }, 1000);
      }
   };
   self.authenticate = function(token, callback) {
      self.sendPacket('auth', {'token': token}, callback);
   };
   self.getTrainerPokemon = function(id, callback) {
      self.sendPacket('info', {'name': id}, callback);
   };
   self.useEmote = function(emote) {
      self.sendPacket('emote', {'style': emote});
   };
   self.moveAvatar = function(x, y) {
      self.sendPacket('target', {'x': x, 'y': y});
   };
   self.addFriend = function(username) {
      self.sendPacket('friend_request', {'name': username});
   };
   self.privateMessage = function(username, text) {
      self.sendPacket('message', {'chatroom': '1', 'text': '/pm' + ' ' + username + ' ' + text});
   };
   self.globalMessage = function(text) {
      self.sendPacket('message', {'chatroom': '1', 'text': text});
   };
   self.guildMessage = function(text) {
      self.sendPacket('message', {'chatroom': 'P', 'text': text});
   };
   self.tradeRequest = function(username) {
      self.sendPacket('trade_request', {'name': username});
   };
   self.tradeStart = function(userId) {
      self.sendPacket('trade_start', {'with': userId});
   };
   self.tradeMoney = function(amount) {
      self.sendPacket('trade_update', {'action': 'money', 'money': amount});
   };
   self.tradePokemon = function(id) {
      self.sendPacket('trade_update', {'action': 'pokemon_add', 'pk': id});
   };
   self.tradeItem = function(id) {
      self.sendPacket('trade_update', {'action': 'item_add', 'pk': id});
   };
   self.lockTrade = function() {
      self.sendPacket('trade_update', {'action': 'lock'});
   };
   self.acceptTrade = function() {
      self.sendPacket('trade_update', {'action': 'accept'});
   };
   self.speakToNpc = function(npc) {
      self.sendPacket('action', {'npc': npc});
   };
   self.useMasterBall = function(target) {
      self.sendPacket('pokeball', {'t': target, 'i': 1});
   };
   self.useUltraBall = function(target) {
      self.sendPacket('pokeball', {'t': target, 'i': 2});
   };
   self.useGreatBall = function(target) {
      self.sendPacket('pokeball', {'t': target, 'i': 3});
   };
   self.usePokeBall = function(target) {
      self.sendPacket('pokeball', {'t': target, 'i': 4});
   };
   self.withdrawPokemon = function(position, id) {
      self.sendPacket('call', {'position': position, 'pk': id, 'action': 'withdraw'});
   };
   self.sendoutPokemon = function(position, id) {
      self.sendPacket('call', {'position': position, 'pk': id, 'action': 'sendout'});
   };
   self.evolvePokemon = function(id, from, to) {
      self.sendPacket('evo', {'pk': id, 'from': from, 'to': to});
   };
   self.changeSkill = function(id, index) {
      self.sendPacket('skill', {'pk': id, 'index': index});
   };
   self.guildInvite = function(username) {
      self.sendPacket('guildInvite', {'name': username});
   };
   self.guildUpdate = function(id, name, description, color) {
      self.sendPacket('guildUpdate', {'guild_id': id, 'guild_name': name, 'guild_description': description, 'guild_color': color});
   };
   self.guildUpdate = function(money) {
      self.sendPacket('guildTransferMoney', {'money': money});
   };
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
};
