const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/index': htmlHandler.getIndex,
    '/style.css': htmlHandler.getIndexCSS,
    '/notFound': htmlHandler.getNotFound,
    '/notFound.css': htmlHandler.getNotFoundCSS,
    '/bulma.css': htmlHandler.getBulma,
    '/error.jpeg': mediaHandler.getErrorMeme,
    '/getAll': jsonHandler.getAll,
  },
  HEAD: {

  },
  POST: {

  },
};

// const parseBody = (request, response, handler) => {
//   const body = [];

//   request.on('error', (err) => {
//     console.dir(err);

//     response.statusCode = 400;
//     response.end();
//   });

//   request.on('data', (chunk) => {
//     body.push(chunk);
//   });

//   request.on('end', () => {
//     // application/x-www-form-urlencoded
//     const bodyString = Buffer.concat(body).toString();
//     const bodyParams = JSON.parse(bodyString);

//     // console.log(bodyParams);
//     handler(request, response, bodyParams);
//   });
// };

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // const parsedUrl = new URL(`www.example.com${request.url}`);
  //   console.log(parsedUrl);

  const method = urlStruct[request.method];
  const handler = method[parsedUrl.pathname];

  //   if (request.method === 'POST') {

  //   } else
  if (handler) {
    handler(request, response);
  } else {
    urlStruct.GET['/notFound'](request, response);
  }

  // urlStruct['/'](request, response);
};

http.createServer(onRequest).listen(port, () => {
  //   console.log(`Listening on 127.0.0.1: ${port}`);
});
