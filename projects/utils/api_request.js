var unirest = require('unirest');

var api_request = {
  api_get: function(url, options, success) {
    var u = unirest.get(url)
      .headers({'Accept':'application/json;charset=utf-8',
                'Content-Type':'application/json;charset=utf-8'})
      .encoding('utf-8');
    if(options && options.query) {
      u.query(req.query)
    }
    u.end(success);
  }
}

module.exports = api_request;
