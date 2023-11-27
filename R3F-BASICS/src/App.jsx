import { Canvas, useFrame, useThree } from '@react-three/fiber';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
import { gsap } from 'gsap';
import { MathUtils } from 'three';
import ModelViewer from './ModelViewer';
import { useSpring } from '@react-spring/core';
import * as THREE from 'three';

function SmoothLookAtAnimation({ target }) {
  const camera = useThree((state) => state.camera);
  const positionRef = useRef(camera.position.clone());

  // Update camera lookAt in the render loop
  useFrame(() => {
    positionRef.current.lerp(target, 0.5); // Adjust the interpolation factor as needed
    camera.lookAt(positionRef.current);
  });

  // Update the camera position on target change
  useEffect(() => {
    positionRef.current.copy(camera.position);
  }, [camera.position, target]);

  return null;
}

const Cube = ({ position, size, goTo }) => {
  const [clicked, setClicked] = useState(false);
  const camera = useThree((state) => state.camera);

  const target = new THREE.Vector3(-2, 1, 0.7);

  const startPosition = { x: 3, y: 2, z: 3 };
  const startRotation = { y: 0.785398 };
  console.log(clicked)

  if (clicked) {
    gsap.to(camera.position, {
      duration: 1,
      x: goTo[0],
      y: goTo[1],
      z: goTo[2],
      ease: 'power3.inOut',
    });

  } else if (!clicked) {
    gsap.to(camera.position, {
      duration: 1,
      x: startPosition.x,
      y: startPosition.y,
      z: startPosition.z,
      ease: 'power3.inOut',
    });
  }

  return (
    <>
      if (clicked == true) {
        <SmoothLookAtAnimation target={target} />
      }
      {/* else if (!clicked) {
        <SmoothLookAtAnimation target={new THREE.Vector3(0, 1, 0)} />
      } */}

      <mesh position={position} onClick={(event) => { event.stopPropagation(); setClicked(!clicked); }}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <boxGeometry args={size} />
        <meshStandardMaterial color={'white'} opacity={0.5} transparent />
      </mesh>
    </>
  );
};

const Scene = () => {
  const directionalLightRef = useRef();
  const camera = useThree((state) => state.camera);
  const startPosition = { x: 3, y: 2, z: 3 };
  const startRotation = { y: 0.785398 };
  gsap.set(camera.position, startPosition);
  gsap.set(camera.rotation, startRotation);


  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'white');

  return (
    <>
      <directionalLight position={[2, 5, 2]} intensity={3} ref={directionalLightRef} color={'white'} />
      <ambientLight intensity={0.5} />
      <ModelViewer scale="40" modelPath={"./models/room.glb"} />
      <Cube position={[-2, 1, 0.7]} size={[2, 2, 2]} goTo={[0.3, 2, 0.7, 90, -30]} />
    </>
  );
};

const App = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default App;
