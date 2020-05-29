$(document).ready(async () => {
  await listarConteudos();
  verificarSessao();
  listarPesquisa();
});

async function listarConteudos() {
  //Try abaixo é igual a execução do código abaixo
  /*listarConteudosRecentes(6) 
    .then(() => listarConteudoPorTipo("Filme", 6))
    .then(() => listarConteudoPorTipo("Série", 6))
    .catch((e) => console.log(e))*/
  
  try {
    await listarConteudosRecentes(6);
    await listarConteudoPorTipo("filme", 6);
    await listarConteudoPorTipo("seriado", 6);
  } catch (e) {
    console.log(e);
  }
}

function exibirDetalhesConteudo(id) {
  $.ajax({
    url: "src/Conteudo.php?acao=listarComId",
    cache: false,
    type: "GET",
    data: {id: id},
    dataType: 'JSON',
    success: (response) => {
      const { message } = response;
      
      $("#detalhesConteudo").on('hidden.bs.modal', function (e) {
        const conteudoYoutube = $("#conteudoYoutube");
        conteudoYoutube.attr("src", conteudoYoutube.attr("src"));
      });

      $("#conteudoVideo").empty().append(
        `<div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" id="conteudoYoutube" width="100%" height="315" 
            src="${ message.url_youtube.replace("watch?v=", "embed/") }" frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        `
      )
      verificarFavorito(id, userSession.id);
      $("#conteudoDescricao").empty().append(
        `<h5 class="card-title">${message.titulo}</h5>
         <p class="card-text mb-0"><b>Descrição:</b> ${ message.descricao }</p>
         <p class="card-text mb-0"><b>Gênero:</b> ${ message.genero }</p>
         <p class="card-text mb-0"><b>Data Lançamento:</b> ${ message.data_lancamento }</p>
         <p class="card-text mb-0"><b>Tipo:</b> ${ message.tipo }</p>
         <p class="card-text mb-0">
            <b>IMDb:</b> 
            <a href="${ message.url_imdb }" target="_blank">Acessar detalhes do filme</a> 
         </p>
         <p class="card-text mb-0">
            <b>Adicionar Favorito: </b>
            <i class="fas fa-star" id="favorito" onMouseOver="this.style.cursor='pointer'"
             onclick="cadastrarFavorito('${id}', userSession.id, '${ message.titulo }')"></i> 
         </p>
        `
      )
    },
    error: (request) => {
      console.log(request);
    }
  })
}

function listarConteudosRecentes(limiteConteudo) {
  return new Promise((res, err) => {
    $.ajax({
      url: "src/Conteudo.php?acao=listar",
      cache: false,
      type: "GET",
      data: { limite: limiteConteudo },
      dataType: 'JSON',
      success: (response) => {
        const { message } = response;
        
        $("#conteudoPrincipal").append(`
        <h5>Adicionados recentemente</h5>
        <div class="row" id="adicionadoRecentemente"></div>
      `)
        if(message.length === 0) {
          $("#adicionadoRecentemente").append(`
          <div class="text-center mt-4 w-100">
            <p>Não há recentes para mostrar!</p>
          </div>
        `);
        } else {
          message.map((item) => {
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
        res();
      },
      error: (request) => {
        console.log(request);
        err();
      }
    })
  });
}

function listarConteudoPorTipo(tipoConteudo, limiteConteudo) {
  new Promise((res, err) => {
    $.ajax({
      url: "src/Conteudo.php?acao=listarPorTipo",
      cache: false,
      type: "GET",
      data: {tipo: tipoConteudo, limite: limiteConteudo},
      dataType: 'JSON',
      success: (response) => {
        const { message } = response;
        const divConteudo = $("#conteudoPrincipal");
        let titulo;
        let div;

        tipoConteudo === "filme" ? titulo = "Filmes" : titulo = "Seriados";
        divConteudo.append(`
            <h5>${ titulo }</h5>
            <div class="row" id="${ titulo.toLowerCase() }"></div>
        `)
        
        div = divConteudo.find(`#${titulo.toLowerCase()}`);
                
        if(message.length === 0) {
            div.append(`
              <div class="text-center mt-4 w-100">
                <p>Não há recentes para mostrar!</p>
              </div>
            `);
        } else {
          message.map((item) => {
            div.append(`
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
        res();
      },
      error: (request) => {
        console.log(request);
        err();
      }
    })
  })
}

function listarFavoritos() {
  $.ajax({
    url: "src/Favorito.php?acao=listarPorUsuarioId",
    cache: false,
    type: "GET",
    data: {id: userSession.id},
    dataType: 'JSON',
    success: (response) => {
      const { message } = response;

      $("#conteudoPrincipal").append(`
        <h5>Meus Favoritos</h5>
        <div class="row" id="meusFavoritos"></div>
      `)
      
      if(message.length === 0) {
        $("#meusFavoritos").append(`
          <div class="text-center mt-4 w-100">
            <p>Não há favoritos para mostrar!</p>
          </div>
        `);
      } else {
        message.map((item) => {
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

function cadastrarFavorito(idFilme, idUsuario, tituloConteudo) {
  $.ajax({
    url: "src/Favorito.php?acao=cadastrar",
    cache: false,
    data: {filme: idFilme, usuario: idUsuario},
    type: "POST",
    dataType: 'JSON',
    success: () => {
      swal(tituloConteudo, "Foi favoritado com sucesso!", "success");
      $("#favorito").css("color", "yellow");
    },
    error: (request) => {
      const { status, responseText, responseJSON } = request;
      if (status === 409) {
        swal({
          title: "Você tem certeza?",
          text: "Que vai remover, " + tituloConteudo + ", dos favoritos?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            removerFavorito(idFilme, idUsuario);
            $("#favorito").css("color", "darkgrey");
          }
        });
      } else if (status === 500) {
        alert("Erro! Contate um administrador. Mensagem: " + responseText);
      }
    }
  })
}

function removerFavorito(idFilme, idUsuario) {
  $.ajax({
    url: "src/Favorito.php?acao=deletar",
    cache: false,
    type: "POST",
    data: {filme: idFilme, usuario: idUsuario},
    dataType: 'JSON',
    success: (response) => {
      const { message } = response;
      if (message === 1) 
        return true;
    },
    error: (request) => {
      console.log(request);
      return false;
    }
  })
}

function verificarFavorito(idFilme, idUsuario) {
  $.ajax({
    url: "src/Favorito.php?acao=verificarFavorito",
    cache: false,
    type: "POST",
    data: {filme: idFilme, usuario: idUsuario},
    dataType: 'JSON',
    success: (response) => {
      const { message } = response;
      if (message !== false) {
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
      url: "src/Pesquisa.php",
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