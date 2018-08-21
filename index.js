var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var _ = require('lodash');

const Controller = require('./classes/controller');
var c = new Controller();


app.get('/translator', function(req, res){res.sendFile(__dirname + '/translator/translator.html');});
app.get('/translator/style.css', function(req, res){res.sendFile(__dirname + '/translator/style.css');});
app.get('/translator/app.js', function(req, res){res.sendFile(__dirname + '/translator/app.js');});
app.get('/translator/data.js', function(req, res){res.sendFile(__dirname + '/translator/data.js');});

app.get('/', function(req, res){res.sendFile(__dirname + '/client/client.html');});
app.get('/client/style.css', function(req, res){res.sendFile(__dirname + '/client/style.css');});
app.get('/client/app.js', function(req, res){res.sendFile(__dirname + '/client/app.js');});


var translator = false;

function translatorData(translator) {
    if (translator) {
        var state = _.cloneDeep(c.game);
        state.players.forEach(function(player, i, arr) {
            delete player.socket;
            delete player.companies;
        });
        state.fields.forEach(function(field, i, arr) {
            field.companies.forEach(function(company, i, arr) {
                delete company.field;
                company.player = company.player.key;
            });
        });
        translator.emit('state', state);
    }
}

io.on('connection', function(socket){
    console.log('connect');
    
    socket.on('translator', function(msg){
        console.log('translator connect');
        translator = socket;
        translatorData(translator);
    });

    socket.on('set_player', function(name){
        var result = c.addNewPlayer(socket, name);
        if (result.status) {
            console.log('new player ' + name);
            socket.emit('set_player', true);
            socket.emit('set_fields', c.game.fields);
            translatorData(translator);
        } else {
            socket.emit('set_player', false);
        }
    });

    socket.on('start_game_prepare', function(){
        var result = c.startGamePrepare();

        result.data.socket.emit('res_start_company', true);
    });

    socket.on('set_start_company', function(field_key) {
        var result = c.setStartCompany(socket.player, field_key);
        if (result.status) {
            //socket.emit('set_start_company', true);
            result.data.socket.emit('res_start_company', true);
            socket.emit('res_start_company', false);

            console.log('field_key ' + field_key);
            translatorData(translator);
        } else {
            socket.emit('set_start_company', false);
        }
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});