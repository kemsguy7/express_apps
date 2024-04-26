const http = require('http');

const routes = require('./routes');
const path = require('path')

//const server = http.createServer(routes);

const server = http.createServer(routes.handler); //aceessing the handler function when using routes

server.listen(3000);

