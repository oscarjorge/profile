function sendMail(nombre,  mail, asunto, mensaje) {
    

     if ($("form").valid()) {
        $('#btnEnviar>i').toggleClass('fa-paper-plane-o fa-spinner fa-pulse');
        // $('#sobre').toggleClass('fa-envelope fa-envelope-open');
        var parametros = {
            "Name": nombre,
            "From": mail,
            "Subject": asunto,
            "Body": mensaje,
        };
        console.log(parametros)
        $.ajax({
            data: parametros,
            url: 'http://commonapi.oscarjorge.es/mail/SendProfile',
            //url:'http://localhost:60606/api/mail/SendProfile',
            type: 'POST',

            success: function (response) {
                $('#btnEnviar').removeClass('btn-danger');
                $("form")[0].reset();
                // $("i.prefix, label").removeClass('active');
                var options =  {
                    content: "El mensaje se ha enviado correctamente",
                }
                $.snackbar(options);
                console.log(response);
            },
            error:function(){
                console.log('error');
                $('#btnEnviar').addClass('btn-danger'); 
                var options =  {
                    content: "Ha ocurrido un error y no se ha podido enviar el mensaje.",
                }
                $.snackbar(options);
            },
            complete:function(){
                $('#btnEnviar>i').toggleClass('fa-paper-plane-o fa-spinner fa-pulse');
                // setTimeout(function(){ 
                //     $('#btnEnviar>i').toggleClass('fa-paper-plane-o fa-spinner fa-pulse');
                //     $('#sobre').toggleClass('fa-envelope fa-envelope-open');
                // }, 1500);
            }
        });

     }

}
$(document).on('ready', function () {
    $("#btnEnviar").on('click', function(){
        sendMail($("#nombre").val(), $("#mail").val(), $("#asunto").val(), $("#mensaje").val());

    })
    $("form").validate({
        rules: {
            nombre: {
                required: true
            },
            mail: {
                required: true,
                email: true
            },
            asunto: {
                required: true
            },
            mensaje: {
                required: true
            }
        },
        errorPlacement: function (error, element) {
            // Don't show error
        }
    });

})