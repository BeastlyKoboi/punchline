const fs = require('fs'); // pull in the file system module
const utils = require('./utils.js');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const indexCSS = fs.readFileSync(`${__dirname}/../client/style.css`);
const notFoundPage = fs.readFileSync(`${__dirname}/../client/notFound.html`);
const notFoundCSS = fs.readFileSync(`${__dirname}/../client/notFound.css`);
const bulma = fs.readFileSync(`${__dirname}/../node_modules/bulma/css/bulma.css`);

const getIndex = (request, response) => {
  utils.respond(request, response, 200, index, 'text/html');
};

const getIndexCSS = (request, response) => {
  utils.respond(request, response, 200, indexCSS, 'text/css');
};

const getNotFound = (request, response) => {
  utils.respond(request, response, 200, notFoundPage, 'text/html');
};

const getNotFoundCSS = (request, response) => {
  utils.respond(request, response, 200, notFoundCSS, 'text/css');
};

const getBulma = (request, response) => {
  utils.respond(request, response, 200, bulma, 'text/css');
};

module.exports = {
  getIndex,
  getIndexCSS,
  getNotFound,
  getNotFoundCSS,
  getBulma,
};
