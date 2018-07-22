(function() {
   'use strict';
   var modules = function() {
      var self     = this;
      self.modules = [];
      self.loaded  = [];
      self.create  = function(name, module) {
         self.modules.push(name, module);
      };
      self.require = function(name, dependencies) {
         if ( self.loaded.indexOf(name) < 0 ) {
            self.loaded.push(name, new (function() {
               return self.modules[self.modules.indexOf(name) + 1].apply(this, dependencies || []);
            })());
         }
         return self.loaded[self.loaded.indexOf(name) + 1];
      };
   };
   window.modules = new modules();
})();
