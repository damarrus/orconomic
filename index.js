var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var _ = require('lodash');

const Player = require('./classes/player.js');
const Game = require('./classes/game.js');
const Company = require('./classes/company.js');

app.get('/translator', function(req, res){res.sendFile(__dirname + '/translator/translator.html');});
app.get('/translator/style.css', function(req, res){res.sendFile(__dirname + '/translator/style.css');});
app.get('/translator/app.js', function(req, res){res.sendFile(__dirname + '/translator/app.js');});
app.get('/translator/data.js', function(req, res){res.sendFile(__dirname + '/translator/data.js');});

app.get('/', function(req, res){res.sendFile(__dirname + '/client/client.html');});
app.get('/client/style.css', function(req, res){res.sendFile(__dirname + '/client/style.css');});
app.get('/client/app.js', function(req, res){res.sendFile(__dirname + '/client/app.js');});


var game = new Game();
var translator = false;

function translatorData(translator) {
    if (translator) {
        var state = _.cloneDeep(game);
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
        console.log(state);
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
        if (socket.player) {
            socket.emit('set_player', false);
        } else {
            player = new Player(socket, name);
            socket.player = player;
            game.players.push(player);
            var key = game.players.indexOf(player);
            player.key = key;
            console.log('new player ' + name);
            socket.emit('set_player', true);
            socket.emit('set_fields', game.fields);
            translatorData(translator);
        }
    });

    socket.on('set_start_company', function(field_key){
        console.log('field_key ' + field_key);
        game.setStartCompany(field_key, socket.player);
        socket.emit('set_start_company', true);
        translatorData(translator);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});