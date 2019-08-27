
class Csv2Json {
	getRules() {
		const csvFilePath = 'config/permissions/permissions.csv'
		const csv = require('csvtojson')


		csv({ delimiter: ':' })
			.fromFile(csvFilePath)
			.then((json) => {
				var s = '{"or": [';
				json.forEach((o, i) => {
					if (i > 0) s += ',';
					let source = o['Source'];
					let operation = o['Operation'];
					let groups = JSON.stringify(o['Groups'].split(','));
					s += this.getRule(source, operation, groups);
				})
				s += ']}';
				console.log(s);
			});

	}

	getRule(source, operation, groups) {
		return '{ "and": [{ "==": [{ "var": "source" }, "' + source +
			'"]}, {"match": [ {"var": "groups"}, ' + groups + '] }, {"==": [{"var": "operation"}, "' + operation + '"]}] }';

	}
}
new Csv2Json().getRules();
