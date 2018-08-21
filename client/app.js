$(function () {
    var socket = io.connect('/');

    $('#player_name').submit(function(){
        var name = $('#set_player').val();
        socket.emit('set_player', name);
        $(this).remove();
        
        return false;
    });

    socket.on('set_fields', function(fields){
        var field_selector = $('#field_selector');
        fields.forEach(function(field, i, arr) {
            field_selector.append('<option value="' + i + '">' + field.name + '</option>');
        });

        // TODO заменить на дефисы идентификаторы
        $('#start_company').css('display', 'block');
        $('#start_company').submit(function(){
            var field_key = field_selector.val();
            socket.emit('set_start_company', field_key);
            return false;
        });
    });
    

    socket.on('res_start_company', function(result){
        console.log('res_start_company', result);
        if (result) {
            $('#start_company > button').removeAttr('disabled');
        } else {
            $('#start_company > button').attr('disabled','disable');
        }

    });

    $('#start_game').click(function(){
        socket.emit('start_game_prepare');
    });

    $('#start_company').submit(function(){
        return false;
    });

    socket.on('connect', function(){console.log('connect');});
    socket.on('set_player', function(result){console.log('set_player ' + result);});

   
});