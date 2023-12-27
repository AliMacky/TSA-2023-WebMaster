import "../index.css";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect, Suspense } from "react";
import Loading from "../components/Loading";
import {
	useHelper,
	PerspectiveCamera,
	CameraControls,
} from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { gsap } from "gsap";
import ModelViewer from "../ModelViewer";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import montserrat from "../assets/Montserrat.json";
import * as THREE from "three";
import Laptop from "../components/Laptop";

const origin = new THREE.Vector3(0, 1, 0);
const cameraStartPosition = new THREE.Vector3(0, 2, 3);

import { Html, useGLTF } from "@react-three/drei";

const iFrameStyle = {
	width: "670px",
	height: "570px",
	border: "none",
	borderRadius: "20px",
	display: "block",
	margin: "0 auto",
};

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
				args={["Click Me!", { font, size: 0.2, height: 0.1 }]}
			/>
			<meshPhysicalMaterial attach="material" color="white" />
		</mesh>
	);
};

const Cube = ({ position, size, goTo, lookAt, textRotation, textPosition }) => {
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
				<meshStandardMaterial color={"white"} opacity={0.2} transparent />
				{/* <TextMesh args={[textPosition, textRotation]}  /> */}
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
	camera.position.set(0, 2, 3);
	camera.lookAt(0, 1, 0);
	const IGNORE_ME = useGLTF(
		"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
	);
	const directionalLightRef = useRef();
	useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");

	return (
		<>
			<Cube
				position={[0, 2, 0.5]}
				size={[1, 1, 1]}
				goTo={new THREE.Vector3(0, 2, 1)}
				lookAt={new THREE.Vector3(0, 1.8, 0)}
				textRotation={[0, Math.PI / 4, 0]}
				textPosition={[-0.5, 1, -0.5]}
			/>

			<primitive
				object={IGNORE_ME.scene}
				position={[-0.034, 1.83, 0.2]}
				scale={0.05}
			>
				<Html wrapperClass="laptop" position={[-0.13, 1.55, 2]} transform>
					<div id="wrapper">
						<iframe src="/screen" style={iFrameStyle} />
					</div>
				</Html>
			</primitive>

			<directionalLight
				position={[2, 5, 2]}
				intensity={3}
				ref={directionalLightRef}
				color={"white"}
			/>
			<ambientLight intensity={0.5} />
			<ModelViewer scale="40" modelPath={"./models/table.glb"} />
		</>
	);
};

const Room = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<div style={{ width: "100vw", height: "100vh" }}>
				<Suspense fallback={<Loading />}>
					<Canvas>
						<Scene />
					</Canvas>
				</Suspense>
			</div>
		</>
	);
};

// const Room = () => {
// 	return (
// 		<>
// 			<Canvas>
// 				<Scene />
// 			</Canvas>
// 		</>
// 	);
// };

export default Room;
