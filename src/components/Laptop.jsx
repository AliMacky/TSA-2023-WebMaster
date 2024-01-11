import { Html, useGLTF } from "@react-three/drei";

const iFrameStyle = {
	width: "1000px",
	height: "820px",
	border: "none",
	borderRadius: "20px",
	display: "block",
	margin: "0 auto",
};

export default function Laptop() {
	const laptop = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf");
	return (
		<>
			<primitive object={laptop.scene} position={[-0.08, 1.8, 0]} scale={0.05} >
				<Html
					wrapperClass="laptop"
					position={[-0.13, 1.55, -1.4]}
					transform
					// rotation-y={0.01}
				>
					<div id="wrapper">
						<iframe src="http://localhost:5173/screen" style={iFrameStyle} />
					</div>
				</Html>
			</primitive>
		</>
	);
}