<!DOCTYPE html>
<html>
<head>
    <title>Test Bcrypt</title>
    <script>
        function bcrypt() {
            var password = "";
            <?php if(!empty($_POST['password'])){
                $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
                echo "password = ".$password.";";
            } ?>;
            console.log("" + password);
        }
    </script>
</head>
<body>
    <form action="" method="post">
        <input type="text" name="password" placeholder="password">
        <button type="submit" onclick="bcrypt()">Generate</button>
    </form>
</body>
</html>