(function() {
   'use strict';
   botModules.create('utilities', function() {
      var self          = this;
      self.keysInObject = function(object, keys) {
         for ( var i = 0; i < keys.length; i++ ) {
            if ( !(keys[i] in object) ) {
               return false;
            }
         }
         return true;
      };
      self.findBy = function(array, key, value) {
         for ( var i = 0; i < array.length; i++ ) {
            if ( array[i][key] == value ) {
               return array[i];
            }
         }
      };
      self.deleteBy = function(array, key, value) {
         for ( var i = 0; i < array.length; i++ ) {
            if ( array[i][key] == value ) {
               array.splice(i, 1);
               break;
            }
         }
      };  
   });
})();
