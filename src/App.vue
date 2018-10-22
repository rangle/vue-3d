<template>
  <h1>3D Vue Workshop Demo</h1>
  <!-- Three.js Canvas will be attached here in init()-->
</template>

<script>
import * as THREE from "three";

export default {
  name: "app",
  data: function() {
    return {
      // Scene: What and where to render.
      scene: new THREE.Scene(),

      // Camera: Where to view from.
      camera: new THREE.PerspectiveCamera(
        75, // Field of View
        window.innerWidth / window.innerHeight, //Aspect Ratio
        0.1, // Near Clipping Plane
        1000 // Far Clipping Plane
      ),

      // Renderer: Displays scenes.
      renderer: new THREE.WebGLRenderer()
    };
  },
  methods: {
    // init() does inital set-up for three.js rendering.
    init: function() {
      // Canvas: Render area in the window.
      this.$data.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.$data.renderer.domElement); // attach to html

      // camera defaults to middle, move it out a bit
      this.$data.camera.position.z = 5;
    }
  },
  // called
  mounted: function() {
    this.init();
  }
};
</script>
