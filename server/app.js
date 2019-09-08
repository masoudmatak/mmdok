'use strict';

const Express = require("express");
const Multer = require("multer");
const UUID = require('uuid/v1');
const MongoConnector = require("./database");
const S3 = require("./s3client");

const s3 = new S3();
const db = new MongoConnector();
const app = Express();

app.post("/document", Multer({ storage: Multer.memoryStorage() }).single("upload"), function (request, response) {
	let id = UUID();
	let metadata = Object.assign({ _id: id, name: request.file.originalname, bucket: request.body.bucket }, JSON.parse(request.body.metadata));
	db.put(metadata)
          .then(() => { s3.put(request.body.bucket, request.file.originalname, JSON.parse(request.file.buffer)); })
          .then(() => { response.send(id); })
          .catch((error) => { rollback(id); response.status(500).send(error.message); });
});

app.get("/document", function (request, response) {
	validateRequest(request);
	db.get({ _id: request.query.id })
		.then( metadata => setHeaders(response, metadata)) 
		.then( metadata => s3.get(metadata.bucket, metadata.name))
		.then( stream => stream.pipe(response))
		.catch( error => { response.status(500).send(error.message); }); 
});

function rollback(id) {
	// TODO
}

function validateRequest(request) {
	// TODO
}

function setHeaders(response, metadata){
	return new Promise((resolve) => { 
		response.setHeader('Content-disposition', 'inline; filename="' + metadata.name + '"');
		response.setHeader('Content-type', 'application/pdf');
		response.setHeader('metadata', metadata);
		resolve(metadata);
	});
}

var server = app.listen(3000, function () {
	console.log("Listening on port %s...", server.address().port);
});
