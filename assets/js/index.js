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
          `<div class="col-md-2 mb-4">
            <a href="${item.url_imdb}" target="_blank" onclick="acaoUsuario(${item.id});">
              <div class="card bg-dark">
                <img src="${item.url_poster}" class="img-fluid" alt="${item.titulo}">
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
    detalhesFilmesSeries(id);
    $("#detalhesConteudo").modal();
  }
  event.preventDefault();
}

function detalhesFilmesSeries(id) {
  $.ajax({
    url: "src/ListarFilmeSerie.php",
    cache: false,
    type: "GET",
    data: 'id=' + id,
    dataType: 'JSON',
    success: (response) => {
      $("#detalhesConteudo").on('hidden.bs.modal', function (e) {
        $("#conteudoYoutube").attr("src", $("#conteudoYoutube").attr("src"));
      });
      
      $("#conteudoVideo").empty().append(
        `<div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" id="conteudoYoutube" width="100%" height="315" src="${response[0].url_youtube.replace("watch?v=", "embed/")}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `
      )
      
      $("#conteudoDescricao").empty().append(
        `<h5 class="card-title">${response[0].titulo}</h5>
         <p class="card-text mb-0"><b>Descrição:</b> ${response[0].descricao}</p>
         <p class="card-text mb-0"><b>Gênero:</b> ${response[0].genero}</p>
         <p class="card-text mb-0"><b>Data Lançamento:</b> ${response[0].data_lancamento}</p>
         <p class="card-text mb-0"><b>Tipo:</b> ${response[0].tipo}</p>
         <p class="card-text mb-0"><b>IMDb:</b> <a href="${response[0].url_imdb}" target="_blank">Acessar detalhes do filme</a> </p>
         <p class="card-text mb-0"><b>Adicionar Favorito: </b><i class="fas fa-star" id="favorito"></i> </p>
        `
      )
    },
    error: (request) => {
      console.log(request);
    }
  })
}