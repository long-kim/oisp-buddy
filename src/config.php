<?php
    $conn = new mysqli("localhost","root","","oisp-buddy");
    if($conn->connect_error){
        die("Connect Failed".$conn->connect_error);
    }
?>