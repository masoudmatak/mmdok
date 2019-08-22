var R = require('json-logic-js')

const operations = {
    READ: 'read',
    WRITE: 'write'
}

var inlist = function(element, list){ 
    return list.indexOf(element) > -1;
};
R.add_operation("inlist", inlist);

var permissions = {
	"or": [{
		"and": [{
				"==": [{
					"var": "source"
				}, "G90"]
			},
			{
				"inlist": [{
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
				"inlist": [{
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
    metadata["operation"] = operation;
    metadata["groups"] = groups;
    return R.apply(permissions, metadata);
}

//TEST:
let metadataOK = { "customerid" : "XYZ123456", "source" : "G90", "sourceid" : "1"};
let metadataKO = { "customerid" : "XYZ123456", "source" : "G91", "sourceid" : "2"};

let result1 = isAuthorised(metadataOK, operations.READ, "Kundservice");
let result2 = isAuthorised(metadataKO, operations.READ, "Kundservice");
let result3 = isAuthorised(metadataOK, operations.WRITE, "Kundservice");

console.log(result1);
console.log(result2);
console.log(result3);

module.exports = {isAuthorised, operations};

