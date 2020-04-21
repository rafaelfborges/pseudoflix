$(document).ready(function () {
  completarEndereco();
  cadastrarUsuario();
  validarSenha();
});

function cadastrarUsuario() {
  $("#formCadastro").submit(function () {
    let dados = $(this).serializeArray();
    dados.map((item) => {
      if(item.name === "senha" || item.name === "confirma-senha"){
        item.value = $.MD5(item.value);
      }
    })
    $.ajax({
      url: "src/CadastrarUsuario.php",
      cache: false,
      data: $.param(dados),
      type: "POST",
      dataType: 'JSON',
      success: (response) => {
        alert("Usuário cadastrado com sucesso! Confirme sua conta através do e-mail.");
      },
      error: (request, status) => {
          if (request.responseJSON[0].includes(1062)) {
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
    const senhaA = $("#senha");
    const senhaB = $("#confirma-senha");

    if (senhaA.val() === senhaB.val()) {
      if(senhaA.hasClass("is-invalid")) {
        senhaA.removeClass("is-invalid");
        senhaB.removeClass("is-invalid");
      }
      senhaA.toggleClass("is-valid");
      senhaB.toggleClass("is-valid");
      $("#buttonCadastrar").removeAttr("disabled");
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
  function limpaFormulario() {
    // Limpa valores do formulário de cep.
    $("#cidade").val("");
    $("#endereco").val("");
    $("#bairro").val("");
  }
  //Quando o campo cep perde o foco.      
  $("#cep").blur(function () {
    //Nova variável "cep" somente com dígitos.
    let cep = $(this).val().replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep !== "") {
      //Expressão regular para validar o CEP. 
      const validacep = /^[0-9]{8}$/;
      //Valida o formato do CEP.   
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        $("#cidade").val("Carregando...");
        $("#endereco").val("Carregando...");
        $("#bairro").val("Carregando...");
        //Consulta o webservice viacep.com.br
        $.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
          if (!("erro" in dados)) {
            //Atualiza os campos com os valores da consulta.        
            $("#cidade").val(dados.localidade);
            $("#endereco").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
          } else {
            //CEP pesquisado não foi encontrado.   
            limpaFormulario();
            alert("CEP não encontrado.");
          }
        });
      } else {
        //cep é inválido.          
        limpaFormulario();
        alert("Formato de CEP inválido.");
      }
    } else {
      //cep sem valor, limpa formulário.  
      limpaFormulario();
    }
  });
}