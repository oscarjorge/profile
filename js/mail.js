function sendMail(nombre,  mail, asunto, mensaje) {
    

     if ($("form").valid()) {
        console.log('enviando');
        // $('#btnEnviar>i').toggleClass('fa-paper-plane-o fa-spinner fa-pulse');
        // $('#sobre').toggleClass('fa-envelope fa-envelope-open');
        var parametros = {
            "Nombre": nombre,
            "Email": mail,
            "Asunto": asunto,
            "Mensaje": mensaje,
        };
        console.log(parametros)
        $.ajax({
            data: parametros,
            url: 'http://apiescribano.antonioescribano.es/api/contacto/EnviarMailComentarioProfile',
            type: 'POST',

            success: function (response) {
                // $('#btnEnviar').removeClass('btn-danger');
                // $("form")[0].reset();
                // $("i.prefix, label").removeClass('active');
                var options =  {
                    content: "El mensaje se ha enviado correctamente",
                }
                $.snackbar(options);
                console.log(response);
            },
            error:function(){
                console.log('error');
                // $('#btnEnviar').addClass('btn-danger'); 
                var options =  {
                    content: "Ha ocurrido un error y no se ha podido enviar el mensaje.",
                }
                $.snackbar(options);
            },
            complete:function(){
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