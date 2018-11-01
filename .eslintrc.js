module.exports = {
    "extends": "airbnb-base",
	plugins:["import"],
	"rules":{
		"no-console":"off",
		"import/mewline-after-import":"off",
		"no-unused-vars":0,
		"max-len":0,
		"linebreak-style": 0
	},
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"mocha": true
	  },
	"ecmaFeatures": {
		"arrowFunctions": true,
		"binaryLiterals": true,
		"blockBindings": true,
		"classes": true,
		"defaultParams": true,
		"destructuring": true,
		"forOf": true,
		"generators": true,
		"modules": true,
		"objectLiteralComputedProperties": true,
		"objectLiteralDuplicateProperties": true,
		"objectLiteralShorthandMethods": true,
		"objectLiteralShorthandProperties": true,
		"octalLiterals": true,
		"regexUFlag": true,
		"regexYFlag": true,
		"spread": true,
		"superInFunctions": true,
		"templateStrings": true,
		"unicodeCodePointEscapes": true,
		"globalReturn": true,
		"jsx": true
	  },
};