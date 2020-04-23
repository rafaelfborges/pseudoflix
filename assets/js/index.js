const userSession = JSON.parse(window.localStorage.getItem('userSession'));

$(document).ready(() => {
  adicionadosRecentemente();
  getUsuarioLogado();
});

function adicionadosRecentemente() {
  $.ajax({
    url: "src/ListarFilmeSerie.php",
    cache: false,
    type: "GET",
    dataType: 'JSON',
    success: (response) => {
      response.map((item) => {
        $("#adicionadoRecentemente").append(
          `<div class="col mb-4">
          <div class="card card-post">
            <a href="${item.url_imdb}" target="_blank" onclick="verificarPermissaoUsuario()">
              <img src="${item.url_poster}" class="card-img-top" alt="${item.titulo}">
            </a>
            <div class="card-body">
                <h5 class="card-title">${item.titulo}</h5>
                <p class="card-text">${item.descricao}</p>
            </div>
          </div>
        </div>`
        )
      });
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function getUsuarioLogado(){
  if(userSession !== null){
    $("#usuarioMenu").css("visibility", "visible");
    $("#usuarioNotificacao").css("visibility", "visible");
    $("#usuarioPesquisa").css("visibility", "visible");
    $("#login").css("display", "none");
    $("#usuario").text(userSession.nome);
  } 
}

function verificarPermissaoUsuario() {
  if(userSession !== null){
    return userSession.tipoUsuario;
  } else {
    $("#modalPermissao").modal();
    event.preventDefault();
  }
  //return false;
  
}