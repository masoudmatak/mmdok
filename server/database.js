'use strict';
const MongoClient = require('mongodb').MongoClient;
const uuid = require('uuid/v1');
//const CONNECTION_URL = "mongodb+srv://brommasodermalm:abgosht01@clustermmdok-rwvsj.gcp.mongodb.net/brommasodermalm?retryWrites=true&w=majority";
const CONNECTION_URL = "mongodb://localhost:27017";
class MongoConnector {

	connect() {
        const self = this;
        return  new Promise(function(resolve, reject) {
		MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
			console.log("Connected");
			if(error) {
			    reject(new Error("Could not connect"));
			}
			console.log("No error");
			let database = client.db("mmdok");
			self.collection = database.collection("metadata");
			resolve();
		    });
        });
    }

	put(json) {
        let collection = this.collection;
        return new Promise(function(resolve, reject) {
		console.log("in insert");
		collection.insertOne(json, (error, result) => {
			if(error) { console.log(error); reject(error); } ;
			console.log("resolve");
			resolve(result);
		    });
        });
    }

	get(json) {
	let collection = this.collection;
	return new Promise(function(resolve, reject) {
		console.log("in get");
		collection.findOne(json, (error, result) => {
			if(error) { reject(new Error("Could not get")); }
			resolve(result);
                    });
	});
    }
    
    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
}

module.exports = MongoConnector;
