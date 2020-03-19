
$(document).ready(function () {
  autoCompleteCep();
  cadastrarUsuario();
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
      success: function (msg) {
        alert(msg)
      }
    })
    event.preventDefault();
  });
}

function limpaFormularioCep() {
  // Limpa valores do formulário de cep.
  $("#cidade").val("");
  $("#endereco").val("");
  $("#bairro").val("");
}

function autoCompleteCep() {
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