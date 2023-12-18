import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useHelper, PerspectiveCamera } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { gsap } from "gsap";
import { MathUtils } from "three";
import ModelViewer from "./ModelViewer";
import { useSpring } from "@react-spring/core";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Text } from "@react-three/drei";
import montserrat from "./assets/Montserrat.json";
import * as THREE from "three";
extend({ TextGeometry });
async function timeout(delay) {
	return new Promise((res) => setTimeout(res, delay));
}

const calculateRotation = (temp, pos, lookAt) => {
	temp.current.position.copy(pos);
	temp.current.lookAt(lookAt);
	return temp.current.rotation;
};

const smoothAnimation = (camera, targetPos, targetRot, duration) => {
	gsap.to(camera.position, {
		duration: 1,
		x: targetPos.x,
		y: targetPos.y,
		z: targetPos.z,
		ease: "power3.inOut",
	});
	gsap.to(camera.rotation, {
		duration: 1,
		x: targetRot.x,
		y: targetRot.y,
		z: targetRot.z,
		ease: "power3.inOut",
	});
};

const TextMesh = () => {
	const font = new FontLoader().parse(montserrat);
	return (
		<mesh size={1} position={[0.75, 0.5, 0.75]} rotation={[0, Math.PI / 2, 0]}>
			<textGeometry
				attach="geometry"
				args={["Click Me!", { font, size: 0.2, height: 0.1 }]}
			/>
			<meshPhysicalMaterial attach="material" color="white" />
		</mesh>
	);
};

const Cube = ({ position, size, goTo }) => {
	const objectRef = useRef();
	const cameraCubeRef = useRef();
	const [clicked, setClicked] = useState(false);
	const { camera } = useThree();
	const target = new THREE.Vector3(-2, 1, 0.7);
	const startPosition = new THREE.Vector3(3, 2, 3);
	const origin = new THREE.Vector3();
	useFrame((state) => {});
	if (clicked) {
		const couchRotation = calculateRotation(cameraCubeRef, goTo, target);
		smoothAnimation(camera, goTo, couchRotation, 1);
	} else if (!clicked && cameraCubeRef.current) {
		const startRotation = calculateRotation(
			cameraCubeRef,
			startPosition,
			origin
		);
		smoothAnimation(camera, startPosition, startRotation, 1);
	}

	return (
		<>
			<mesh
				ref={objectRef}
				position={position}
				onClick={(event) => {
					event.stopPropagation();
					setClicked(!clicked);
				}}
			>
				<boxGeometry args={[0.1, 0.1, 0.1]} />
				<boxGeometry args={size} />
				<meshStandardMaterial color={"white"} opacity={0} transparent />
				<TextMesh />
			</mesh>

			<PerspectiveCamera
				ref={cameraCubeRef}
				makeDefault={false}
				position={[3, 2, 3]}
			/>
		</>
	);
};

const Scene = () => {
	const directionalLightRef = useRef();
	const camera = useThree((state) => state.camera);
	const startPosition = { x: 3, y: 2, z: 3 };
	const startRotation = { y: 0.785398 };

	useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");

	return (
		<>
			<directionalLight
				position={[2, 5, 2]}
				intensity={3}
				ref={directionalLightRef}
				color={"white"}
			/>
			<ambientLight intensity={0.5} />
			<ModelViewer scale="40" modelPath={"./models/room.glb"} />
			<Cube
				position={[-2, 1, 0.7]}
				size={[2, 2, 2]}
				goTo={new THREE.Vector3(0.3, 2, 0.7)}
			/>
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
