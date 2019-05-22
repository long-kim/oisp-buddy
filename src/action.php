<?php
    include 'config.php';
    $output='';

    if(isset($_POST['query'])){
        $search=$_POST['query'];
        $stmt=$conn->prepare("SELECT * FROM users WHERE first_name LIKE CONCAT('%',?,'%') OR last_name LIKE CONCAT('%',?,'%')");
        $stmt->bind_param("ss",$search,$search); 
    }
    else{
        $stmt=$conn->prepare("SELECT * FROM users");
    }
    $stmt->execute();
    $result=$stmt->get_result();

    if($result->num_rows>0){
        $output ="<thead>
                  <tr>
                    <th>UserId</th>
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>";
            while($row=$result->fetch_assoc()){
                $output .="
                <tr>
                    <td>".$row['user_id']."</td>
                    <td>".$row['username']."</td>
                    <td>".$row['email']."</td>
                    <td>".$row['role']."</td>
                    <td>".$row['first_name']."</td>  
                    <td>".$row['last_name']."</td>             
                 </tr>";
            }
        $output .="</tbody>";
        echo $output;
    }
    else{
        echo "<h3>No Records found</h3>";
    }
?>