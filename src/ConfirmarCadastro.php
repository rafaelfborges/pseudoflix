<?php
  require 'ConexaoBD.php';
    
  $email = $_GET['usuario'];

  $query = mysqli_query($conn,"SELECT * FROM tb_dados_usuarios WHERE email = '$email'");
  $row = mysqli_num_rows($query);
    
  if($row == 1) {
    $confirmaCadastro = mysqli_query($conn,"UPDATE tb_dados_usuarios SET flag_confirmacao = '1' WHERE email = '$email'");
    if($confirmaCadastro == 1) {
      $result = "Usuário confirmado com sucesso!";
    }
  } else {
    $result = "Problemas ao confirmar! Favor, entre em contato com o administrador.";
  }
?>

<!doctype html>
<html lang="en">

<head>
  <title>Pseudoflix - Cadastro</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <!-- Fonte -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">

  <!--Fontawesome CDN-->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
    integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

  <!-- Global CSS -->
  <link rel="stylesheet" href="/pseudoflix/assets/css/reset.css">
  <link rel="stylesheet" href="/pseudoflix/assets/css/global.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="/pseudoflix/assets/css/cadastro.css">

  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="/pseudoflix/assets/js/jquery-3.4.1.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
    crossorigin="anonymous"></script>

  <!-- Custom JS -->
  <script src='/pseudoflix/assets/js/jquery.md5.js'></script>

</head>

<body class="text-center">
  <nav class="navbar navbar-dark bg-primary">
    <a class="navbar-brand font-weight-bolder" href="/pseudoflix/">Pseudoflix</a>
  </nav>
  <div class="conteiner mt-4">
    <span>
      <?php
        echo $result;
      ?>
    </span><a href="/pseudoflix/">Voltar para Home.</a>
  </div>
</body>

</html>