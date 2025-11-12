<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletando os dados do formulário
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Destinatário do email (substitua pelo seu email)
    $to = "ruilightii@gmail.com";

    // Assunto do email
    $subject = "Novo Orçamento: " . $name;

    // Corpo do email
    $body = "
    Nome: $name\n
    Email: $email\n
    Telefone: $phone\n
    Mensagem:\n$message
    ";

    // Cabeçalhos do email
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Tenta enviar o email
    if (mail($to, $subject, $body, $headers)) {
        // Email enviado com sucesso
        echo "Email enviado com sucesso!";
    } else {
        // Falha no envio
        echo "Erro ao enviar email. Por favor, tente novamente.";
    }
} else {
    // Se não for uma requisição POST, redireciona de volta para o formulário
    header("Location: index.html");
    exit;
}
?>