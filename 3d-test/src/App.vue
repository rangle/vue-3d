<template>
<div>
  <h1>3D Workshop Test
  </h1>
  <button v-on:click="increment">Click Me</button>
</div>
</template>

<script>
import * as THREE from 'three';

// declare in global scope. 
var camera, scene, renderer;
var cube2, cube1;

var twitterAuthHeader;

init();
animate();
authTwitter().then((val) => {
  getMeNasaTweets();  
})

export default {
  name: 'app',
  data: function() {
    return ({
        scene: {},
        camera: {},
        renderer: {},
        cube2: {},
        cube1: {}
      }) 
  },
  methods: {
    animate: function() {
      requestAnimationFrame( this.animate );
      this.cube2.rotation.x += 0.1;
      this.cube2.rotation.y += 0.0;

      this.cube1.rotation.x += 0.02;
      this.cube1.rotation.y -= 0.01;

      this.renderer.render( this.scene, this.camera );
    },
    increment: function() {
      this.cube2.rotation.y -= 0.3;
    }
  },
  created: function () { // creates all initial set-up before animation.
     // ESSENTIAL DISPLAY SETUP 
    // Three parts that are needed for a display are a scene, camera, and renderer.

    this.scene = new THREE.Scene();
    // FOV, Aspect Ratio, Near and Far Clipping Plane (when the rendering is cut off)
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // WebGL is a standard renderer, can use others if displaying on older browsers. 
    this.renderer = new THREE.WebGLRenderer();
    // size of the canvas that you're going to be rendering.
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    // attaching a canvas element to the body of the html. Renderer.domElement is a canvas element. 
    document.body.appendChild( this.renderer.domElement );

    ////////////////////////////////////////////
    // OBJECT CREATION
    var geometry1 = new THREE.BoxGeometry( 1, 1, 1 ); //provides the vertices and faces
    var material1 = new THREE.MeshPhongMaterial( { color: 0xffffff,} );
    this.cube1 = new THREE.Mesh( geometry1, material1 ); // takes an object and applies the material1 to it. 
    this.cube1.position.x = -2;

    var geometry2 = new THREE.BoxGeometry( 1, 1, 1 ); //provides the vertices and faces
    var material2 = new THREE.MeshPhongMaterial( { color: 0x20ff11 } ); //provides the color
    this.cube2 = new THREE.Mesh( geometry2, material2 ); // takes an object and applies the material1 to it. 
    this.cube2.position.x = 2;

    //LIGHTNING
    //first point light
    var light = new THREE.PointLight(0xffffff, 1, 4000);
    light.position.set(50, 0, 0);
    //the second one
    var light_two = new THREE.PointLight(0xffffff, 1, 4000);
    light_two.position.set(-100, 800, 800);
    //And another global lightning some sort of cripple GL
    var lightAmbient = new THREE.AmbientLight(0x404040);
    this.scene.add(light, light_two, lightAmbient);

    // referencing the scene we created earlier. 
    this.scene.add( this.cube2 ); // by default, added to (0,0,0) (Same as the camera. )
    this.scene.add( this.cube1 );

    this.camera.position.z = 5; // to move the camera outside of the object. 
  },
  mounted: function () { //starts animation loop. 
    this.animate();
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

async function authTwitter() {
  const resp = await fetch("http://localhost:8081/auth/twitter", {
    method: "POST"
  })

  const body = await resp.json();
  twitterAuthHeader = body.authHeaderValue
}

function getMeNasaTweets() {
  // const nasaTweets = await fetch("https://api.twitter.com/1.1/search/tweets.json?q=nasa&count=1", {
  //   method: "POST",
  //   headers: {
  //     "Authorization": twitterAuthHeader,
  //     "Access-Control-Allow-Origin": "*"
  //   }
  // })
  // const respBody = await nasaTweets.json();
  // console.log(respBody);
  try {
    const resp = fetch("http://localhost:8081/getStuff", {
      method: "GET"
    })
    .then()
    .catch(err => console.log(err.message))
    const data = await resp.json();
    console.log(data);
  } catch (e) {
    console.log(e.message);
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
