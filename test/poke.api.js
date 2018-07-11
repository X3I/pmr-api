window.pokeApi = function(server, utilities, data) {
   var self       = this;
   self.socket    = false;
   self.setSocket = function(socket) {
      self.socket = socket;
   };
   self.sendPacket = function(action, packet) {
      self.socket.send(JSON.stringify({'a': action, 'p': packet}));
   };
   self.parsePacket = function(action, packet) {
      for ( var pokemon = false, i = 0; action == 'ent' && i < packet.entities.length; i++ ) {
         if ( packet.entities[i].type == 0 && utilities.keysInObject(entities[i], ['admin', 'id', 'money']) ) {
            self.logTrainer(
               packet.entities[i].admin,
               packet.entities[i].id,
               packet.entities[i].money
            );
         }
         if ( packet.entities[i].type == 1 && utilities.keysInObject(entities[i], ['id', 'monsterId', 'hp', 'hpt', 'shiny']) ) {
            pokemon = self.findBy(data.pokemon, 'id', packet.entities[i].monsterId);
            self.logPokemon(
               packet.entities[i].id,
               packet.entities[i].monsterId,
               pokemon.name,
               packet.entities[i].hp - packet.entities[i].hpt / 100,
               pokemon.rarity,
               packet.entities[i].shiny
            );
         }
      }
   };
   self.logTrainer = function(admin, name, money) {
      utilities.deleteBy(data.trainers, 'name', name);
      data.wildPokemon.push({
         'admin': admin,
         'name':  name,
         'money': money
      });
   };
   self.logPokemon = function(id, monsterId, name, health, rarity, shiny) {
      var owned = (id.match(/^p/) ? true : false);
      utilities.deleteBy(data[owned ? 'trainerPokemon' : 'wildPokemon'], 'name', name);
      data[owned ? 'trainerPokemon' : 'wildPokemon'].push({
         'id':        id,
         'monsterId': monsterId,
         'name':      name,
         'health':    health,
         'rarity':    rarity,
         'shiny':     shiny
      });
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
   utilities.interceptSocket(server, self.setSocket, self.parsePacket);
};
