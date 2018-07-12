window.pokeParser = function(utilities, data) {
   var self         = this;
   self.parsePacket = function(packet) {
      packet = JSON.parse(packet);
      if ( utilities.keysInObject(packet, ['a', 'p']) ) {
         switch ( packet.a ) {
            case 'ent':
               self.parseEntities(packet.p);
            break;
            case 't':
               self.parseEntityTargetChange(packet.p);
            break;
            case 'team':
               self.parseEquippedPokemon(packet.p);
            break;
            case 'event':
               self.parseCaughtEvent(packet.p);
            break;
            case 'f':
               self.parseFriends(packet.p);
            break;
            case 'items':
               self.parseItems(packet.p);
            break;
         }
      }
   };
   self.parseEntities = function(packet) {
      for ( var pokemon = false, i = 0; i < packet.entities.length; i++ ) {
         if ( utilities.keysInObject(packet.entities[i], ['id', 'admin', 'money', 'x', 'y', 'tx', 'ty']) ) {
            utilities.deleteBy(data.trainers, 'name', packet.entities[i].id);
            data.trainers.push({
               'admin':   packet.entities[i].admin,
               'name':    packet.entities[i].id,
               'money':   packet.entities[i].money,
               'x':       packet.entities[i].x,
               'y':       packet.entities[i].y,
               'targetX': packet.entities[i].tx,
               'targetY': packet.entities[i].ty
            });
         }
         else if ( utilities.keysInObject(packet.entities[i], ['id', 'monsterId', 'hp', 'hpt', 'shiny', 'x', 'y', 'tx', 'ty']) ) {
            pokemon = utilities.findBy(data.pokemonList, 'id', packet.entities[i].monsterId);
            utilities.deleteBy(data.pokemon, 'id', packet.entities[i].monsterId);
            data.pokemon.push({
               'name':      pokemon.name,
               'rarity':    pokemon.rarity,
               'id':        packet.entities[i].id,
               'monsterId': packet.entities[i].monsterId,
               'health':    packet.entities[i].hp / packet.entities[i].hpt * 100,
               'shiny':     packet.entities[i].shiny,
               'x':         packet.entities[i].x,
               'y':         packet.entities[i].y,
               'targetX':   packet.entities[i].tx,
               'targetY':   packet.entities[i].ty,
               'isWild':    packet.entities[i].id.match(/^m/)
            });
         }
      }
   };
   self.parseEntityTargetChange = function(packet) {
      if ( utilities.keysInObject(packet.source, ['id' 'x', 'y', 'tx', 'ty']) ) {
         var entity = utilities.findBy(data.pokemon, 'id', packet.source.id) || utilities.findBy(data.trainers, 'name', packet.source.id);
         if ( entity ) {
            entity.x       = packet.source.x;
            entity.y       = packet.source.y;
            entity.targetX = packet.source.tx;
            entity.targetY = packet.source.ty;
         }
      }
   };
   self.parseEquippedPokemon = function(packet) {
      for ( var pokemon = false, equipped = [], keys = Object.keys(packet), i = 0; i < keys.length; i++ ) {
         if ( utilities.keysInObject(packet[keys[i]], ['pk', 'pokemon_id', 'position', 'level', 'hp_left', 'hp_total']) ) {
            pokemon = utilities.findBy(data.pokemonList, 'id', packet[keys[i]].pokemon_id);
            equipped.push({
               'name':      pokemon.name,
               'rarity':    pokemon.rarity,
               'id':        packet[keys[i]].pk,
               'monsterId': packet[keys[i]].pokemon_id,
               'position':  packet[keys[i]].position,
               'level':     packet[keys[i]].level,
               'health':    packet[keys[i]].hp_left / packet[keys[i]].hp_total * 100
            })
         }
      }
      data.equippedPokemon = equipped;
   };
   self.parseCaughtEvent = function(packet) {
      if ( utilities.keysInObject(packet, ['user_id', 'success', 'originator', 'type']) && packet.success && packet.type == 'catch' ) {
         var pokemon = utilities.findBy(data.pokemon, 'id', packet.originator);
         data.caughtPokemon.push({
            'name':   pokemon.name,
            'rarity': pokemon.rarity,
            'shiny':  pokemon.shiny
         });
         utilities.deleteBy(data.pokemon, 'id', packet.originator);
      }
   };
   self.parseFriends = function(packet) {
      for ( var friends = [], i = 0; i < packet.friends.length; i++ ) {
         if ( utilities.keysInObject(packet.friends[i], ['id', 'name', 'area']) ) {
            friends.push({
               'id':   packet.friends[i].id,
               'name': packet.friends[i].name,
               'area': packet.friends[i].area
            });
         }
      }
      for ( var requests = [], i = 0; i < packet.requests.length; i++ ) {
         if ( utilities.keysInObject(packet.requests[i], ['id', 'name', 'area']) ) {
            requests.push({
               'id':   packet.requests[i].id,
               'name': packet.requests[i].name,
               'area': packet.requests[i].area
            });
         }
      }
      data.friends        = friends;
      data.friendRequests = requests;
   };
   self.parseItems = function(packet) {
      for ( var items = [], i = 0; i < packet.items.length; i++ ) {
         if ( utilities.keysInObject(packet.items[i], ['item_id', 'quantity']) ) {
            items.push({
               'id':       packet.items[i].item_id,
               'quantity': packet.items[i].quantity
            });
         }
      }
      data.items = items;
      data.money = packet.money;
   };
};
