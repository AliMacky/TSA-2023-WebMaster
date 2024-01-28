import React, { Suspense, useRef, useState, useEffect } from "react";
import { useGLTF, PerspectiveCamera, Text, Html } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import { gsap } from "gsap";

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
            fewfweuichndqwudniueqn diuhn
        </p>
    </div>
);

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

const calculateRotation = (temp, pos, lookAt) => {
    temp.current.position.copy(pos);
    temp.current.lookAt(lookAt);
    return temp.current.rotation;
};

const Cube = ({
    position,
    size,
    goTo,
    lookAt,
    planeRotation,
    planePosition,
    textPosition,
}) => {
    const [clicked, setClicked] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [text, setText] = useState();
    const objectRef = useRef();
    const cameraCubeRef = useRef();
    const { camera } = useThree();
    const target = lookAt;
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    useFrame(() => {});
    if (clicked) {
        console.log("clicked");
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
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={(event) => {
                    event.stopPropagation();
                    setClicked(!clicked);
                    if (opacity === 0) {
                        setTimeout(() => {
                            setOpacity(1);
                            setText(carText);
                        }, 1000);
                    } else {
                        setOpacity(0);
                        setText();
                    }
                }}
                position={position}
            >
                <boxGeometry args={size} />
                <meshPhongMaterial color={"white"} opacity={0} transparent />
            </mesh>
            <mesh rotation-y={planeRotation} position={planePosition}>
                <planeGeometry args={[2.4, 3.7]} />
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
                            position={[-1.25, 0.5, -2]}
                            size={[3, 1.75, 5]}
                            goTo={new THREE.Vector3(0.2, 1, -6.5)}
                            lookAt={new THREE.Vector3(0.2, 1, -3)}
                            planeRotation={Math.PI}
                            planePosition={[1.9, 1, -4]}
                            textPosition={[2.8, 2.75, -4.1]}
                        />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};
export default Garage;
