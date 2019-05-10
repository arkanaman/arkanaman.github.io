var startBtn = document.querySelector('.main__button.--start');
var stopBtn = document.querySelector('.main__button.--stop');
var pauseBtn = document.querySelector('.main__button.--pause');
var continueBtn = document.querySelector('.main__button.--continue');
var overwriteBtn = document.querySelector('.main__button.--overwrite');
var nextBtn = document.querySelector('.main__button.--next');

var mainCam = document.querySelector('.main__cam');
var mainPopup = document.querySelector('.main__popup');
var mainWatch = document.querySelector('.main__cam__watch');

var cam = new cam();
cam.showCam();
function cam() {
    var video = document.querySelector('.main__cam__video');
    var recordedBlobs;
    var mediaRecorder;
    var options = {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: 'video/webm;codecs=vp8'
    };

    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    this.showCam = function () {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true, video: true },
                function (stream) {
                    video.srcObject = stream;
                },
                function (err) {
                    console.log("The following error occurred: " + err);
                }
            );
        }
    }
    this.checkUserMedia = function () {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true, video: true },
                function (stream) {
                    video.srcObject = stream;
                    window.stream = stream;
                    cam.startRecording();
                },
                function (err) {
                    console.log("The following error occurred: " + err);
                }
            );
        }
    }

    this.startRecording = function () {
        console.log(video.srcObject);
        video.controls = false;
        recordedBlobs = [];
        mediaRecorder = new MediaRecorder(window.stream, options);
        mediaRecorder.ondataavailable = this.dataAvailable;
        mediaRecorder.start(10);
    }
    this.pauseRecording = function () {
        mediaRecorder.pause();
    }
    this.resumeRecording = function () {
        mediaRecorder.resume();
    }
    this.stopRecording = function () {
        mediaRecorder.stop();
    }
    this.dataAvailable = function (e) {
        if (e.data && e.data.size > 0) {
            recordedBlobs.push(e.data);
        }
    }
    this.watch = function () {
        var blob = new Blob(recordedBlobs, { type: 'video/webm' });
        var url = window.URL.createObjectURL(blob);
        video.srcObject = null;
        video.src = url;
        video.controls = true;
    }
}

var timer = new Timer();
function Timer() {
    var div = document.querySelector(".main__rest_time__time");
    var setInt;
    var time = 90;
    this.resetTime = function () {
        time = 90;
        div.childNodes[0].nodeValue = '01:30';
    }
    this.start = function () {
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
                stopBtn.click();
            }
        }, 1000);
    };
    this.stop = function () {
        clearInterval(setInt);
    };
}

mainWatch.addEventListener('click', function () {
    mainWatch.classList.remove('d-block');
    cam.watch();
});

startBtn.addEventListener('click', function () {
    startBtn.classList.add('d-none');
    stopBtn.classList.add('d-flex');
    pauseBtn.classList.add('d-flex');
    document.querySelector('.main__rest_time').classList.add('d-flex');
    mainCam.classList.add('--record');
    timer.start();
    cam.checkUserMedia();
});

stopBtn.addEventListener('click', function () {
    stopBtn.classList.remove('d-flex');
    pauseBtn.classList.remove('d-flex');
    continueBtn.classList.remove('d-flex');
    overwriteBtn.classList.add('d-flex');
    nextBtn.classList.add('d-block');
    mainCam.classList.remove('--pause', '--record');
    mainCam.classList.add('--stop');
    mainWatch.classList.add('d-block');
    timer.stop();
    timer.resetTime();
    cam.stopRecording();
});

pauseBtn.addEventListener('click', function () {
    pauseBtn.classList.remove('d-flex');
    continueBtn.classList.add('d-flex');
    mainCam.classList.remove('--stop', '--record');
    mainCam.classList.add('--pause');
    timer.stop();
    cam.pauseRecording();
});

continueBtn.addEventListener('click', function () {
    pauseBtn.classList.add('d-flex');
    continueBtn.classList.remove('d-flex');
    mainCam.classList.remove('--stop', '--pause');
    mainCam.classList.add('--record');
    timer.start();
    cam.resumeRecording();
});

overwriteBtn.addEventListener('click', function () {
    mainPopup.classList.remove('d-none');
    mainPopup.classList.add('d-block');
});

document.querySelector('.main__popup__wrapper__flex__button.--owerwrite').addEventListener('click', function () {
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

document.querySelector('.main__popup__wrapper__flex__button.--clear').addEventListener('click', function () {
    mainPopup.classList.remove('d-block');
});
