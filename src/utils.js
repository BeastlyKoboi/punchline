//
const respond = (request, response, statusCode, content, type = 'application/json') => {
  response.writeHead(statusCode, { 'Content-Type': type });
  if (content) { response.write(content); }
  response.end();
};

module.exports = {
  respond,
};
