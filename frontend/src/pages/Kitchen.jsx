import React, { Suspense, useRef, useState, useEffect } from "react";
import { useGLTF, PerspectiveCamera, Html } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import { gsap } from "gsap";
import { smoothAnimation } from "../smoothAnimation";
import { calculateRotation } from "../calculateRotation";
import "../index.css";
import { MdGarage, MdOutlineCancel } from "react-icons/md";
import { FaTrashAlt, FaCalculator } from "react-icons/fa";
import { PiGarageBold } from "react-icons/pi";
import { IoIosHome, IoIosLeaf } from "react-icons/io";
import { AiOutlineDollar } from "react-icons/ai";
import { TbMoneybag } from "react-icons/tb";
import electricCar from "../assets/electriccar.jpg";
import solarPanel from "../assets/solarpanel.jpg";
import heatPump from "../assets/heatpump.jpg";
import { MdKitchen } from "react-icons/md";
import compost from "../assets/compost.jpg";
import fridge from "../assets/fridge.jpg";

let scale = 1;
let width = window.innerWidth;
if (window.innerWidth < 1100) scale = 2;
if (window.innerWidth > 1800) width = 1800;
const origin = new THREE.Vector3(0, 0, 0);
const cameraStartPosition = new THREE.Vector3(0 * scale, 5 * scale, -8 * scale);

