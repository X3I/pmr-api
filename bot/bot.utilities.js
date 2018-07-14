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
      self.queryString = function(object) {
         var query = '';
         for ( var key in object ) {
            query += key         + '=';
            query += object[key] + '&';
         }
         return query.slice(0, -1);
      };
      self.cookieDate = function(days) {
         var date = new Date();
         date.setTime(date.getDate() + date.getTime() + (days * 24 * 60 * 60 * 1000));
         return date.toGMTString();
      };
      self.getCookie = function(name) {
         var match = document.cookie.match(new RegExp(name + '=([^\;]*)'));
         return (match ? match['1'] : false);
      };
      self.setCookie = function(name, value, days) {
         document.cookie = name + '=' + value + '; expires=' + self.cookieDate(days) + '; path=/';
      };
      self.deleteCookie = function(name) {
         document.cookie = name + '=; expires=' + self.cookieDate(-365) + '; path=/';
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
      self.postRequest = function(url, post, callback) {
         self.httpRequest('POST', url, ['X-Requested-With', 'XMLHttpRequest', 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'], post, callback);
      };
      self.elementStyles = function(element, styles) {
         for ( var i = 0; i < styles.length; i += 2 ) {
            element.style[styles[i]] = styles[i + 1];
         }
      };
      self.createElement = function(tag, attributes, value) {
         var element       = document.createElement(tag);
         element.innerHTML = value || '';
         for ( var i = 0; attributes && i < attributes.length; i += 2 ) {
            element.setAttribute(attributes[i], attributes[i + 1]);
         }
         return element;
      };
      self.appendChildren = function(element, children) {
         for ( var i = 0; i < children.length; i++ ) {
            element.appendChild(children[i]);
         }
      };
   });
})();
