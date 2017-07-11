var addFile = require('../src/document').addFile
var newDocument = require('../src/document').newDocument
var printDocument = require('../src/document').printDocument


describe('parse', ()=>{

	it('1', ()=>{

		var files = [
		{
			name: 'foo', 
			content: `
define('foo', ['dep1'], function(dep1){
	return 'foo'
})
		`}, 

		{
			name: 'dep1', 
			content: `
define('dep1', [], function(){
	return 'foo'
})
		`}
		]

		var doc = newDocument()
		files.map((f)=>{
			addFile(doc, f.name, f.content)
		})
		var docStr = printDocument(doc)
		// expect(parsed.dependencies[0]).toBe('dep1')
		// expect(parsed.body.indexOf('return \'foo\'')!=-1).toBe(true)
		console.log(docStr)
	})
})