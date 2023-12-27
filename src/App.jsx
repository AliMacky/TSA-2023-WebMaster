// Route to all webpages
import Home from './pages/Room';
import LaptopScreen from './pages/LaptopScreen';
import TableTest from './pages/TableTest.jsx';
import { Routes, Route } from 'react-router-dom';
import usePreventZoom from './usePreventZoom.jsx';

const App = () => {
	usePreventZoom();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/screen" element={<LaptopScreen />} />
			<Route path="/table" element={<TableTest />} />
		</Routes>
	)
}

export default App