import "./index.css";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useHelper, PerspectiveCamera } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { gsap } from "gsap";
import ModelViewer from "./ModelViewer";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import montserrat from "./assets/Montserrat.json";
import * as THREE from "three";

const origin = new THREE.Vector3(0, 1, 0);
const cameraStartPosition = new THREE.Vector3(3, 2, 3);

extend({ TextGeometry });
async function timeout() {
	return new Promise((res) => setTimeout(res));
}

const calculateRotation = (temp, pos, lookAt) => {
	temp.current.position.copy(pos);
	temp.current.lookAt(lookAt);
	return temp.current.rotation;
};

const smoothAnimation = (camera, targetPos, targetRot) => {
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

const TextMesh = (textVals) => {
	const font = new FontLoader().parse(montserrat);
	return (
		<mesh size={1} position={textVals.args[0]} rotation={textVals.args[1]}>
			<textGeometry
				attach="geometry"
				args={["Click Me!", { font, size: 0.2, height: 0.1}]}
			/>
			<meshPhysicalMaterial attach="material" color="white" />
		</mesh>
	);
};

const Cube = ({ position, size, goTo, lookAt, textRotation, textPosition}) => {
	const objectRef = useRef();
	const cameraCubeRef = useRef();
	const [clicked, setClicked] = useState(false);
	const { camera } = useThree();
	const target = lookAt;
	useFrame(() => {});
	if (clicked) {
		const couchRotation = calculateRotation(cameraCubeRef, goTo, target);
		smoothAnimation(camera, goTo, couchRotation);
	} else if (!clicked && cameraCubeRef.current) {
		const startRotation = calculateRotation(
			cameraCubeRef,
			cameraStartPosition,
			origin
		);
		smoothAnimation(camera, cameraStartPosition, startRotation);
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
				<boxGeometry args={size} />
				<meshStandardMaterial color={"white"} opacity={0} transparent />
				<TextMesh args={[textPosition, textRotation]}  />
			</mesh>

			<PerspectiveCamera
				ref={cameraCubeRef}
				makeDefault={false}
				position={cameraStartPosition}
			/>
		</>
	);
};

const Scene = () => {
	const { camera } = useThree();
	camera.position.set(3, 2, 3);
	camera.lookAt(0, 1, 0);
	

	const directionalLightRef = useRef();
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
				lookAt={new THREE.Vector3(-2, 1, 0.7)}
				textRotation={[0, Math.PI / 2, 0]}
				textPosition={[0.75, 0.75, 0.75]}
			/>

			<Cube
				position={[0.5, 1, -2]}
				size={[2, 2, 0.3]}
				goTo={new THREE.Vector3(0.5, 2, 0.5)}
				lookAt={new THREE.Vector3(0.5, 0.5, -2)}	
				textRotation={[0, 0, 0]}
				textPosition={[-0.6, 0.75, 1]}
			/>
		</>
	);
};

const App = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{isLoading ? (
				<>
				<div
					style={{
						width: "100vw",
						height: "100vh",
						backgroundColor: "black",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "white",
						fontSize: "24px",
					}}
				>
					Loading...
				</div>
				<Canvas>
					<Scene />
				</Canvas>
				</>
				
			) : (
				<Canvas>
					<Scene />
				</Canvas>
			)}
		</>
	);
};

// const App = () => {
// 	return (
// 		<>
// 			<Canvas>
// 				<Scene />
// 			</Canvas>
// 		</>
// 	);
// };

export default App;