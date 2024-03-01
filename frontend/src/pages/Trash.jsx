import React, { Suspense, useRef, useState, useEffect } from "react";
import { useGLTF, PerspectiveCamera, Text3D, Html } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import { gsap } from "gsap";
import { smoothAnimation } from "../smoothAnimation";
import { calculateRotation } from "../calculateRotation";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { FaTrashAlt, FaCalculator } from "react-icons/fa";
import { PiGarageBold } from "react-icons/pi";
import { IoIosHome } from "react-icons/io";
import { RiRecycleFill } from "react-icons/ri";
import { MdCompost } from "react-icons/md";
import { MdKitchen } from "react-icons/md";
import FormData from 'form-data'

const origin = new THREE.Vector3(0, 11, 0);
const cameraStartPosition = new THREE.Vector3(-17, 11, 0);

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return screenSize;
};

const GarbageBinsModel = () => {
    const { camera } = useThree();
    camera.position.set(-17, 11, 0);
    camera.lookAt(0, 11, 0);
    // camera.position.set(-2.5, 4.5, 3);
    // camera.lookAt(0, 3, 3);
    const directionalLightRef = useRef();

    // Load the 3D model using GLTFLoader
    const model = useGLTF("models/garbagebins.glb");
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
        </>
    );
};

const Form = ({ setShowButtons }) => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const cameraCubeRef = useRef();
    const { camera } = useThree();
    const [position, setPosition] = useState([999, 999, 999]);
    const [category, setCategory] = useState(null);
    const screenSize = useScreenSize();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const url = URL.createObjectURL(file);
        console.log(url)
        setImageUrl(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (image) {
            onImageSubmit(image);
        }
    };

    const onImageSubmit = async (image) => {
        setShowButtons(false);
        let data = new FormData();
        data.append("file", image, "image.jpg");
        setLoading(true);
        console.log(data)
        try {
            const response = await axios.post(
                "https://w6sh2140-5000.usw2.devtunnels.ms/predict",
                data,
            );
            const prediction = response.data.prediction;
            setCategory(prediction);
            console.log(prediction, response.data.probability);
            setLoading(false);
            moveCamera(response.data.category);
        } catch (error) {
            console.error("Error classifying image:", error);
        }
        console.log("Image submitted:", image);
    };

    const moveCamera = async (category) => {
        if (category === 0) {
            setCategory("compost");
            const goTo = new THREE.Vector3(-2.5, 4.5, 3);
            const target = new THREE.Vector3(0, 3, 3);
            const couchRotation = calculateRotation(
                cameraCubeRef,
                goTo,
                target
            );
            smoothAnimation(camera, goTo, couchRotation);
            setTimeout(() => {
                setPosition([0, 0.8, 1.3]);
            }, 1000);
        }
        if (category === 1) {
            setCategory("recycling");
            const goTo = new THREE.Vector3(-2.5, 4.5, 0);
            const target = new THREE.Vector3(0, 3, 0);
            const couchRotation = calculateRotation(
                cameraCubeRef,
                goTo,
                target
            );
            smoothAnimation(camera, goTo, couchRotation);
            setTimeout(() => {
                setPosition([0, 0.8, -1.6]);
            }, 1000);
        }
        if (category === 2) {
            setCategory("garbage");
            const goTo = new THREE.Vector3(-2.5, 4.5, -3);
            const target = new THREE.Vector3(0, 3, -3);
            const couchRotation = calculateRotation(
                cameraCubeRef,
                goTo,
                target
            );
            smoothAnimation(camera, goTo, couchRotation);
            setTimeout(() => {
                setPosition([0, 0.8, -4.5]);
            }, 1000);
        } else if (category === 3) {
            setPosition([999, 999, 999]);
            const startRotation = calculateRotation(
                cameraCubeRef,
                cameraStartPosition,
                origin
            );
            smoothAnimation(camera, cameraStartPosition, startRotation);
        }
    };

    let x = 0;
    if (screenSize.height < 800) x = 3;
    else if (screenSize.height > 1000) x = -3;
    else x = 0.5;
    if (screenSize.width > 2000) x = -10;

    return (
        <>
            <Html
                position={[10, 31, (-1 * screenSize.width) / 56 - x]}
            // style={{ transform: `scale(${scale})` }}
            >
                <div className="w-[40vw] lg:w-[35vw] mx-auto text-white text-center bg-gray-900 rounded-lg shadow-md p-4 lg:p-8">
                    <h1 className="text-2xl lg:text-5xl font-bold text-shadow-lg tracking-wide mb-2 lg:mb-6">
                        Waste Classifier
                    </h1>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-xxxs lg:text-base w-full py-2 px-4 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {imageUrl && (
                            <div>
                                <button
                                    type="submit"
                                    className="block w-full py-2 px-4 mb-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Submit
                                </button>
                                <p className="text-lg font-semibold mb-2">
                                    Preview:
                                </p>
                                <img
                                    src={imageUrl}
                                    alt="Uploaded"
                                    className="mx-auto rounded-lg max-h-80 mb-4"
                                />
                            </div>
                        )}
                        {loading && (
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold mb-2">
                                    Thinking...
                                </h2>
                            </div>
                        )}
                    </form>
                </div>
            </Html>
            <PerspectiveCamera
                ref={cameraCubeRef}
                makeDefault={false}
                position={cameraStartPosition}
            />
            <Html position={position}>
                <div className="w-[500px] max-w-lg mx-auto text-white text-center bg-gray-900 rounded-lg shadow-md p-4">
                    <h1 className="text-xl">
                        Your item goes in the{" "}
                        <span className="font-bold">{category}</span> bin!
                    </h1>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                        onClick={() => {
                            moveCamera(3);
                            setShowButtons(true);
                        }}
                    >
                        OK
                    </button>
                </div>
            </Html>
        </>
    );
};

