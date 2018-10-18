<template>
<div>
  <h1>3D Workshop Test
  </h1>
  <button v-on:click="increment">Click Me</button>
</div>
</template>

<script>
import * as THREE from "three";

export default {
  name: "app",
  data: function() {
    return {
      scene: {},
      camera: {},
      renderer: {},
      cube: {}
    };
  },
  methods: {
    animate: function(val1, val2, val3) {
      this.cube.rotation.x += 0.02;
      this.cube.rotation.y -= 0.01;
      this.cube.material.color.setRGB(val1 / 255, val2 / 255, val3 / 255);
      this.renderer.render(this.scene, this.camera);
    },
    increment: function() {
      this.cube.rotation.y -= 0.3;
    }
  },
  created: function() {
    // creates all initial set-up before animation.
    // ESSENTIAL DISPLAY SETUP
    // Three parts that are needed for a display are a scene, camera, and renderer.

    this.scene = new THREE.Scene();
    // FOV, Aspect Ratio, Near and Far Clipping Plane (when the rendering is cut off)
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // WebGL is a standard renderer, can use others if displaying on older browsers.
    this.renderer = new THREE.WebGLRenderer();
    // size of the canvas that you're going to be rendering.
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // attaching a canvas element to the body of the html. Renderer.domElement is a canvas element.
    document.body.appendChild(this.renderer.domElement);

    ////////////////////////////////////////////
    // OBJECT CREATION
    let geometry = new THREE.BoxGeometry(1, 1, 1); //provides the vertices and faces
    let material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    this.cube = new THREE.Mesh(geometry, material); // takes an object and applies the material1 to it.

    //LIGHTNING
    //first point light
    let light = new THREE.PointLight(0xffffff, 1, 4000);
    light.position.set(50, 0, 0);
    //the second one
    let light_two = new THREE.PointLight(0xffffff, 1, 4000);
    light_two.position.set(-100, 800, 800);
    //And another global lightning some sort of cripple GL
    let lightAmbient = new THREE.AmbientLight(0x404040);
    this.scene.add(light, light_two, lightAmbient);

    // referencing the scene we created earlier.
    this.scene.add(this.cube); // by default, added to (0,0,0) (Same as the camera. )

    this.camera.position.z = 5; // to move the camera outside of the object.
  },
  mounted: function() {
    //starts animation loop.
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let userMedia =
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    let source;
    var analyser = audioCtx.createAnalyser();
    analyser.smoothingTimeConstant = 0.85;
    analyser.fftSize = 32;
    // analyser.minDecibels = -90;
    // analyser.maxDecibels = -10;
    navigator.mediaDevices.getUserMedia = constraints =>
      new Promise(function(resolve, reject) {
        userMedia.call(navigator, constraints, resolve, reject);
      });
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function(stream) {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        // analyser.connect(audioCtx.destination);
      })
      .catch(function(err) {
        console.log(err);
      });
    var anim = this.animate;
    let length = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(length);
    let audioLoop = function() {
      requestAnimationFrame(audioLoop);
      analyser.getByteFrequencyData(dataArray);
      anim(dataArray[0], dataArray[3], dataArray[7]);
      console.log(dataArray);
    };
    audioLoop();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
