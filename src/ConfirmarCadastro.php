<?php
  require 'ConexaoBD.php';
    
  $email = $_GET['usuario'];
  
  $pdo = Conexao::getInstance();
  if($pdo != null){
    try {
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $stmt = $pdo->prepare("SELECT * FROM usuarios_dados WHERE email = '$email'");
      $stmt->execute();

      if($stmt->rowCount() == 1) {
        $stmt = $pdo->prepare("UPDATE usuarios_dados SET flag_confirmacao = '1' WHERE email = '$email'");
        $stmt->execute();
        
        $result[] = $stmt->rowCount();
        http_response_code(201);
      }      
    } catch(PDOException $e){
      $error[] = $stmt->errorCode();
      http_response_code(403);
    }
  }
?>

<!doctype html>
<html lang="en">

<head>
  <title>Pseudoflix - Cadastro</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="msapplication-TileColor" content="#da532c" />
  <meta name="theme-color" content="#ffffff" />
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="../assets/css/bootstrap/bootstrap.min.css" />
  <!-- Global CSS -->
  <link rel="stylesheet" href="../assets/css/global.css">
  <!-- Custom CSS -->
  <link rel="stylesheet" href="../assets/css/cadastro.css">
  <!-- Custom Favicon -->
  <link rel="apple-touch-icon" sizes="180x180" href="../assets/images/favicon/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="../assets/images/favicon/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="../assets/images/favicon/favicon-16x16.png" />
  <link rel="manifest" href="../assets/images/favicon/site.webmanifest" />
  <link rel="mask-icon" href="../assets/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
</head>

<body class="text-center">
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand font-weight-bolder" href="/">
      <img class="logo" src="../assets/images/logo.png" alt="Pseudoflix">
    </a>
  </nav>
  <div class="conteiner mt-4">
    <span>
      <?php
        if($result[0] == 1){
          echo "E-mail confirmado com sucesso!";
        } else {
          echo "Erro! Contate o administrador.";
        }
      ?>
    </span><a href="../index.html">Voltar para Home.</a>
  </div>
  <!-- Required JavaScript -->
  <!-- JQuery, Poppers, Bootstrap and FontAwesome -->
  <script src="../assets/js/utils/jquery-3.5.0.min.js"></script>
  <script src="../assets/js/utils/popper.min.js"></script>
  <script src="../assets/js/utils/bootstrap.min.js"></script>
  <script src="https://kit.fontawesome.com/4f1d3e52f2.js" crossorigin="anonymous"></script>
  <!-- Custom JS -->
</body>

</html>