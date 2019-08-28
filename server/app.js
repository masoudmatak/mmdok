var Express = require("express");
var Multer = require("multer");
var Minio = require("minio");
var app = Express();

var minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: '5KJ9URBASB7N0PR4L2P6',
    secretKey: 'm9emLlQYLHatBTOiK9MBqhz4iitPrxb0QKrqMoia'
});

app.post("/upload", Multer({ storage: Multer.memoryStorage() }).single("upload"), function (request, response) {
    minioClient.putObject(request.body.bucket, request.file.originalname, request.file.buffer, function (error, etag) {
        if (error) {
            return console.log(error);
        }
        response.send('File uploaded');
    });
});

app.get("/download", function (request, response) {
    minioClient.getObject(request.query.bucket, request.query.filename, function (error, stream) {
        if (error) {
            return response.status(500).send(error);
        }
        let suffix = request.query.filename.split('.').pop();
        if (suffix === 'pdf'){
               response.setHeader('Content-disposition', 'inline; filename="' + request.query.filename + '"');
               response.setHeader('Content-type', 'application/pdf');
        }
        stream.pipe(response);
    });
   
});

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
