// this module is not meant to be required() is meant to be executed from cmd line !

var args = require('yargs').argv
var glob = require('glob').sync
var fs = require('fs')
var plugins = require('./plugins')


var addFile = require('./document').addFile
var newDocument = require('./document').newDocument
var printDocument = require('./document').printDocument

function main(config) {

	checkUsage()
	plugins.init()

	var document = newDocument()
	glob(config.input).map((f)=>{
		var content = fs.readFileSync(f).toString()
		addFile(document, f, content)
	})

	// metadata is generated ! 
	// now we just delegates responsibility to a plugin or if no plugin then just write metadata somewhere

	if(config.plugin){ 
		var plugin = plugins.getPlugin(config.plugin)
		if(!plugin){
			console.log('plugin done exists: ', config.plugin, 'exiting.')
			process.exit(1)
		}
		plugin.execute(document)
	}
	else if(args.output){ //no plugin means print all metadata from source .js files 
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


var config = {
	input: args.input, 
	output: args.output,
	plugin: args.plugin
}
// MAIN CALL !
main(config)  // !