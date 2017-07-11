var esprima = require('esprima')
var assert = require('assert')

// if no name is given in the define() declaration we will use given defaultModuleName and if none we will generate a random one.
function parse(str, defaultModuleName){
	var ast = esprima.parse(str)
	var defineExpr = findDefineExpression(ast)
	var defineHasName = defineExpr.expression.arguments[0].type=='Literal'

	var name
	if(defineHasName){
		name = defineExpr.expression.arguments[0].value
	}
	else if(defaultModuleName)
	{
		name = defaultModuleName
	}
	else
	{
		'autogenerated_'+new Date().getTime()
	}

	var dependencies = [], 
		depsArg = defineHasName ? defineExpr.expression.arguments[1] : defineExpr.expression.arguments[0]
	assert.equal(depsArg.type=='ArrayExpression', true, 'require dependencies node is ArrayExpression')

	dependencies = depsArg.elements.map((e)=>e.value)

	var callbackArguments = [] // TODO

	var body = ''// TODO

	var parsed = {name, dependencies, callbackArguments, body}
	return parsed
}

function findDefineExpression(ast){
	//return first define() function call expression (root level)
	return ast.body.find((s) => s.type=='ExpressionStatement' && 
		s.expression.type=='CallExpression' && 
		s.expression.callee.name=='define'
	)
}
module.exports = {parse}