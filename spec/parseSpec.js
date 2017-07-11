var parse = require('../src/parse').parse

describe('parse', ()=>{

	it('1', ()=>{

		var js = `
define('foo', ['dep1'], function(dep1){
	return 'foo'
})
		`
		var parsed = parse(js)
		expect(parsed.name).toBe('foo')
		expect(parsed.dependencies[0]).toBe('dep1')
		expect(parsed.body.indexOf('return \'foo\'')!=-1).toBe(true)
		// console.log(JSON.stringify(parsed, 0, 2))
	})
})