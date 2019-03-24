const
  path = require('path')
  , express = require('express')()
  , compress = require('compression')
  , body_parser = require('body-parser')
  , server = require('http').createServer(express)
  , public_path = path.resolve(__dirname, 'public')
  , static_route = require('express').static(public_path)
  , ioProcess = require('./services/ioProcess')
  , io = require('socket.io')(server);

express
  .use(body_parser.urlencoded({ extended: false }))
  .use(body_parser.json())
  .use(compress())
  .use(static_route);

io.on('connection', ioProcess);

server.listen(process.env.PORT || 3000, () => console.log('server is up'));
