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

        $('#start_company').css('display', 'block');
        $('#start_company').submit(function(){
            var field_key = field_selector.val();
            socket.emit('set_start_company', field_key);
            return false;
        });
    });

    $('#start_company').submit(function(){
        return false;
    });

    socket.on('connect', function(){console.log('connect');});
    socket.on('set_player', function(result){console.log('set_player ' + result);});

   
});