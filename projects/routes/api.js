var express = require('express');
var unirest = require('unirest');
var util = require('util');
var router = express.Router();

module.exports = function(app) {

  router.get('/project', function(req, res, next) {
    var url = util.format('http://%s:%s/api/project', config.proxy.pyprojects.host, config.proxy.pyprojects.port);
    unirest.get(url)
      .headers({'Accept': 'application/json'})
      .encoding('utf-8')
      .query(req.query)
      .end(function(response) {
        app.log.info("Received response");
        if(response.error) {
          app.log.error(response.error);
          res.status(400).send(response.error);
        }
        res.send(response.body);
      });
  });

  router.post('/project', function(req, res, next) {
    var url = util.format('http://%s:%s/api/project', config.proxy.pyprojects.host, config.proxy.pyprojects.port);
    unirest.post(url)
      .headers({'Accept':'application/json',
                'Content-Type':'application/json'})
      .encoding('utf-8')
      .send(req.body)
      .end(function(response) {
        app.log.info("Received response");
        if(response.error) {
          app.log.error(response.error);
          res.status(400).send(response.error);
        }
        res.send(response.body);
      });
  });
  router.put('/project/:id', function(req, res, next) {
    var url = util.format('http://%s:%s/api/project/%s', config.proxy.pyprojects.host, config.proxy.pyprojects.port, req.params.id);
    unirest.put(url)
      .headers({'Accept':'application/json',
                'Content-Type':'application/json'})
      .encoding('utf-8')
      .send(req.body)
      .end(function(response) {
        app.log.info("Received response");
        if(response.error) {
          app.log.error(response.error);
          res.status(400).send(response.error);
        }
        res.send(response.body);
      });
  });

  router.get('/project/:id', function(req, res, next) {
    var url = util.format('http://%s:%s/api/project/%s', config.proxy.pyprojects.host, config.proxy.pyprojects.port, req.params.id);
    unirest.get(url)
      .headers({'Accept':'application/json',
                'Content-Type':'application/json'})
      .encoding('utf-8')
      .query(req.query)
      .end(function(response) {
        app.log.info("Received response");
        if(response.error) {
          app.log.error(response.error);
          res.status(400).send(response.error);
        }
        res.send(response.body);
      });
  });
  
  router.get('/budget', function(req, res, next) {
    var url = util.format('http://%s:%s/api/budget', config.proxy.pyprojects.host, config.proxy.pyprojects.port);
    unirest.get(url)
      .headers({'Accept': 'application/json'})
      .encoding('utf-8')
      .query(req.query)
      .end(function(response) {
        app.log.info("Received response");
        if(response.error) {
          app.log.error(response.error);
          res.status(400).send(response.error);
        }
        res.send(response.body);
      });
  });

  router.post('/budget', function(req, res, next) {
    var url = util.format('http://%s:%s/api/budget', config.proxy.pyprojects.host, config.proxy.pyprojects.port);
    unirest.post(url)
      .headers({'Accept':'application/json',
                'Content-Type':'application/json'})
      .encoding('utf-8')
      .send(req.body)
      .end(function(response) {
        app.log.info("Received response");
        if(response.error) {
          app.log.error(response.error);
          res.status(400).send(response.error);
        }
        res.send(response.body);
      });
  });
  router.put('/budget/:id', function(req, res, next) {
    var url = util.format('http://%s:%s/api/budget/%s', config.proxy.pyprojects.host, config.proxy.pyprojects.port, req.params.id);
    unirest.put(url)
      .headers({'Accept':'application/json',
                'Content-Type':'application/json'})
      .encoding('utf-8')
      .send(req.body)
      .end(function(response) {
        app.log.info("Received response");
        if(response.error) {
          app.log.error(response.error);
          res.status(400).send(response.error);
        }
        res.send(response.body);
      });
  });

  router.get('/budget/:id', function(req, res, next) {
    var url = util.format('http://%s:%s/api/budget/%s', config.proxy.pyprojects.host, config.proxy.pyprojects.port, req.params.id);
    unirest.get(url)
      .headers({'Accept':'application/json',
                'Content-Type':'application/json'})
      .encoding('utf-8')
      .query(req.query)
      .end(function(response) {
        app.log.info("Received response");
        if(response.error) {
          app.log.error(response.error);
          res.status(400).send(response.error);
        }
        res.send(response.body);
      });
  });
  
  return router;
}


