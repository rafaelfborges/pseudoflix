

<?php

	$nome = $_POST["nome"];

	$conn = mysqli_connect("localhost:3306", "root", "root", "primeiro-teste");

	mysqli_query($conn, "insert into tb_dados_usuarios(nome) values('".$nome."')");



?>