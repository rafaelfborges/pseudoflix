$(document).ready(() => {
  if(verificarPermissaoUsuario() !== "admin") {
    window.location.href = "../index.html";
  }
  
  verificaSessao();
  listarConteudo(6);
  cadastrarFilmeSerie();
});


function verificaSessao() {
  if(getUsuarioLogado()){
    $("#usuarioMenu").css("visibility", "visible");
    $("#usuario").text(userSession.nome);
  }
}

function cadastrarFilmeSerie() {
  $("#formCadastroAdmin").submit(function () {
    let dados = $(this).serializeArray();
    $.ajax({
      url: "../src/Conteudo.php?acao=cadastrar",
      cache: false,
      data: $.param(dados),
      type: "POST",
      dataType: 'JSON',
      success: (response) => {
        swal("Deu certo!", "Título cadastrado com sucesso. Verifique em pesquisar.", "success");
      },
      error: (request) => {
        const { status, responseText, responseJSON } = request;
        if (status === 409) {
          swal("Oops!!!", responseJSON.message + " Verifique em pesquisar.", "error");
        } else if (request.status === 500) {
          swal("Oops!!!", "Erro! Contate um administrador. Mensagem: " + responseText, "error");
        }
      }
    })
    event.preventDefault();
  });
}

function listarConteudo($limiteConteudo) {
  $.ajax({
    url: "../src/Conteudo.php?acao=listar",
    cache: false,
    type: "GET",
    data: { limite: $limiteConteudo },
    dataType: 'JSON',
    success: (response) => {
      const { message } = response;
      message.map((item) => {
        $("#pesquisa").append(
          `<tr>
            <td>${item.movie_id}</td>
            <td>${item.titulo}</td>
            <td>${item.genero}</td>
            <td>${item.data_lancamento}</td>
            <td>${item.tipo}</td>
            <td>${item.usuario}</td>
            <td>
                <a href="#modalDetalhes" data-toggle="modal" data-target='#modalDetalhes' data-id='${item.movie_id}'>
                    <i class="fas fa-eye"></i>
                </a> -  
                <a href="#modalEditar"><i class="fas fa-edit"></i></a> -  
                <a href="#excluir"><i class="fas fa-trash"></i></a>
            </td>
          </tr>`
        )
      });
    },
    error: (request) => {
      console.log(request);
    }
  });
}

function visualizarFilmeSerie() {
  $('#modalDetalhes').on('show.bs.modal', (event) => {
    let button = $(event.relatedTarget)
    let id = button.data('id')
    $.ajax({
      url: '../src/Conteudo.php?acao=listar',
      type: 'GET',
      data: 'id=' + id,
      dataType: 'JSON',
      success: function (response) {
        response.map((item) => {
          $("#detalhes").empty().append(
            `<div class="card mb-3" style="max-width: 540px;">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <a href="${item.url_imdb}" target="_blank">
                    <img src="${item.url_poster}" class="card-img" alt="${item.titulo}">
                  </a>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${item.titulo}</h5>
                    <p class="card-text mb-0"><b>Descrição:</b> ${item.descricao}</p>
                    <p class="card-text mb-0"><b>Gênero:</b> ${item.genero}</p>
                    <p class="card-text mb-0"><b>Data Lançamento:</b> ${item.data_lancamento}</p>
                    <p class="card-text mb-0"><b>Tipo:</b> ${item.tipo}</p>
                  </div>
                </div>
              </div>
            </div>`
          ); 
        });
      }
    });
  });
}