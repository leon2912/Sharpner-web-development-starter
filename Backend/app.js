const http = require('http');
const routes = require('./routes.js');
const server = http.createServer(routes.reqHandler);
server.listen(4000);

