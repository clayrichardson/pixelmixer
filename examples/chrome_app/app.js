

  var glWidth = window.innerWidth;
  var glHeight = window.innerHeight;

  var scene;
  var renderer;
  var camera;
  var controls;
  var container;

window.addEventListener("load", function() {


    // ----------------


    // ** Standard Three.js setup

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer(); 
    renderer.setSize( glWidth, glHeight );
    renderer.autoClear = false;

    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement ); 

    camera = new THREE.PerspectiveCamera( 30, glWidth / glHeight, 1, 100000 );
    camera.position.z = 2000;
    controls = new THREE.TrackballControls( camera, renderer.domElement);


    // ----------------


    // ** Initialize PixelMixer

    PX.init(scene, renderer);
    PX.setSize(glWidth, glHeight);
    PX.pointSprite = "../images/nodeflare250.png";


    // ----------------


    // ** Add a simple grid of Nodes 

    var params = {};    // Position coordinates for the entire grid
    params.x = -850;    
    params.y = -300;
    params.z = -0;
    params.width = 52;    // How many pixels for the entire grid
    params.height = 20;
    params.pitch = 33;    // How far each pixel is spaced

    PX.hardware.addSimpleNodeGrid(params);
    PX.updateNodePoints();


    // ----------------


    // ** Add a shader to Channel 1

    PX.simpleSetup({channel: 1, ids: ["SimpleSwirl"]});


    // ----------------


    // ** Set some param values on the Clip

    // Set param1 on the clip to turn the color blue (for example this could be any ui setting params)
    PX.set("p1", .7, 1, 1, 1); // Channel 1, Pod 1, Clip 1

    // Set mix on the clip to be .9
    PX.set("mix", .9, 1, 1, 1); // Channel 1, Pod 1, Clip 1


    // ----------------


    // ** Start the main loop

    animate();


  });

  function animate() {

    // Main update loop
    if(PX.ready){

      // Update the API
      PX.update();

      // Update Three.js
      controls.update();
      renderer.render( scene, camera );
    }

    // Keep repeating the animation loop
    requestAnimationFrame( animate );
  }


  function onWindowResize() {

    // Resize logic
    glWidth = window.innerWidth;
    glHeight = window.innerHeight;

    PX.setSize(glWidth, glHeight);

    camera.aspect = glWidth / glHeight;
    camera.updateProjectionMatrix();
    controls.handleResize();

  }
  window.addEventListener( 'resize', onWindowResize, false );
