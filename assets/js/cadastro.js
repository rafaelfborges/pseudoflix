
$(document).ready(function () {
  completarEndereco();
  cadastrarUsuario();
  validarSenha();
});

function cadastrarUsuario() {
  jQuery('#formCadastro').submit(function () {
    var dados = jQuery(this).serializeArray();
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
    var senhaA = $("#senha").val();
    var senhaB = $("#confirma-senha").val();

    if (senhaA === senhaB) {
      if ($("#senha").hasClass("is-invalid")) {
        $("#senha").removeClass("is-invalid");
        $("#confirma-senha").removeClass("is-invalid");
      }
      $("#senha").toggleClass("is-valid");
      $("#confirma-senha").toggleClass("is-valid");
      $('#buttonCadastrar').removeAttr("disabled");
    } else {
      if ($("#senha").hasClass("is-valid")) {
        $("#senha").removeClass("is-valid");
        $("#confirma-senha").removeClass("is-valid");
      }
      $("#senha").toggleClass("is-invalid");
      $("#confirma-senha").toggleClass("is-invalid");
      $("#buttonCadastrar").attr("disabled", true);
    }
  });
}

function limpaFormularioCep() {
  // Limpa valores do formulário de cep.
  $("#cidade").val("");
  $("#endereco").val("");
  $("#bairro").val("");
}

function completarEndereco() {
  // Ao perder o foco do campo CEP, preenche os dados.
  $("#cep").blur(function () {
    //Nova variável "cep" somente com dígitos.
    var cep = $(this).val().replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        $("#cidade").val("...");
        $("#endereco").val("...");
        $("#bairro").val("...");
        //Consulta o webservice viacep.com.br/
        $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
          if (!("erro" in dados)) {
            //Atualiza os campos com os valores da consulta.
            $("#cidade").val(dados.localidade);
            $("#endereco").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
          } else {
            //CEP pesquisado não foi encontrado.
            limpaFormularioCep();
            alert("CEP não encontrado.");
          }
        });
      } else {
        //cep é inválido.     
        limpaFormularioCep();
        alert("Formato de CEP inválido.");
      }
    } else {
      limpaFormularioCep();
    }
  });
}