<?php
header('Access-Control-Allow-Origin: localhost'); 
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
//header('Content-Type: application/json'); // Ensure response is JSON
?>

<?php
$host = "localhost";
$username = "oh420_PHPTest";  // Change if using another username
$password = "123PHPTest";      // Change if your MySQL has a password
$database = "oh420_PHPTesting";

// Connect to database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}
   // $tbls = $conn->query("SHOW TABLES");

    //if ($tbls->num_rows > 0) {
     //   echo "<h2>Tables in Database:</h2>";
     //   echo "<ul>";
     //   while ($row = $tbls->fetch_array()) {
      //      echo "<li>" . $row[0] . "</li>";
    //    }
     //   echo "</ul>";
    //} else {
    //    echo "<p>No tables found in database.</p>";
    //}

    //print("<h1>Connected to DB</h1>")
?>
