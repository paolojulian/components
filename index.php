<?php
include_once 'db.php';
$result = $mysqli -> query('
    SELECT * FROM notifications
    ORDER BY created DESC
');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Components</title>
</head>
<body>
    <!-- <v-notifier>
    </v-notifier> -->
    <div class="app">
        <input type="text"
            name="message"/>
        <button>
            Send Notif
        </button>
    </div>

    <script src="client/v-notifier/index.js"></script>
    <script src="index.js"></script>
</body>
</html>