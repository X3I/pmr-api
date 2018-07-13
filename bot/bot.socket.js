// ==UserScript==
// @name         PMR BOT API
// @namespace    PRM BOT API
// @version      1
// @description  Bot version of PMR API
// @author       jakemadness
// @license      GPL
// @match        *://pokemonrise.com/*
// @require      https://cdn.rawgit.com/jakemadness/pmr-api/47f8ea819bf541207dc8ca90a7b2734c435644e7/bot/bot.utilities.js
// @require      https://cdn.rawgit.com/jakemadness/pmr-api/89d8ffdbca287eb891d3a480f81b1403f421a99a/bot/bot.data.js
// @require      https://cdn.rawgit.com/jakemadness/pmr-api/a401cdb6a2ad13fb8f6830d4d3736e092daa9b2c/bot/bot.parser.js
// @require      https://cdn.rawgit.com/jakemadness/pmr-api/d3adb75bd410da5a8e6cbcc13a7c124c4e048019/bot/bot.socket.js
// @require      https://cdn.rawgit.com/jakemadness/pmr-api/fe489b1c371aadfeb938c0d31faeb36165f005a3/bot/bot.api.js
// @require      https://cdn.rawgit.com/jakemadness/pmr-api/3e29268dd65755391d379a27663a504fab4ee39f/bot/script.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
var modifications = function(utilities, data, socket, api) {
   api.privateMessage('XD', 'hello world!');
};
window.bot = new window.botScript('ecchi', 'Password123', 'wss://www.pokemonrise.com:8081/game', modifications);




window.botSocket = function(server, parser) {
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
         self.receivePacket(event.data);
      };
   };
   self.sendPacket = function(packet, callback) {
      packet.id = 'P' + self.sentCount;
      packet    = JSON.stringify(packet);
      self.ws.send(packet);
      ++self.sentCount;
      if ( callback ) {
         self.callbacks[packet.id] = callback;
      }
   };
   self.receivePacket = function(packet) {
      packet = JSON.parse(packet);
      if ( 'id' in packet && packet.id in self.callbacks ) {
         self.callbacks[packet.id](packet);
         delete self.callbacks[packet.id];
      }
      else {
         parser.parsePacket(packet);
      }
   };
   self.socketReady = function(callback) {
      if ( self.connected ) {
         callback();
      }
      else {
         setTimeout(function() {
            self.socketReady(callback);
         }, 1000);
      }
   };
   self.open();
};
