import React, { Suspense, useRef, useState, useEffect } from "react";
import { useGLTF, PerspectiveCamera, Text3D, Html } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import Loading from "../components/Loading";
import * as THREE from "three";
import { gsap } from "gsap";
import { smoothAnimation } from "../smoothAnimation";
import { calculateRotation } from "../calculateRotation";
import axios from "axios";

const GarbageBinsModel = () => {
    const { camera } = useThree();
    camera.position.set(-17, 11, 0);
    camera.lookAt(0, 11, 0);
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

const ImageForm = ({ onImageSubmit }) => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                {imageUrl && (
                    <div>
                        <button type="submit">Submit</button>
                        <p>Preview:</p>
                        <img src={imageUrl} alt="Uploaded" />
                    </div>
                )}
            </form>
        </div>
    );
};

const Scene = () => {
    const [prediction, setPrediction] = useState(null);

    const handleImageSubmit = async (image) => {
        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await axios.post(
                "http://localhost:5000/predict",
                formData
            );
            const prediction = response.data.prediction;
            setPrediction(prediction);
            console.log(prediction, response.data.probability);
        } catch (error) {
            console.error("Error classifying image:", error);
        }
        console.log("Image submitted:", image);
    };

    return (
        <>
            <Html position={[0, 22.7, -13.7]}>
                <h1>Waste Classifier</h1>
                {prediction && (
                    <div>
                        <h2>Category:</h2>
                        <p>{prediction}</p>
                    </div>
                )}
                <ImageForm onImageSubmit={handleImageSubmit} />
            </Html>
        </>
    );
};

const Trash = () => {
    return (
        <div className="w-screen h-screen bg-gray-600">
            <div style={{ width: "100vw", height: "100vh" }}>
                <Suspense fallback={<Loading />}>
                    <Canvas>
                        {/* <CameraControls /> */}
                        <GarbageBinsModel />
                        <Scene />
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
};

export default Trash;
