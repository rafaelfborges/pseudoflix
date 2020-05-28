$(document).ready(() => {
  listarConteudosRecentes();
  listarFilmes();
  listarSeries();
  verificarSessao();
  listarPesquisa();
});

function exibirDetalhesConteudo(id) {
  $.ajax({
    url: "src/ListarConteudo.php",
    cache: false,
    type: "GET",
    data: 'id=' + id,
    dataType: 'JSON',
    success: (response) => {
      $("#detalhesConteudo").on('hidden.bs.modal', function (e) {
        const conteudoYoutube = $("#conteudoYoutube");
        conteudoYoutube.attr("src", conteudoYoutube.attr("src"));
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
             onclick="salvarFavorito('${id}', userSession.id, '${response[0].titulo}')"></i> 
         </p>
        `
      )
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function listarConteudosRecentes() {
  $.ajax({
    url: "src/ListarConteudo.php",
    cache: false,
    type: "GET",
    dataType: 'JSON',
    success: (response) => {
      $("#conteudoPrincipal").empty().append(`
        <h5>Adicionados recentemente</h5>
        <div class="row" id="adicionadoRecentemente"></div>
      `)
      if(response.length === 0) {
        $("#adicionadoRecentemente").append(`
          <div class="text-center mt-4 w-100">
            <p>Não há recentes para mostrar!</p>
          </div>
        `);
      } else {
        response.map((item) => {
          $("#adicionadoRecentemente").append(`
          <div class="col-md-2 mb-4">
            <a href="${item.url_imdb}" target="_blank" onclick="verificarPermissao(${item.movie_id});">
              <div class="card bg-dark">
                <img src="${item.url_poster}" class="img-fluid" alt="${item.titulo}">
              </div>    
            </a>
          </div>
        `)
        });
      }
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function listarFilmes() {
  $.ajax({
    url: "src/ListarFilme.php",
    cache: false,
    type: "GET",
    dataType: 'JSON',
    success: (response) => {
      $("#conteudoPrincipal").append(`
        <h5>Filmes</h5>
        <div class="row" id="filmes"></div>
      `)
      if(response.length === 0) {
        $("#filmes").append(`
          <div class="text-center mt-4 w-100">
            <p>Não há recentes para mostrar!</p>
          </div>
        `);
      } else {
        response.map((item) => {
          $("#filmes").append(`
          <div class="col-md-2 mb-4">
            <a href="${item.url_imdb}" target="_blank" onclick="verificarPermissao(${item.movie_id});">
              <div class="card bg-dark">
                <img src="${item.url_poster}" class="img-fluid" alt="${item.titulo}">
              </div>    
            </a>
          </div>
        `)
        });
      }
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function listarSeries() {
  $.ajax({
    url: "src/ListarSerie.php",
    cache: false,
    type: "GET",
    dataType: 'JSON',
    success: (response) => {
      $("#conteudoPrincipal").append(`
        <h5>Séries</h5>
        <div class="row" id="series"></div>
      `)
      if(response.length === 0) {
        $("#series").append(`
          <div class="text-center mt-4 w-100">
            <p>Não há recentes para mostrar!</p>
          </div>
        `);
      } else {
        response.map((item) => {
          $("#series").append(`
          <div class="col-md-2 mb-4">
            <a href="${item.url_imdb}" target="_blank" onclick="verificarPermissao(${item.movie_id});">
              <div class="card bg-dark">
                <img src="${item.url_poster}" class="img-fluid" alt="${item.titulo}">
              </div>    
            </a>
          </div>
        `)
        });
      }
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function listarFavoritos() {
  $.ajax({
    url: "src/ListarFavoritos.php",
    cache: false,
    type: "GET",
    data: {id: userSession.id},
    dataType: 'JSON',
    success: (response) => {
      $("#conteudoPrincipal").empty().append(`
        <h5>Meus Favoritos</h5>
        <div class="row" id="meusFavoritos"></div>
      `)
      if(response.length === 0) {
        $("#meusFavoritos").append(`
          <div class="text-center mt-4 w-100">
            <p>Não há favoritos para mostrar!</p>
          </div>
        `);
      } else {
        response.map((item) => {
          $("#meusFavoritos").append(
            `<div class="col-md-2 mb-4">
            <a href="${item.url_imdb}" target="_blank" onclick="verificarPermissao(${item.movie_id});">
              <div class="card bg-dark">
                <img src="${item.url_poster}" class="card-img" alt="${item.titulo}">
              </div>    
            </a>
          </div>
        `)
        }); 
      }
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function salvarFavorito(idFilme, idUsuario, tituloConteudo) {
  $.ajax({
    url: "src/SalvarFavorito.php",
    cache: false,
    data: {idFilme: idFilme, idUsuario: idUsuario},
    type: "POST",
    dataType: 'JSON',
    success: (response) => {
      swal(tituloConteudo, "Foi favoritado com sucesso!", "success");
      $("#favorito").css("color", "yellow");
    },
    error: (request) => {
      if (request.responseJSON[0].includes(1062)) {
        swal({
          title: "Você tem certeza?",
          text: "Que vai remover, " + tituloConteudo + ", dos favoritos?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            console.log(removerFavorito(idFilme, idUsuario));
            $("#favorito").css("color", "darkgrey");
          }
        });
      } else if (request.status === 500) {
        alert("Erro! Contate um administrador. Mensagem: " + request.responseText);
      }
    }
  })
}

function removerFavorito(idFilme, idUsuario) {
  $.ajax({
    url: "src/RemoverFavorito.php",
    cache: false,
    type: "POST",
    data: {idFilme: idFilme, idUsuario: idUsuario},
    dataType: 'JSON',
    success: (response) => {
      if (response.length > 0) {
        return true;
      }
    },
    error: (request) => {
      console.log(request);
      return false;
    }
  })
}

function verificarFavorito(idFilme, idUsuario) {
  $.ajax({
    url: "src/ListarFavoritos.php",
    cache: false,
    type: "GET",
    data: {idFilme: idFilme, idUsuario: idUsuario},
    dataType: 'JSON',
    success: (response) => {
      if (response.length > 0) {
        $("#favorito").css("color", "yellow");
      }
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function listarPesquisa() {
  $("#usuarioPesquisa").submit(function () {
    let pesquisa = $(this).serializeArray();
    $.ajax({
      url: "src/Pesquisar.php",
      cache: false,
      type: "GET",
      data: $.param(pesquisa),
      dataType: 'JSON',
      success: (response) => {
        console.log(response);
        
        $("#conteudoPrincipal").empty().append(`
            <h5>Meus Resultados</h5>
            <div class="row" id="meusResultados"></div>
        `)
        
        if(response.length === 0) {
          $("#meusResultados").append(`
          <div class="text-center mt-4 w-100">
            <p>Não há resultados para mostrar!</p>
          </div>
        `);
        } else {
          response.map((item) => {
            $("#meusResultados").append(
              `<div class="col-md-2 mb-4">
            <a href="${item.url_imdb}" target="_blank" onclick="verificarPermissao(${item.movie_id});">
              <div class="card bg-dark">
                <img src="${item.url_poster}" class="card-img" alt="${item.titulo}">
              </div>    
            </a>
          </div>
        `)
          });
        }
      },
      error: (request) => {
        console.log(request);
      }
    })
    event.preventDefault();
  });
}

function verificarPermissao(movieId) {
  if (!verificarPermissaoUsuario()) {
    $("#modalPermissao").modal();
  } else {
    exibirDetalhesConteudo(movieId);
    $("#detalhesConteudo").modal();
  }
  event.preventDefault();
}

function verificarSessao() {
  if (getUsuarioLogado()) {
    $("#usuarioMenu").css("visibility", "visible");
    $("#usuarioNotificacao").css("visibility", "visible");
    $("#usuarioPesquisa").css("visibility", "visible");
    $("#usuarioFavoritos").css("visibility", "visible");
    $("#usuarioConteudosRecentes").css("visibility", "visible");
    if (verificarPermissaoUsuario() === "admin") {
      $("#acessoAdmin").css("display", "block");
    }
    $("#login").css("display", "none");
    $("#usuario").text(userSession.nome);
  }
}