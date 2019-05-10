var cam = new cam();
cam.checkUserMedia();

function cam() {
  var video = document.querySelector('.main__cam__video');
  var mediaRecorder;
  var recordedBlobs = [];
  var options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: 'video/webm;codecs=vp8'
  };

  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

  this.checkUserMedia = function () {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true, video: true },
        function (stream) {
          video.srcObject = stream;
          window.stream = stream;
        },
        function (err) {
          console.log("The following error occurred: " + err);
        }
      );
    }
  }
  this.startRecording = function () {
    mediaRecorder = new MediaRecorder(window.stream, options);
    mediaRecorder.ondataavailable = this.dataAvailable();
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
  this.download = function () {
    var blob = new Blob(recordedBlobs, { type: 'video/webm' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}

// var video = document.querySelector('.main__cam__video');
//   var mediaRecorder;
//   var recordedBlobs;
//   navigator.getUserMedia = navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia;

// if (navigator.getUserMedia) {
//   navigator.getUserMedia({ audio: true, video: true },
//     function (stream) {
//       video.srcObject = stream;
//       window.stream = stream;
//       startRecording();
//     },
//     function (err) {
//       console.log("The following error occurred: " + err);
//     }
//   );
// }

// function startRecording() {
//   var options = {
//     audioBitsPerSecond: 128000,
//     videoBitsPerSecond: 2500000,
//     mimeType: 'video/webm;codecs=vp8'
//   }
//   recordedBlobs = [];

//   mediaRecorder = new MediaRecorder(window.stream, options);
//   mediaRecorder.ondataavailable = dataAvailable;
//   mediaRecorder.start(10);
//   console.log(mediaRecorder.state);
//   console.log("recorder started");
//   setTimeout(pauseRecording, 3000);
// }

// function pauseRecording() {
//   mediaRecorder.pause();
//   console.log("recorder paused");
// }

// function resumeRecording() {
//   mediaRecorder.resume();
//   console.log("recorder resumed");
// }

// function stopRecording() {
//   mediaRecorder.stop();
//   console.log("recorder stopped");
//   // download();
// }

// function dataAvailable(event) {
//   if (event.data && event.data.size > 0) {
//     recordedBlobs.push(event.data);
//   }
// }

// function download() {
//   var blob = new Blob(recordedBlobs, { type: 'video/webm' });
//   var url = window.URL.createObjectURL(blob);
//   var a = document.createElement('a');
//   a.style.display = 'none';
//   a.href = url;
//   a.download = 'test.webm';
//   document.body.appendChild(a);
//   a.click();
//   setTimeout(function () {
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   }, 100);
// }


















/* Video */

// var mediaSource = new MediaSource();
// mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
// var mediaRecorder;
// var recordedBlobs;
// var sourceBuffer;

// var gumVideo = document.querySelector('video#gum');
// var recordedVideo = document.querySelector('video#recorded');

// var recordButton = document.querySelector('button#record');
// var playButton = document.querySelector('button#play');
// var downloadButton = document.querySelector('button#download');
// recordButton.onclick = toggleRecording;
// playButton.onclick = play;
// downloadButton.onclick = download;

// console.log(location.host);

// var isSecureOrigin = location.protocol === 'https:' ||
//   location.host.includes('localhost');

// if (!isSecureOrigin) {
//   alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' +
//     '\n\nChanging protocol to HTTPS');
//   location.protocol = 'HTTPS';
// }

// var constraints = {
//   audio: true,
//   video: true
// };

// navigator.mediaDevices.getUserMedia(
//   constraints
// ).then(
//   successCallback,
//   errorCallback
// );

// function successCallback(stream) {
//   console.log('getUserMedia() got stream: ', stream);
//   window.stream = stream;
//   gumVideo.srcObject = stream;
// }

// function errorCallback(error) {
//   console.log('navigator.getUserMedia error: ', error);
// }

// function handleSourceOpen(event) {
//   console.log('MediaSource opened');
//   sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
//   console.log('Source buffer: ', sourceBuffer);
// }

// function handleDataAvailable(event) {
//   if (event.data && event.data.size > 0) {
//     recordedBlobs.push(event.data);
//   }
// }

// function handleStop(event) {
//   console.log('Recorder stopped: ', event);
// }

// function toggleRecording() {
//   if (recordButton.textContent === 'Записать видео') {
//     startRecording();
//   } else {
//     stopRecording();
//     recordButton.textContent = 'Записать видео';
//     playButton.disabled = false;
//     downloadButton.disabled = false;
//   }
// }


// function startRecording() {
//   var options = {mimeType: 'video/webm;codecs=vp9', bitsPerSecond: 100000};
//   recordedBlobs = [];
//   try {
//     mediaRecorder = new MediaRecorder(window.stream, options);
//   } catch (e0) {
//     console.log('Unable to create MediaRecorder with options Object: ', options, e0);
//     try {
//       options = {mimeType: 'video/webm;codecs=vp8', bitsPerSecond: 100000};
//       mediaRecorder = new MediaRecorder(window.stream, options);
//     } catch (e1) {
//       console.log('Unable to create MediaRecorder with options Object: ', options, e1);
//       try {
//         options = 'video/mp4';
//         mediaRecorder = new MediaRecorder(window.stream, options);
//       } catch (e2) {
//         alert('MediaRecorder is not supported by this browser.');
//         console.error('Exception while creating MediaRecorder:', e2);
//         return;
//       }
//     }
//   }
//   console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
//   recordButton.textContent = 'Закончить запись';
//   playButton.disabled = true;
//   downloadButton.disabled = true;
//   mediaRecorder.onstop = handleStop;
//   mediaRecorder.ondataavailable = handleDataAvailable;
//   mediaRecorder.start(10); // collect 10ms of data
//   console.log('MediaRecorder started', mediaRecorder);
// }

// function stopRecording() {
//   mediaRecorder.stop();
//   console.log('Recorded Blobs: ', recordedBlobs);
//   recordedVideo.controls = true;
// }

// const pap = pause.onclick = function() {
//   mediaRecorder.pause();
//   console.log("recording paused");
// };

// function play() {
//   var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
//   recordedVideo.src = window.URL.createObjectURL(superBuffer);
// }

// function download() {
//   var blob = new Blob(recordedBlobs, {type: 'video/webm'});
//   var url = window.URL.createObjectURL(blob);
//   var a = document.createElement('a');
//   a.style.display = 'none';
//   a.href = url;
//   a.download = 'test.webm';
//   document.body.appendChild(a);
//   a.click();
//   setTimeout(function() {
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   }, 100);
// }

