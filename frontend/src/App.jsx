// Route to all webpages
import Home from "./pages/Room.jsx";
import Screen from "./pages/Screen.jsx";
import Garage from "./pages/Garage.jsx";
import { Routes, Route } from "react-router-dom";
import usePreventZoom from "./usePreventZoom.jsx";
import Trash from "./pages/Trash.jsx";
import About from "./pages/About.jsx";
import Kitchen from "./pages/Kitchen.jsx";
import Calc from "./pages/Calc.jsx";

import Calculator from "./pages/Calculator.jsx";

const App = () => {
    usePreventZoom();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/screen" element={<Screen />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/about" element={<About />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/calc" element={<Calc />} />
            <Route path="/calculator" element={<Calculator />} />
        </Routes>
    );
};

export default App;
