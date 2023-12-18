import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
import * as THREE from 'three'
const Marker = () => {
    const [clicked, setClicked] = useState(false);
    const markerRef = useRef();
    const vec = new THREE.Vector3();

    useFrame(state => {
        if (clicked) {
            state.camera.lookAt(markerRef.current.position);
            state.camera.position.lerp(vec.set(0, 0, 10), 0.1);
            state.camera.updateProjectionMatrix();
        }
        return null;
    })
    return (
        <mesh ref={markerRef} onClick={(event) => { event.stopPropagation(); setClicked(!clicked); }}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={'white'} opacity={0.5} transparent />
        </mesh>
    )
}
const Scene = () => {
    const directionalLightRef = useRef();
    const startPosition = { x: 3, y: 2, z: 3 };
    const startRotation = { y: 0.785398 };
    // gsap.set(camera.position, startPosition);
    // gsap.set(camera.rotation, startRotation);


    useHelper(directionalLightRef, DirectionalLightHelper, 0.5, 'white');
    camera.position.set(startPosition.x, startPosition.y, startPosition.z);
    return (
        <>
            <directionalLight position={[2, 5, 2]} intensity={3} ref={directionalLightRef} color={'white'} />
            <ambientLight intensity={0.5} />
            <Marker />
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


export default App