const Message = ({ showButtons }) => {
    const [showText, setShowText] = useState(true);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        const dontShowAgainValue = localStorage.getItem("trashDontShowAgain");
        if (dontShowAgainValue) {
            setShowText(false);
            setDontShowAgain(true);
        }
    }, []);

    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setDontShowAgain(checked);
        if (checked) {
            localStorage.setItem("trashDontShowAgain", "true");
        } else {
            localStorage.removeItem("trashDontShowAgain");
        }
    };

    return (
        <>
            {showText && (
                <Html
                    fullscreen
                    style={{ transform: "translate3d(0%,-42.2%,0)" }}
                >
                    <div
                        className="flex flex-col justify-center items-center w-[100vw] h-[100vh] mx-auto text-white text-center bg-gray-900 shadow-md bg-opacity-85"
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <div>
                            <h1 className="text-6xl lg:text-7xl p-2 font-bold bg-gradient-to-br from-green-500 to-sky-500 text-transparent bg-clip-text max-w-sm lg:max-w-6xl">
                                Trash
                            </h1>
                            <div className="rounded-lg bg-gray-800 p-4 relative inline-block max-w-xs mt-6 lg:max-w-6xl border-2 border-green-500">
                                <p className="text-base lg:text-2xl max-w-6xl">
                                    Correctly disposing of waste is a great
                                    practice that benefits the environment and
                                    promotes sustainability. This waste
                                    classifier, powered by machine learning, can
                                    classify images of waste fairly accurately.
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
                </Html>
            )}
            {!showText && showButtons && (
                <Html fullscreen style={{ transform: "translate3d(0%,5%,0)" }}>
                    <div className="flex flex-col p-1 ">
                        <button
                            className="flex items-center justify-center font-kanit p-2 xl:h-20 h-12 w-12 xl:w-20 bg-green-600 m-3 xl:m-4 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() => (window.top.location.href = "/")}
                        >
                            <IoIosHome className="text-5xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 xl:h-20 h-12 w-12 xl:w-20 bg-green-600 m-3 xl:m-4 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() =>
                                (window.top.location.href = "/garage")
                            }
                        >
                            <PiGarageBold className="text-5xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 xl:h-20 h-12 w-12 xl:w-20 bg-green-600 m-3 xl:m-4 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() => {
                                if (window.innerWidth > 1100)
                                    window.top.location.href = "/calculator";
                                else window.top.location.href = "/calc";
                            }}
                        >
                            <FaCalculator className="text-3xl xl:text-4xl" />
                        </button>
                        <button
                            className="flex items-center justify-center font-kanit p-2 xl:h-20 h-12 w-12 xl:w-20 bg-green-600 m-3 xl:m-4 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                            onClick={() =>
                                (window.top.location.href = "/kitchen")
                            }
                        >
                            <MdKitchen className="text-5xl" />
                        </button>
                    </div>
                </Html>
            )}
        </>
    );
};

