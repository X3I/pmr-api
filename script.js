(function() {


   window.areaManager = function() {
      var self       = this;
      self.previous  = [];
      self.rate      = 1000;
      self.parseArea = function(area) {
         area = area.replace(/area\:/ig, '');
         return area;
      };
      self.update = function() {
         var area = (window.areaName !== undefined && 'text' in window.areaName ? self.parseArea(window.areaName.text) : false);
         if ( area && self.previous[self.previous.length - 1] !== area ) {
            self.previous.push(area);
         }
      };
      self.reset = function() {
         self.previous = [];
      };
      self.get = function() {
         return JSON.stringify(self.previous, null, 3);
      };
      window.setInterval(self.update, self.rate);
   };


   window.areaManagerHTML = function(areaManager) {
      var self           = this;
      self.areaManager   = areaManager;
      self.createElement = function(tag, attributes, value) {
         var element       = document.createElement(tag);
         element.innerHTML = value || '';
         for ( var i = 0; attributes && i < attributes.length; i += 2 ) {
            element.setAttribute(attributes[i], attributes[i + 1]);
         }
         return element;
      };
      self.inject = function() {
         var container   = self.createElement('div',    ['style', 'z-index: 999; position: fixed; bottom: 10px; left: 10px; padding: 10px; background: rgba(0, 0, 0, 0.6);']);
         var getButton   = self.createElement('button', [], 'get area map');
         var resetButton = self.createElement('button', [], 'reset area map');
         getButton.onclick = function() {
            window.prompt('area map', self.areaManager.get());
         };
         resetButton.onclick = function() {
            self.areaManager.reset();
         };
         container.appendChild(getButton);
         container.appendChild(resetButton);
         document.getElementsByTagName('body')['0'].appendChild(container);
      };
      self.inject();
   };


});
