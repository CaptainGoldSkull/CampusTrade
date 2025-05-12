<?php
// Enable CORS
header('Access-Control-Allow-Origin:https://oh420.brighton.domains'); 
header('Content-Type: application/json'); // Ensure response is JSON
header('Access-Control-Allow-Credentials:true');    
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token Authorization');


//DEBUG TOOLS
ini_set('display_errors', 1);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Integrate database.php getting database from brighton domains
    require 'db.php';
    print_r($_POST);

    // Get POST data safely
    $firstName = htmlspecialchars($_POST['firstName']) ?? '';
    $lastName = htmlspecialchars($_POST['lastName']) ?? '';
    $email = htmlspecialchars($_POST['email']) ?? '';
    $password = htmlspecialchars($_POST['password']) ?? '';
    $passHash = password_hash($password,PASSWORD_DEFAULT);
    // DEBUG: Dump received values
    $missingFields = [];

    if (!$firstName) $missingFields[] = 'firstName';
    if (!$lastName)  $missingFields[] = 'lastName';
    if (!$email)     $missingFields[] = 'email';
    if (!$password)  $missingFields[] = 'password';

    if (!empty($missingFields)) {
        echo json_encode([
            "error" => "Missing required fields",
            "missing" => $missingFields,
            "received" => $_POST
        ]);
        exit();
    }

    if ($firstName && $lastName && $email && $passHash){
        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $firstName , $lastName , $email , $passHash);

        if ($stmt->execute()) {
            echo json_encode(["message" => "User '$firstName' '$lastName' added successfully!", "id" => $stmt->insert_id]); 
        } else {
            echo json_encode(["error" => "Error inserting user"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Missing required fields"]);
    }
    $conn->close();
}

    

?>