const KitchenModel = () => {
    const { camera } = useThree();
    camera.position.set(0 * scale, 5 * scale, -8 * scale);
    camera.lookAt(0, 0, 0);
    const directionalLightRef = useRef();

    // Load the 3D model using GLTFLoader
    const model = useGLTF("models/Kitchen.glb");
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

const Cube = ({
    position,
    size,
    goTo,
    lookAt,
    textPosition,
    num,
    setShowButtons,
}) => {
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
    const [centeredText, setCenteredText] = useState();

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
                setShowButtons(false);
                setTimeout(() => {
                    setClicked(true);
                    if (num === 1) {
                        setText(fridgeText);
                    } else if (num === 2) {
                        setText(binText);
                    }
                }, 1000);
            } else {
                moveCamera(1);
                setClicked(false);
                setText();
                setView(0);
                setTimeout(() => {
                    setShowButtons(true);
                }, 1000);
            }
        }
    };

    const handleClickMobile = () => {
        if (num === 1) setCenteredText(fridgeText);
        if (num === 2) setCenteredText(binText);
    };

    const fridgeText = (
        <div className="w-[90vw] max-w-[700px] lg:w-[40vw] max-h-[85vh] lg:max-h-[90vh] overflow-y-scroll xl:overflow-y-visible text-white text-center bg-gray-900 rounded-lg shadow-md p-4 lg:p-8">
            <button
                className="absolute lg:top-2 lg:left-2 top-0 left-0 text-white text-lg lg:text-5xl lg:p-2"
                onClick={() => {
                    moveCamera(1);
                    setClicked(false);
                    setText();
                    setCenteredText();
                    setView(0);
                    setTimeout(() => {
                        setShowButtons(true);
                    }, 1000);
                }}
            >
                <MdOutlineCancel />
            </button>
            <h1 className="text-3xl lg:text-6xl font-bold text-shadow-md tracking-wide">
                Appliances
            </h1>
            <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-4 relative">
                <IoIosLeaf className="text-green-500 absolute top-2 left-2 lg:top-3 lg:left-3 text-xl lg:text-3xl" />

                <h2 className="text-2xl lg:text-3xl leading-snug tracking-normal">
                    Environmental Benefits
                </h2>
                <div className="flex lg:flex-row flex-col justify-center items-center">
                    <p className=" text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 p-1 lg:p-2">
                        Some of the most energy-consuming parts of a home are
                        the appliances. These include refrigerators,
                        dishwashers, laundry machines, and other kitchen
                        appliances. An easy solution to reduce energy usage and
                        increase efficiency is to purchase newer appliances.
                        Energy-efficient appliances consume less electricity or
                        gas during operation, reducing overall energy
                        consumption and lowering greenhouse gas emissions
                        associated with electricity generation or fossil fuel
                        use.
                    </p>
                    <img
                        src={fridge}
                        alt="Electric car"
                        className="w-4/6 lg:w-1/3 ml-2 p-2 rounded-2xl"
                    />
                </div>
            </div>
            <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-3 relative">
                <AiOutlineDollar className="text-yellow-500 absolute top-2 left-2 lg:top-3 lg:left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Costs
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2">
                    The cost of new appliances varies based on type, model, and
                    many more factors. Prices can range from a microwave costing
                    a few hundred dollars to a refrigerator costing a few
                    thousand dollars. It is recommended to find appliances with
                    an Energy Star label. Energy Star is a program developed by
                    the United States Environmental Protection Agency to find
                    the most environmentally friendly products.
                </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-3 relative">
                <TbMoneybag className="text-yellow-700 absolute top-2 left-2 lg:top-3 lg:left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Tax Rebates
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 ">
                    Switching to energy-efficient appliances is considered a
                    energy-efficient improvement to your home, qualifying you
                    for a tax credit of up to $3,200.
                </p>
            </div>
        </div>
    );

    const binText = (
        <div className="w-[90vw] max-w-[700px] lg:w-[40vw] max-h-[85vh] lg:max-h-[90vh] overflow-y-scroll xl:overflow-y-visible text-white text-center bg-gray-900 rounded-lg shadow-md p-4 lg:p-8">
            <button
                className="absolute lg:top-2 lg:left-2 top-0 left-0 text-white text-lg lg:text-5xl lg:p-2"
                onClick={() => {
                    moveCamera(1);
                    setClicked(false);
                    setText();
                    setCenteredText();
                    setView(0);
                    setTimeout(() => {
                        setShowButtons(true);
                    }, 1000);
                }}
            >
                <MdOutlineCancel />
            </button>
            <h1 className="text-3xl lg:text-6xl font-bold text-shadow-md tracking-wide">
                Composting
            </h1>
            <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-4 relative">
                <IoIosLeaf className="text-green-500 absolute top-1 left-1 lg:top-3 lg:left-3 text-xl lg:text-3xl" />

                <h2 className="text-2xl lg:text-3xl leading-snug tracking-normal">
                    Environmental Benefits
                </h2>
                <div className="flex lg:flex-row flex-col justify-center items-center">
                    <img
                        src={compost}
                        alt="Solar Panel"
                        className="w-4/6 lg:w-1/3 mr-2 p-2 rounded-2xl"
                    />
                    <p className=" text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-1 lg:mt-2 p-1 lg:p-2">
                        Food waste management contributes to around 10% of
                        global emissions. A great solution to this is
                        composting. Composting is nature's way of recycling; it
                        is a natural process where organic material is broken
                        down to form compost. This allows wasted food to turn
                        into soil, which can then be used for gardens and farms.
                        Compost heavily reduces negative impacts from food
                        waste, such as pollution, odors, infestations and more.
                        It is an extremely environmentally friendly way to
                        combat food waste.
                    </p>
                </div>
            </div>
            <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-3 relative">
                <AiOutlineDollar className="text-yellow-500 absolute top-1 left-1 lg:top-3 lg:left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Costs
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-1 lg:mt-2">
                    The best part about composting is that it is completely
                    free. There are items you can buy to make composting easier
                    and more efficient, but they are not only unnecessary but
                    also incredibly cheap. Composting can be done by anyone, no
                    matter what their situation is.
                </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-3 relative">
                <TbMoneybag className="text-yellow-700 absolute top-2 left-2 lg:top-3 lg:left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Tax Rebates
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 ">
                    There are major tax incentives for composting, however
                    composting can save you money on many things like fertilizer
                    and pesticides!
                </p>
            </div>
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
                    if (width > 1100) handleClick();
                    else handleClickMobile();
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
            <Html style={{ transform: "translate3d(-50%,-45%,0)" }}>
                {centeredText}
            </Html>
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
        const dontShowAgainValue = localStorage.getItem("kitchenDontShowAgain");
        if (dontShowAgainValue) {
            setShowText(false);
            setDontShowAgain(true);
        }
    }, []);

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setDontShowAgain(checked);
        if (checked) {
            localStorage.setItem("kitchenDontShowAgain", "true");
        } else {
            localStorage.removeItem("kitchenDontShowAgain");
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
                                Kitchen
                            </h1>
                            <div className="rounded-lg bg-gray-800 p-4 relative inline-block max-w-xs mt-6 lg:max-w-6xl border-2 border-green-500">
                                <p className="text-base lg:text-2xl max-w-6xl">
                                    Click on objects to learn about eco-friendly
                                    energy solutions for homes. Clickable
                                    objects will be highlighted when hovered
                                    over.
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
                            className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                            onClick={() => setShowText(false)}
                        >
                            OK
                        </button>
                    </div>
                )}
                {!showText && showButtons && (
                    <div className="flex flex-row p-1 ">
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
                                (window.top.location.href = "/calculator")
                            }
                        >
                            <FaCalculator className="text-3xl lg:text-4xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() =>
                                (window.top.location.href = "/trash")
                            }
                        >
                            <FaTrashAlt className="text-3xl lg:text-4xl" />
                        </button>
                    </div>
                )}
            </Html>
        </>
    );
};

const Kitchen = () => {
    const [showButtons, setShowButtons] = useState(true);
    return (
        <div className="w-screen h-screen bg-gray-600">
            <div style={{ width: "100vw", height: "100vh" }}>
                <Suspense fallback={<Loading />}>
                    <Canvas>
                        {/* <CameraControls /> */}
                        <KitchenModel />
                        <Message showButtons={showButtons} />
                        <Cube
                            position={[-7.5, 2, 3.5]}
                            size={[3, 5, 2]}
                            goTo={new THREE.Vector3(-5, 2, -0.5)}
                            lookAt={new THREE.Vector3(-5, 2, 2)}
                            textPosition={[-4.5, 2.35, 0]}
                            num={1}
                            setShowButtons={setShowButtons}
                        />

                        <Cube
                            position={[-1.56, 1.3, 1]}
                            size={[1, 1.3, 1]}
                            goTo={new THREE.Vector3(-0.6, 1.2, -0.2)}
                            lookAt={new THREE.Vector3(-0.6, 1.2, 1)}
                            textPosition={[0.7, 2, 1]}
                            num={2}
                            setShowButtons={setShowButtons}
                        />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};
export default Kitchen;
