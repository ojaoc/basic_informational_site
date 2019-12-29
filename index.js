const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  
  let q = url.parse(req.url, true);
  
  let filename;
  if (q.pathname.includes('.html')) {
    filename = '.' + q.pathname;
  } else if (req.url === '/') {
    filename = './index.html';
  } else {
    filename = '.' + q.pathname + '.html';
  }

  const notFoundPage = () => {
    fs.readFile('./404.html', (err, data) => {
      if (err) throw err;
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }

  fs.readFile(filename, (err, data) => {
  if (err) {
    return notFoundPage();
  };
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  return res.end();
  });

}).listen(8080);