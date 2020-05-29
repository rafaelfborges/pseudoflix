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
        url: 'src/Usuario.php?acao=autenticar',
        cache: false,
        data: {
          email: email,
          senha: password
        },
        type: "POST",
        dataType: 'JSON',
        success: (response) => {
          const { message } = response;
          window.localStorage.setItem('userSession', JSON.stringify(message));
          window.location.href = "index.html";
        },
        error: (response) => {
          const { status, responseText } = response;
          if (status === 401) {
            alert("Usuário ou senha inválidos. Tente novamente!")
          } else if (status === 500) {
            alert("Erro! Contate um administrador. Mensagem: " + responseText);
          }
        }
      });
    }
    event.preventDefault();
  });
}