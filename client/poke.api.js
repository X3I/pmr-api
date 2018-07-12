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
   self.useMasterBall = function(target) {
      var item = utilities.findBy(data.itemList, 'name', 'Master Ball');
      (item && item.quantity > 0 && self.sendPacket('pokeball', {'t': target, 'i': item.id}));
   };
   self.useUltraBall = function(target) {
      var item = utilities.findBy(data.itemList, 'name', 'Ultra Ball');
      (item && item.quantity > 0 && self.sendPacket('pokeball', {'t': target, 'i': item.id}));
   };
   self.useGreatBall = function(target) {
      var item = utilities.findBy(data.itemList, 'name', 'Great Ball');
      (item && item.quantity > 0 && self.sendPacket('pokeball', {'t': target, 'i': item.id}));
   };
   self.usePokeBall = function(target) {
      var item = utilities.findBy(data.itemList, 'name', 'Poke Ball');
      (item && item.quantity > 0 && self.sendPacket('pokeball', {'t': target, 'i': item.id}));
   };
   self.withdrawPokemon = function(position) {
      var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
      (pokemon && self.sendPacket('call', {'position': position, 'pk': pokemon.id, 'action': 'withdraw'}));
   };
   self.sendoutPokemon = function(position) {
      var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
      (pokemon && self.sendPacket('call', {'position': position, 'pk': pokemon.id, 'action': 'sendout'}));
   };
   self.widthdrawEquippedPokemon = function() {
      for ( var i = 0; i < data.equippedPokemon.length; i++ ) {
         self.withdrawPokemon(data.equippedPokemon.position);
      }
   };
   self.sendoutEquippedPokemon = function() {
      for ( var i = 0; i < data.equippedPokemon.length; i++ ) {
         self.sendoutPokemon(data.equippedPokemon.position);
      }
   };
   self.evolvePokemon = function(position) {
      var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
      (pokemon && self.sendPacket('evo', {'pk': pokemon.id, 'from': pokemon.monsterId, 'to': pokemon.monsterId + 1}));
   };
   self.changeSkill = function(position, index) {
      var pokemon = utilities.findBy(data.equippedPokemon, 'position', position);
      (pokemon && self.sendPacket('skill', {'pk': pokemon.id, 'index': index}));
   };
   utilities.interceptSocket(server, self.setSocket, parser.parsePacket);
};
