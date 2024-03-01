import "../index.css";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, Suspense, useEffect } from "react";
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
import { IoIosHome } from "react-icons/io";
import { PiGarageBold } from "react-icons/pi";
import { MdGarage, MdKitchen } from "react-icons/md";

const origin = new THREE.Vector3(0, 0, 0);
const cameraStartPosition = new THREE.Vector3(4, 0, 0);

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

const Cube = ({ position, size, goTo, lookAt, setShowButtons }) => {
    const objectRef = useRef();
    const cameraCubeRef = useRef();
    const [clicked, setClicked] = useState(false);
    const { camera } = useThree();
    const target = lookAt;
    useFrame(() => { });
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
                    if (!clicked) {
                        setShowButtons(false);
                    } else {
                        setTimeout(() => {
                            setShowButtons(true);
                        }, 1000);
                    }
                }}
            >
                <boxGeometry args={size} />
                <meshStandardMaterial color={"white"} opacity={0} transparent />
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

const Message = ({ showButtons }) => {
    const [showText, setShowText] = useState(true);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const { camera } = useThree();

    useEffect(() => {
        const dontShowAgainValue = localStorage.getItem("calcDontShowAgain");
        if (dontShowAgainValue) {
            setShowText(false);
            setDontShowAgain(true);
        }
    }, []);

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setDontShowAgain(checked);
        if (checked) {
            localStorage.setItem("calcDontShowAgain", "true");
        } else {
            localStorage.removeItem("calcDontShowAgain");
        }
    };

    return (
        <>
            <Html fullscreen>
                {showText && (
                    <div
                        className="flex flex-col justify-center items-center w-[100vw] h-[100vh] mx-auto text-white text-center bg-gray-900 shadow-md bg-opacity-85"
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <div>
                            <h1 className="text-6xl lg:text-7xl p-2 font-bold bg-gradient-to-br from-green-500 to-sky-500 text-transparent bg-clip-text max-w-sm lg:max-w-6xl">
                                Calculator
                            </h1>
                            <div className="rounded-lg bg-gray-800 p-4 relative inline-block max-w-xs mt-6 lg:max-w-6xl border-2 border-green-500">
                                <p className="text-base lg:text-2xl max-w-6xl">
                                    This calculator will calculate the money
                                    saved and emissions reduced by switching to
                                    an electric car from a gas car. Click anywhere to zoom in
                                    and begin.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4 relative inline-block max-w-xs lg:max-w-6xl mt-6 border-2 border-green-500">
                            <div className="flex flex-col items-center">
                                <label className=" text-base lg:text-2xl">
                                    <input
                                        type="checkbox"
                                        checked={dontShowAgain}
                                        onChange={handleCheckboxChange}
                                        className="mr-2 h-4 w-4"
                                        id="asdfghjkl"
                                    />
                                    Don't show this message again
                                </label>
                            </div>
                        </div>
                        <button
                            className="text-2xl bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mt-5"
                            onClick={() => setShowText(false)}
                        >
                            OK
                        </button>
                    </div>
                )}
                {!showText && showButtons && (
                    <div className="flex flex-col p-1 ">
                        <button
                            className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() => (window.top.location.href = "/")}
                        >
                            <IoIosHome className="text-5xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() =>
                                (window.top.location.href = "/garage")
                            }
                        >
                            <PiGarageBold className="text-5xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() =>
                                (window.top.location.href = "/trash")
                            }
                        >
                            <FaTrashAlt className="text-3xl lg:text-4xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() =>
                                (window.top.location.href = "/kitchen")
                            }
                        >
                            <MdKitchen className="text-5xl" />
                        </button>
                    </div>
                )}
            </Html>
        </>
    );
};

const iFrameStyle = {
    width: "681px",
    height: "565px",
    border: "none",
    display: "block",
    margin: "0 auto",
};

const Calculator = () => {
    const IGNORE_ME = useGLTF(
        "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
    );
    useEffect(() => {
        document.title = "Calculator";
    }, []);
    const [showButtons, setShowButtons] = useState(true);
    return (
        <div className="w-screen h-screen bg-gray-600">
            <div style={{ width: "100vw", height: "100vh" }}>
                <Suspense fallback={<Loading />}>
                    <Canvas>
                        {/* <CameraControls /> */}
                        <Cube
                            position={[-2, 0, 0]}
                            size={[1, 100, 100]}
                            goTo={new THREE.Vector3(1.3, 1.42, 0)}
                            lookAt={new THREE.Vector3(1, 1.42, 0)}
                            textRotation={[0, Math.PI / 4, 0]}
                            textPosition={[-0.5, 1, -0.5]}
                            setShowButtons={setShowButtons}
                        />
                        <Model />
                        <Message showButtons={showButtons} />
                        <primitive
                            object={IGNORE_ME.scene}
                            position={[0, 1, 0]}
                            scale={0.105}
                        >
                            <Html
                                wrapperClass="laptop"
                                position={[0.8, 4.02, -0.25]}
                                transform
                                rotation={[0, Math.PI * 0.5, 0]}
                            >
                                <div id="wrapper">
                                    <iframe src="/calc" style={iFrameStyle} />
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
