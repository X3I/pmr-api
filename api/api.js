(function() {
   'use strict';
   window.modules.create('api', function(server, utilities, data, parser) {
      var self       = this;
      self.socket    = false;
      self.setSocket = function(socket) {
         self.socket = socket;
      };
      self.sendPacket = function(action, packet) {
         self.socket.send(JSON.stringify({'a': action, 'p': packet}));
      };
      self.receivePacket = function(packet) {
         parser.parsePacket(JSON.parse(packet));
      };
      self.useEmote = function(emote) {
         self.sendPacket('emote', {'style': emote});
      };
      self.purchaseItem = function(id, quantity) {
         self.sendPacket('purchase', {'token': data.token, 'purchases': [{'id': id, 'quantity': quantity}]});
      };
      self.sellPokemon = function(pokemonIds) {
         self.sendPacket('lab', {'token': data.token, 'lab': pokemonIds});
      };
      self.changeTeam = function(id1, id2, id3, id4, id5, id6) {
         self.sendPacket('storage', {'token': data.token, 'team': [id1 || 0, id2 || 0, id3 || 0, id4 || 0, id5 || 0, id6 || 0]});
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
      self.guildInvite = function(username) {
         self.sendPacket('guildInvite', {'name': username});
      };
      self.guildUpdate = function(id, name, description, color) {
         self.sendPacket('guildUpdate', {'guild_id': id, 'guild_name': name, 'guild_description': description, 'guild_color': color});
      };
      self.guildMoney = function(money) {
         self.sendPacket('guildTransferMoney', {'money': money});
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
      self.lockTrade = function() {
         self.sendPacket('trade_update', {'action': 'lock'});
      };
      self.acceptTrade = function() {
         self.sendPacket('trade_update', {'action': 'accept'});
      };
      self.tradeItem = function(name) {
         var item = utilities.findBy(data.items, 'name', name);
         (item && item.quantity > 0 && --item.quantity && self.sendPacket('trade_update', {'action': 'item_add', 'pk': item.id}));
      };
      self.tradePokemon = function(position) {
         var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
         (pokemon && self.sendPacket('trade_update', {'action': 'pokemon_add', 'pk': pokemon.id}));
      };
      self.sendoutPokemon = function(position) {
         var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
         (pokemon && self.sendPacket('call', {'position': position, 'pk': pokemon.id, 'action': 'sendout'}));
      };
      self.withdrawPokemon = function(position) {
         var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
         (pokemon && self.sendPacket('call', {'position': position, 'pk': pokemon.id, 'action': 'withdraw'}));
      };
      self.evolvePokemon = function(position, id) {
         var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
         (pokemon && self.sendPacket('evo', {'pk': pokemon.id, 'from': pokemon.monsterId, 'to': id}));
      };
      self.changePokemonAttack = function(position, attackNumber) {
         var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
         (pokemon && self.sendPacket('skill', {'pk': pokemon.id, 'index': attackNumber - 1}));
      };
      self.learnAttack = function(position, learn, forget) {
         var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
         (pokemon && self.sendPacket('moveTutorLearn', {'move_learn_id': learn, 'move_forget_id': forget, 'pokemon_pk': pokemon.id}));
      };
      self.usePokeBall = function(name, id) {
         var item = utilities.findBy(data.items, 'name', name);
         (item && item.quantity > 0 && --item.quantity && self.sendPacket('pokeball', {'t': id, 'i': item.id}));
      };
      self.useItem = function(position, name) {
         var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
         var item    = utilities.findBy(data.items, 'name', name);
         (pokemon && item && item.quantity > 0 && --item.quantity && self.sendPacket('item', {'t': 'p' + pokemon.id,'i': item.id}));
      };
      self.revivePokemon = function(position, name) {
         var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
         var item    = utilities.findBy(data.items, 'name', name);
         (pokemon && item && item.quantity > 0 && --item.quantity && self.sendPacket('revive', {'t': pokemon.id,'i': item.id}));
      };
      utilities.interceptSocket(server, self.setSocket, self.receivePacket);
   });
})();
