$(document).ready(() => {
    meusFavoritos();
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

function meusFavoritos() {
    $.ajax({
      url: "src/ListarFavoritos.php",
      cache: false,
      type: "GET",
      data: {id: userSession.id},
      dataType: 'JSON',
      success: (response) => {
        response.map((item) => {
          $("#meusFavoritos").append(
            `<div class="col-md-2 mb-4 cardSize">
              <a href="${item.url_imdb}" target="_blank" onclick="acaoUsuario(${item.id});">
                <div class="card bg-dark text-white card-post">
                <img src="${item.url_poster}" class="card-img" alt="${item.titulo}">
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

  function acaoUsuario(id) {
    if(!verificarPermissaoUsuario()){
      $("#modalPermissao").modal();
    } else {
      $("#detalhesConteudo").modal();
    }
    event.preventDefault();
  }