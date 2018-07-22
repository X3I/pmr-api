(function() {
   'use strict';
   window.modules.create('parser', function(utilities, data) {
      var self         = this;
      self.parsePacket = function(packet) {
         switch ( packet.a ) {
            case 'l':
               self.parseLocationChange(packet.p);
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
            case 'f':
               self.parseFriends(packet.p);
            break;
            case 'ent':
               self.parseEntities(packet.p);
            break;
            case 'event':
               self.parseEvent(packet.p);
            break;
            case 'attack':
               self.parseAttack(packet.p);
            break;
            case 'npc':
               self.parseNpcResponse(packet.p);
            break;
            case 'm':
               // message
            break;
            default:
               // console.log(packet);
            break;
         }
      };
      self.packetValidation = function(packet, type) {
         var keys = {       
            'location': ['area', 'id'],
            'target':   ['id', 'x', 'y', 'tx', 'ty'],
            'equipped': ['pk', 'pokemon_id', 'name', 'level', 'position', 'hp', 'hp_total', 'iv_atk', 'iv_spd', 'iv_def', 'iv_spatk', 'iv_spdef', 'special', 'attack_1_id', 'attack_2_id', 'attack_3_id', 'attack_4_id'],
            'items':    ['item_id', 'name', 'quantity'],
            'friends':  ['id', 'name', 'area'],
            'trainer':  ['admin', 'premium', 'id', 'money', 'x', 'y', 'tx', 'ty', 'running'],
            'pokemon':  ['shiny', 'id', 'monsterId', 'hp', 'hpt', 'x', 'y', 'tx', 'ty'],
            'caught':   ['originator', 'monster', 'username', 'level'],
            'attack':   ['id', 'delta', 'hp']
         };
         return (type in keys && utilities.keysInObject(packet, keys[type]));
      };
      self.parseLocationChange = function(packet) {
         if ( self.packetValidation(packet, 'location') ) {
            data.pokemon  = [];
            data.trainers = [];
         }
      };
      self.parseEntityTargetChange = function(packet) {
         if ( self.packetValidation(packet.source, 'target') ) {
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
         for ( var i = 0, keys = Object.keys(packet), length = keys.length, pokemon = []; i < length; i++ ) {
            if ( self.packetValidation(packet[keys[i]], 'equipped') ) {
               pokemon.push({
                  'id':             packet[keys[i]].pk,
                  'pokemon':        packet[keys[i]].pokemon_id,
                  'name':           packet[keys[i]].name,
                  'level':          packet[keys[i]].level,
                  'position':       packet[keys[i]].position,
                  'health':         packet[keys[i]].hp,
                  'healthTotal':    packet[keys[i]].hp_total,
                  'attack':         packet[keys[i]].iv_atk,
                  'speed':          packet[keys[i]].iv_spd,
                  'defence':        packet[keys[i]].iv_def,
                  'specialAttack':  packet[keys[i]].iv_spatk,
                  'specialDefence': packet[keys[i]].iv_spdef,
                  'special':        packet[keys[i]].special,
                  'attackIds':     [packet[keys[i]].attack_1_id, packet[keys[i]].attack_2_id, packet[keys[i]].attack_3_id, packet[keys[i]].attack_4_id]
               });
            }
         }
         data.equippedPokemon = pokemon;
      };
      self.parseItems = function(packet) {
         for ( var i = 0, length = packet.items.length, items = []; i < length; i++ ) {
            if ( self.packetValidation(packet.items[i], 'items') ) {
               items.push({
                  'id':       packet.items[i].item_id,
                  'name':     packet.items[i].name,
                  'quantity': packet.items[i].quantity
               });
            }
         }
         data.items = items;
      };
      self.parseFriends = function(packet) {
         for ( var i = 0, length = packet.friends.length; i < length; i++ ) {
            if ( self.packetValidation(packet.friends[i], 'friends') ) {
               utilities.deleteBy(data.friends, 'id', packet.friends[i].id);
               data.friends.push({
                  'id':   packet.friends[i].id,
                  'name': packet.friends[i].name,
                  'area': packet.friends[i].area
               });
            }
         }
         for ( i = 0, length = packet.requests.length; i < length; i++ ) {
            if ( self.packetValidation(packet.requests[i], 'friends') ) {
               utilities.deleteBy(data.friendRequests, 'id', packet.requests[i].id);
               data.friendRequests.push({
                  'id':   packet.requests[i].id,
                  'name': packet.requests[i].name,
                  'area': packet.requests[i].area
               });
            }
         }
      };
      self.parseEntities = function(packet) {
         if ( packet.action == 'leave' ) {
            self.parseLeavingEntities(packet.entities);
         }
         if ( packet.action == 'join' ) {
            self.parseJoiningEntities(packet.entities);
         }
      };
      self.parseLeavingEntities = function(entities) {
         for ( var i = 0, length = entities.length; i < length; i++ ) {
            if ( self.packetValidation(entities[i], 'trainer') ) {
               utilities.deleteBy(data.trainers, 'name', entities[i].id);
            }
            if ( self.packetValidation(entities[i], 'pokemon') ) {
               utilities.deleteBy(data.pokemon, 'id', entities[i].id);
            }
         }
      };
      self.parseJoiningEntities = function(entities) {
         for ( var i = 0, length = entities.length, pokemon = false; i < length; i++ ) {
            if ( self.packetValidation(entities[i], 'trainer') ) {
               utilities.deleteBy(data.trainers, 'name', entities[i].id);
               data.trainers.push({
                  'admin':   entities[i].admin,
                  'premium': entities[i].premium,
                  'name':    entities[i].id,
                  'money':   entities[i].money,
                  'x':       entities[i].x,
                  'y':       entities[i].y,
                  'targetX': entities[i].tx,
                  'targetY': entities[i].ty,
                  'running': entities[i].running
               });
            }
            else if ( self.packetValidation(entities[i], 'pokemon') ) {
               utilities.deleteBy(data.pokemon, 'id', entities[i].id);
               pokemon = utilities.findBy(data.pokemonList, 'id', entities[i].monsterId);
               if ( pokemon ) {
                  data.pokemon.push({
                     'shiny':       entities[i].shiny,
                     'rarity':      pokemon.rarity,
                     'name':        pokemon.name,
                     'id':          entities[i].id,
                     'pokemon':     entities[i].monsterId,
                     'health':      entities[i].hp,
                     'totalHealth': entities[i].hpt,
                     'x':           entities[i].x,
                     'y':           entities[i].y,
                     'targetX':     entities[i].tx,
                     'targetY':     entities[i].ty,
                     'isWild':      entities[i].id.match(/^m/) ? true : false
                  });
               }
            }
         }
      };
      self.parseEvent = function(packet) {
         if ( packet.type == 'caught' && self.packetValidation(packet, 'caught') ) {
            var pokemon = utilities.findBy(data.pokemon, 'id', packet.originator);
            if ( pokemon ) {
               data.caughtPokemon.push({
                  'shiny':    pokemon.shiny,
                  'rarity':   pokemon.rarity,
                  'name':     pokemon.name,
                  'id':       packet.originator,
                  'pokemon':  packet.monster,
                  'username': packet.username,
                  'level':    packet.level
               });
            }
         }
      };
      self.parseAttack = function(packet) {
         for ( var i = 0, length = packet.to.length, pokemon = false; i < length; i++ ) {
            if ( self.packetValidation(packet.to[i], 'attack') ) {
               pokemon = utilities.findBy(data.pokemon, 'id', packet.to[i].id);
               if ( pokemon ) {
                  pokemon.health += packet.to[i].delta;
               }
            }
         }
      };
      self.parseNpcResponse = function(packet) {
         data.token = packet.token;
      };
   });
})();
