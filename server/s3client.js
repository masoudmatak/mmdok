'use strict';
var AWS = require('aws-sdk');

class S3 {

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: 'admin',
            secretAccessKey: 'brommasodermalm',
            endpoint: 'http://127.0.0.1:9000',
            s3ForcePathStyle: true, // needed with minio?
            signatureVersion: 'v4'
        });
    }

    put(bucket, file, buffer, mimetype) {
        console.log("In s3put");
        let params = { Bucket: bucket, Key: file, Body: buffer };
        return this.s3.putObject(params).promise();
    }

    get(bucket, file) {
        var content = "";
        let params = { Bucket: bucket, Key: file };
        return this.s3.getObject(params).promise();
        //    .on('httpData', function(chunk) { content += chunk; })
        //    .on('httpDone', function() { console.log("Done"); })
        //    .send();
        // console.log(content);
        // return new Promise( (resolve, reject) => { resolve(content); } );
    }

    streamToString(stream) {
        console.log(stream);
        const chunks = []
        return new Promise((resolve, reject) => {
            stream.on('data', chunk => chunks.push(chunk))
            stream.on('error', reject)
            stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
        });
    }
}

module.exports = S3;

