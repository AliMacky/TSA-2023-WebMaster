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
import { MdKitchen } from "react-icons/md";

// import ModelViewer from "../ModelViewer";

const origin = new THREE.Vector3(0, 1, 0);
const cameraStartPosition = new THREE.Vector3(0, 2, 3);

const RoomModel = () => {
    const model = useGLTF("models/table.glb");
    return (
        <>
            <primitive object={model.scene} />
        </>
    );
};

const iFrameStyle = {
    width: "682px",
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

const Cube = ({ position, size, goTo, lookAt, setButtonPosition }) => {
    const objectRef = useRef();
    const cameraCubeRef = useRef();
    const [clicked, setClicked] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
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
                        setButtonPosition(999);
                        setTimeout(() => {
                            setShowButtons(true);
                        }, 1000);
                    } else {
                        setShowButtons(false);
                        setTimeout(() => {
                            setButtonPosition(0);
                        }, 1000);
                    }
                }}
            >
                <boxGeometry args={size} />
                <meshStandardMaterial color={"white"} opacity={0} transparent />
                {/* <TextMesh args={[textPosition, textRotation]}  /> */}
            </mesh>

            {showButtons && window.innerWidth < 1100 && (
                <Html position={[-0.41, 2.23, 0.5]}>
                    <div className="flex flex-row p-1 ">
                        <button
                            className="flex items-center justify-center font-kanit p-1 h-10 w-10 bg-green-600 m-2 text-white text-center shadow-2xl rounded-lg"
                            onClick={() =>
                                (window.top.location.href = "/garage")
                            }
                        >
                            <PiGarageBold className="text-xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 h-10 w-10 bg-green-600 m-2 text-white text-center shadow-2xl rounded-lg"
                            onClick={() =>
                                (window.top.location.href = "/garage")
                            }
                        >
                            <FaCalculator />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 h-10 w-10 bg-green-600 m-2 text-white text-center shadow-2xl rounded-lg"
                            onClick={() =>
                                (window.top.location.href = "/trash")
                            }
                        >
                            <FaTrashAlt />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 h-10 w-10 bg-green-600 m-2 text-white text-center shadow-2xl rounded-lg"
                            onClick={() =>
                                (window.top.location.href = "/Kitchen")
                            }
                        >
                            <MdKitchen />
                        </button>
                    </div>
                </Html>
            )}

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
    let gotoZ = 1;
    if (window.innerWidth < 1100) gotoZ = 2;
    const [iFramePosition, setiFramePosition] = useState(999);
    const [buttonPosition, setButtonPosition] = useState(0);

    return (
        // <Suspense fallback={<Loading />}>
        <>
            <Message
                setiFramePosition={setiFramePosition}
                buttonPosition={buttonPosition}
            />
            <Cube
                position={[-0.035, 1.9, -0.5]}
                size={[100, 100, 1]}
                goTo={new THREE.Vector3(0, 2, gotoZ)}
                lookAt={new THREE.Vector3(0, 1.8, 0)}
                textRotation={[0, Math.PI / 4, 0]}
                textPosition={[-0.5, 1, -0.5]}
                setButtonPosition={setButtonPosition}
            />

            <primitive
                object={IGNORE_ME.scene}
                position={[iFramePosition, 1.83, 0.2]}
                scale={0.05}
            >
                <Html
                    wrapperClass="laptop"
                    position={[-0.13, 1.55, 2]}
                    transform
                >
                    <div id="wrapper">
                        <iframe src="/screen" style={iFrameStyle} />
                    </div>
                </Html>
            </primitive>

            <directionalLight
                position={[2, 5, 2]}
                intensity={3}
                color={"white"}
            />
            <ambientLight intensity={0.5} />
            <RoomModel />
            {/* <ModelViewer scale="40" modelPath={"./models/table.glb"} /> */}
        </>
        // </Suspense>
    );
};

const Message = ({ setiFramePosition, buttonPosition }) => {
    const [showText, setShowText] = useState(true);
    return (
        <>
            {showText && (
                <Html
                    fullscreen
                    style={{ transform: "translate3d(0%,-17.8%,0)" }}
                >
                    <div
                        className="flex flex-col justify-center items-center w-[100vw] h-[100vh] mx-auto text-white text-center bg-gray-900 shadow-md bg-opacity-85"
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <div>
                            <h1 className="text-6xl p-2 lg:text-7xl font-bold bg-gradient-to-br from-green-500 to-sky-500 text-transparent bg-clip-text">
                                Welcome!
                            </h1>
                            <div className="mt-6">
                                <div className="rounded-lg bg-gray-800 p-4 relative inline-block max-w-xs lg:max-w-7xl border-2 border-green-500">
                                    <p className="text-base lg:text-xl">
                                        This website uses React, React Three
                                        Fiber, and 3D models designed with
                                        Blender to create an interactive,
                                        engaging experience.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="rounded-lg bg-gray-800 p-4 relative inline-block max-w-xs lg:max-w-6xl border-2 border-green-500">
                                    <p className="text-base lg:text-xl">
                                        Learn more about this website{" "}
                                        <a
                                            href="/about"
                                            className="text-blue-500 underline"
                                        >
                                            here
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="rounded-lg bg-gray-800 p-4 relative inline-block max-w-xs lg:max-w-6xl border-2 border-green-500">
                                    <p className="text-base lg:text-xl">
                                        Begin by clicking anywhere outside the
                                        monitor to zoom in.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col items-center">
                            <button
                                className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    setShowText(false);
                                    setiFramePosition(-0.034);
                                }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </Html>
            )}
            {!showText && (
                <Html
                    fullscreen
                    position={[buttonPosition, 0, 0]}
                    style={{ transform: "translate3d(0%,-17.8%,0)" }}
                >
                    <button
                        className="flex justify-center items-center text-lg lg:text-3xl absolute bottom-0 left-0 p-4 h-10 w-30 lg:h-16 lg:w-50 bg-gray-800 m-3 lg:m-5 text-white text-center shadow-2xl rounded-lg hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={(event) => {
                            event.stopPropagation();
                            setShowText(true);
                            setiFramePosition(999);
                        }}
                    >
                        Welcome Screen
                    </button>
                </Html>
            )}
        </>
    );
};

const Room = () => {
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

export default Room;
