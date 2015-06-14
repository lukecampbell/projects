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
            },
            {
              config: "createController.options.component",
              message: "What's the component name to add this controller to?",
              type: "input",
              default: undefined
            },
            {
              config: "createController.options.git",
              message: "Should we add this to your git index?",
              type: "confirm",
              default: "Yes"
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
            },
            {
              config: "createView.options.component",
              message: "What's the component name to add this view to?",
              type: "input",
              default: undefined
            },
            {
              config: "createView.options.git",
              message: "Should we add this to your git index?",
              type: "confirm",
              default: "Yes"
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
            },
            {
              config: "createModel.options.component",
              message: "What's the component name to add this model to?",
              type: "input",
              default: undefined
            },
            {
              config: "createModel.options.git",
              message: "Should we add this to your git index?",
              type: "confirm",
              default: "Yes"
            }
          ]
        }
      },
      createTemplate: {
        options: {
          questions: [
            {
              config: "createTemplate.options.name",
              message: "What's the name of the template?",
              type: "input",
              default: "example.jade"
            },
            {
              config: "createTemplate.options.git",
              message: "Should we add this to your git index?",
              type: "confirm",
              default: "Yes"
            }
          ]
        }
      },
      createStylesheet: {
        options: {
          questions: [
            {
              config: "createStylesheet.options.name",
              message: "What's the name of the stylesheet?",
              type: "input",
              default: "example.css"
            },
            {
              config: "createStylesheet.options.component",
              message: "What's the component name to add this stylesheet to?",
              type: "input",
              default: undefined
            },
            {
              config: "createStylesheet.options.git",
              message: "Should we add this to your git index?",
              type: "confirm",
              default: "Yes"
            }
          ]
        }
      }
    },
    createController: {
      options: {
        name: "Example.js",
        directory: "public/javascripts/controllers/",
        template: "grunt-templates/controller.js",
        git: true
      }
    },
    createView: {
      options: {
        name: "ExampleView.js",
        directory: "public/javascripts/views/",
        templateDir: "public/javascripts/partials/",
        template: "grunt-templates/view.js",
        git: true
      }
    },
    createModel: {
      options: {
        name: "ExampleModel.js",
        directory: "public/javascripts/models/",
        template: "grunt-templates/model.js",
        git: true
      }
    },
    createTemplate: {
      options: {
        name: "example.jade",
        directory: "templates/",
        template: "grunt-templates/template.jade",
        git: true
      }
    },
    createStylesheet: {
      options: {
        name: "example.css",
        directory: "public/stylesheets/",
        template: "grunt-templates/stylesheet.css",
        git: true
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
    var shell = require('shelljs');
    var template = grunt.file.read(grunt.config('createController.options.template'));
    var componentName = grunt.config('createController.options.component');
    var output = _.template(template)({
      filepath: path
    });
    grunt.file.write(path, output);
    grunt.log.ok("Created " + path);
    if(grunt.config('createController.options.git')) {
      shell.exec('git add ' + path);
      grunt.log.ok("Added to git");
    }
    if(!_.isUndefined(componentName) && componentName != "") {
      var component = assets[componentName];
      if(_.isUndefined(component)) {
        grunt.log.error("Undefined component", componentName);
        return;
      }
      _.each(component.js, function(value, key) {
        if(key.indexOf('controllers') > 0) {
          component.js[key].push(path);
        }
      });
      grunt.file.write('assets.json', JSON.stringify(assets, null, 4));
      grunt.log.ok("Added to component " + componentName);
      if(grunt.config('createController.options.git')) {
        shell.exec('git add assets.json');
        grunt.log.ok("Added assets.json to git");
      }
    }
  });

  grunt.registerTask('controller', ['prompt:createController', 'createController']);

 
  grunt.registerTask('createView', 'Creates a view', function() {
    var path = grunt.config('createView.options.directory') + grunt.config('createView.options.name');
    var _ = require('underscore');
    var template = grunt.file.read(grunt.config('createView.options.template'));
    var regx = /([A-Za-z]+View)(\.js)/g;
    var regxArray = regx.exec(grunt.config('createView.options.name'));
    var templateName = grunt.config('createView.options.templateName');
    var componentName = grunt.config('createView.options.component');
    var shell = require('shelljs');
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
    if(grunt.config('createView.options.git')) {
      shell.exec('git add ' + path);
      grunt.log.ok("Added to git");
    }
    if(!_.isUndefined(componentName) && componentName != "") {
      var component = assets[componentName];
      if(_.isUndefined(component)) {
        grunt.log.error("Undefined component", componentName);
        return;
      }
      _.each(component.js, function(value, key) {
        if(key.indexOf('views') > 0) {
          component.js[key].push(path);
        }
      });
      grunt.file.write('assets.json', JSON.stringify(assets, null, 4));
      grunt.log.ok("Added to component " + componentName);
      if(grunt.config('createModel.options.git')) {
        shell.exec('git add assets.json');
        grunt.log.ok("Added assets.json to git");
      }
    }

    if(!_.isUndefined(templateName) && templateName != "") {
      var templatePath = grunt.config('createView.options.templateDir') + templateName;
      grunt.file.write(templatePath, "p This is a partial\n");
      grunt.log.ok("Created " + templatePath);
      if(grunt.config('createView.options.git')) {
        shell.exec('git add ' + templatePath);
        grunt.log.ok("Added template to git");
      }
      if(!_.isUndefined(componentName) && componentName != "") {
        var component = assets[componentName];
        if(_.isUndefined(component)) {
          grunt.log.error("Undefined component", componentName);
          return;
        }
        _.each(component.jade, function(value, key) {
          if(key.indexOf(componentName) > 0) {
            component.jade[key].push(templatePath);
          }
        });
        grunt.file.write('assets.json', JSON.stringify(assets, null, 4));
        grunt.log.ok("Added to component " + componentName);
        if(grunt.config('createView.options.git')) {
          shell.exec('git add assets.json');
          grunt.log.ok("Added assets.json to git");
        }
      }
    }
  });
  grunt.registerTask('view', ['prompt:createView', 'createView']);

  grunt.registerTask('createModel', 'Creates a model', function() {
    var path = grunt.config('createModel.options.directory') + grunt.config('createModel.options.name');
    var _ = require('underscore');
    var shell = require('shelljs');
    var template = grunt.file.read(grunt.config('createModel.options.template'));
    var regx = /([A-Za-z]+)(Model\.js)/g;
    var regxArray = regx.exec(grunt.config('createModel.options.name'));
    var componentName = grunt.config('createModel.options.component');
    if(regxArray == null || regxArray.length < 3) {
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
    if(grunt.config('createModel.options.git')) {
      shell.exec('git add ' + path);
      grunt.log.ok("Added to git");
    }
    if(!_.isUndefined(componentName) && componentName != "") {
      var component = assets[componentName];
      if(_.isUndefined(component)) {
        grunt.log.error("Undefined component", componentName);
        return;
      }
      _.each(component.js, function(value, key) {
        if(key.indexOf('models') > 0) {
          component.js[key].push(path);
        }
      });
      grunt.file.write('assets.json', JSON.stringify(assets, null, 4));
      grunt.log.ok("Added to component " + componentName);
      if(grunt.config('createModel.options.git')) {
        shell.exec('git add assets.json');
        grunt.log.ok("Added assets.json to git");
      }
    }
  });
  grunt.registerTask('model', ['prompt:createModel', 'createModel']);

  grunt.registerTask('createTemplate', 'Creates a template file', function() {
    var path = grunt.config('createTemplate.options.directory') + grunt.config('createTemplate.options.name');
    var _ = require('underscore');
    var shell = require('shelljs');
    var template = grunt.file.read(grunt.config('createTemplate.options.template'));
    var regx = /([A-Za-z_]+)(\.jade)/g;
    var regxArray = regx.exec(grunt.config('createTemplate.options.name'));
    if(regxArray.length < 3) {
      grunt.log.error("Invalid model name, must end in '.jade'");
      return;
    }

    var output = _.template(template)({
      filepath: path,
      templateName: regxArray[1],
    });

    grunt.file.write(path, output);
    grunt.log.ok("Created " + path);
    if(grunt.config('createTemplate.options.git')) {
      shell.exec('git add ' + path);
      grunt.log.ok("Added to git");
    }
  });
  grunt.registerTask('template', ['prompt:createTemplate', 'createTemplate']);
  
  grunt.registerTask('createStylesheet', 'Creates a stylesheet', function() {
    var path = grunt.config('createStylesheet.options.directory') + grunt.config('createStylesheet.options.name');
    var _ = require('underscore');
    var shell = require('shelljs');
    var template = grunt.file.read(grunt.config('createStylesheet.options.template'));
    var regx = /([A-Za-z]+)(\.css)/g;
    var regxArray = regx.exec(grunt.config('createStylesheet.options.name'));
    var componentName = grunt.config('createStylesheet.options.component');
    if(regxArray.length < 3) {
      grunt.log.error("Invalid model name, must end in '.css'");
      return;
    }

    var output = _.template(template)({
      filepath: path,
      templateName: regxArray[1],
    });

    grunt.file.write(path, output);
    grunt.log.ok("Created " + path);
    if(grunt.config('createStylesheet.options.git')) {
      shell.exec('git add ' + path);
      grunt.log.ok("Added to git");
    }

    if(!_.isUndefined(componentName) && componentName != "") {
      var component = assets[componentName];
      if(_.isUndefined(component)) {
        grunt.log.error("Undefined component", componentName);
        return;
      }
      _.each(component.css, function(value, key) {
        if(key.indexOf(componentName) > 0) {
          component.css[key].push(path);
        }
      });
      grunt.file.write('assets.json', JSON.stringify(assets, null, 4));
      grunt.log.ok("Added to component " + componentName);
      if(grunt.config('createStylesheet.options.git')) {
        shell.exec('git add assets.json');
        grunt.log.ok("Added assets.json to git");
      }
    }
  });
  grunt.registerTask('stylesheet', ['prompt:createStylesheet', 'createStylesheet']);
};
