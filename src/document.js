// this accepts many files - metadaa is in general generated for several amd classes - this models a 
// document object with several modules each of them parsed with ./parse

var parse = require('./parse').parse
function addFile(document, fileName, fileContents){
	var parsed = parse(fileContents, fileName)
	document.parsed = document.parsed || []
	document.parsed.push(parsed)
}
function newDocument(){
	return {}
}
function printDocument(document){
	return JSON.stringify(document, 0, 2)
}


module.exports = {addFile, newDocument, printDocument}