// Route to all webpages
import Home from "./pages/Room";
import Screen from "./pages/Screen.jsx";
import Garage from "./pages/Garage.jsx";
import { Routes, Route } from "react-router-dom";
import usePreventZoom from "./usePreventZoom.jsx";
import Trash from "./pages/Trash.jsx";

const App = () => {
    usePreventZoom();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/screen" element={<Screen />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/trash" element={<Trash />} />
        </Routes>
    );
};

export default App;
