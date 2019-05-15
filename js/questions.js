import {cam} from "./cam.js";

var startBtn = document.querySelector('.start');
var stopBtn = document.querySelector('.stop');
var pauseBtn = document.querySelector('.pause');
var continueBtn = document.querySelector('.continue');
var overwriteBtn = document.querySelector('.overwrite');
var nextBtn = document.querySelector('.next');

var popupOverwrite = document.querySelector('.main__popup__wrapper__flex__button.owerwrite');
var popupClear = document.querySelector('.main__popup__wrapper__flex__button.clear')

var mainCam = document.querySelector('.main__cam');
var mainPopup = document.querySelector('.main__popup');
var mainWatch = document.querySelector('.main__cam__watch');
var video = document.querySelector('.main__cam__video');

var videoCam = new cam();
videoCam.showCam();

function Timer(time) {
    var div = document.querySelector(".main__rest_time__time");
    var setInt;
    var time = time;
    var times = time;
    this.resetTime = function () {
        times = time;
        div.childNodes[0].nodeValue = '01:30';
    }
    this.start = function () {
        setInt = setInterval(function () {
            var seconds = times % 60;
            var min = times / 60 | 0;
            times--;
            if (seconds < 10) {
                div.childNodes[0].nodeValue = '0' + min + ':0' + seconds;
            } else {
                div.childNodes[0].nodeValue = '0' + min + ':' + seconds;
            }
            if (times < 0) {
                clearInterval(setInt);
                stopBtn.click();
            }
        }, 1000);
    };
    this.stop = function () {
        clearInterval(setInt);
    };
}
var timer = new Timer(5);

mainWatch.addEventListener('click', function () {
    mainWatch.classList.remove('d-block');
    videoCam.watch();
});

startBtn.addEventListener('click', function () {
    startBtn.classList.add('d-none');
    stopBtn.classList.add('d-flex');
    pauseBtn.classList.add('d-flex');
    document.querySelector('.main__rest_time').classList.add('d-flex');
    mainCam.classList.remove('--start');
    mainCam.classList.add('--record');
    timer.start();
    videoCam.checkUserMedia();
});

stopBtn.addEventListener('click', function () {
    stopBtn.classList.remove('d-flex');
    pauseBtn.classList.remove('d-flex');
    continueBtn.classList.remove('d-flex');
    overwriteBtn.classList.add('d-flex');
    nextBtn.classList.add('d-block');
    mainCam.classList.remove('--pause', '--record');
    mainWatch.classList.add('d-block');
    timer.stop();
    videoCam.stopRecording();
});

pauseBtn.addEventListener('click', function () {
    pauseBtn.classList.remove('d-flex');
    continueBtn.classList.add('d-flex');
    mainCam.classList.remove('--stop', '--record');
    mainCam.classList.add('--pause');
    timer.stop();
    videoCam.pauseRecording();
});

continueBtn.addEventListener('click', function () {
    pauseBtn.classList.add('d-flex');
    continueBtn.classList.remove('d-flex');
    mainCam.classList.remove('--stop', '--pause');
    mainCam.classList.add('--record');
    timer.start();
    videoCam.resumeRecording();
});

overwriteBtn.addEventListener('click', function () {
    mainPopup.classList.remove('d-none');
    mainPopup.classList.add('d-block');
});

popupOverwrite.addEventListener('click', function () {
    startBtn.classList.remove('d-none');
    stopBtn.classList.remove('d-flex');
    pauseBtn.classList.remove('d-flex');
    continueBtn.classList.remove('d-flex');
    overwriteBtn.classList.remove('d-flex');
    nextBtn.classList.remove('d-block');
    mainCam.classList.remove('--stop', '--pause', '--record');
    mainPopup.classList.add('d-none');
    mainPopup.classList.remove('d-block');
    mainCam.classList.add('--start');
    document.querySelector('.main__cam__watch').classList.remove('d-block');
    document.querySelector('.main__cam__watch').classList.add('d-none');
    video.controls = false;
    videoCam.showCam();
    timer.resetTime();
});

popupClear.addEventListener('click', function () {
    mainPopup.classList.remove('d-block');
});