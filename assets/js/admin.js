$(document).ready(() => {
  if(verificarPermissaoUsuario() !== "admin") {
    window.location.href = "../index.html";
  }
  
  verificaSessao();
  listarTudo();
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
    event.preventDefault();
    let dados = $(this).serializeArray();
    $.ajax({
      url: "../src/Conteudo.php?acao=cadastrar",
      cache: false,
      data: $.param(dados),
      type: "POST",
      dataType: 'JSON',
      success: (response) => {
        this.reset();
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
  });
}

function listarTudo() {
  $.ajax({
    url: "../src/Conteudo.php?acao=listarTudo",
    cache: false,
    type: "GET",
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
          </tr>`
        )
      });
    },
    error: (request) => {
      console.log(request);
    }
  });
}