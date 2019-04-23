import React from 'react';

//
// getScrollPercent Return 0 - 100
//

function getScrollPercent() {
  return (
    (window.pageYOffset / (document.body.clientHeight - window.innerHeight)) * 100
  );
}

const styles = {
  float: 'left',
  position: 'fixed',
  top: 0,
  left: 0,
  maxWidth: '100%',
  maxHeight: '100%',
  zIndex: -1,
  opacity: 0
};

class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvasDom;
    this.camera;
    this.cameraDebuging;
    this.scene;
    this.renderer;
    this.controls;
    this.group = new THREE.Group();
    this.bgColor = 0xf0f0f0;
    this.timeline = 0;
    this.cameraAnimation;
    this.helper = false;
    this.clock = new THREE.Clock();

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    var scope = this;
    this.canvasDom = this.canvasRef.current;

    this.init();
    this.timeline = this.getScroll();
    this.cameraAnimation = this.iniCameraAnimation();
    setTimeout( () => {
      scope.setState( state => ({ loading: false }))
    }, 50);
  }

  init() {
    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.z = 1300;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( this.bgColor );
    if(!this.helper) this.scene.fog = new THREE.Fog( this.bgColor, 100, 1000 );

    if(this.helper) {
      let axesHelper = new THREE.AxesHelper( 50 );
      this.scene.add( axesHelper );
    }

    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 ).normalize();
    this.scene.add( light );

    let geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
    for ( let i = 0; i < 600; i ++ ) {
      let object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {
        color: 0x42A5F5,
        transparent: true,
        opacity: 0.6
      } ) );

      object.matrixPosition = new THREE.Vector3(
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400);
      
      object.spherePosition = new THREE.Vector3()
        .subVectors(object.matrixPosition, object.position)
        .normalize();
      let ranPosition = 140 + (Math.floor(Math.random() * 16) + 5);
      object.spherePosition.multiplyScalar( ranPosition );

      this.group.add( object );
    }
    
    this.scene.add( this.group );

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvasDom});
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    
    if(this.helper) {
      this.cameraDebuging = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
      this.cameraDebuging.position.set(400, 300, 600);
      
      let cameraHelper = new THREE.CameraHelper( this.camera );
      scene.add( cameraHelper );

      this.controls = new THREE.OrbitControls( this.cameraDebuging, this.renderer.domElement );
      this.controls.enableZoom = false;
    }

    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  renderAnimation() {
    this.camera.lookAt( this.scene.position );
    this.camera.updateMatrixWorld();
    
    // smooth updateTimeline along to scroll
    this.timeline = this.updateTimeLine(this);
    this.timelineControl(this);
  
    // cameraAnimation
    this.cameraAnimation.mixer.update(this.clock.getDelta());
    this.cameraAnimation.clipAction.time = (this.cameraAnimation.clip.duration * this.timeline) / 100;
    
    // render scene
    if(this.helper) {
      this.renderer.render( this.scene, this.cameraDebuging );
    } else {
      this.renderer.render( this.scene, this.camera );
    }
  }

  iniCameraAnimation() {
    var positionKF = new THREE.VectorKeyframeTrack(
      '.position',
      [ 0, 1, 2, 3, 4 ],
      [ 0, 0, 1000,
        -200, 0, 400,
        -300, 0, 300,
        -100, 0, -100,
        0, 0, -1200
      ] );

    var clip = new THREE.AnimationClip( 'Action', -1, [ positionKF ] );
    // setup the AnimationMixer
    var mixer = new THREE.AnimationMixer( this.camera );
    // create a ClipAction and set it to play
    var clipAction = mixer.clipAction( clip );
    clipAction.play();
    clipAction.paused = true;

    return {
      clip: clip,
      mixer: mixer,
      clipAction: clipAction
    }
  }

  getScroll() {
    let scrollFunction = this.props.getScrollPercent || getScrollPercent
    return scrollFunction()
  }

  updateTimeLine() {
    var scroll = this.getScroll();
    var distances = Math.abs(this.timeline - scroll);
    
    if( distances != 0) {
      var speed = distances / 10;
  
      // keep camera slow/never stop moving
      // if(speed < 0.05) speed = distances / 50;
  
      if( this.timeline < scroll ) {
         this.timeline += speed;
      } else {
        this.timeline -= speed;
      }
    }
    return this.timeline;
  }

  timelineControl() {
    let scope = this;
    // show sphere before scalar
    if( this.timeline > 3 && !this.group.isShown ) {
      for ( let i = 0, len = this.group.children.length; i < len; i ++ ) {
        let object = this.group.children[i];
        object.position.copy( object.spherePosition )
      }
      this.group.isShown = true;
    } else if(this.timeline < 3 && this.group.isShown) {
      for ( let i = 0, len = this.group.children.length; i < len; i ++ ) {
        let object = this.group.children[i];
        object.isInPosition = false;
        object.position.set(0, 0, 0);
      }
      this.group.isShown = false;
    }
    
    // scalar points to origin position
    if( this.timeline > 10) {
      for ( let i = 0, len = this.group.children.length; i < len; i ++ ) {
        let object = this.group.children[i];
        scope.scalarDownObjectTo(object, object.matrixPosition, 10);
      }
    } else {
      this.group.rotation.y += 0.003;
      this.group.rotation.z += 0.003;
      for ( let i = 0, len = this.group.children.length; i < len; i ++ ) {
        let object = this.group.children[i];
        scope.scalarObjectTo(object, object.spherePosition, 8);
      }
    }
    
    // Rotation group object
    // if( this.timeline > 40 && this.timeline < 50) this.group.rotation.y += 0.004;
    if( this.timeline > 90 ) this.group.rotation.z += 0.01;
  }

  scalarDownObjectTo(object, vec3, speed) {
    if( !object.isInPosition ) {
      let dis = object.position.distanceTo(vec3);
      let dir = new THREE.Vector3()
        .subVectors(vec3, object.position)
        .normalize();
  
      if( dis < 0.5 ) {
        object.isInPosition = true;
      }
  
      object.position.add( dir.multiplyScalar(dis/speed) );
    }
  }
  
  scalarObjectTo(object, vec3, speed) {
    if( object.isInPosition ) {
      let dis = vec3.distanceTo(object.position);
      let dir = new THREE.Vector3()
        .subVectors(vec3, object.position)
        .normalize();
  
      if( dis < 0.5 ) {
        object.isInPosition = false;
      }
  
      object.position.add( dir.multiplyScalar(dis/speed) );
    }
  }

  update() {
    if(!this.canvasDom) return;
    this.renderAnimation();
  }

  render() {
    const newStyle = this.state.loading ? styles : Object.assign({}, styles, {opacity: 1} )
    return <canvas style={newStyle} ref={this.canvasRef} className={'canvas'} />;
  }
}

export default Matrix;