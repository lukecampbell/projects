var express = require('express');
var api_request = require('../utils/api_request');
var router = express.Router();
var util = require('util');

module.exports = function(app) {

  /* GET /employee/:id */
  router.get('/:id', function(req, res, next) {
    app.log.info("Got request");
    var url = util.format('http://%s:%s/api/employee/%s', config.proxy.pyprojects.host, config.proxy.pyprojects.port, req.params.id);
    api_request.api_get(url, {}, function(response) {
      app.log.info("I Actually got the response");
      if(response.error) {
        var err = new Error(response.error);
        err.status = response.status;
        next(err);
        return;
      }
      var employeeID = response.body.id;
      res.render('show_employee', {title: employeeID});
    });
  });

  return router;
}

