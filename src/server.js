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
    '/error.jpeg': mediaHandler.getErrorMeme,
    '/notFound': htmlHandler.getNotFound,
    '/getAll': jsonHandler.getAll,
  },
  HEAD: {

  },
  POST: {

  },
};

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
