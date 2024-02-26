const http = require('http');
const query = require('querystring');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Struct that holds the function to run according to the path
const urlStruct = {
  GET: {
    // HTML pages
    '/': htmlHandler.getIndex,
    '/index': htmlHandler.getIndex,
    '/notFound': htmlHandler.getNotFound,

    // CSS files
    '/bulma.css': htmlHandler.getBulma,
    '/style.css': htmlHandler.getIndexCSS,
    '/notFound.css': htmlHandler.getNotFoundCSS,

    // Javascript files
    '/requests.js': htmlHandler.getRequestsJS,
    '/prompts.js': htmlHandler.getPromptsJS,

    // JSON or Firebase Requests
    '/getAll': jsonHandler.getAll,
    '/getUser': jsonHandler.getUser, //
    // '/getPrompts': jsonHandler.,//
    // '/getPrompt': , //

    // Other files
    '/error.jpeg': mediaHandler.getErrorMeme,
  },
  HEAD: {
    '/getUser': jsonHandler.getUserHEAD, //
    // '/getPrompts': jsonHandler.,//

  },
  POST: {
    '/addUser': jsonHandler.addUser, // 201 with 400 if user exists
    '/addPrompt': jsonHandler.addPrompt, // 201 with 400 if not all parameters given
    // '/addAnswer': , // 201 with 400 if prompt does not exist
  },
};

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);

    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    // application/x-www-form-urlencoded
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = JSON.parse(bodyString);

    // console.log(bodyParams);
    handler(request, response, bodyParams);
  });
};

/**
 * Handles all requests that come in and routes them
 * @param {*} request
 * @param {*} response
 */
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // const parsedUrl = new URL(`www.example.com${request.url}`);
  //   console.log(parsedUrl);
  // console.log(parsedUrl.pathname);

  const method = urlStruct[request.method];
  const handler = method[parsedUrl.pathname];
  const params = query.parse(parsedUrl.query);

  if (request.method === 'POST') {
    parseBody(request, response, handler);
  } else if (handler) {
    handler(request, response, params);
  } else {
    urlStruct.GET['/notFound'](request, response);
  }

  // urlStruct['/'](request, response);
};

http.createServer(onRequest).listen(port, () => {
  //   console.log(`Listening on 127.0.0.1: ${port}`);
});
