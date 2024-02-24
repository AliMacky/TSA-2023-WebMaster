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
    const model = useGLTF("models/garbagebins2.glb");
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

const Form = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const cameraCubeRef = useRef();
    const { camera } = useThree();
    const [position, setPosition] = useState([999, 999, 999]);
    const [category, setCategory] = useState(null);
    const screenSize = useScreenSize();
    const [scale, setScale] = useState(1);
    const [scalePosition, setScalePosition] = useState([0, 22.7, -14.8]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (image) {
            onImageSubmit(image);
        }
    };

    const onImageSubmit = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/predict",
                formData
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

    return (
        <>
            <Html
                position={[10, 30, (-1 * screenSize.width) / 55]}
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
                        onClick={() => moveCamera(3)}
                    >
                        OK
                    </button>
                </div>
            </Html>
        </>
    );
};

const Buttons = () => {
    return (
        <Html fullscreen style={{ transform: "translate3d(1%,20%,0)" }}>
            <div className="flex flex-col p-1 ">
                <button
                    className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-3 lg:m-4 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    onClick={() => (window.top.location.href = "/")}
                >
                    <IoIosHome className="text-5xl" />
                </button>
                <button
                    className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-3 lg:m-4 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    onClick={() => (window.top.location.href = "/garage")}
                >
                    <PiGarageBold className="text-5xl" />
                </button>
                <button
                    className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-3 lg:m-4 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    onClick={() => (window.top.location.href = "/")}
                >
                    <FaCalculator className="text-4xl" />
                </button>
            </div>
        </Html>
    );
};

const Info = () => {
    const screenSize = useScreenSize();
    return (
        <Html
            position={[10, 30, screenSize.width / 370]}
            // /*style={{ transform: `scale(${scale})` }}*/ className="w-100vw"
        >
            <div className="w-[40vw] lg:w-[35vw] h-[100%] mx-auto text-white text-center bg-gray-900 rounded-lg shadow-md p-4 lg:p-8">
                <h1 className="text-2xl lg:text-5xl font-bold text-shadow-lg tracking-wide mb-2 lg:mb-6">
                    More Info
                </h1>
                <p className="text-xs lg:text-base">
                    {screenSize.width} {screenSize.height} Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Ut sit amet mi in elit
                    efficitur gravida consequat vitae elit. Aliquam blandit nibh
                    risus, id consequat mi finibus vitae. Proin euismod purus a
                    cursus volutpat. Morbi convallis arcu ut lectus fermentum
                    semper. Maecenas non massa commodo, rhoncus metus vel,
                    rutrum tellus. Aliquam erat volutpat. Aliquam erat volutpat.
                    In et lectus vel eros iaculis cursus. Suspendisse lobortis
                    ultrices elit lobortis{" "}
                </p>
            </div>
        </Html>
    );
};

const Trash = () => {
    return (
        <div className="w-screen h-screen bg-gray-600">
            <div style={{ width: "100vw", height: "100vh" }}>
                <Suspense fallback={<Loading />}>
                    <Canvas>
                        {/* <CameraControls /> */}
                        <Buttons />
                        <GarbageBinsModel />
                        <Form />
                        <Info />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};

export default Trash;
