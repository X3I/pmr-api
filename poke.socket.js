window.pokeSocket = function(server, utilities, data) {
   var self       = this;
   self.server    = server;
   self.utilities = utilities;
   self.data      = data;
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
      }
      else {
         switch ( packet.a ) {
            case 'ent':
               for ( var entities = packet.p.entities, i = 0; i < entities.length; i++ ) {
                  if ( entities[i].type == 0 && self.utilities.arrayInObject(entities[i], ['id', 'money', 'admin']) ) {
                     self.data.players.push({
                        'admin': entities[i].admin,
                        'name':  entities[i].id,
                        'money': entities[i].money
                     });
                  }
                  if ( entities[i].type == 1 && self.utilities.arrayInObject(entities[i], ['hp', 'hpt', 'id', 'monsterId', 'shiny']) && entities[i].id.match(/^m/) ) {
                     self.data.wildPokemon.push({
                        'health':    entities[i].hp / entities[i].hpt * 100,
                        'id':        entities[i].id,
                        'monsterId': entities[i].monsterId,
                        'shiny':     entities[i].shiny
                     });
                  }
                  if ( entities[i].type == 1 && self.utilities.arrayInObject(entities[i], ['hp', 'hpt', 'id', 'monsterId', 'shiny']) && entities[i].id.match(/^p/) ) {
                     self.data.ownedPokemon.push({
                        'health':    entities[i].hp / entities[i].hpt * 100,
                        'id':        entities[i].id,
                        'monsterId': entities[i].monsterId,
                        'shiny':     entities[i].shiny
                     });
                  }
               }
            break;
            case 'l':
            break;
            case 'u':
            break;
            case 'fainted':
            break;
            case 'npc':
            break;
            case 'trade_complete':
            break;
            case 'switches':
            break;
            case 't':
            break;
            case 'static':
            break;
            case 'friend_remove':
            break;
            case 'trade_update':
            break;
            case 'f':
            break;
            break;
            case 'event':
            break;
            case 'm':
            break;
            break;
            case 'e':
            break;
            case 'url':
            break;
            break;
            case 'team':
            break;
            case 'items':
            break;
            break;
            case 'ailment':
            break;
            case 'attack':
            break;
            case 'emote':
            break;
            case 'evo':
            break;
            case 'usermenu':
            break;
         }
      }
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
