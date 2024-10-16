import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 1;
    this.camera.zoom =
      window.innerWidth <= 800
        ? window.innerWidth <= 350
          ? 2
          : 2.5
        : window.innerWidth <= 1024
        ? 3
        : 3.5;
    this.camera.updateProjectionMatrix();

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      // NOTE: Anti-aliasing smooths out the edges.
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.shadowMap.enabled = true;
    canvas.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = Stats();
    // canvas.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0x333333, 5);
    // this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(500, 500, 500);
    this.scene.add(this.directionalLight);

    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize());
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    // this.stats.update();
    // this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
