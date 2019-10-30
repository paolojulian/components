<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Components</title>
</head>
<body>
    <style>
        .notifications {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            width: 300px;
            max-width: 100%;
        }
    </style>
    <div class="wrapper">
        <input type="text"
            name="message"
            value=""
        />
        <button>
            Send
        </button>
    </div>
    <script src="client/v-notifier/index.js" type="module"></script>
    <script>
        const button = document.querySelector('.wrapper button');
        const message = document.querySelector('.wrapper input[name="message"]');
        const notifications = document.querySelector('.notifications');
        const sendMessage = async() => {
            try {
                await fetch('/send-message.php', {
                    method: 'POST',
                    body: JSON.stringify({ message: message.value })
                })
            } catch (e) {
                console.log(e)
            }
        }
        button.addEventListener('click', sendMessage);
    </script>
</body>
</html>