import React from "react";
import wallpaper from "../assets/environmentWallpaper.jpg";
import { FaEarthAmericas } from "react-icons/fa6";
const LaptopScreen = () => {
	const changeScreen = () => {
		window.top.location.href = "/garage";
	};

	return (
		<div
			className="w-screen h-screen"
			style={{ backgroundImage: `url(${wallpaper})` }}
		>
			<div className="flex flex-row p-1">
				<button
					className="p-2 h-20 w-20 bg-green-800 m-8 text-white rounded-xl hover:scale-110 hover:shadow-2xl"
					onClick={changeScreen}
				>
					Garage
				</button>
			</div>
			<div className="flex flex-row items-center justify-evenly absolute bottom-0 bg-green-700 w-full min-h-12">
				<FaEarthAmericas className="text-blue-600 text-4xl" />
			</div>
		</div>
	);
};

export default LaptopScreen;
