import React from 'react';

const LaptopScreen = () => {
	const changeScreen = () => {
		window.top.location.href = "/garage";
	}

	return (
		<div className="bg-white w-screen h-screen p-1">
			<button className="p-2 bg-sky-800 m-8" onClick={changeScreen}>
				click
			</button>
		</div>
	)

}

export default LaptopScreen;