const fs = require('fs'); // pull in the file system module
const utils = require('./utils.js');

const errorMeme = fs.readFileSync(`${__dirname}/../client/media/error.jpeg`);

const getErrorMeme = (request, response) => {
  utils.respond(request, response, 200, errorMeme, 'image/jpeg');
};

module.exports = {
  getErrorMeme,
};
