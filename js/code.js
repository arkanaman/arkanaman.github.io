var form = document.querySelector(".main__form");
var inputNum = document.querySelector(".main__form__inputNumber");
var inputBtn = document.querySelector(".main__form__btn");
var infoCallMe = document.querySelector(".main__info__callMe");
var infoTime = document.querySelector(".main__info__time");
var infoCallBank = document.querySelector(".main__info__callBank");

inputNum.addEventListener('keyup', function () {
    var r = this.value;
    if (r.length > 4) {
        r = r.slice(0, -r.length + 4);
    }
    this.value = r;
});

timer();
function timer() {
    var time = 3;
    var div = document.querySelector(".main__info__time__timer");
    var setInt = setInterval(function () {
        var seconds = time % 60;
        var min = time / 60 | 0;
        time--;
        if (seconds < 10) {
            div.childNodes[0].nodeValue= min + ':0' + seconds;
        } else {
            div.childNodes[0].nodeValue= min + ':' + seconds;
        }        
        if (time < 0) {
            clearInterval(setInt);
            callMe();
        }
    }, 1000);
}

function callMe() {
    infoTime.classList.add('d-none');
    infoCallMe.classList.add('d-flex');
}

infoCallMe.addEventListener('click', function () {    
    infoCallMe.classList.remove('d-flex');
    infoCallMe.classList.add('d-none');
    infoCallBank.classList.add('d-flex');
});

inputBtn.addEventListener('click', function () {
    if (inputNum.value.length == 4) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'http://httpbin.org/delay/5');
        xhr.send();
        document.querySelector(".main__spiner").classList.add('d-block');
        xhr.onload = function () {
            location.href="step1.html"
            console.dir(this);
        }

        xhr.onerror = function () {
            console.log('error');
        }

    } else {
        console.log('error');
    }

});