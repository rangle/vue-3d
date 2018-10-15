<template>
  <h1>3D Workshop Test
  </h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import * as THREE from 'three';

// declare in global scope. 
var camera, scene, renderer;
var cube2, cube1;

init();
animate(); 

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}

// init creates all of the inital set-up before animation. 
function init() {
  // ESSENTIAL DISPLAY SETUP 
  // Three parts that are needed for a display are a scene, camera, and renderer.

  scene = new THREE.Scene();
  // FOV, Aspect Ratio, Near and Far Clipping Plane (when the rendering is cut off)
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  // WebGL is a standard renderer, can use others if displaying on older browsers. 
  renderer = new THREE.WebGLRenderer();
  // size of the canvas that you're going to be rendering.
  renderer.setSize( window.innerWidth, window.innerHeight );
  // attaching a canvas element to the body of the html. Renderer.domElement is a canvas element. 
  document.body.appendChild( renderer.domElement );

  ////////////////////////////////////////////
  // OBJECT CREATION
  var geometry1 = new THREE.BoxGeometry( 1, 1, 1 ); //provides the vertices and faces
  var material1 = new THREE.MeshBasicMaterial( { color: 0xFF5733 } ); //provides the color
  cube1 = new THREE.Mesh( geometry1, material1 ); // takes an object and applies the material1 to it. 
  cube1.position.x = -2;

  var geometry2 = new THREE.BoxGeometry( 1, 1, 1 ); //provides the vertices and faces
  var material2 = new THREE.MeshBasicMaterial( { color: 0x20ff11 } ); //provides the color
  cube2 = new THREE.Mesh( geometry2, material2 ); // takes an object and applies the material1 to it. 
  cube2.position.x = 2;

  // referencing the scene we created earlier. 
  scene.add( cube2 ); // by default, added to (0,0,0) (Same as the camera. )
  scene.add( cube1 );

  camera.position.z = 5; // to move the camera outside of the object. 
}

////////////////////////////////////////////
// RENDERING THE SCENE 
function animate() { //creates a loop with requestAnimationFrame to refresh 60times per second. 
  requestAnimationFrame( animate );
  
  cube2.rotation.x += 0.1;
  cube2.rotation.y += 0.0;

  cube1.rotation.x += 0.02;
  cube1.rotation.y -= 0.01;

	renderer.render( scene, camera );
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
