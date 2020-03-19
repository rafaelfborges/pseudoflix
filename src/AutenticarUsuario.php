<?php
    require 'ConexaoBD.php';

    $email = $_POST['email'];
	$senha = $_POST['senha'];

	$query = mysqli_query($conn,"SELECT * FROM tb_dados_usuarios WHERE email = '$email' AND flag_confirmacao = '1'");
    $row = mysqli_num_rows($query);
    
    if ($row == 1) {
        $query = mysqli_query($conn,"SELECT * FROM tb_dados_usuarios WHERE email = '$email' AND senha = '$senha'");
        $row = mysqli_num_rows($query);
        if ($row > 0){
            echo "Usuário autenticado com sucesso, redirecionando...";
        } else {
            echo "Usuário ou senha inexistente! Confirme seus dados de login novamente.";
        }
    } else {
        echo "Usuário não confirmou o cadastro para logar, por favor, verifique seu e-mail.";
    }
?>