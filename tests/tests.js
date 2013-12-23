var phantom = require('phantom'),
    path = require('path');

phantom.create(function(ph) {
  return ph.createPage(function(page) {
    return page.open('file://localhost' + path.dirname(__dirname) + '/test.html', function(status) {
      console.log('opened?', status);

      return page.evaluate(function() {
        return document.title;
      }, function(result) {
        console.log('Page title is ' + result);
        return ph.exit();
      });
    });
  });
});