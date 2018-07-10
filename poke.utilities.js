window.pokeUtilities = function() {
   var self           = this;
   self.arrayInObject = function(object, array) {
      for ( var i = 0; i < array.length; i++ ) {
         if ( !(array[i] in object) ) {
            return false;
         }
      }
      return true;
   };
   self.queryString = function(object) {
      var query = '';
      for ( var key in object ) {
         query += key         + '=';
         query += object[key] + '&';
      }
      return query.slice(0, -1);
   };
   self.httpRequest = function(method, url, headers, post, callback) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
         (this.readyState == 4 && callback(this.responseText));
      };
      request.open(method, url, true);
      for ( var i = 0; i < headers.length; i += 2 ) {
         request.setRequestHeader(headers[i], headers[i + 1]);
      }
      request.send(post);
   };
   self.getRequest = function(url, callback) {
      self.httpRequest('GET', url, [], null, callback);
   };
   self.postRequest = function(url, post, callback) {
      self.httpRequest('POST', url, ['X-Requested-With', 'XMLHttpRequest', 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'], post, callback);
   };
};
