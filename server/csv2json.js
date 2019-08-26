const csvFilePath='config/permissions/permissions.csv'
const csv=require('csvtojson')
var json = "";
csv({delimiter:':'})
 .fromFile(csvFilePath)
 .then((json)=>{
	 json.forEach(o => {
		 let source = o['Source'];
		 let operation = o['Operation'];
		 let groups = JSON.stringify(o['Groups'].split(','));
		 json = getRule(source, operation, groups);
		 if (json == "") { }
	     });
     });

function getRule(source, operation, groups){
    return '{ "and": [{ "==": [{ "var": "source" }, "' + source + 
	'"]}, {"match": [ {"var": "groups"}, ' + groups + '] }, {"==": [{"var": "operation"}, "' + operation + '"]}] }';
	
}

/*
{ "and": [{ "==": [{ "var": "source" }, "G90"]}, {"match": [ {"var": "groups"}, ["Kundservice", "KOReadGroup"]] }, {"==": [{"var": "operation"}, "read"]}] }
{ "and": [{ "==": [{ "var": "source" }, "G90"]}, {"match": [ {"var": "groups"}, ["G90ReadGroup","Kundservice"]] }, {"==": [{"var": "operation"}, "read"]}] }
*/