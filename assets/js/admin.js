$(document).ready(() => {
  cadastrarFilmeSerie();
  listarFilmeSerie();
});

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
                <a href="#visualizar"><i class="fas fa-eye"></i></a> - 
                <a href="#editar"><i class="fas fa-edit"></i></a> - 
                <a href="#excluir"><i class="fas fa-trash"></i></a>
            </td>
          </tr>`
        )
      })
    },
    error: (request) => {
      console.log(request);
    }
  })
}