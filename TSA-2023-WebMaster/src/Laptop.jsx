import {
	Html,
	PresentationControls,
	useGLTF
} from "@react-three/drei";

const iFrameStyle = {
	width: "1024px",
	height: "670px",
	border: "none",
	borderRadius: "20px",
};

export default function Laptop() {
	const laptop = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");
	return (
		<>
				<primitive object={laptop.scene} position={[0.6, 0.8, 0.7]} scale={0.1} rotation={[0, Math.PI / 4, 0]}>
					<Html
						wrapperClass="laptop"
						position={[1.3, 1.2, -1.32]}
						transform
						distanceFactor={1.16}
						rotation-x={-0.25}
					>
						<iframe src="https://wikipedia.org" style={iFrameStyle} />
					</Html>
				</primitive>
		</>
	);
}