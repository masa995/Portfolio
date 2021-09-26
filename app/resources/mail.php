<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['text'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mary-mail995@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'KFAfFe7RY6QnbU01hJmb'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('mary-mail995@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('masyanya.995@yandex.ru');     // Кому будет уходить письмо 

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с дипломного проекта';
$mail->Body    = '<b>Пользователь</b> ' .$name . ' оставил заявку <br> <br> <b>Почта:</b> ' .$email. '<br> <b>Сообщение:</b> <br>' .$text;
$mail->AltBody = '';

// отправляем

if(!$mail->send()) {
    echo 'Ошибка';
} else {
     echo 'Заявка отправлена';
}
?>