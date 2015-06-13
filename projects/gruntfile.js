'use strict';
 
module.exports = function(grunt) {
  var _ = require('underscore');
  // Project Configuration
  var assets = grunt.file.readJSON('assets.json');
  grunt.initConfig({
    assets: assets,
    jade: {
      compile: {
        options: {
          data: {
            debug: true
          },
          client: true,
          processName: function(filename) {
            var templateRoot = 'public/javascripts/partials/';
            return filename.split(templateRoot)[1];
          }
        },
        files: (function() {
          var o = {};
          _.each(assets, function(value, key) {
            _.each(value.jade, function(value, key) {
              o[key] = value;
            });
          });
          return o;
        })()
      }
    },
    uglify: {
      main: {
        options: {
          mangle: true,
          compress: true
        },
        files: (function() {
          var o = {};
          _.each(assets, function(value, key) {
            _.each(value.js, function(value, key) {
              o[key] = value;
            });
          });
          return o;
        })()
      }
    },
    cssmin: {
      main: {
        files: (function() {
          var o = {};
          _.each(assets, function(value, key) {
            _.each(value.css, function(value, key) {
              o[key] = value;
            });
          });
          return o;
        })()
      }
    },
    watch: {
      partials: {
        files: ['assets.json', 'gruntfile.js', 'public/javascripts/partials/*.jade'],
        tasks: ['jade'],
        options: {
        }
      }
    },
    prompt: {
      createController: {
        options: {
          questions: [
            {
              config: "createController.options.name",
              message: "What's the name of the controller",
              type: "input",
              default: "Example.js"
            }
          ]
        }
      },
      createView: {
        options: {
          questions: [
            {
              config: "createView.options.name",
              message: "What's the name of the view?",
              type: "input",
              default: "ExampleView.js"
            },
            {
              config: "createView.options.templateName",
              message: "What's the name of the template?",
              type: "input",
              default: undefined
            }
          ]
        }
      },
      createModel: {
        options: {
          questions: [
            {
              config: "createModel.options.name",
              message: "What's the name of the model?",
              type: "input",
              default: "ExampleModel.js"
            }
          ]
        }
      }
    },
    createController: {
      options: {
        name: "Example.js",
        directory: "public/javascripts/controllers/",
        template: "grunt-templates/controller.js"
      }
    },
    createView: {
      options: {
        name: "ExampleView.js",
        directory: "public/javascripts/views/",
        templateDir: "public/javascripts/partials/",
        template: "grunt-templates/view.js"
      }
    },
    createModel: {
      options: {
        name: "ExampleModel.js",
        directory: "public/javascripts/models/",
        template: "grunt-templates/model.js"
      }
    }
  });
 
  //Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  //Making grunt default to force in order not to break the project.
  grunt.option('force', true);
 
  //Default task(s).
  grunt.registerTask('default', ['jade', 'cssmin', 'uglify']);
  grunt.registerTask('createController', 'Creates a controller', function() {
    var path = grunt.config('createController.options.directory') + grunt.config('createController.options.name');
    var _ = require('underscore');
    var template = grunt.file.read(grunt.config('createController.options.template'));
    var output = _.template(template)({
      filepath: path
    });
    grunt.file.write(path, output);
    grunt.log.ok("Created " + path);
  });

  grunt.registerTask('controller', ['prompt:createController', 'createController']);

 
  grunt.registerTask('createView', 'Creates a view', function() {
    var path = grunt.config('createView.options.directory') + grunt.config('createView.options.name');
    var _ = require('underscore');
    var template = grunt.file.read(grunt.config('createView.options.template'));
    var regx = /([A-Za-z]+View)(\.js)/g;
    var regxArray = regx.exec(grunt.config('createView.options.name'));
    var templateName = grunt.config('createView.options.templateName');
    if(regxArray.length < 3) {
      grunt.log.error("Invalid view name, must end in 'View.js'");
      return;
    }
    var output = _.template(template)({
      filepath: path,
      templateName: templateName,
      viewName: regxArray[1]
    });
    grunt.file.write(path, output);
    grunt.log.ok("Created " + path);

    if(!_.isUndefined(templateName) && templateName != "") {
      var templatePath = grunt.config('createView.options.templateDir') + templateName;
      grunt.file.write(templatePath, "p This is a partial\n");
      grunt.log.ok("Created " + templatePath);
    }
  });
  grunt.registerTask('view', ['prompt:createView', 'createView']);

  grunt.registerTask('createModel', 'Creates a model', function() {
    var path = grunt.config('createModel.options.directory') + grunt.config('createModel.options.name');
    var _ = require('underscore');
    var template = grunt.file.read(grunt.config('createModel.options.template'));
    var regx = /([A-Za-z]+)(Model\.js)/g;
    var regxArray = regx.exec(grunt.config('createModel.options.name'));
    if(regxArray.length < 3) {
      grunt.log.error("Invalid model name, must end in 'Model.js'");
      return;
    }

    var output = _.template(template)({
      filepath: path,
      modelName: regxArray[1] + 'Model',
      collectionName: regxArray[1] + 'Collection'
    });

    grunt.file.write(path, output);
    grunt.log.ok("Created " + path);
  });
  grunt.registerTask('model', ['prompt:createModel', 'createModel']);
};
