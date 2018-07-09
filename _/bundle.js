(function() {


   /*
   * POKEMON UTILITIES | private
   */
	var utilities = function() {
	   var self         = this;
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


   /*
   * POKEMON SOCKET | private
   */
	var socket = function() {
	   var self          = this;
	   self.ws           = false;
	   self.connected    = false;
	   self.receiveCount = 0;
	   self.sendCount    = 0;
	   self.open         = function(proto, host, openCallback, closeCallback, receiveCallback) {
	      self.ws        = new WebSocket(proto + '://' + host);
		   self.ws.onopen = function() {
		   	self.connected = true;
		   	(openCallback && openCallback());
		   };
		   self.ws.onclose = function() {
		   	self.connected = false;
		   	(closeCallback && closeCallback());
		   };
		   self.ws.onmessage = function(received) {
		   	++self.receiveCount;
		      (receiveCallback && receiveCallback(received));
		   };
	   };
	   self.close = function() {
         self.ws.close();
	   };
	   self.send = function(data) {
	   	++self.sendCount;
	   	self.ws.send(data);
	   };
	};


   /*
   * POKEMON API | public
   */
	window.api = function() {
	   var self       = this;
	   self.utilities = new utilities();
	   self.socket    = new socket();
	   self.register  = function(username, password, email, pokemonId, success, error) {
	      self.utilities.postRequest('/ajax/register', self.utilities.queryString({
	         'subscribe': 'on',
	         'username':  username,
	         'password1': password,
	         'password2': password,
	         'email':     email,
	         'monster':   pokemonId
	      }), function(data) {
	         ((data = JSON.parse(data)) && 'result' in data && data.result ? (success && success()) : (error && error()));
	      });
	   };
	   self.activate = function(gender, body, hair, shirt, pants, shoes, token, success, error) {
	      self.utilities.postRequest('/ajax/account/complete', self.utilities.queryString({
	         'gender': gender,
	         'body':   body,
	         'hair':   hair,
	         'shirt':  shirt,
	         'pants':  pants,
	         'shoes':  shoes,
	         'token':  token
	      }), function(data) {
	         ((data = JSON.parse(data)) && 'result' in data && data.result ? (success && success()) : (error && error()));
	      });
	   };
	   self.login = function(username, password, success, error) {
	      self.utilities.postRequest('/', self.utilities.queryString({
	         'username': username,
	         'password': password
	      }), function(data) {
	         ((match = data.match(/token\s*=\s*.([0-9a-z]*)/i)) ? (success && success(match['1'])) : (error && error()));
	      });
	   };
	};


})();