// /* button  RECORD */

// document.getElementById('record').addEventListener('click', function () {
//   toggle(document.querySelectorAll('.camera_recordNow'));
// });

// function toggle (elements, specifiedDisplay) {
//   var element, index;

//   elements = elements.length ? elements : [elements];
//   for (index = 0; index < elements.length; index++) {
//     element = elements[index];

//     if (isElementHidden(element)) {
//       element.style.display = '';

//       // If the element is still hidden after removing the inline display
//       if (isElementHidden(element)) {
//         element.style.display = specifiedDisplay || 'block';
//       }
//     } else {
//       element.style.display = 'none';
//     }
//   }
//   function isElementHidden (element) {
//     return window.getComputedStyle(element, null).getPropertyValue('display') === 'none';
//   }
// }

// /*  Timer  */

// function startTimer(duration, display) {
//   var timer = duration, minutes, seconds;
//   setInterval(function () {
//     minutes = parseInt(timer / 60, 10)
//     seconds = parseInt(timer % 60, 10);

//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     display.textContent = minutes + ":" + seconds;

//     if (--timer < 0) {
//       timer = duration;
//     }
//   }, 1000);
// }

// window.onload = function () {
//   var fiveMinutes = 45 * 2,
//     display = document.querySelector('#time');
//   startTimer(fiveMinutes, display);
// };

// /* Pause button */
// function displayPause() {
//   document.getElementById('pause').style.display = 'block';
// };

// record.addEventListener("click", displayPause());

// pause.onclick = function() {

//   mediaRecorder.pause();
//   console.log("recording paused");
// };