var express = require('express');
var unirest = require('unirest');
var util = require('util');
var router = express.Router();

module.exports = function(app) {

  /* GET /projects/ */
  router.get('/', function(req, res, next) {
    res.render('projects', {title: 'Projects'});
  });

  /* Render a page specific to a project */
  router.get('/:id', function(req, res, next) {
    // First we have to get the resource's id
    // This first makes sure that the resource exists,
    // and two, allows us to build custom title
    var url = util.format('http://%s:%s/api/project/%s', config.proxy.pyprojects.host, config.proxy.pyprojects.port, req.params.id);
    unirest.get(url)
      .headers({'Accept':'application/json;charset=utf-8',
                'Content-Type':'application/json;charset=utf-8'})
      .encoding('utf-8')
      .query(req.query)
      .end(function(response){
        if(response.error) {
          var err = new Error(response.error);
          err.status = response.status;
          next(err);
          return;
        }
        var projectID = response.body.id;
        res.render('project_page', {title: projectID});
      });
  });

  return router;

}
