
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //Protractor here is a grunt plug-in, which takes config file and selenium ports are params
    protractor:{
			 options:{
			         KeepAlive:true,
					 configFile:'Config/conf.js',
					 args:{browser:'chrome'}
					},

			singlerun:{},

			auto:{
			     keepAlive:true,
				 options:{
				       args:{
							seleniumPort:4444
					        }
						}
			},
            feature1:{
            	options:{
            		configFile:'./Parallel/Featurelist1.js',
            	}
            },
            feature2:{
            	options:{
            		configFile:'./Parallel/Featurelist2.js',
            	}
            }

   },
   //Shell is grunt plug-in which basically runs commands from console. two commands here we perform are download webdriver-manager and install all
   //it's dependencies and webdriverserver_launch launches webdriver server
   concurrent:{

	   dev: [
	                'protractor:feature1',
	                'protractor:feature2'
	              ]
   },
   shell:{
   options:{
			stdout:true
           },
		   protractor_install:{
							command: 'node ./node_modules/protractor/bin/webdriver-manager update'
							   },
		   webdriverserver_launch:{
			   				command: 'node ./node_modules/protractor/bin/webdriver-manager start'
		   						},
	       npm_install:{
		   command:'npm install'
		   }

   },
 //Grunt-open is another plug-in which opens html files on your favourite browsers
 open:{

  report:{
   path:'file:///C:/My Project/screenshots/reporter.html',
   app: 'chrome'
  }
 },

 //grunt-clean is another plug-in which deletes files or folders
 clean:["screenshots"],


    jshint:{
      files: ['gruntfile.js', 'Specs/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.registerTask('parallel',['clean','jshint','concurrent','open:report']);
  grunt.registerTask('linear',['clean','jshint','protractor:singlerun','open:report']);
  grunt.registerTask('install',['shell:npm_install','shell:protractor_install','shell:webdriverserver_launch']);
  grunt.registerTask('report',['open:report']);
};