$(document).ready(() => {
  if(verificarPermissaoUsuario() !== "admin") {
    window.location.href = "../index.html";
  }
  
  visualizarFilmeSerie();
  verificaSessao();
  listarFilmeSerie();
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
      url: "../src/CadastrarFilmeSerie.php",
      cache: false,
      data: $.param(dados),
      type: "POST",
      dataType: 'JSON',
      success: (response) => {
        alert("Título cadastrado com sucesso. Verifique em pesquisar.");
      },
      error: (request) => {
        if (request.responseJSON[0].includes(1062)) {
          alert("Título já cadastrado! Verifique em pesquisar.")
        } else if (request.status === 500) {
          alert("Erro! Contate um administrador. Mensagem: " + request.responseText);
        }
      }
    })
    event.preventDefault();
  });
}

function listarFilmeSerie() {
  $.ajax({
    url: "../src/ListarFilmeSerie.php",
    cache: false,
    type: "GET",
    dataType: 'JSON',
    success: (response) => {
      response.map((item) => {
        $("#pesquisa").append(
          `<tr>
            <td>${item.id}</td>
            <td>${item.titulo}</td>
            <td>${item.genero}</td>
            <td>${item.data_lancamento}</td>
            <td>${item.tipo}</td>
            <td>${item.usuario}</td>
            <td>
                <a href="#modalDetalhes" data-toggle="modal" data-target='#modalDetalhes' data-id='${item.id}'>
                    <i class="fas fa-eye"></i>
                </a> -  
                <a href="#modalEditar" data-toggle="modal" data-target='#modalDetalhes' data-id='${item.id}'>
                    <i class="fas fa-edit"></i>
                </a> -  
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
      url: '../src/ListarFilmeSerie.php',
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