$(document).ready(function () {
  completarEndereco();
  cadastrarUsuario();
  validarSenha();
});

function cadastrarUsuario() {
  jQuery("#formCadastro").submit(function () {
    let dados = jQuery(this).serializeArray();
    dados[1].value = $.MD5(dados[1].value)
    $.ajax({
      url: '/pseudoflix/src/CadastrarUsuario.php',
      cache: false,
      data: $.param(dados),
      type: "POST",
      dataType: 'JSON',
      success: (response) => {
        alert("Usuário cadastrado com sucesso! Confirme sua conta através do e-mail.");
      },
      error: (request, status, error) => {
        console.log(request);
        if (request.responseJSON[0][1] === 1062) {
          alert("E-mail já cadastrado! Tente recuperar sua senha.")
        } else if (status === 500) {
          alert("Erro! Contate um administrador. Mensagem: " + request.responseText);
        }
      }
    })
    event.preventDefault();
  });
}

function validarSenha() {
  $("#confirma-senha").blur(() => {
    const senhaA = $("#senha").val();
    const senhaB = $("#confirma-senha").val();

    if (senhaA === senhaB) {
      if (senhaA.hasClass("is-invalid")) {
        senhaA.removeClass("is-invalid");
        senhaB.removeClass("is-invalid");
      }
      senhaA.toggleClass("is-valid");
      senhaB.toggleClass("is-valid");
      $('#buttonCadastrar').removeAttr("disabled");
    } else {
      if (senhaA.hasClass("is-valid")) {
        senhaA.removeClass("is-valid");
        senhaB.removeClass("is-valid");
      }
      senhaA.toggleClass("is-invalid");
      senhaB.toggleClass("is-invalid");
      $("#buttonCadastrar").attr("disabled", true);
    }
  });
}

function completarEndereco() {
  function limpaFormularioCep() {
    $("#cidade").val("");
    $("#endereco").val("");
    $("#bairro").val("");
  }
  
  $("#cep").blur(() => {
    let cep = $(this).val().replace(/\D/g, '');
    if (cep !== "") {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        $("#cidade").val("Carregando...");
        $("#endereco").val("Carregando...");
        $("#bairro").val("Carregando...");
        $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", (dados) => {
          if (!("erro" in dados)) {
            $("#cidade").val(dados.localidade);
            $("#endereco").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
          } else {
            limpaFormularioCep();
            alert("CEP não encontrado.");
          }
        });
      } else {
        limpaFormularioCep();
        alert("Formato de CEP inválido.");
      }
    } else {
      limpaFormularioCep();
    }
  });
}