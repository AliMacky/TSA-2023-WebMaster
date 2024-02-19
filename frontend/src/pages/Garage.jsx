import React, { Suspense, useRef, useState, useEffect } from "react";
import {
    useGLTF,
    PerspectiveCamera,
    Html,
    MeshTransmissionMaterial,
} from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import { gsap } from "gsap";
import { smoothAnimation } from "../smoothAnimation";
import { calculateRotation } from "../calculateRotation";
import "../index.css";
import { MdOutlineCancel } from "react-icons/md";

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

const Cube = ({ position, size, goTo, lookAt, textPosition, num }) => {
    const [clicked, setClicked] = useState(false);
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

    const moveCamera = (n) => {
        if (n === 0) {
            const couchRotation = calculateRotation(
                cameraCubeRef,
                goTo,
                target
            );
            smoothAnimation(camera, goTo, couchRotation);
        } else {
            const startRotation = calculateRotation(
                cameraCubeRef,
                cameraStartPosition,
                origin
            );
            smoothAnimation(camera, cameraStartPosition, startRotation);
        }
    };

    const handleClick = () => {
        if (clickable) {
            setClickable(false);
            setTimeout(() => {
                setClickable(true);
            }, 1000);
            if (!clicked) {
                moveCamera(0);
                setView(1);
                setCubeOpacity(0);
                setTimeout(() => {
                    setClicked(true);
                    if (num === 1) {
                        setText(carText);
                    } else if (num === 2) {
                        setText(solarPowerText);
                    } else {
                        setText(heatingText);
                    }
                }, 1000);
            } else {
                moveCamera(1);
                setClicked(false);
                setText();
                setView(0);
            }
        }
    };

    const carText = (
        <div className="w-[40vw] text-white text-center bg-gray-900 rounded-lg shadow-md p-12">
            <button
                className="absolute top-2 left-2 text-white text-5xl p-2"
                onClick={() => {
                    moveCamera(1);
                    setClicked(false);
                    setText();
                    setView(0);
                }}
            >
                <MdOutlineCancel />
            </button>
            <h1 className="text-6xl font-bold text-shadow-md tracking-wide">
                Electric Cars
            </h1>
            <p className="leading-relaxed tracking-normal mt-6">
                Electric cars, a modern marvel of sustainable transportation,
                come in various types with differences in performance, costs,
                and environmental impact.
            </p>
            <h2 className="text-3xl leading-relaxed tracking-normal mt-3">
                Environmental Benefits
            </h2>
            <p className="leading-relaxed tracking-normal mt-3 ">
                Electric vehicles significantly reduce greenhouse gases and
                pollution, which contributes to cleaner air and mitigating
                climate change. Electric cars produce on average 150 less grams
                of CO2 than gasoline cars per mile and create 3,932 lbs. of CO2
                equivalent per year, compared to 6,248 lbs. for hybrid cars, and
                11,435 lbs. for gasoline cars. Electric cars especially emit
                less carbon in states that heavily utilize hydropower like
                Washington, where the power grid has a much lower carbon
                intensity. Moreover, the growing popularity of electric cars
                stimulates advancements in renewable energy technology and job
                creation within the clean energy sector.
            </p>
            <h2 className="text-3xl leading-relaxed tracking-normal mt-3">
                Costs
            </h2>
            <p className="leading-relaxed tracking-normal mt-3 ">
                Costs associated with electric cars can vary due to a variety of
                factors, including the initial purchase price, charging
                infrastructure, and operational expenses. The upfront cost of an
                electric car can range anywhere from $20,000 to hundreds of
                thousands of dollars depending on your needs.
            </p>
            <h2 className="text-3xl leading-relaxed tracking-normal mt-3">
                Tax Rebates
            </h2>
            <p className="leading-relaxed tracking-normal mt-3 ">
                If you purchase an electric car starting from 2023 to 2032 you
                can qualify for a tax rebate of up to $7,500
            </p>
        </div>
    );

    const solarPowerText = (
        <div className="w-[600px] text-white text-center bg-gray-900 rounded-lg shadow-md p-12">
            <button
                className="absolute top-2 left-2 text-white text-5xl p-2"
                onClick={() => {
                    moveCamera(1);
                    setClicked(false);
                    setText();
                    setView(0);
                }}
            >
                <MdOutlineCancel />
            </button>
            <h1 className="text-6xl font-bold text-shadow-md tracking-wide">
                Solar Power
            </h1>
            <p className="text-lg leading-relaxed tracking-normal mt-6">
                <p>
                    Lorem ipsum dolor sit amet. Et impedit velit et dolorem eius
                    qui laudantium excepturi aut repellendus odio. Est
                    voluptatum corporis vel laudantium rerum aut quibusdam sunt
                    non quia architecto aut maiores magni. Ea nihil magni aut
                    expedita assumenda sed veniam itaque non dolorem consequatur
                    sit rerum incidunt sed consequuntur nesciunt.{" "}
                </p>
                <p>
                    Et quos veniam ut ratione inventore vel culpa dignissimos id
                    minus rerum et dicta enim aut illo voluptas. Eum ipsa iure
                    aut rerum eius qui odio eaque ex aliquam perspiciatis. Et
                    ipsa delectus 33 harum tempora eum quis commodi. Ab aliquid
                    quaerat ut aperiam Quis rem adipisci autem aut nostrum
                    corrupti vel necessitatibus totam hic autem repudiandae vel
                    molestiae dignissimos!{" "}
                </p>
                <p>
                    In consequatur labore sit nulla modi et labore corporis et
                    alias excepturi. Aut voluptas consequuntur sit eius
                    temporibus ea veniam consequuntur qui velit minima sit
                    cupiditate dolorem. Et reiciendis magnam 33 atque voluptas
                    id tempore amet quo dolorum autem ex reiciendis cupiditate
                    et unde asperiores. Non iste rerum non facere accusantium
                    rem suscipit obcaecati aut consequuntur Quis.{" "}
                </p>
            </p>
        </div>
    );

    const heatingText = (
        <div className="w-[600px] text-white text-center bg-gray-900 rounded-lg shadow-md p-12">
            <button
                className="absolute top-2 left-2 text-white text-5xl p-2"
                onClick={() => {
                    moveCamera(1);
                    setClicked(false);
                    setText();
                    setView(0);
                }}
            >
                <MdOutlineCancel />
            </button>
            <h1 className="text-6xl font-bold text-shadow-md tracking-wide">
                Heating
            </h1>
            <p className="text-lg leading-relaxed tracking-normal mt-6">
                <p>
                    Lorem ipsum dolor sit amet. Et impedit velit et dolorem eius
                    qui laudantium excepturi aut repellendus odio. Est
                    voluptatum corporis vel laudantium rerum aut quibusdam sunt
                    non quia architecto aut maiores magni. Ea nihil magni aut
                    expedita assumenda sed veniam itaque non dolorem consequatur
                    sit rerum incidunt sed consequuntur nesciunt.{" "}
                </p>
                <p>
                    Et quos veniam ut ratione inventore vel culpa dignissimos id
                    minus rerum et dicta enim aut illo voluptas. Eum ipsa iure
                    aut rerum eius qui odio eaque ex aliquam perspiciatis. Et
                    ipsa delectus 33 harum tempora eum quis commodi. Ab aliquid
                    quaerat ut aperiam Quis rem adipisci autem aut nostrum
                    corrupti vel necessitatibus totam hic autem repudiandae vel
                    molestiae dignissimos!{" "}
                </p>
                <p>
                    In consequatur labore sit nulla modi et labore corporis et
                    alias excepturi. Aut voluptas consequuntur sit eius
                    temporibus ea veniam consequuntur qui velit minima sit
                    cupiditate dolorem. Et reiciendis magnam 33 atque voluptas
                    id tempore amet quo dolorum autem ex reiciendis cupiditate
                    et unde asperiores. Non iste rerum non facere accusantium
                    rem suscipit obcaecati aut consequuntur Quis.{" "}
                </p>
            </p>
        </div>
    );

    return (
        <>
            <mesh
                ref={objectRef}
                onPointerOver={() => {
                    setHovered(true);
                    if (view !== 1) {
                        setCubeOpacity(0.2);
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
                    handleClick();
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

const Message = () => {
    const [showText, setShowText] = useState(true);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        const dontShowAgainValue = localStorage.getItem("dontShowAgain");
        if (dontShowAgainValue) {
            setShowText(false);
            setDontShowAgain(true);
        }
    }, []);

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setDontShowAgain(checked);
        if (checked) {
            localStorage.setItem("dontShowAgain", "true");
        } else {
            localStorage.removeItem("dontShowAgain");
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
                            <h1 className="text-6xl font-bold">
                                Welcome to the garage!
                            </h1>
                            <p className="text-2xl mt-10 max-w-6xl">
                                Click on objects to learn about eco-friendly
                                energy solutions for homes. Clickable objects
                                will be highlighted when hovered over.
                            </p>
                        </div>
                        <div className="mt-10 flex flex-col items-center">
                            <label className="text-2xl">
                                <input
                                    type="checkbox"
                                    checked={dontShowAgain}
                                    onChange={handleCheckboxChange}
                                    className="mr-2 h-4 w-4"
                                />
                                Don't show this message again
                            </label>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                                onClick={() => setShowText(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </Html>
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
                        <Message />
                        <Cube
                            position={[-1.4, 0.75, -2]}
                            size={[3.2, 2, 5]}
                            goTo={new THREE.Vector3(0.2, 1, -6.5)}
                            lookAt={new THREE.Vector3(0.2, 1, -3)}
                            textPosition={[3, 2.6, -4.1]}
                            num={1}
                        />
                        <Cube
                            position={[3.75, 0.5, 0.75]}
                            size={[1, 2, 1.5]}
                            goTo={new THREE.Vector3(1, 0.5, 0)}
                            lookAt={new THREE.Vector3(3.5, 0.5, 0)}
                            textPosition={[2.4, 1.35, -1.6]}
                            num={2}
                        />
                        <Cube
                            position={[2.6, 1.4, -3.3]}
                            size={[0.6, 0.8, 1]}
                            goTo={new THREE.Vector3(1.8, 1.15, -3.5)}
                            lookAt={new THREE.Vector3(10, 1.15, -3.5)}
                            textPosition={[3, 1.85, -4.9]}
                            num={3}
                        />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};
export default Garage;
