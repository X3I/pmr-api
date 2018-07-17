(function() {
   'use strict';
   window.modules.create('parser', function(utilities, data) {
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
               case 'items':
                  self.parseItems(packet.p);
               break;
               case 'event':
                  self.parseEvents(packet.p);
               break;
               case 'npc':
                  self.parseNpcResponse(packet.p);
               break;
            }
         }
      };
      self.parseEntities = function(packet) {
         for ( var entities = packet.entities, found = false, i = 0; i < entities.length; i++ ) {
            if ( utilities.keysInObject(entities[i], ['id', 'admin', 'money', 'x', 'y', 'tx', 'ty']) ) {
               utilities.deleteBy(data.trainers, 'name', entities[i].id);
               data.trainers.push({
                  'admin':   entities[i].admin,
                  'name':    entities[i].id,
                  'money':   entities[i].money,
                  'x':       entities[i].x,
                  'y':       entities[i].y,
                  'targetX': entities[i].tx,
                  'targetY': entities[i].ty
               });
            }
            else if ( utilities.keysInObject(entities[i], ['id', 'monsterId', 'hp', 'hpt', 'shiny', 'x', 'y', 'tx', 'ty']) ) {
               found = utilities.findBy(data.pokemonList, 'id', entities[i].monsterId);
               utilities.deleteBy(data.pokemon, 'id', entities[i].monsterId);
               (found && data.pokemon.push({
                  'name':        found.name,
                  'rarity':      found.rarity,
                  'id':          entities[i].id,
                  'monsterId':   entities[i].monsterId,
                  'health':      entities[i].hp,
                  'totalHealth': entities[i].hpt,
                  'shiny':       entities[i].shiny,
                  'x':           entities[i].x,
                  'y':           entities[i].y,
                  'targetX':     entities[i].tx,
                  'targetY':     entities[i].ty,
                  'isWild':      entities[i].id.match(/^m/) ? true : false
               }));
            }
         }
      };
      self.parseEntityTargetChange = function(packet) {
         packet = packet.source;
         if ( utilities.keysInObject(packet, ['id', 'x', 'y', 'tx', 'ty']) ) {
            var found = utilities.findBy(data.pokemon, 'id', packet.id) || utilities.findBy(data.trainers, 'name', packet.id);
            if ( found ) {
               found.x       = packet.x;
               found.y       = packet.y;
               found.targetX = packet.tx;
               found.targetY = packet.ty;
            }
         }
      };
      self.parseEquippedPokemon = function(packet) {
         for ( var equipped = [], keys = Object.keys(packet), found = false, i = 0; i < keys.length; i++ ) {
            if ( packet[keys[i]] && utilities.keysInObject(packet[keys[i]], ['pk', 'pokemon_id', 'position', 'level', 'hp_left', 'hp_total', 'attack_1_id', 'attack_2_id', 'attack_3_id', 'attack_4_id']) ) {
               found = utilities.findBy(data.pokemonList, 'id', packet[keys[i]].pokemon_id);
               (found && equipped.push({
                  'name':        found.name,
                  'rarity':      found.rarity,
                  'id':          packet[keys[i]].pk,
                  'monsterId':   packet[keys[i]].pokemon_id,
                  'position':    packet[keys[i]].position,
                  'level':       packet[keys[i]].level,
                  'health':      packet[keys[i]].hp_left,
                  'totalHealth': packet[keys[i]].hp_total,
                  'attackIds':   [packet[keys[i]].attack_1_id, packet[keys[i]].attack_2_id, packet[keys[i]].attack_3_id, packet[keys[i]].attack_4_id]
               }));
            }
         }
         data.equippedPokemon = equipped;
      };
      self.parseItems = function(packet) {
         for ( var items = [], item = packet.items, found = false, i = 0; i < item.length; i++ ) {
            if ( utilities.keysInObject(item[i], ['item_id', 'quantity']) ) {
               found = utilities.findBy(data.itemList, 'id', item[i].item_id);
               (found && items.push({
                  'id':       found.id,
                  'name':     found.name,
                  'price':    found.price,
                  'quantity': item[i].quantity,
                  'worth':    item[i].quantity * item.price
               }));
            }
         }
         data.items = items;
         data.money = packet.money;
      };
      self.parseEvents = function(packet) {
         if ( utilities.keysInObject(packet, ['user_id', 'success', 'originator', 'type']) && packet.success && packet.type == 'catch' ) {
            var found = utilities.findBy(data.pokemon, 'id', packet.originator);
            (found && data.caughtPokemon.push(found));
            utilities.deleteBy(data.pokemon, 'id', packet.originator);
         }
         else if ( utilities.keysInObject(packet, ['hp', 'originator', 'type']) && packet.type == 'item' ) {
            var found  = utilities.findBy(data.equippedPokemon, 'id', packet.originator.slice(1));
            var found2 = utilities.findBy(data.pokemon,         'id', packet.originator);
            (found && found2 && (found.health = found2.health = packet.hp));
         }
      };
      self.parseNpcResponse = function(packet) {
         data.token = packet.token;
         for ( var lines = packet.lines, i = 0; i < lines.length; i++ ) {
            if ( utilities.keysInObject(lines[i], ['action' ,'storage']) && (lines[i].action == 'lab' || lines[i].action == 'storage') ) {
               for ( var pokemon = [], found = false, storage = lines[i].storage, i = 0; i < storage.length; i++ ) {
                  if ( utilities.keysInObject(storage[i], ['pk', 'pokemon_id', 'name', 'special', 'is_starter', 'original', 'iv_atk', 'iv_spd', 'iv_def', 'iv_spatk', 'iv_spdef', 'market_price', 'level']) ) {
                     found = utilities.findBy(data.pokemonList, 'id', storage[i].pokemon_id);
                     (found && pokemon.push({
                        'rarity':         found.rarity,
                        'id':             storage[i].pk,
                        'monsterId':      storage[i].pokemon_id,
                        'name':           storage[i].name,
                        'isSpecial':      storage[i].special,
                        'isStarter':      storage[i].is_starter,
                        'caughtBy':       storage[i].original,
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
               data.storedPokemon = pokemon;
            }
         }
      };
   });
})();
