window.pApi = function(utilities) {
   var self      = this;
   self.register = function(username, password, email, monsterId, success, error) {
      utilities.postRequest('/ajax/register', utilities.queryString({
         'subscribe': 'on',
         'username':  username,
         'password1': password,
         'password2': password,
         'email':     email,
         'monster':   monsterId
      }), function(data) {
         ((data = JSON.parse(data)) && 'result' in data && data.result ? (success && success()) : (error && error()));
      });
   };
   self.activate = function(gender, body, hair, shirt, pants, shoes, token, success, error) {
      utilities.postRequest('/ajax/account/complete', utilities.queryString({
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
      utilities.postRequest('/', utilities.queryString({
         'username': username,
         'password': password
      }), function(data) {
         (!data.match(/login\sfailed/ig) ? (success && success()) : (error && error()))
      });
   };
};
