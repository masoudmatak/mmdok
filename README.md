Installera med: 
$ npm install

Testa med t.ex.

$ curl -X POST -H 'content-type: multipart/form-data' -F 'bucket=test' -F upload=@/tmp/hejhopp.txt http://localhost:3000/upload

$ curl -X GET  'http://localhost:3000/download?filename=hejhopp.txt&bucket=test'
