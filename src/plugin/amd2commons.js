function amd2commons(metadata){
	console.log(metadata)
}

var plugin = {
	name: 'amd2commons',
	execute: function(metadata){
		return amd2commons(metadata)
	}
}
module.exports = plugin