/**
 * Created by cmolea on 02/05/2014.
 */

var debug = require('debug')('http');
var app = require('./server/configs/Application');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
    console.log('Express server listening on port ' + server.address().port);
});