const Info = () => {
    const screenSize = useScreenSize();
    return (
        <Html
            position={[10, 31, screenSize.width / 370]}
        // /*style={{ transform: `scale(${scale})` }}*/ className="w-100vw"
        >
            <div className="w-[40vw] lg:w-[35vw] h-[100%] mx-auto text-white text-center bg-gray-900 rounded-lg shadow-md p-4 max-h-[60vh] lg:max-h-[100vh] overflow-y-scroll lg:overflow-y-visible lg:p-8">
                <h1 className="text-2xl lg:text-5xl font-bold text-shadow-md tracking-wide">
                    More Info
                </h1>
                <p className="text-xs lg:text-2xl leading-snug lg:leading-relaxed tracking-normal font-bold lg:mt-2">
                    Items that commonly go in each bin:
                </p>
                <div className="rounded-lg bg-gray-800 p-1 lg:p-3 mt-2 relative">
                    <RiRecycleFill className="text-blue-500 absolute lg:top-3 lg:left-3 text-sm lg:text-3xl" />

                    <h2 className="text-lg lg:text-3xl leading-snug tracking-normal">
                        Recycling
                    </h2>
                    <p className="text-xxs lg:text-base leading-snug lg:leading-relaxed tracking-normal lg:mt-2 ">
                        Paper products, cardboard, plastic bottles and
                        containers, glass bottles and jars, aluminum cans, steel
                        cans, clean and dry plastic bags
                    </p>
                </div>
                <div className="rounded-lg bg-gray-800 p-1 lg:p-3 mt-3 relative">
                    <FaTrashAlt className="text-grey-700 absolute lg:top-3 lg:left-3 text-xs lg:text-2xl" />
                    <h2 className="text-lg lg:text-3xl leading-relaxed tracking-normal">
                        Trash
                    </h2>
                    <p className="text-xxs lg:text-base leading-snug lg:leading-relaxed tracking-normal lg:mt-2 ">
                        Non-recyclable plastics, broken glass, soiled or
                        contaminated paper products, disposable diapers and
                        sanitary products, non-recyclable metal items, hazardous
                        waste, rubber, cermaics
                    </p>
                </div>
                <div className="rounded-lg bg-gray-800 p-1 lg:p-3 mt-3 relative">
                    <MdCompost className="text-green-500 absolute lg:top-3 lg:left-3 text-sm lg:text-3xl" />
                    <h2 className="text-lg lg:text-3xl leading-relaxed tracking-normal">
                        Compost
                    </h2>
                    <p className="text-xxs lg:text-base leading-snug lg:leading-relaxed tracking-normal lg:mt-2 ">
                        Fruit and vegatable scraps, coffee grounds and filters,
                        tea bags, eggshells, nutshells, yard waste,
                        uncontaminated paper towels and napkins
                    </p>
                </div>
            </div>
        </Html>
    );
};

const Trash = () => {
    const [showButtons, setShowButtons] = useState(true);
    return (
        <div className="w-screen h-screen bg-gray-600">
            <div style={{ width: "100vw", height: "100vh" }}>
                <Suspense fallback={<Loading />}>
                    <Canvas>
                        {/* <CameraControls /> */}
                        <Message showButtons={showButtons} />
                        <GarbageBinsModel />
                        <Form setShowButtons={setShowButtons} />
                        <Info />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};

export default Trash;
