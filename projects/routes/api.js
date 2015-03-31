var express = require('express');
var unirest = require('unirest');
var router = express.Router();

router.get('/project', function(req, res, next) {
  console.log(req.query);
  unirest.get('http://localhost:3001/api/project')
    .headers({'Accept': 'application/json'})
    .query(req.query)
    .end(function(response) {
      res.send(response.body);
    });
});

module.exports = router;

