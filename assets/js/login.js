
$(document).ready(function () {
  $("#buttonAcessar").click(function () {

    $.ajax({
      url: '/pseudoflix/src/AutenticarUsuario.php',
      cache: false,
      data: {
        email: $('#inputEmail').val(),
        senha: $.MD5($('#inputSenha').val())
      },
      type: "POST",
      success: (response) => {
        console.log(response);
      }
    });
    event.preventDefault();
  });
});