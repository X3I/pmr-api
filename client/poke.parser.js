window.pokeParser = function(utilities, data) {
   var self         = this;
   self.parsePacket = function(packet) {
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
               self.parseEvents(packet.p);
            break;
            case 'attack':
               self.parseAttack(packet.p);
            break;
            case 'f':
               self.parseFriends(packet.p);
            break;
            case 'items':
               self.parseItems(packet.p);
            break;
            case 'npc':
               self.parseNpcResponse(packet.p);
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
            (pokemon && data.pokemon.push({
               'name':        pokemon.name,
               'rarity':      pokemon.rarity,
               'id':          packet.entities[i].id,
               'monsterId':   packet.entities[i].monsterId,
               'health':      packet.entities[i].hp,
               'totalHealth': packet.entities[i].hpt,
               'shiny':       packet.entities[i].shiny,
               'x':           packet.entities[i].x,
               'y':           packet.entities[i].y,
               'targetX':     packet.entities[i].tx,
               'targetY':     packet.entities[i].ty,
               'isWild':      packet.entities[i].id.match(/^m/) ? true : false
            }));
         }
      }
   };
   self.parseEntityTargetChange = function(packet) {
      if ( utilities.keysInObject(packet.source, ['id', 'x', 'y', 'tx', 'ty']) ) {
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
            (pokemon && equipped.push({
               'name':        pokemon.name,
               'rarity':      pokemon.rarity,
               'id':          packet[keys[i]].pk,
               'monsterId':   packet[keys[i]].pokemon_id,
               'position':    packet[keys[i]].position,
               'level':       packet[keys[i]].level,
               'health':      packet[keys[i]].hp_left,
               'totalHealth': packet[keys[i]].hp_total
            }));
         }
      }
      data.equippedPokemon = equipped;
   };
   self.parseEvents = function(packet) {
      if ( utilities.keysInObject(packet, ['user_id', 'success', 'originator', 'type']) && packet.success && packet.type == 'catch' ) {
         var pokemon = utilities.findBy(data.pokemon, 'id', packet.originator);
         (pokemon && data.caughtPokemon.push({
            'name':   pokemon.name,
            'rarity': pokemon.rarity,
            'shiny':  pokemon.shiny
         }));
         utilities.deleteBy(data.pokemon, 'id', packet.originator);
      }
      else if ( utilities.keysInObject(packet, ['hp', 'originator', 'type']) && packet.type == 'item' ) {
         var pokemon1 = utilities.findBy(data.equippedPokemon, 'id', packet.originator.slice(1));
         var pokemon2 = utilities.findBy(data.pokemon,         'id', packet.originator);
         (pokemon1 && pokemon2 && (pokemon1.health = packet.hp) && (pokemon2.health = packet.hp));
         console.log(pokemon1.health / pokemon1.totalHealth);
      }
   };
   self.parseAttack = function(packet) {
      if ( utilities.keysInObject(packet, ['to']) && utilities.keysInObject(packet.to, ['hp', 'originator', 'id']) ) {
         var pokemon1 = utilities.findBy(data.equippedPokemon, 'id', packet.to.originator.slice(1));
         var pokemon2 = utilities.findBy(data.pokemon,         'id', packet.to.originator);
         (pokemon1 && pokemon2 && (pokemon1.health = packet.hp) && (pokemon2.health = packet.hp));
         console.log(pokemon1.health / pokemon1.totalHealth);
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
            item = utilities.findBy(data.itemList, 'id', packet.items[i].item_id);
            (item && items.push({
               'id':       item.id,
               'name':     item.name,
               'price':    item.price,
               'quantity': packet.items[i].quantity,
               'worth':    packet.items[i].quantity * item.price
            }));
         }
      }
      data.items = items;
      data.money = packet.money;
   };
   self.parseNpcResponse = function(packet) {
      if ( packet.lines.length > 1 && utilities.keysInObject(packet.lines['1'], ['action' ,'storage', 'token']) && packet.lines['1'].action == 'lab' ) {
         var storeage = packet.lines['1'].storage;
         var token    = packet.lines['1'].token;
         for ( var pokemon = false, inventory = [], storage = packet.lines['1'].storage, token = packet.lines['1'].token, i = 0; i < storage.length; i++ ) {
            if ( utilities.keysInObject(storage[i], ['pk', 'pokemon_id', 'name', 'special', 'is_starter', 'iv_atk', 'iv_spd', 'iv_def', 'iv_spatk', 'iv_spdef', 'market_price', 'level']) ) {
               pokemon = utilities.findBy(data.pokemonList, 'id', storage[i].pokemon_id);
               (pokemon && inventory.push({
                  'rarity':         pokemon.rarity,
                  'id':             storage[i].pk,
                  'monsterId':      storage[i].pokemon_id,
                  'name':           storage[i].name,
                  'isSpecial':      storage[i].special,
                  'isStarter':      storage[i].is_starter,
                  'attack':         storage[i].iv_atk,
                  'speed':          storage[i].iv_spd,
                  'defence':        storage[i].iv_def,
                  'specialAttack':  storage[i].iv_spatk,
                  'specialDefence': storage[i].iv_spdef,
                  'price':          storage[i].market_price,
                  'level':          storage[i].level,
                  'totalStats':     utilities.sumKeys(storage[i], ['iv_atk', 'iv_spd', 'iv_def', 'iv_spatk', 'iv_spdef'])
               }));
            }
         }
         data.labPokemon = inventory;
         data.labToken   = token;
      }
   };
};
