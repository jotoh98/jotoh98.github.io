HTMLElement.prototype.scrollSmooth = function (top, duration) {
    const start = Date.now(),
        elem = this,
        from = elem.scrollTop,
        ease = time => time < .5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;

    if (from === top) return;


    function scroll() {
        const currentTime = Date.now(),
            time = Math.min(1, ((currentTime - start) / duration)),
            easedT = ease(time);

        elem.scrollTop = (easedT * (top - from)) + from;

        if (time < 1) window.requestAnimationFrame(scroll);
    }

    window.requestAnimationFrame(scroll)
};

(function () {
    let $body = document.querySelector("html");
    let $header = document.querySelector("header");
    $body.setAttribute("lang", navigator.language);

    document.querySelectorAll("a[href^='#']").forEach($a => {
        $a.addEventListener("click", e => {
            e.preventDefault();
            const elementId = $a.getAttribute("href");
            const element = document.getElementById(elementId.replace("#", ""));
            if (!element) return;

            let scrollOffset = element.offsetTop - $header.clientHeight;

            $body.scrollSmooth(
                scrollOffset,
                1000
            );
        });
    });

    document.querySelectorAll('.tilt').forEach($tilt => {
        const $child = $tilt.querySelector('a');
        let scale = 1;
        $tilt.onmousemove = function (e) {
            const ratioX = (e.pageX - $tilt.offsetLeft) / $tilt.clientWidth
            const ratioY = (e.pageY - $tilt.offsetTop) / $tilt.clientHeight
            $child.style.transform = `perspective(1000px) rotateY(${5 - ratioX * 10}deg) rotateX(${-5 + ratioY * 10}deg) scale3d(${scale},${scale},${scale})`
        }
        $tilt.onmousedown = function () {
            scale = .9
        }
        $tilt.onmouseup = function () {
            scale = 1
        }
        $tilt.onmouseleave = function () {
            scale = 1
            $child.style.transform = null
        }
    })

    const timeline = document.getElementById("timeline");

    if (timeline)
        for (let i = 0; i < 20; i++) {
            const nodes = document.createElement('span');
            timeline.append(nodes)
        }

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

    const $kanban = document.getElementById("kanban");

    if ($kanban) {
        for (let i = 0; i < 3; i++) {
            $kanban.append(document.createElement('span'));
        }
    }
})();