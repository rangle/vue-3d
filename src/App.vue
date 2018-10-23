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
      renderer: new THREE.WebGLRenderer(),

      // Cube: cube object to render.
      cube: {}
    };
  },
  methods: {
    // init does inital set-up for three.js rendering
    init: function() {
      // Canvas: Render area in the window.
      this.$data.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.$data.renderer.domElement); // attach to html

      // camera defaults to middle, move it out a bit
      this.$data.camera.position.z = 5;
    },
    // createCube creates a cube & adds to canvas
    createCube: function() {
      // vertices and faces
      let geometry = new THREE.BoxGeometry(1, 1, 1);

      // material to display
      let material = new THREE.MeshBasicMaterial({ color: 0x00ff0 });

      // applies material & geometry
      this.$data.cube = new THREE.Mesh(geometry, material);

      this.$data.scene.add(this.$data.cube);
    },
    animate: function() {
      // creates a loop 60 times/sec of the animate function
      requestAnimationFrame(this.animate);

      // increment done to cube, 60 times/sec
      this.$data.cube.rotation.x += 0.02;
      this.$data.cube.rotation.y += 0.01;

      // render scene with camera.
      this.$data.renderer.render(this.$data.scene, this.$data.camera);
    }
  },
  // called when App component mounts.
  mounted: function() {
    this.init();
    this.createCube();
    this.animate();
  }
};
</script>
