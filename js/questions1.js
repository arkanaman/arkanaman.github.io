var pause = false;
var setInt;
var time = 90;
var startBtn = document.querySelector('.main__button.--start');
var stopBtn = document.querySelector('.main__button.--stop');
var pauseBtn = document.querySelector('.main__button.--pause');
var continueBtn = document.querySelector('.main__button.--continue');
var overwriteBtn = document.querySelector('.main__button.--overwrite');
var nextBtn = document.querySelector('.main__button.--next');

var mainCam = document.querySelector('.main__cam');
var mainPopup = document.querySelector('.main__popup');


startBtn.addEventListener('click', function () {
    startBtn.classList.add('d-none');
    stopBtn.classList.add('d-flex');
    pauseBtn.classList.add('d-flex');
    document.querySelector('.main__rest_time').classList.add('d-flex');
    mainCam.classList.add('--record');
    timer();
});

stopBtn.addEventListener('click', function () {
    stopBtn.classList.remove('d-flex');
    pauseBtn.classList.remove('d-flex');
    continueBtn.classList.remove('d-flex');
    overwriteBtn.classList.add('d-flex');
    nextBtn.classList.add('d-block');
    mainCam.classList.remove('--pause', '--record');
    mainCam.classList.add('--stop');
    clearInterval(setInt);
    time = 90;
});

pauseBtn.addEventListener('click', function () {
    pauseBtn.classList.remove('d-flex');
    continueBtn.classList.add('d-flex');
    mainCam.classList.remove('--stop', '--record');
    mainCam.classList.add('--pause');
    clearInterval(setInt);
});

continueBtn.addEventListener('click', function () {
    pauseBtn.classList.add('d-flex');
    continueBtn.classList.remove('d-flex');
    mainCam.classList.remove('--stop', '--pause');
    mainCam.classList.add('--record');
    timer();
});

overwriteBtn.addEventListener('click', function () {
    mainPopup.classList.add('d-block');
});

document.querySelector('.main__popup__wrapper__button.--owerwrite').addEventListener('click', function () {
    startBtn.classList.remove('d-none');
    stopBtn.classList.remove('d-flex');
    pauseBtn.classList.remove('d-flex');
    continueBtn.classList.remove('d-flex');
    overwriteBtn.classList.remove('d-flex');
    nextBtn.classList.remove('d-block');
    mainCam.classList.remove('--stop', '--pause', '--record');
    mainPopup.classList.add('d-none');
    mainPopup.classList.remove('d-block');
});

document.querySelector('.main__popup__wrapper__button.--clear').addEventListener('click', function () {
    mainPopup.classList.remove('d-block');
});

function timer() {
    var div = document.querySelector(".main__rest_time__time");
    setInt = setInterval(function () {
        var seconds = time % 60;
        var min = time / 60 | 0;
        time--;
        if (seconds < 10) {
            div.childNodes[0].nodeValue = '0' + min + ':0' + seconds;
        } else {
            div.childNodes[0].nodeValue = '0' + min + ':' + seconds;
        }
        if (time < 0) {
            clearInterval(setInt);
        }
    }, 1000);
}

