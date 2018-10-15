<template>
  <h1>3D Workshop Test
  </h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import * as THREE from 'three';


// ESSENTIAL DISPLAY SETUP 
// Three parts that are needed for a display are a scene, camera, and renderer.

var scene = new THREE.Scene();

// FOV, Aspect Ratio, Near and Far Clipping Plane (when the rendering is cut off)
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// WebGL is a standard renderer, can use others if displaying on older browsers. 
var renderer = new THREE.WebGLRenderer();

// size of the canvas that you're going to be rendering.
renderer.setSize( window.innerWidth, window.innerHeight );

// attaching a canvas element to the body of the html. Renderer.domElement is a canvas element. 
document.body.appendChild( renderer.domElement );

////////////////////////////////////////////
// OBJECT CREATION
var geometry = new THREE.BoxGeometry( 1, 1, 1 ); //provides the vertices and faces
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //provides the color
var cube = new THREE.Mesh( geometry, material ); // takes an object and applies the material to it. 

// referencing the scene we created earlier. 
scene.add( cube ); // by default, added to (0,0,0) (Same as the camera. )

camera.position.z = 5; // to move the camera outside of the object. 

////////////////////////////////////////////
// RENDERING THE SCENE 
function animate() { //creates a loop with requestAnimationFrame to refresh 60times per second. 
  requestAnimationFrame( animate );
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate(); 




export default {
  name: 'app',
  components: {
    HelloWorld
  }
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
