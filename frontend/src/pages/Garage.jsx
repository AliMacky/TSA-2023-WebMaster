import React, { Suspense, useRef, useState, useEffect } from "react";
import { useGLTF, PerspectiveCamera, Html } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import { gsap } from "gsap";
import { smoothAnimation } from "../smoothAnimation";
import { calculateRotation } from "../calculateRotation";
import "../index.css";
import { MdOutlineCancel } from "react-icons/md";
import { FaTrashAlt, FaCalculator } from "react-icons/fa";
import { PiGarageBold } from "react-icons/pi";
import { IoIosHome, IoIosLeaf } from "react-icons/io";
import { AiOutlineDollar } from "react-icons/ai";
import { TbMoneybag } from "react-icons/tb";

let scale = 1;
let width = window.innerWidth;
if (window.innerWidth < 900) scale = 2;
if (window.innerWidth > 1680) width = 1680;
const origin = new THREE.Vector3(0, 0, 0);
const cameraStartPosition = new THREE.Vector3(
    -2 * scale,
    3 * scale,
    -7 * scale
);

const GarageModel = () => {
    const { camera } = useThree();
    camera.position.set(-2 * scale, 3 * scale, -7 * scale);
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
                setTimeout(() => {
                    setShowButtons(true);
                }, 1000);
            }
        }
    };

    const carText = (
        <div className="w-[65vw] lg:w-[40vw] max-h-[80vh] lg:max-h-[100vh] overflow-y-scroll text-white text-center bg-gray-900 rounded-lg shadow-md p-8">
            <button
                className="absolute lg:top-2 lg:left-2 top-0 left-0 text-white text-2xl lg:text-5xl p-2"
                onClick={() => {
                    moveCamera(1);
                    setClicked(false);
                    setText();
                    setView(0);
                    setTimeout(() => {
                        setShowButtons(true);
                    }, 1000);
                }}
            >
                <MdOutlineCancel />
            </button>
            <h1 className="text-3xl lg:text-6xl font-bold text-shadow-md tracking-wide">
                Electric Cars
            </h1>
            <div className="rounded-lg bg-gray-800 p-3 mt-4 relative">
                <IoIosLeaf className="text-green-500 absolute top-3 left-3 text-xl lg:text-3xl" />

                <h2 className="text-xl lg:text-3xl leading-snug tracking-normal">
                    Environmental Benefits
                </h2>
                <div className="flex lg:flex-row flex-col justify-center items-center">
                    <p className=" text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 p-1 lg:p-2">
                        The use of electric cars is a great practice that can
                        contribute to cleaner air and mitigating climate change.
                        Electric cars emit significantly less greenhouse gases
                        and pollution compared to gas vehicles, producing on
                        average 150 less grams of CO2 per mile. They especially
                        emit less in states that heavily utilize hydropower such
                        as Washington. Moreover, the growing popularity of
                        electric cars stimulates advancements in renewable
                        energy technology and job creation within the clean
                        energy sector.
                    </p>
                    <img
                        src="../src/assets/electriccar.jpg"
                        alt="Electric car"
                        className="w-4/6 lg:w-1/3 ml-2 p-2 rounded-2xl"
                    />
                </div>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 mt-3 relative">
                <AiOutlineDollar className="text-yellow-500 absolute top-3 left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Costs
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 p-2">
                    Costs associated with electric cars can vary anywhere from
                    $20,000 to hundreds of thousands of dollars due to a variety
                    of factors, such as the initial purchase price, charging
                    infrastructure, and operational expenses. When compared them
                    to their gas counterparts, electric cars are generally more
                    expensive, however the gap has been closing recently.
                </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 mt-3 relative">
                <TbMoneybag className="text-yellow-700 absolute top-3 left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Tax Rebates
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 ">
                    According to the IRS, if you purchase an electric car
                    starting from 2023 to 2032 you can qualify for a tax rebate
                    of up to $7,500.
                </p>
            </div>
        </div>
    );

    const solarPowerText = (
        <div className="w-[65vw] lg:w-[40vw] max-h-[80vh] lg:max-h-[100vh] overflow-y-scroll text-white text-center bg-gray-900 rounded-lg shadow-md p-8">
            <button
                className="absolute lg:top-2 lg:left-2 top-0 left-0 text-white text-2xl lg:text-5xl p-2"
                onClick={() => {
                    moveCamera(1);
                    setClicked(false);
                    setText();
                    setView(0);
                    setTimeout(() => {
                        setShowButtons(true);
                    }, 1000);
                }}
            >
                <MdOutlineCancel />
            </button>
            <h1 className="text-3xl lg:text-6xl font-bold text-shadow-md tracking-wide">
                Solar Power
            </h1>
            <div className="rounded-lg bg-gray-800 p-3 mt-4 relative">
                <IoIosLeaf className="text-green-500 absolute top-3 left-3 text-xl lg:text-3xl" />

                <h2 className="text-xl lg:text-3xl leading-snug tracking-normal">
                    Environmental Benefits
                </h2>
                <div className="flex lg:flex-row flex-col justify-center items-center">
                    <img
                        src="../src/assets/solarpanel.jpg"
                        alt="Solar Panel"
                        className="w-4/6 lg:w-1/3 mr-2 p-2 rounded-2xl"
                    />
                    <p className=" text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 p-1 lg:p-2">
                        Solar is the most abundant energy source on earth, and
                        is also increasingly easy to use. With residential solar
                        power systems to harness this energy, switching to this
                        green energy can positively impact the environment
                        greatly. Solar power does not pollute or generate the
                        same byproducts such as carbon dioxide and methane,
                        gases harmful to our health and the environment.
                        Switching to solar energy contributes to the global
                        effort to end reliance on fossil fuels and shift toward
                        sustainable energy.
                    </p>
                </div>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 mt-3 relative">
                <AiOutlineDollar className="text-yellow-500 absolute top-3 left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Costs
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 p-2">
                    Many factors that can affect the cost of solar panels,
                    including the type, size, and location of the system.
                    According to Forbes and many experts, solar panels cost
                    around $16,000 to install, but can vary from $4,000 to
                    $36,000 depending on the model and size. According to the
                    United States Department of Energy, the cost of solar has
                    been dropping consistently since 2009.
                </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 mt-3 relative">
                <TbMoneybag className="text-yellow-700 absolute top-3 left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Tax Rebates
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 ">
                    According to the IRS, investing in renewable energy for a
                    home can qualify someone for a tax credit of 30%, meaning
                    they will have to pay 30% less of their taxes.
                </p>
            </div>
        </div>
    );

    const heatingText = (
        <div className="w-[65vw] lg:w-[40vw] max-h-[80vh] lg:max-h-[100vh] overflow-y-scroll text-white text-center bg-gray-900 rounded-lg shadow-md p-8">
            <button
                className="absolute lg:top-2 lg:left-2 top-0 left-0 text-white text-2xl lg:text-5xl p-2"
                onClick={() => {
                    moveCamera(1);
                    setClicked(false);
                    setText();
                    setView(0);
                    setTimeout(() => {
                        setShowButtons(true);
                    }, 1000);
                }}
            >
                <MdOutlineCancel />
            </button>
            <h1 className="text-3xl lg:text-6xl font-bold text-shadow-md tracking-wide">
                Heating
            </h1>
            <div className="rounded-lg bg-gray-800 p-3 mt-4 relative">
                <IoIosLeaf className="text-green-500 absolute top-3 left-3 text-xl lg:text-3xl" />

                <h2 className="text-xl lg:text-3xl leading-snug tracking-normal">
                    Environmental Benefits
                </h2>
                <div className="flex lg:flex-row flex-col justify-center items-center">
                    <p className=" text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 p-1 lg:p-2">
                        Residential buildings account for 5 billion tons of
                        greenhouse gases each year, with a significant portion
                        caused by heating. One of the easiest and most effective
                        ways a homeowner can lower their carbon footprint is by
                        installing electric heat pumps. These pumps not run off
                        renewable energy instead of fuel, but are also much more
                        energy-efficient than furnaces and boilers.
                    </p>
                    <img
                        src="../src/assets/heatpump.jpg"
                        alt="Electric car"
                        className="w-4/6 lg:w-1/3 ml-2 p-2 rounded-2xl"
                    />
                </div>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 mt-3 relative">
                <AiOutlineDollar className="text-yellow-500 absolute top-3 left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Costs
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 p-2">
                    Heat pumps cost around $5,000 to $10,000, a similar amount
                    compared to furnaces and boilers. It is always recommended
                    to buy Energy Star labeled products as they are the most
                    energy efficient.
                </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-3 mt-3 relative">
                <TbMoneybag className="text-yellow-700 absolute top-3 left-3 text-xl lg:text-3xl" />
                <h2 className="text-2xl lg:text-3xl leading-relaxed tracking-normal">
                    Tax Rebates
                </h2>
                <p className="text-xs lg:text-base leading-snug lg:leading-relaxed tracking-normal mt-2 ">
                    Homeowners who make energy-efficient improvements to their
                    home including the installation of electric heat pumps can
                    qualify for a tax rebate of $3,200
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

const Message = ({ showButtons }) => {
    const [showText, setShowText] = useState(true);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const { camera } = useThree();

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
                            <h1 className=" text-3xl lg:text-6xl font-bold">
                                Welcome to the garage!
                            </h1>
                            <p className="text-base lg:text-2xl mt-10 max-w-6xl">
                                Click on objects to learn about eco-friendly
                                energy solutions for homes. Clickable objects
                                will be highlighted when hovered over.
                            </p>
                        </div>
                        <div className="mt-10 flex flex-col items-center">
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
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                                onClick={() => setShowText(false)}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
                {!showText && showButtons && (
                    <div className="flex flex-row p-1 ">
                        <button
                            className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() => (window.top.location.href = "/")}
                        >
                            <IoIosHome className="text-5xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() => (window.top.location.href = "/")}
                        >
                            <FaCalculator className="text-4xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() =>
                                (window.top.location.href = "/trash")
                            }
                        >
                            <FaTrashAlt className="text-4xl" />
                        </button>
                    </div>
                )}
            </Html>
        </>
    );
};

