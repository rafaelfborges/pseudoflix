

<?php

	$nome = $_POST["nome"];

	$conn = mysqli_connect("localhost:8889", "root", "root", "eduardolino");

	mysqli_query($conn, "insert into pessoa(nome) values('".$nome."')");



?>