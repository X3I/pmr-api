window.pokeSocket = function(server, utilities, data) {
   var self       = this;
   self.ws        = false;
   self.connected = false;
   self.sentCount = 0;
   self.callbacks = {};
   self.open      = function() {
      self.ws        = new WebSocket(server);
      self.ws.onopen = function() {
         self.connected = true;
      };
      self.ws.onclose = function() {
         self.connected = false;
      };
      self.ws.onmessage = function(event) {
         self.receive(JSON.parse(event.data));
      };
   };
   self.receive = function(packet) {
      if ( packet.id in self.callbacks ) {
         self.callbacks[packet.id](packet);
         delete self.callbacks[packet.id];
         return;
      }
      for ( var pokemon = false, i = 0; packet.a == 'ent' && i < packet.p.entities.length; i++ ) {
         if ( packet.p.entities[i].type == 0 && utilities.keysInObject(packet.p.entities[i], ['admin', 'id', 'money']) ) {
            self.logTrainer(
               packet.p.entities[i].admin,
               packet.p.entities[i].id,
               packet.p.entities[i].money
            );
         }
         if ( packet.p.entities[i].type == 1 && utilities.keysInObject(packet.p.entities[i], ['id', 'monsterId', 'hp', 'hpt', 'shiny']) ) {
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
   self.send = function(packet, callback) {
      packet.id = 'P' + self.sentCount;
      self.ws.send(JSON.stringify(packet));
      ++self.sentCount;
      if ( callback ) {
         self.callbacks[packet.id] = callback;
      }
   };
   self.open();
};
