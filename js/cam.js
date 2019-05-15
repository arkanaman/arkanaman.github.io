var video = document.querySelector('.main__cam__video');

export function cam() {
    var recordedBlobs;
    var mediaRecorder;
    var cam = this;
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
                    alert('Нет доступа к камере или микрофону');           
                }
            );
        } else {
            alert('В вашем браузере не поддерживается запись с камеры');  
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
                    alert('Нет доступа к камере или микрофону');
                }
            );
        } else {
            alert('В вашем браузере не поддерживается запись с камеры');  
        }
    }
    this.startRecording = function () {
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
};