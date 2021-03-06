var inputTel = document.querySelector(".main__form__tel");
var inputBtn = document.querySelector(".main__form__btn");
var number = 19;

inputTel.addEventListener("input", function () {
    var r = this.value.replace(/\D/g, "");
    r = r.replace(/^.{2}/, '');
    if (r.length > 8) {
        r = r.replace(/^(\d{3})(\d{3})(\d{2})(\d{0,2}).*/, "+38 ($1) $2-$3-$4");
    } else if (r.length > 6) {
        r = r.replace(/^(\d{3})(\d{3})(\d{0,2})/, "+38 ($1) $2-$3");
    } else if (r.length > 3) {
        r = r.replace(/^(\d{3})(\d{0,3})/, "+38 ($1) $2");
    } else if (r.length > 0) {
        r = r.replace(/^(\d{0,3})/, "+38 ($1");
    }
    this.value = r;
});

inputBtn.addEventListener('click', function () {
    if (inputTel.value.length == number) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://httpbin.org/delay/1');
        xhr.send(inputTel.value);
        document.querySelector(".spiner").classList.add('d-block');

        xhr.onload = function () {
            location.href = "code.html"
            console.dir(this);
        }

        xhr.onerror = function () {
            console.log('error');
        }

    } else {
        console.log('error');
    }
});


