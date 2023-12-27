// Route to all webpages
import Home from "./pages/Room";
import Screen from "./pages/Screen.jsx";
import Garage from "./pages/Garage.jsx";
import { Routes, Route } from "react-router-dom";
import usePreventZoom from "./usePreventZoom.jsx";

const App = () => {
	usePreventZoom();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/screen" element={<Screen />} />
			<Route path="/garage" element={<Garage />} />
		</Routes>
	);
};

export default App;
