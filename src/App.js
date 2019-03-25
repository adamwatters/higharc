import React, { Component } from "react";
import "./App.css";
import * as THREE from "three";

class App extends Component {
  state = {
    x: -100,
    y: 30,
    z: 50
  };

  componentDidMount() {
    this.camera = this.setup();
  }

  componentDidUpdate() {
    const { x, y, z } = this.state;
    this.camera.position.set(x, y, z);
  }

  render() {
    const { x, y, z } = this.state;
    return (
      <div className="controls">
        <span>{`x`}</span>
        <input
          type="text"
          onChange={v => {
            this.setState({ x: v.target.value });
          }}
          label={x}
          value={x}
        />
        <span>y</span>
        <input
          type="text"
          onChange={v => this.setState({ y: v.target.value })}
          label={y}
          value={y}
        />
        <span>z</span>
        <input
          type="text"
          onChange={v => this.setState({ z: v.target.value })}
          label={z}
          value={z}
        />
        <button
          onClick={() => {
            this.camera.lookAt(0, 0, 0);
          }}
        >
          Look At Origin
        </button>
      </div>
    );
  }

  setup() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color("lightblue");
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const { x, y, z } = this.state;
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var houseGeometry = new THREE.BoxGeometry(10, 10, 10);
    var houseMaterial = new THREE.MeshLambertMaterial({
      color: "grey"
    });
    var house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(0, 10, 0);
    scene.add(house);

    var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1000);
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: "green",
      side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = 1.5708;
    scene.add(new THREE.AmbientLight(0x111122));
    var sphere = new THREE.SphereBufferGeometry(30, 16, 8);
    const sun = new THREE.PointLight("white", 10, 0, 100);
    sun.castShadow = true;
    sun.position.set(100, 100, 100);
    sun.add(
      new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: "yellow" }))
    );
    scene.add(sun);

    let clock = 0;
    function animate() {
      requestAnimationFrame(animate);
      sun.position.x = Math.sin(clock / 100) * 500;
      sun.position.y = Math.cos(clock / 100) * 500;
      clock++;
      renderer.render(scene, camera);
    }
    animate();
    return camera;
  }
}

export default App;
