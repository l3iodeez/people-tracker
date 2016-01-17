var
    port        = process.env.PORT || 4004,
    express         = require('express'),
    verbose         = false,
    http            = require('http'),
    app             = express(),
    server          = http.createServer(app);

server.listen(port);
console.log('\t :: Express :: Listening on port ' + port );

app.get( '/', function( req, res ){
  console.log('trying to load %s', __dirname + '/index.html');
  res.sendfile( '/index.html' , { root:__dirname });
});
app.get( '/*' , function( req, res, next ) {
  var file = req.params[0];
  if(verbose) console.log('\t :: Express :: file requested : ' + file);
  res.sendfile( __dirname + '/' + file );
});
