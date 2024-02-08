import React, { Suspense, useRef, useState, useEffect } from "react";
import { useGLTF, PerspectiveCamera, Text3D, Html } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import { gsap } from "gsap";
import { smoothAnimation } from "../smoothAnimation";
import { calculateRotation } from "../calculateRotation";
import "../index.css";

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
    <div className="w-[600px] text-white text-center bg-gray-900 rounded-lg shadow-md p-12">
        <h1 className="text-6xl font-bold text-shadow-md tracking-wide">
            Electric Cars
        </h1>
        <p className="text-lg leading-relaxed tracking-normal mt-6">
            <p>
                Lorem ipsum dolor sit amet. Et impedit velit et dolorem eius qui
                laudantium excepturi aut repellendus odio. Est voluptatum
                corporis vel laudantium rerum aut quibusdam sunt non quia
                architecto aut maiores magni. Ea nihil magni aut expedita
                assumenda sed veniam itaque non dolorem consequatur sit rerum
                incidunt sed consequuntur nesciunt.{" "}
            </p>
            <p>
                Et quos veniam ut ratione inventore vel culpa dignissimos id
                minus rerum et dicta enim aut illo voluptas. Eum ipsa iure aut
                rerum eius qui odio eaque ex aliquam perspiciatis. Et ipsa
                delectus 33 harum tempora eum quis commodi. Ab aliquid quaerat
                ut aperiam Quis rem adipisci autem aut nostrum corrupti vel
                necessitatibus totam hic autem repudiandae vel molestiae
                dignissimos!{" "}
            </p>
            <p>
                In consequatur labore sit nulla modi et labore corporis et alias
                excepturi. Aut voluptas consequuntur sit eius temporibus ea
                veniam consequuntur qui velit minima sit cupiditate dolorem. Et
                reiciendis magnam 33 atque voluptas id tempore amet quo dolorum
                autem ex reiciendis cupiditate et unde asperiores. Non iste
                rerum non facere accusantium rem suscipit obcaecati aut
                consequuntur Quis.{" "}
            </p>
        </p>
    </div>
);

const solarPowerText = (
    <div className="w-[600px] text-white text-center bg-gray-900 rounded-lg shadow-md p-12">
        <h1 className="text-6xl font-bold text-shadow-md tracking-wide">
            Solar Power
        </h1>
        <p className="text-lg leading-relaxed tracking-normal mt-6">
            <p>
                Lorem ipsum dolor sit amet. Et impedit velit et dolorem eius qui
                laudantium excepturi aut repellendus odio. Est voluptatum
                corporis vel laudantium rerum aut quibusdam sunt non quia
                architecto aut maiores magni. Ea nihil magni aut expedita
                assumenda sed veniam itaque non dolorem consequatur sit rerum
                incidunt sed consequuntur nesciunt.{" "}
            </p>
            <p>
                Et quos veniam ut ratione inventore vel culpa dignissimos id
                minus rerum et dicta enim aut illo voluptas. Eum ipsa iure aut
                rerum eius qui odio eaque ex aliquam perspiciatis. Et ipsa
                delectus 33 harum tempora eum quis commodi. Ab aliquid quaerat
                ut aperiam Quis rem adipisci autem aut nostrum corrupti vel
                necessitatibus totam hic autem repudiandae vel molestiae
                dignissimos!{" "}
            </p>
            <p>
                In consequatur labore sit nulla modi et labore corporis et alias
                excepturi. Aut voluptas consequuntur sit eius temporibus ea
                veniam consequuntur qui velit minima sit cupiditate dolorem. Et
                reiciendis magnam 33 atque voluptas id tempore amet quo dolorum
                autem ex reiciendis cupiditate et unde asperiores. Non iste
                rerum non facere accusantium rem suscipit obcaecati aut
                consequuntur Quis.{" "}
            </p>
        </p>
    </div>
);

const Cube = ({ position, size, goTo, lookAt, textPosition, num }) => {
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
    const [clickable, setClickable] = useState(true);

    useEffect(() => {
        document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);

    const moveCamera = () => {
        if (clicked) {
            const couchRotation = calculateRotation(
                cameraCubeRef,
                goTo,
                target
            );
            smoothAnimation(camera, goTo, couchRotation);
        } else if (!clicked && cameraCubeRef.current) {
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
                            textPosition={[3, 2.5, -4.1]}
                            num={1}
                        />
                        <Cube
                            position={[3.75, 0.5, 0.75]}
                            size={[1, 2, 1.5]}
                            goTo={new THREE.Vector3(1, 0.5, 0)}
                            lookAt={new THREE.Vector3(3.5, 0.5, 0)}
                            textPosition={[2.5, 1.4, -1.6]}
                            num={2}
                        />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};
export default Garage;
