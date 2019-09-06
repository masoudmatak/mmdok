'use strict';
const Express = require("express");
const Multer = require("multer");
const Minio = require("minio");
const MongoConnector = require("./database");
const S3 = require("./s3client");
const uuid = require('uuid/v1');
const url = "mongodb://localhost:27017/";
const COLLECTION = "metadata";
const s3 = new S3();
const db = new MongoConnector();
const app = Express();

app.post("/document", Multer({ storage: Multer.memoryStorage() }).single("upload"), function (request, response) {
	let id = uuid();
	db.connect()
		.then(() => { db.put({ _id: uuid(), name: request.file.originalname, bucket: request.body.bucket }); })
		.then(() => { s3.put(request.body.bucket, request.file.originalname, request.file.buffer); })
		.then(() => { response.send(id); })
		.catch((error) => { console.log(error); response.status(500).send(error); });
	//minioClient.putObject(request.body.bucket, request.file.originalname, request.file.buffer)
	/*.then(() => MongoClient.connect(url)
.then(client => client.db("mmdok").collection("metadata"))
.then(c => { c.insertOne({ _id: uuid(), name: request.file.originalname, bucket: request.body.bucket }); console.log(_id); return _id; })
.then(id => { console.log("HEJ!!!!!!!!!!"); console.log(id); response.send(id); } )
.catch( error => response.status(500).send(error) ) */
});

app.get("/document"), function (request, response) {
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



var server = app.listen(3000, function () {
	console.log("Listening on port %s...", server.address().port);
});

console.log("Done");