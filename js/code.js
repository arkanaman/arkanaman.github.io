var form = document.querySelector(".main__form");
var inputNum = document.querySelector(".main__form__number");
var inputBtn = document.querySelector(".main__form__btn");
var infoCallMe = document.querySelector(".main__info__callMe");
var infoTime = document.querySelector(".main__info__time");
var infoCallBank = document.querySelector(".main__info__callBank");
var number = 4;

inputNum.addEventListener('input', function () {
    var r = this.value;
    if (r.length > number) {
        r = r.slice(0, -r.length + number);
    }
    this.value = r;
});

function Timer(time) {
    var div = document.querySelector(".main__info__time__timer");
    var setInt;
    var time = time;
    this.start = function () {
        setInt = setInterval(function () {
            var seconds = time % 60;
            var min = time / 60 | 0;
            time--;
            if (seconds < 10) {
                div.childNodes[0].nodeValue = min + ':0' + seconds;
            } else {
                div.childNodes[0].nodeValue = min + ':' + seconds;
            }
            if (time < 0) {
                clearInterval(setInt);
                callMe();
            }
        }, 1000);
    };
}
var timer = new Timer(5);
timer.start();

function callMe() {
    infoTime.classList.add('d-none');
    infoCallMe.classList.add('d-flex');
}

infoCallMe.addEventListener('click', function () {
    infoCallMe.classList.remove('d-flex');
    infoCallMe.classList.add('d-none');
    infoCallBank.classList.add('d-flex');

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://httpbin.org/delay/0');
    xhr.send('call');

    xhr.onload = function () {
        console.dir(this);
    }

    xhr.onerror = function () {
        console.log('error');
    }
});

inputBtn.addEventListener('click', function () {
    if (inputNum.value.length == number) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://httpbin.org/delay/1');
        xhr.send(inputNum.value);
        document.querySelector(".spiner").classList.add('d-block');
        xhr.onload = function () {
            location.href = "step1.html"
            console.dir(this);
        }

        xhr.onerror = function () {
            console.log('error');
        }

    } else {
        console.log('error');
    }

});