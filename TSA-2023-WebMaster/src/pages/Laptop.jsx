import {
	Html,
	useGLTF
} from "@react-three/drei";

const iFrameStyle = {
	width: "1050px",
	height: "700px",
	border: "none",
	borderRadius: "20px",
	display: "block",
	margin: "0 auto",
};

export default function Laptop() {
	const laptop = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");
	return (
		<>
			<primitive object={laptop.scene} position={[0.6, 0.8, 0.7]} scale={0.1} rotation={[0, Math.PI / 4, 0]}>
				<Html
					wrapperClass="laptop"
					position={[-0.13, 1.55, -1.4]}
					transform
					distanceFactor={1.16}
					rotation-x={-0.25}
				>
					<div id="wrapper">
						<iframe src="http://localhost:5173/screen" style={iFrameStyle} />
					</div>
				</Html>
			</primitive>
		</>
	);
}