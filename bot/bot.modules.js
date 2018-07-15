(function() {
   'use strict';
   var modules = function() {
      var self     = this;
      self.modules = [];
      self.create = function(name, module) {
         self.modules.push(name, module);
      };
      self.require = function(name, dependencies) {
         return new (function() {
            return self.modules[self.modules.indexOf(name) + 1].apply(this, dependencies || []);
         });
      };
   };
   window.botModules = new modules();
})();
