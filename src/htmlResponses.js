const fs = require('fs'); // pull in the file system module
const utils = require('./utils.js');

const index = fs.readFileSync(`${__dirname}/../client/promptsPage.html`);
const indexCSS = fs.readFileSync(`${__dirname}/../client/css/style.css`);
const answersPage = fs.readFileSync(`${__dirname}/../client/answersPage.html`);
const answersPageCSS = fs.readFileSync(`${__dirname}/../client/css/answersPage.css`);
const notFoundPage = fs.readFileSync(`${__dirname}/../client/notFound.html`);
const notFoundCSS = fs.readFileSync(`${__dirname}/../client/css/notFound.css`);
const bulma = fs.readFileSync(`${__dirname}/../node_modules/bulma/css/bulma.css`);

const requestsJS = fs.readFileSync(`${__dirname}/../client/js/requests.js`);
const promptsJS = fs.readFileSync(`${__dirname}/../client/js/prompts.js`);
const answersJS = fs.readFileSync(`${__dirname}/../client/js/answers.js`);

const getIndex = (request, response) => {
  utils.respond(request, response, 200, index, 'text/html');
};

const getIndexCSS = (request, response) => {
  utils.respond(request, response, 200, indexCSS, 'text/css');
};

const getAnswersPage = (request, response) => {
  utils.respond(request, response, 200, answersPage, 'text/html');
};

const getAnswersPageCSS = (request, response) => {
  utils.respond(request, response, 200, answersPageCSS, 'text/css');
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

const getRequestsJS = (request, response) => {
  utils.respond(request, response, 200, requestsJS, 'application/javascript');
};

const getPromptsJS = (request, response) => {
  utils.respond(request, response, 200, promptsJS, 'application/javascript');
};

const getAnswersJS = (request, response) => {
  utils.respond(request, response, 200, answersJS, 'application/javascript');
};

module.exports = {
  getIndex,
  getIndexCSS,
  getAnswersPage,
  getAnswersPageCSS,
  getNotFound,
  getNotFoundCSS,
  getBulma,
  getRequestsJS,
  getPromptsJS,
  getAnswersJS,
};
