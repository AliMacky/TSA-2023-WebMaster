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
async function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}
const calculateRotationAngles = (from, to, objectRefIn) => {
  const direction = new THREE.Vector3().copy(to).sub(from).normalize();
  const rotation = new THREE.Euler().setFromQuaternion(objectRefIn.current.quaternion);

  // Calculate rotation angles in radians
  const angleX = Math.atan2(direction.y, direction.z) - rotation.x;
  const angleY = Math.atan2(-direction.x, direction.z) - rotation.y;
  const angleZ = Math.atan2(direction.y, direction.x) - rotation.z;

  return { angleX, angleY, angleZ };
};
const Cube = ({ position, size, goTo }) => {
  const objectRef = useRef();
  const [clicked, setClicked] = useState(false);
  const { camera } = useThree();

  const target = new THREE.Vector3(-2, 1, 0.7);
  const target2 = new THREE.Vector3(0, 0, 0);

  const startPosition = { x: 3, y: 2, z: 3 };
  const startRotation = { y: 0.785398 };


  if (clicked) {
    camera.setLookAt(0, 0, 0);
    // gsap.to(camera.position, {
    //   duration: 1,
    //   x: goTo[0],
    //   y: goTo[1],
    //   z: goTo[2],
    //   ease: 'power3.inOut',
    // });
    // const temp = new THREE.Object3D();
    // temp.position.set(goTo[0], goTo[1], goTo[2]);
    // temp.lookAt(target)
    // // console.log(temp.rotation);
    // gsap.to(camera.rotation, {
    //   duration: 1,
    //   x: temp.rotation.x * -1,
    //   y: temp.rotation.y * -1,
    //   z: temp.rotation.z,
    //   ease: 'power3.inOut',
    // });
  } else if (!clicked) {
    gsap.to(camera.position, {
      duration: 1,
      x: startPosition.x,
      y: startPosition.y,
      z: startPosition.z,
      ease: 'power3.inOut',
    })
    timeout(1000).then(() => {console.log(camera.rotation);camera.lookAt(0, 0, 0); console.log(camera.rotation)});
    const temp = new THREE.Object3D();
    temp.position.set(startPosition.x, startPosition.y, startPosition.z);
    temp.rotation.copy(camera.rotation)
    console.log(temp.rotation);
    temp.lookAt(0, 0, 0)
    console.log(temp.rotation);
  }
  // camera.position.set(0, 0, 5);
  // camera.lookAt(0, 0, 0)
  // 
  return (
    <>
      <mesh ref = {objectRef} position={position} onClick={(event) => { event.stopPropagation(); setClicked(!clicked); }} >
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
  // gsap.set(camera.position, startPosition);
  // gsap.set(camera.rotation, startRotation);


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
