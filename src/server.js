const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  // grab the 'accept' headers (comma delimited) and split them into an array
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct[request.method].notFound(request, response, acceptedTypes, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
