import React, { Suspense, useRef, useState, useEffect } from "react";
import {
	useHelper,
	CameraControls,
	Environment,
	useGLTF,
} from "@react-three/drei";
import {
	Canvas,
	extend,
	useFrame,
	useThree,
	useLoader,
} from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import ModelViewer from "../ModelViewer";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
const GarageModel = () => {
	const { camera } = useThree();
	camera.position.set(-2, 3, -7);
	camera.lookAt(0, 0, 0);
	const directionalLightRef = useRef();

	// Load the 3D model using GLTFLoader
	const model = useGLTF("models/garage.glb");
	return (
		<>
			<primitive object={model.scene} />
			<directionalLight
				position={[2, 5, 2]}
				intensity={5}
				ref={directionalLightRef}
				color={"warm"}
			/>
			<ambientLight intensity={0.5} />
			{/* <ModelViewer scale="40" modelPath={"./models/garage.glb"} /> */}
		</>
	);
};

const Garage = () => {
	return (
		<div className="w-screen h-screen bg-gray-600">
			<div style={{ width: "100vw", height: "100vh" }}>
				<Suspense fallback={<Loading />}>
					<Canvas>
						{/* <CameraControls /> */}
						<GarageModel />
					</Canvas>
				</Suspense>
			</div>
		</div>
	);
};
export default Garage;
