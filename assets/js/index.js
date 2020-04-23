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
          `<div class="col mb-4">
          <div class="card card-post">
            <a href="${item.url_imdb}" target="_blank" onclick="acaoUsuario();">
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

function acaoUsuario() {
  if(!verificarPermissaoUsuario()){
    $("#modalPermissao").modal();
    event.preventDefault();
  }
}