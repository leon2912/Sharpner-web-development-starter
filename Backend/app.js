const http = require('http');

const server = http.createServer((req,res)=>{console.log('leon')});

server.listen(4000);

