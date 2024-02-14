const fs = require('fs'); // pull in the file system module

const errorMeme = fs.readFileSync(`${__dirname}/../client/media/error.jpeg`);

const getErrorMeme = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  response.write(errorMeme);
  response.end();
};

module.exports = {
  getErrorMeme,
};
