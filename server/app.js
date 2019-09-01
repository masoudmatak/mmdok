const Express = require("express");
const Multer = require("multer");
const Minio = require("minio");
const MongoClient = require('mongodb').MongoClient;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const uuid = require('uuid/v1');
const url = "mongodb://localhost:27017/";
const COLLECTION = "metadata";

const app = Express();

var minioClient = new Minio.Client({
	endPoint: 'localhost',
	port: 9000,
	useSSL: false,
	accessKey: '5KJ9URBASB7N0PR4L2P6',
	secretKey: 'm9emLlQYLHatBTOiK9MBqhz4iitPrxb0QKrqMoia'
});

app.post("/upload", Multer({ storage: Multer.memoryStorage() }).single("upload"), function (request, response) {
	minioClient.putObject(request.body.bucket, request.file.originalname, request.file.buffer, function(error, etag) {
		if (error) {
			return console.log(error);
		}
		let metadata = JSON.parse(request.body.metadata);
		metadata['bucket'] = request.body.bucket;
		metadata['name'] = request.file.originalname;
		metadata['_id'] = uuid();
		console.log(metadata);
		insertMetadata(metadata);
		response.send(metadata['_id']);
	});
});

app.post("/document", Multer({ storage: Multer.memoryStorage() }).single("upload"), function (request, response) {
	minioClient.putObject(request.body.bucket, request.file.originalname, request.file.buffer)
	.then(() => MongoClient.connect(url))
	.then(client => client.db("mmdok").collection("metadata"))
	.then(c => { c.insertOne({ _id: uuid(), name: request.file.originalname, bucket: request.body.bucket }); console.log(_id); return _id; })
	.then(id => { console.log("HEJ!!!!!!!!!!"); console.log(id); response.send(id); } )
	.catch( error => response.status(500).send(error) )
});

app.get("/document"), function(request, response){
	MongoClient.connect(url)
	.then(client => client.db("mmdok").collection("metadata"))
	.then(c => c.findOne({ _id: request.query.id }))
	.then((metadata) => {
		minioClient.getObject(metadata.bucket, metadata.name, function (error, stream) {
			if (error) {
				return response.status(500).send(error);
			}
			let suffix = metadata.name.split('.').pop();
			if (suffix === 'pdf') {
				response.setHeader('Content-disposition', 'inline; filename="' + metadata.name + '"');
				response.setHeader('Content-type', 'application/pdf');
			}
			stream.pipe(response);		
		    });
		});	 
}

app.get("/download", function (request, response) {
	var error;
	getMetadata(request.query.id, function (error, metadata) {
		if (error) {
			console.log(err);
			response.send("No such id");
		}

		if (metadata) {
			console.log('account exists');
			console.dir(metadata);
			minioClient.getObject(metadata.bucket, metadata.name, function (error, stream) {
				if (error) {
					return response.status(500).send(error);
				}
				let suffix = metadata.name.split('.').pop();
				if (suffix === 'pdf') {
					response.setHeader('Content-disposition', 'inline; filename="' + metadata.name + '"');
					response.setHeader('Content-type', 'application/pdf');
				}
				stream.pipe(response);
			});

		} else {
			console.log('good to go');
			response.send("No metadata");
		}

	});

});

function insertMetadata(metadata) {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("mmdok");
		dbo.collection("metadata").insertOne(metadata, function (err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			db.close();
		});
	});
}

var getMetadata = function (id, callback) {
	MongoClient.connect(url, function (err, db) {
		let query = { _id: id };
		console.log(query);
		if (err) throw err;
		var dbo = db.db("mmdok");
		dbo.collection('metadata').findOne(query, function (err, doc) {
			db.close();
			if (err) {
				callback(err);
			}
			else {
				callback(null, doc);
			}
		});
	});
}

var server = app.listen(3000, function () {
	console.log("Listening on port %s...", server.address().port);
});
