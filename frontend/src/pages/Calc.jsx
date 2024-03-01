import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { PiGarageBold } from "react-icons/pi";
import { MdGarage, MdKitchen } from "react-icons/md";

const Slideshow = () => {
    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        document.title = "Calc";
        const userAgent = navigator.userAgent.toLowerCase();
        setIsSafari(
            userAgent.indexOf("safari") !== -1 &&
            userAgent.indexOf("chrome") === -1
        );
    }, []);
    const [currentForm, setCurrentForm] = useState(0); // Track which form is currently displayed
    const [formName, setFormName] = useState("");
    const [formData, setFormData] = useState({
        1: "",
        2: "",
        3: "Tesla Model Y",
    }); // Store form data
    const [saved, setSaved] = useState([]);
    const handleFormSubmit = (data) => {
        data.preventDefault();
        data.stopPropagation();
        setFormData((prevData) => ({ ...prevData, ...data }));
        nextForm();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        console.log(formData);
    };
    const nextForm = () => {
        setCurrentForm((currentForm) =>
            currentForm < 4 ? currentForm + 1 : 4
        );
    };

    const prevForm = () => {
        setCurrentForm((currentForm) =>
            currentForm > 1 ? currentForm - 1 : 1
        );
    };
    useEffect(() => {
        switch (currentForm) {
            case 0:
                setFormName("Begin");
                break;
            case 1:
                setFormName("What is your gas car's MPG");
                break;
            case 2:
                setFormName("How many miles do you drive in a month");
                break;
            case 3:
                setFormName("Choose an EV to Compare to");
                break;
            case 4:
                let carData = {
                    "Tesla Model Y": [310, 57.5],
                    "Tesla Model 3": [250, 57.5],
                    "Chevy Bolt": [259, 66],
                    "Nissan Leaf": [149, 40],
                };
                setFormName("Results");
                console.log(formData);
                if (formData[1] !== "" && formData[2] !== "") {
                    let gallons = formData[2] / formData[1];
                    let kWh = formData[2] / carData[formData[3]][0];
                    let saved =
                        3.11 * gallons - kWh * carData[formData[3]][1] * 0.16;
                    let emissionsSaved = gallons * 19.5924813 - kWh * 0.86;
                    setSaved([
                        Number(saved.toFixed(2)),
                        Number(emissionsSaved.toFixed(2)),
                    ]);
                }
                break;
            default:
                setFormName("Choose an EV");
        }
    }, [currentForm]);
    let formComponent;

    return (
        <div className="bg-gray-800 p-7 w-screen h-screen">
            {currentForm !== 4 ? (
                <div>
                    {currentForm === 0 ? (
                        <div className="flex flex-row w-screen h-screen absolute top-0 left-0 justify-center items-center">
                            <button
                                className="text-5xl text-center bg-green-600 hover:bg-green-800 text-white font-bold py-[4vh] px-[8vw] rounded-xl"
                                onClick={nextForm}
                            >
                                Begin
                            </button>
                        </div>) : (
                        <form onSubmit={handleFormSubmit}>
                            <label className="text-white text-4xl font-bold">
                                {formName}:
                                <br />
                                {currentForm === 3 ? (
                                    <select
                                        name={currentForm}
                                        value={formData[currentForm]}
                                        onChange={handleSelectChange}
                                        className="text-black text-2xl mr-2 border-2 border-gray-500 px-2 py-2 w-64 my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent focus:shadow-l"
                                    >
                                        <option value="Tesla Model Y">
                                            Tesla Model Y
                                        </option>
                                        <option value="Tesla Model 3">
                                            Tesla Model 3
                                        </option>
                                        <option value="Chevy Bolt">
                                            Chevy Bolt
                                        </option>
                                        <option value="Nissan Leaf">
                                            Nissan Leaf
                                        </option>
                                    </select>
                                ) : (
                                    <input
                                        className="text-black text-2xl mr-2 border-2 border-gray-500 px-2 py-2 w-64 my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent focus:shadow-l"
                                        type="text"
                                        name={currentForm}
                                        value={formData[currentForm]}
                                        onChange={handleChange}
                                    />
                                )}
                            </label>
                            <button
                                className="text-2xl bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <>
                    <h1 className="text-white text-3xl font-bold">
                        Amounts Saved Per Month:
                    </h1>
                    <h1 className="text-white text-2xl font-bold">
                        {saved.length != 0
                            ? `Gas: $${saved[0]}`
                            : "Please answer all the questions."}
                    </h1>
                    <h1 className="text-white text-2xl font-bold">
                        {saved.length != 0 ? (
                            <>
                                Emissions: {saved[1]} lbs of CO<sub>2</sub>
                            </>
                        ) : (
                            <></>
                        )}
                    </h1>
                    <h1 className="text-white text-2xl font-bold">
                        {saved.length != 0 ? (
                            <>
                                Comparing to {formData[3]}
                            </>
                        ) : (
                            <></>
                        )}
                    </h1>
                </>
            )}
            {currentForm !== 0 ? (
                <>
                    <button
                        className="text-4xl bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-2 my-3 rounded"
                        onClick={prevForm}
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        className="text-4xl bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-2 mx-2 my-3 rounded"
                        onClick={nextForm}
                    >
                        <FaArrowRight />
                    </button>
                </>
            ) : (<></>)}
            {(window.parent.innerWidth < 1100) && (
                <div className="flex flex-row p-1 bottom-1 absolute left-1">
                    <button
                        className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => (window.top.location.href = "/")}
                    >
                        <IoIosHome className="text-5xl" />
                    </button>
                    <button
                        className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => (window.top.location.href = "/garage")}
                    >
                        <PiGarageBold className="text-5xl" />
                    </button>
                    <button
                        className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => (window.top.location.href = "/trash")}
                    >
                        <FaTrashAlt className="text-3xl lg:text-4xl" />
                    </button>
                    <button
                        className="flex items-center justify-center font-kanit p-2 lg:h-20 h-12 w-12 lg:w-20 bg-green-600 m-3 lg:m-5 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => (window.top.location.href = "/kitchen")}
                    >
                        <MdKitchen className="text-5xl" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Slideshow;
