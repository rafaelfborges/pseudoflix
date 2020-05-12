$(document).ready(() => {
  adicionadosRecentemente();
  verificaSessao();
});

function verificaSessao() {
  if(getUsuarioLogado()){
    $("#usuarioMenu").css("visibility", "visible");
    $("#usuarioNotificacao").css("visibility", "visible");
    $("#usuarioPesquisa").css("visibility", "visible");
    $("#usuarioFavoritos").css("visibility", "visible");
    $("#usuarioConteudosRecentes").css("visibility", "visible");
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
            <iframe class="embed-responsive-item" id="conteudoYoutube" width="100%" height="315" 
            src="${response[0].url_youtube.replace("watch?v=", "embed/")}" frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `
      )
      verificarFavorito(id, userSession.id);
      $("#conteudoDescricao").empty().append(
        `<h5 class="card-title">${response[0].titulo}</h5>
         <p class="card-text mb-0"><b>Descrição:</b> ${response[0].descricao}</p>
         <p class="card-text mb-0"><b>Gênero:</b> ${response[0].genero}</p>
         <p class="card-text mb-0"><b>Data Lançamento:</b> ${response[0].data_lancamento}</p>
         <p class="card-text mb-0"><b>Tipo:</b> ${response[0].tipo}</p>
         <p class="card-text mb-0">
            <b>IMDb:</b> 
            <a href="${response[0].url_imdb}" target="_blank">Acessar detalhes do filme</a> 
         </p>
         <p class="card-text mb-0">
            <b>Adicionar Favorito: </b>
            <i class="fas fa-star" id="favorito" onMouseOver="this.style.cursor='pointer'"
             onclick="salvarNoFavoritos('${id}', userSession.id)"></i> 
         </p>
        `
      )
    },
    error: (request) => {
      console.log(request);
    }
  })
}
function salvarNoFavoritos(idFilme, idUsuario) {
  $.ajax({
    url: "src/SalvarFavorito.php",
    cache: false,
    data: {idFilme:idFilme, idUsuario:idUsuario},
    type: "POST",
    dataType: 'JSON',
    success: (response) => {
      alert("Favoritado com sucesso!");
      $("#favorito").css("color", "yellow");
    },
    error: (request) => {
      if (request.responseJSON[0].includes(1062)) {
        alert("Já está salvo nos favoritos! Verifique em Meus Favoritos.")
      } else if (request.status === 500) {
        alert("Erro! Contate um administrador. Mensagem: " + request.responseText);
      }
    }
  })
}

function verificarFavorito(idFilme, idUsuario) {
  $.ajax({
    url: "src/ListarFavoritos.php",
    cache: false,
    type: "GET",
    data: {idFilme:idFilme, idUsuario:idUsuario},
    dataType: 'JSON',
    success: (response) => {
      if(response.length > 0){
        $("#favorito").css("color", "yellow");
      }
    },
    error: (request) => {
      console.log(request);
    }
  })
}
