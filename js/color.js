var body = $('body');
var colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple'];
var currentIndex = 0;
setInterval(function () {
    body.css({
        backgroundColor: colors[currentIndex]
    });
    if (!colors[currentIndex]) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
}, 100);
body {
    transition: 200ms ease;
}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>