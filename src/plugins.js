//plugin manager

var plugins = []

function registerPlugin(p){
	plugins.push(p)
}

function executeAll(metadata){
	var result = metadata
	plugins.map((p)=>{
		result = p.execute(result)
	})
}

function init(){
	plugins = []
	plugins.push(require('./plugin/amd2commons'))
}

// init()

module.exports = {registerPlugin, executeAll, init}