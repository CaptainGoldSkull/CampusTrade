<?php
session_start();

function isLoggedIn(){
    return isset($_SESSION['email']);
}

function setSession($key, $value) {
    $_SESSION[$key] = $value;
}

function getSession($key) {
    return isset($_SESSION[$key]) ? $_SESSION[$key] : null;
}

function clearSession($key) {
    unset($_SESSION[$key]);
}

function destroySession(){
    session_unset();
    session_destroy();
}
?>
