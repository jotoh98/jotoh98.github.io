(function () {
    new WOW({
        offset: 100
    }).init();

    const options = {
        strings: [
            'public static void main(String[] args) {`<br>' +
            '&nbsp;&nbsp;&nbsp;&nbsp;`System.out.println("Hello there");' +
            '<br>}^2000'
        ],
        typeSpeed: 80,
        fadeOut: true,
        fadeOutDelay: 500,
        loop: true,
    };

    new Typed("#java-code span", options);

    const $lang = document.getElementById("lang");

    $lang.addEventListener('animationend', () => {
        $lang.classList.remove("animate__animated", "animate__bounceIn", "animated");
        $lang.style.animationName = null;
    });
})();