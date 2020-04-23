const userSession = JSON.parse(window.localStorage.getItem('userSession'));

$(document).ready(() => {
  getUsuarioLogado();
  logIn();
  logOff();
});

function verificarPermissaoUsuario() {
  if(userSession !== null){
    return userSession.tipoUsuario;
  } 
  return false;
}

function getUsuarioLogado(){
  return userSession !== null;
}

function logOff() {
  $("#logoff").click(() => {
    window.localStorage.removeItem('userSession');
    window.location.href = "index.html";
  });
}

function logIn() {
  $("#buttonAcessar").click(() => {
    const email = $('#inputEmail').val();
    const password = $.MD5($('#inputSenha').val());
    if(email === "" || password === ""){
      alert("Preencha os campos com seu usuário e senha.");  
    } else {
      $.ajax({
        url: 'src/AutenticarUsuario.php',
        cache: false,
        data: {
          email: email,
          senha: password
        },
        type: "POST",
        dataType: 'JSON',
        success: (request) => {
          window.localStorage.setItem('userSession', JSON.stringify(request));
          window.location.href = "index.html";
        },
        error: (request) => {
          if (request.status === 401) {
            alert("Usuário ou senha inválidos. Tente novamente!")
          } else if (request.status === 500) {
            alert("Erro! Contate um administrador. Mensagem: " + request.responseText);
          }
        }
      });
    }
    event.preventDefault();
  });
}