$(document).ready(() => {
  adicionadosRecentemente();
  verificaSessao();
});

function verificaSessao() {
  if(getUsuarioLogado()){
    $("#usuarioMenu").css("visibility", "visible");
    $("#usuarioNotificacao").css("visibility", "visible");
    $("#usuarioPesquisa").css("visibility", "visible");
    if(verificarPermissaoUsuario() === "admin"){
      $("#acessoAdmin").css("display", "block");
    }
    $("#login").css("display", "none");
    $("#usuario").text(userSession.nome);
  }
}

function adicionadosRecentemente() {
  $.ajax({
    url: "src/ListarFilmeSerie.php",
    cache: false,
    type: "GET",
    dataType: 'JSON',
    success: (response) => {
      response.map((item) => {
        $("#adicionadoRecentemente").append(
          `<div class="col mb-4 cardSize">
            <a href="${item.url_imdb}" target="_blank" onclick="acaoUsuario();">
              <div class="card bg-dark text-white card-post">
              <img src="${item.url_poster}" class="card-img" alt="${item.titulo}">
              <div class="card-img-overlay cardShadow">
                  <h5 class="card-title">${item.titulo}</h5>
                  <p class="card-text">${item.descricao}</p>
              </div>
            </div>    
            </a>
          </div>`
        )
      });
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function acaoUsuario() {
  if(!verificarPermissaoUsuario()){
    $("#modalPermissao").modal();
    event.preventDefault();
  }
}