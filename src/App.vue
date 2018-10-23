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
      cube: {},

      // Light: gives scene light sources.
      light1: new THREE.PointLight(0xffffff, 1, 4000),
      light2: new THREE.PointLight(0xffffff, 1, 4000),
      lightAmbient: new THREE.AmbientLight(0x404040)
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
      let material = new THREE.MeshPhongMaterial({ color: 0xffffff });

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
    },
    addLight: function() {
      this.$data.light1.position.set(-100, 800, 800);
      this.$data.light2.position.set(50, 0, 0);
      this.$data.scene.add(
        this.$data.light1,
        this.$data.light2,
        this.$data.lightAmbient
      );
    }
  },
  // called when App component mounts.
  mounted: function() {
    this.init();
    this.createCube();
    this.addLight();
    this.animate();
  }
};
</script>
