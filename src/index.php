<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no">
    <title>Oisp_Buddy_Search_User</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <!-- jQuery library --> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <style>
    #search_label{
        border: 1px solid #000000;
        font-size: 16px;
        padding: 10px;
        background: #f1d829;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        -webkit-border-top-right-radius: 5px;
        -webkit-border-bottom-right-radius:5px;
        -moz-border-radius-bottomright:5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    #search_text{
        border: 1px solid #000000;
        border-right:none;
        font-size:16px;
        padding: 10px;
        outline: none;
        width: 250px;
        -webkit-border-top-left-radius: 5px;
        -webkit-border-bottom-left-radius:5px;
        -moz-border-radius-bottomleft:5px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    </style>

</head>

<body class="bg-secondary">
    <div class="container-fluid">
        <div class="row justify-content-center">       
            <div class="col-md-10 bg-light mt-2 rounded pb-3">
                <h1 class="text-primary p-2">Search Users </h1>
                <hr>
                <div class="form-inline">
                    <input type="text" name="search" id="search_text"  onmousedown="active();" onBlur="inactive();" placeholder="search something here"><label for="search" class="font-weight-bold lead text-dark" id="search_label">Search</label>
                </div>
                <hr>
                <?php
                    include 'config.php';
                    $stmt=$conn->prepare("SELECT * FROM users");
                    $stmt->execute();
                    $result=$stmt->get_result();
                ?>
                <table class="table table-hover table-light table-striped" id="table-data">
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while($row=$result->fetch_assoc()){ ?>
                            <tr>
                                <td><?= $row['user_id']; ?></td>
                                <td><?= $row['username']; ?></td>
                                <td><?= $row['email']; ?></td>
                                <td><?= $row['role']; ?></td>
                                <td><?= $row['first_name']; ?></td>
                                <td><?= $row['last_name']; ?></td>                                
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>  
    </div>   
    <script type="text/javascript">
        $(document).ready(function(){
            $("#search_text").keyup(function(){
                var search = $(this).val();
                 $.ajax({
                    url:'action.php',
                    method:'post',
                    data:{query:search},
                    success:function(response){
                        $('#table-data').html(response);
                    }
                });
            });
        });  
        function active(){
            var searchBar= document.getElementById("search_text");

            if(searchBar.value == 'search something here'){
                searchBar.value = '';
                searchBar.placeholder = "search something here";
            }
        }

        function inactive(){
            var searchBar= document.getElementById("search_text");

            if(searchBar.value == ''){
                searchBar.value = 'search something here';
                searchBar.placeholder = '';
            }
        }
    </script>  
</body>
</html>