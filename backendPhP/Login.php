<?php
header('Access-Control-Allow-Origin: https://oh420.brighton.domains'); 
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');    
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

include('sessionManager.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    require 'db.php';

    $inputEmail = htmlspecialchars($_POST['email']);
    $inputPassword = htmlspecialchars($_POST['password']);

    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $inputEmail);
    $stmt->execute();
    $stmt->store_result(); 

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($passHash);
        $stmt->fetch();

        if (password_verify($inputPassword, $passHash)) {
            setSession("email", $inputEmail);
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Incorrect Password"]);
        }
    } else {
        echo json_encode(["error" => "No user by that email"]);
    }

    $stmt->close();
}
?>
