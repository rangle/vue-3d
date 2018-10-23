<template>
<div>{{name}}</div>
</template>

<script>
export default {
  name: "audio-input",
  data: function() {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    return {
      audioCtx: audioContext,
      userMedia:
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia,
      source: {},
      analyser: audioContext.createAnalyser()
    };
  },
  mounted() {
    this.analyser.smoothingTimeConstant = 0.85; // makes value changes smoother.
    this.analyser.fftSize = 32; //double how many values in data array. (32 -> 16 values.)
    navigator.mediaDevices.getUserMedia = constraints =>
      new Promise(function(resolve, reject) {
        userMedia.call(navigator, constraints, resolve, reject);
      });
    navigator.mediaDevices.getUserMedia
      .getUserMedia({ audio: true })
      .then(
        function(stream) {
          this.source = this.audioCtx.createMediaStreamSource(stream);
          this.source.connect(analyser);
        }.bind(this)
      )
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>