import React, { Suspense, useRef, useState, useEffect } from "react";
import { useGLTF, PerspectiveCamera, Text3D, Html } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import { gsap } from "gsap";
import { smoothAnimation } from "../smoothAnimation";
import { calculateRotation } from "../calculateRotation";

const origin = new THREE.Vector3(0, 0, 0);
const cameraStartPosition = new THREE.Vector3(-2, 3, -7);

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
                color={"white"}
            />
            <ambientLight intensity={0.5} />
            {/* <ModelViewer scale="40" modelPath={"./models/garage.glb"} /> */}
        </>
    );
};

const carText = (
    <div
        style={{
            width: "500px",
            color: "white",
            textAlign: "center",
        }}
    >
        <h1
            style={{
                fontSize: "60px",
                fontWeight: "bold",
            }}
        >
            Electric Cars
        </h1>
        <p>
            fru3fjij3fiojofjiwejiojioejwiof fewff wfew few
            fewfweuichndqwudniueqn diuhn uyihiuhiuhiu
        </p>
    </div>
);

const solarPowerText = (
    <div
        style={{
            width: "500px",
            color: "white",
            textAlign: "center",
        }}
    >
        <h1
            style={{
                fontSize: "60px",
                fontWeight: "bold",
            }}
        >
            Solar Power
        </h1>
        <p>
            fru3fjij3fiojofjiwejiojioejwiof fewff wfew few
            fewfweuichndqwudniueqn diuhn uyihiuhiuhiu
        </p>
    </div>
);

const Cube = ({
    position,
    size,
    goTo,
    lookAt,
    planeRotation,
    planePosition,
    planeSize,
    textPosition,
    num,
}) => {
    const [clicked, setClicked] = useState(true);
    const [opacity, setOpacity] = useState(0);
    const [cubeOpacity, setCubeOpacity] = useState(0);
    const [view, setView] = useState(0);
    const [text, setText] = useState();
    const objectRef = useRef();
    const cameraCubeRef = useRef();
    const { camera } = useThree();
    const target = lookAt;
    const [hovered, setHovered] = useState(false);
    const [planeCurrentSize, setPlaneCurrentSize] = useState([0, 0]);
    const [clickable, setClickable] = useState(true);

    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    const moveCamera = () => {
        if (clicked) {
            console.log("clicked");
            const couchRotation = calculateRotation(
                cameraCubeRef,
                goTo,
                target
            );
            smoothAnimation(camera, goTo, couchRotation);
        } else if (!clicked && cameraCubeRef.current) {
            console.log("!clicked");
            const startRotation = calculateRotation(
                cameraCubeRef,
                cameraStartPosition,
                origin
            );
            smoothAnimation(camera, cameraStartPosition, startRotation);
        }
    };

    return (
        <>
            <mesh
                ref={objectRef}
                onPointerOver={() => {
                    console.log(opacity);
                    setHovered(true);
                    if (view !== 1) {
                        setCubeOpacity(0.15);
                    }
                }}
                onPointerOut={() => {
                    setHovered(false);
                    if (view !== 1) {
                        setCubeOpacity(0);
                    }
                }}
                onClick={(event) => {
                    event.stopPropagation();
                    if (clickable) {
                        setClicked(!clicked);
                        moveCamera();
                        setClickable(false);
                        setTimeout(() => {
                            setClickable(true);
                        }, 1000);
                        if (opacity === 0) {
                            setView(1);
                            setPlaneCurrentSize(planeSize);
                            setCubeOpacity(0);
                            setTimeout(() => {
                                setOpacity(1);
                                if (num === 1) {
                                    setText(carText);
                                } else {
                                    setText(solarPowerText);
                                }
                            }, 1000);
                        } else {
                            setPlaneCurrentSize([0, 0]);
                            setOpacity(0);
                            setText();
                            setView(0);
                        }
                    }
                }}
                position={position}
            >
                <boxGeometry args={size} />
                <meshPhongMaterial
                    color={"white"}
                    opacity={cubeOpacity}
                    transparent
                />
            </mesh>
            <mesh
                rotation-y={planeRotation}
                position={planePosition}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                onPointerEnter={(e) => {
                    e.stopPropagation();
                }}
                onPointerLeave={(e) => {
                    e.stopPropagation();
                }}
            >
                <planeGeometry args={planeCurrentSize} />
                <meshPhongMaterial
                    color={"gray"}
                    opacity={opacity}
                    transparent
                />
            </mesh>
            <Html position={textPosition}>{text}</Html>
            <PerspectiveCamera
                ref={cameraCubeRef}
                makeDefault={false}
                position={cameraStartPosition}
            />
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
                        <Cube
                            position={[-1.25, 0.75, -2]}
                            size={[3.2, 2, 5]}
                            goTo={new THREE.Vector3(0.2, 1, -6.5)}
                            lookAt={new THREE.Vector3(0.2, 1, -3)}
                            planeRotation={Math.PI}
                            planePosition={[1.9, 1, -4]}
                            planeSize={[2.4, 3.7]}
                            textPosition={[2.8, 2.75, -4.1]}
                            num={1}
                        />
                        <Cube
                            position={[3.75, 0.5, 0.75]}
                            size={[1, 2, 1.5]}
                            goTo={new THREE.Vector3(1, 0.5, 0)}
                            lookAt={new THREE.Vector3(3.5, 0.5, 0)}
                            planeRotation={Math.PI * 1.5}
                            planePosition={[2.5, 0.5, -1]}
                            planeSize={[1.7, 2.2]}
                            textPosition={[2.5, 1.55, -1.6]}
                            num={2}
                        />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};
export default Garage;