const Garage = () => {
    const [showButtons, setShowButtons] = useState(true);
    return (
        <div className="w-screen h-screen bg-gray-600">
            <div style={{ width: "100vw", height: "100vh" }}>
                <Suspense fallback={<Loading />}>
                    <Canvas>
                        {/* <CameraControls /> */}
                        <GarageModel />
                        <Message showButtons={showButtons} />
                        <Cube
                            position={[-1.4, 0.75, -2]}
                            size={[3.2, 2, 5]}
                            goTo={new THREE.Vector3(0.2, 1, -6.5)}
                            lookAt={new THREE.Vector3(0.2, 1, -3)}
                            textPosition={[width / 550, 2.7, -4.1]}
                            num={1}
                            setShowButtons={setShowButtons}
                        />
                        <Cube
                            position={[3.75, 0.5, 0.75]}
                            size={[1, 2, 1.5]}
                            goTo={new THREE.Vector3(1, 0.5, 0)}
                            lookAt={new THREE.Vector3(3.5, 0.5, 0)}
                            textPosition={[4032 / width, 2520 / width, -1.6]}
                            num={2}
                            setShowButtons={setShowButtons}
                        />
                        <Cube
                            position={[2.6, 1.4, -3.3]}
                            size={[0.6, 0.8, 1]}
                            goTo={new THREE.Vector3(1.8, 1.15, -3.5)}
                            lookAt={new THREE.Vector3(10, 1.15, -3.5)}
                            textPosition={[5040 / width, 3208 / width, -4.9]}
                            num={3}
                            setShowButtons={setShowButtons}
                        />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};
export default Garage;
