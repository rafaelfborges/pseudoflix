$(document).ready(() => {
  verificaLogin();
});

function verificaLogin() {
  $("#buttonAcessar").click(() => {
    $.ajax({
      url: 'src/AutenticarUsuario.php',
      cache: false,
      data: {
        email: $('#inputEmail').val(),
        senha: $.MD5($('#inputSenha').val())
      },
      type: "POST",
      dataType: 'JSON',
      success: (response) => {
        console.log(response);
      },
      error: (request, status) => {
        console.log(request);
        console.log(status);
      }
    });
    event.preventDefault();
  })
}