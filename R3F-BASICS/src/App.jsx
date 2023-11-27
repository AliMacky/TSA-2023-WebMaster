import { Canvas, useThree } from '@react-three/fiber';
import './App.css';
import { useRef, useState } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
import { gsap } from 'gsap';
import { MathUtils } from 'three';
import ModelViewer from './ModelViewer';

const Cube = ({ position, size, goTo }) => {
  const [clicked, setClicked] = useState(false);
  const camera = useThree((state) => state.camera);

  const startPosition = { x: 3, y: 2, z: 3 };
  const startRotation = { y: 0.8 };

  if (clicked) {
    gsap.to(camera.position, {
      duration: 1,
      x: goTo[0],
      y: goTo[1],
      z: goTo[2],
      ease: 'power3.inOut',
    });
    gsap.to(camera.rotation, {
      duration: 1,
      y: MathUtils.degToRad(goTo[3]),
      // x: MathUtils.degToRad(goTo[4]),
      ease: 'power3.inOut',
    });

  } else if(!clicked) {
    gsap.to(camera.position, {
      duration: 1,
      x: startPosition.x,
      y: startPosition.y,
      z: startPosition.z,
      ease: 'power3.inOut',
    });
    gsap.to(camera.rotation, {
      duration: 1,
      y: MathUtils.degToRad(startRotation.y + 45),
      // x: MathUtils.degToRad(goTo[4]),
      ease: 'power3.inOut',
    });
  }

  return (
    <>
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
  const startRotation = { y: 0.8 };
  gsap.set(camera.position, startPosition);
  gsap.set(camera.rotation, startRotation);

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'white');

  return (
    <>
      <directionalLight position={[2, 5, 2]} intensity={3} ref={directionalLightRef} color={'white'} />
      <ambientLight intensity={0.5} />
      <ModelViewer scale="40" modelPath={"./models/room.glb"} />
      <Cube position={[-2, 1, 0.7]} size={[2, 2, 2]} goTo={[0.3, 1, 0.7, 90 , -30]} />
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
