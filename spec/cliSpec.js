
var sh = require('shelljs')
sh.config.silent = true

var exec = require('./exec')

describe('no --output dumps json in stdout', ()=>{
	it('1', ()=>{
		var p = sh.exec('node src/cli --input "test-files/project1/**/*.js"') 
		expect(p.code).toBe(0)
		var m = JSON.parse(p.stdout)
		expect(!!m.parsed.find((p)=>p.name=='a')).toBe(true)
	})
})