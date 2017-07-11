// this module is not meant to be required() is meant to be executed from cmd line !

var args = require('yargs').argv
var glob = require('glob').sync
var fs = require('fs')

var config = {
	input: args.input, 
	output: args.output
}

var addFile = require('./document').addFile
var newDocument = require('./document').newDocument
var printDocument = require('./document').printDocument

function main(config) {

	checkUsage()
	var document = newDocument()
	glob(config.input).map((f)=>{
		var content = fs.readFileSync(f).toString()
		addFile(document, f, content)
	})

	if(args.output){
		fs.writeFileSync(args.output, printDocument(document))
	}
	else {
		console.log(printDocument(document))
	}
}


function checkUsage(){

	if(!args.input){
		console.log(`
Incorrect usage. Examples: 

Generate metadata of given .js files :

    node src/cli --input "test-files/project1/**/*.js" --output "test-files/amd-metadata.json"

Print dependency metadata of Address.Model module (not implemented yet):

    node src/cli --input amd-metadata.json --main "AddressModel" 

Generate a amd bundle file from metadata from 'AddressModel' entry point (not implemented yet):

    node src/cli --input amd-metadata.json --main "AddressModel" --output bundle.js
		`)
		process.exit(1)
	}
}

// MAIN CALL !
main(config)  // !