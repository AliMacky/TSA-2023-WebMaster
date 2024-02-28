import "../index.css";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, Suspense } from "react";
import Loading from "../components/Loading";
import { DirectionalLightHelper } from "three";
import { gsap } from "gsap";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import montserrat from "../assets/Montserrat.json";
import * as THREE from "three";
import { Html, useGLTF, useHelper, PerspectiveCamera } from "@react-three/drei";
import { smoothAnimation } from "../smoothAnimation";
import { calculateRotation } from "../calculateRotation";
import {
    FaTrashAlt,
    FaCalculator,
    FaSearch,
    FaFolderMinus,
    FaTrash,
} from "react-icons/fa";
import { PiGarageBold } from "react-icons/pi";

const Model = () => {
    const { camera } = useThree();
    camera.position.set(4, 0, 0);
    camera.lookAt(0, 0, 0);
    const directionalLightRef = useRef();

    // Load the 3D model using GLTFLoader
    const model = useGLTF("models/calculator.glb");
    return (
        <>
            <primitive object={model.scene} />
            <directionalLight
                position={[2, 5, 2]}
                intensity={5}
                ref={directionalLightRef}
                color={"white"}
            />
            <ambientLight intensity={0.5} />
            {/* <ModelViewer scale="40" modelPath={"./models/garage.glb"} /> */}
        </>
    );
};

const iFrameStyle = {
    width: "681px",
    height: "560px",
    border: "none",
    display: "block",
    margin: "0 auto",
};

const Calculator = () => {
    const IGNORE_ME = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
    );
    return (
        <div className="w-screen h-screen bg-gray-600">
            <div style={{ width: "100vw", height: "100vh" }}>
                <Suspense fallback={<Loading />}>
                    <Canvas>
                        {/* <CameraControls /> */}
                        <Model />
                        <primitive
                            object={IGNORE_ME.scene}
                            position={[0, 0, 0]}
                            scale={0.105}
                        >
                            <Html
                                wrapperClass="laptop"
                                position={[-0.12, 13.9, -0.3]}
                                transform
                                rotation={[0, Math.PI * 0.5, 0]}
                            >
                                <div id="wrapper">
                                    <iframe src="/screen" style={iFrameStyle} />
                                </div>
                            </Html>
                        </primitive>
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};

export default Calculator;
