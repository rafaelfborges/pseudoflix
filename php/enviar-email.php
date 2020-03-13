
 <?php

	$email = $_POST["email"];
	date_default_timezone_set('Etc/UTC');
	require 'PHPMailer/PHPMailerAutoload.php';
	$tituloEmail = "Confirmação de Cadastro";

	$message = 'Seu Cadastro foi feito com sucesso!!';

	$mail= new PHPMailer;
	$mail->IsSMTP(); 
	$mail->CharSet = 'UTF-8';   
	$mail->SMTPDebug = 2;       // 0 = nao mostra o debug, 2 = mostra o debug
	$mail->SMTPAuth = true;     
	$mail->SMTPSecure = 'ssl';  
	$mail->Host = 'smtp.gmail.com'; 
	$mail->Port = 465; 
	$mail->Username = 'pseudoflixpuc@gmail.com'; 
	$mail->Password = 'Pseudo123';
	$mail->SetFrom('pseudoflixpuc@gmail.com', 'PseudoFlix Inc');
	$mail->addAddress($email,'');
	$mail->Subject = $tituloEmail;
	$mail->msgHTML($message);
       
	$mail->send();


?>
