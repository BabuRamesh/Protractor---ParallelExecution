// An example configuration file.
var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome'
  	},
  
onPrepare: function() {
	  
    // The require statement must be down here, since jasmine-reporters
    // needs jasmine to be in the global and protractor does not guarantee
    // this until inside the onPrepare function.
    
    jasmine.getEnv().addReporter(
      new HtmlReporter({
	  baseDirectory:'screenshots'}));
	   console.log("done");
  },
  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['../Specs/Ancestry_Smoke_spec.js','../Specs/Add_Assessment_MutilpeChoice.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
   
	  
	showColors: true,
    defaultTimeoutInterval: 30000,
	isVerbose: false,
	includeStackTrace: false,
  }
  
};
