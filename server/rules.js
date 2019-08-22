var R = require('json-logic-js')

const operations = {
    READ: 'read',
    WRITE: 'write'
}

var inlist = function(element, list){ 
    return list.indexOf(element) > -1
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
					"var": "group"
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
					"var": "group"
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
 
function isAuthorised(metadata, operation, group){
    metadata["operation"] = operation;
    metadata["group"] = group;
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

module.exports = isAuthorised;
/*

var RuleEngine = require('node-rules');


var R = new RuleEngine();

var rule1 = {
    "condition": function (R) {
        R.when(this.group in {"Kundservice"});
    },
    "consequence": function (R) {
        this.result = false;
        this.reason = "CustomerId must be set";
        R.stop();
    }
};

var rule2 = {
    "condition": function (R) {
        R.when(this.customerid !== "/^[A-Z][3]$/");
    },
    "consequence": function (R) {
        this.result = false;
        this.reason = "CustomerId has wrong format";
        R.stop();
    }
};


R.register(rule1);
R.register(rule2);

const operations = {
    READ: 'read',
    WRITE: 'write'
}

var fact = {
    "customerid": "AC123436",
    "claimid": "FF12345",
    "operation": "read"
};


R.execute(fact, function (data) {
    if (data.result) {
        console.log("Valid transaction");
    } else {
        console.log("Blocked Reason:" + data.reason);
    }
});
*/