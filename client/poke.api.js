window.pokeApi = function(server, utilities, data, parser) {
   var self       = this;
   self.socket    = false;
   self.setSocket = function(socket) {
      self.socket = socket;
   };
   self.sendPacket = function(action, packet) {
      self.socket.send(JSON.stringify({'a': action, 'p': packet}));
   };
   self.useEmote = function(emote) {
      self.sendPacket('emote', {'style': emote});
   };
   self.speakToNpc = function(npc) {
      self.sendPacket('action', {'npc': npc});
   };
   self.moveAvatar = function(x, y) {
      self.sendPacket('target', {'x': x, 'y': y});
   };
   self.addFriend = function(username) {
      self.sendPacket('friend_request', {'name': username});
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
   self.evolvePokemon = function(position) {
      var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
      (pokemon && self.sendPacket('evo', {'pk': pokemon.id, 'from': pokemon.monsterId, 'to': pokemon.monsterId + 1}));
   };
   self.changePokemonAttack = function(position, attackNumber) {
      var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
      (pokemon && self.sendPacket('skill', {'pk': pokemon.id, 'index': attackNumber - 1}));
   };
   self.usePokeBall = function(name, id) {
      var item = utilities.findBy(data.items, 'name', name);
      (item && item.quantity > 0 && --item.quantity && self.sendPacket('pokeball', {'t': id, 'i': item.id}));
   };
   utilities.interceptSocket(server, self.setSocket, parser.parsePacket);
};
