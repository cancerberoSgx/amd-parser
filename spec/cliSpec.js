var fs = require('fs')
var sh = require('shelljs')
sh.config.silent = true

var exec = require('./exec')

function testProject1Metadata(m){
	expect(!!m.parsed.find((p)=>p.name=='a')).toBe(true)
}

describe('amd-parser cli', ()=>{

	var cmd, p, m
	it('no --output dumps json to stdout', ()=>{
		cmd = 'node src/cli --input "test-files/project1/**/*.js"'
		p = sh.exec(cmd) 
		expect(p.code).toBe(0)
		m = JSON.parse(p.stdout)
		testProject1Metadata(m)
	})

	it('--output dumps json to fs', ()=>{
		var out='test-files/amd-metadata.json'
		cmd+=' --output '+out
		p = sh.exec(cmd) 
		expect(p.code).toBe(0)
		m = JSON.parse(fs.readFileSync(out).toString())
		testProject1Metadata(m)
	})
})