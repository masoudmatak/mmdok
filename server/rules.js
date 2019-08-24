var R = require('json-logic-js')
var FS = require('fs')

const operations = {
    READ: 'read',
    WRITE: 'write'
}

var match = function(list1, list2){ 
	var match = false;
	for (x of list1) {
		if (list2.indexOf(x) > -1){
			match = true;
			break;
		}
	  }
	return match;
};
R.add_operation("match", match);

var permissions = {
	"or": [{
		"and": [{
				"==": [{
					"var": "source"
				}, "G90"]
			},
			{
				"match": [{
					"var": "groups"
				}, ["Kundservice", "KOReadGroup"]]
			},
			{
				"==": [{
					"var": "operation"
				}, "read"]
			}
		]
	}, {
		"and": [{
				"==": [{
					"var": "source"
				}, "G90"]
			},
			{
				"match": [{
					"var": "groups"
				}, ["KOWriteGroup"]]
			},
			{
				"==": [{
					"var": "operation"
				}, "write"]
			}
		]
	}]
}
 
function isAuthorised(metadata, operation, groups){
	let content = FS.readFileSync('config/permissions/g90.json');
	let perms = JSON.parse(content);
	metadata["operation"] = operation;
    metadata["groups"] = groups;
    return R.apply(perms, metadata);
}

//TEST:
let metadataOK = { "customerid" : "XYZ123456", "source" : "G90", "sourceid" : "1"};
let metadataKO = { "customerid" : "XYZ123456", "source" : "G91", "sourceid" : "2"};

let result1 = isAuthorised(metadataOK, operations.READ, ["Kundservice"]);
let result2 = isAuthorised(metadataKO, operations.READ, ["Kundservice"]);
let result3 = isAuthorised(metadataOK, operations.WRITE, ["Kundservice"]);

console.log(result1);
console.log(result2);
console.log(result3);

module.exports = {isAuthorised, operations};
