$(document).ready(async () => {
  await listarConteudos();
  verificarSessao();
  listarPesquisa();
});

async function listarConteudos() {
  /*listarConteudo("listar", "recente", 6)
    .then(() => listarConteudo("listarPorTipo", "filme", 6))
    .then(() => listarConteudo("listarPorTipo", "seriado", 6))
    .catch((e) => console.log(e));*/
  
  try {
    await listarConteudo("listar", "recente", 6);
    await listarConteudo("listarPorTipo", "filme", 6);
    await listarConteudo("listarPorTipo", "seriado", 6);
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

function listarConteudo(tipoAcao, tipoConteudo, limiteConteudo) {
  return new Promise((res, err) => {
    let dataRequest = tipoConteudo !== "favorito" ? {tipo: tipoConteudo, limite: limiteConteudo} : {id: userSession.id};
    let urlFetch = tipoConteudo !== "favorito" 
                    ? "src/Conteudo.php?acao="+tipoAcao 
                    : "src/Favorito.php?acao=listarPorUsuarioId";
    $.ajax({
      url: urlFetch,
      data: dataRequest,
      cache: false,
      type: "GET",
      dataType: 'JSON',
      success: (response) => {
        const { message } = response;
        const divConteudo = $("#conteudoPrincipal");
        let titulo;
        let div;
        
        if(tipoConteudo === "filme"){
          titulo = "Filmes";
        } else if(tipoConteudo === "seriado"){
          titulo = "Seriados";
        } else if(tipoConteudo === "recente"){
          titulo = "Recentes";
        } else {
          titulo = "Favoritos";
        }
                        
        if(message.length === 0) {
            divConteudo.append(`
              <div class="container text-center mt-4">
                <p>Não há ${titulo.toLowerCase()} para mostrar!</p>
              </div>
            `);
        } else {
          divConteudo.append(`
            <h4>${ titulo }</h4>
            <div class="my-grid" id="${ titulo.toLowerCase() }"></div>
          `)
          div = divConteudo.find(`#${titulo.toLowerCase()}`);
          
          message.map((item) => {
            div.append(`
                <a href="${item.url_imdb}" target="_blank" onclick="verificarPermissao(${item.movie_id});">
                  <figure>
                    <img src="${item.url_poster}" class="my-card-img" alt="${item.titulo}">
                  </figure>    
                </a>
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
      const { status, responseText } = request;
      if (status === 409) {
        swal({
          title: "Você tem certeza?",
          text: "Que vai remover, " + tituloConteudo + ", dos favoritos?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            let divPrincipal = $("#conteudoPrincipal");
            removerFavorito(idFilme, idUsuario).then((response) => {
              if(response.message === 1) {
                $("#favorito").css("color", "darkgrey");

                if(divPrincipal.find("#favoritos").length === 1){
                  divPrincipal.empty();
                  listarConteudo('', 'favorito', 24);
                }
              }  
            });
          }
        });
      } else if (status === 500) {
        alert("Erro! Contate um administrador. Mensagem: " + responseText);
      }
    }
  })
}

function removerFavorito(idFilme, idUsuario) {
  return $.ajax({
    url: "src/Favorito.php?acao=deletar",
    cache: false,
    type: "POST",
    data: {filme: idFilme, usuario: idUsuario},
    dataType: 'JSON',
    success: (response) => {
      const { message } = response;
      return message;
    }, error: (request) => {
      return request;
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
      url: "src/Conteudo.php?acao=pesquisar",
      cache: false,
      type: "GET",
      data: $.param(pesquisa),
      dataType: 'JSON',
      success: (response) => {
        const { message } = response;
        
        if(message.length === 0) {
          $("#conteudoPrincipal").empty().append(`
            <div class="container text-center mt-4">
                <p>Não há resultados para mostrar!</p>
            </div>
          `);
        } else {
          $("#conteudoPrincipal").empty().append(`
            <h4>Resultados</h4>
            <div class="my-grid" id="resultados"></div>
          `);
          message.map((item) => {
            $("#resultados").append(`
              <a href="${item.url_imdb}" target="_blank" onclick="verificarPermissao(${item.movie_id});">
                <figure>
                  <img src="${item.url_poster}" class="my-card-img" alt="${item.titulo}">
                </figure>    
              </a>
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