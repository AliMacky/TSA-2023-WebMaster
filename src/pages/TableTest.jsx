import { Environment, PresentationControls, useGLTF, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
const TableTest = () => {
    const table = useGLTF('/models/table.glb');
    const iFrameStyle = {
        width: "1000px",
        height: "820px",
        border: "none",
        borderRadius: "20px",
        display: "block",
        margin: "0 auto",
    };
    return (
		<Canvas>
			<primitive object={table.scene} position={[-0.08, 1.8, 0]} scale={1} >
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
		</Canvas>
    )
}
export default TableTest;