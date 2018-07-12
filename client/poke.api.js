window.pokeApi = function(server, utilities, data) {
   var self       = this;
   self.socket    = false;
   self.setSocket = function(socket) {
      self.socket = socket;
   };
   self.sendPacket = function(action, packet) {
      self.socket.send(JSON.stringify({'a': action, 'p': packet}));
   };
   self.parsePacket = function(packet) {
      for ( var packet = JSON.parse(packet), pokemon = false, i = 0; packet.a == 'ent' && i < packet.p.entities.length; i++ ) {
         if ( packet.p.entities[i].type == 0 && utilities.keysInObject(packet.p.entities[i], ['admin', 'id', 'money']) ) {
            self.logTrainer(
               packet.p.entities[i].admin,
               packet.p.entities[i].id,
               packet.p.entities[i].money
            );
         }
         else if ( packet.p.entities[i].type == 1 && utilities.keysInObject(packet.p.entities[i], ['id', 'monsterId', 'hp', 'hpt', 'shiny']) ) {
            pokemon = utilities.findBy(data.pokemon, 'id', packet.p.entities[i].monsterId);
            self.logPokemon(
               packet.p.entities[i].id,
               packet.p.entities[i].monsterId,
               pokemon.name,
               packet.p.entities[i].hp - packet.p.entities[i].hpt / 100,
               pokemon.rarity,
               packet.p.entities[i].shiny
            );
         }
      }
   };
   self.logTrainer = function(admin, name, money) {
      utilities.deleteBy(data.trainers, 'name', name);
      data.trainers.push({
         'admin': admin,
         'name':  name,
         'money': money
      });
   };
   self.logPokemon = function(id, monsterId, name, health, rarity, shiny) {
      var owned = (id.match(/^p/) ? true : false);
      utilities.deleteBy(data[owned ? 'trainerPokemon' : 'wildPokemon'], 'id', id);
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
   self.guildInvite = function(username) {
      self.sendPacket('guildInvite', {'name': username});
   };
   self.guildUpdate = function(id, name, description, color) {
      self.sendPacket('guildUpdate', {'guild_id': id, 'guild_name': name, 'guild_description': description, 'guild_color': color});
   };
   self.guildUpdate = function(money) {
      self.sendPacket('guildTransferMoney', {'money': money});
   };
   utilities.interceptSocket(server, self.setSocket, self.parsePacket);
};
