import React from "react";
import wallpaper from "../assets/bg.jpg";
import { FaEarthAmericas, FaCircleInfo } from "react-icons/fa6";
import {
    FaTrashAlt,
    FaCalculator,
    FaSearch,
    FaFolderMinus,
} from "react-icons/fa";

import { MdKitchen } from "react-icons/md";
import { PiGarageBold } from "react-icons/pi";

const Screen = () => {
    const changeScreen = () => {
        window.top.location.href = "/garage";
    };

    return (
        <div
            className="w-screen h-screen"
            style={{ backgroundImage: `url(${wallpaper})` }}
        >
            {window.parent.innerWidth > 1100 && (
                <div className="flex flex-row p-1">
                    <button
                        className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-8 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={changeScreen}
                    >
                        <PiGarageBold className="text-5xl" />
                    </button>
                    <button
                        className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-8 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={changeScreen}
                    >
                        <FaCalculator className="text-4xl" />
                    </button>
                    <button
                        className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-8 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => (window.top.location.href = "/trash")}
                    >
                        <FaTrashAlt className="text-4xl" />
                    </button>
                    <button
                        className="flex items-center justify-center font-kanit p-2 h-20 w-20 bg-green-600 m-8 text-white text-center shadow-2xl rounded-xl hover:scale-110 hover:shadow-2xl opacity-85 hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => (window.top.location.href = "/kitchen")}
                    >
                        <MdKitchen className="text-4xl" />
                    </button>
                </div>
            )}
            <div className="flex flex-row items-center justify-center gap-5 text-4xl absolute bottom-0 bg-gradient-to-r from-emerald-700 to-green-800 w-full min-h-12 opacity-90">
                <FaEarthAmericas className="text-4xl text-sky-400" />
                <FaSearch className="text-slate-400" />
                <FaFolderMinus className="text-slate-400" />
            </div>
        </div>
    );
};

export default Screen;
