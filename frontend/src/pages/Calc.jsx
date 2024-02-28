import React, { useEffect, useState } from "react";

const Slideshow = () => {
	const [currentForm, setCurrentForm] = useState(1); // Track which form is currently displayed
	const [formName, setFormName] = useState("");
	const [formData, setFormData] = useState({ 1: "", 2: "", 3: "" }); // Store form data

	const handleFormSubmit = (data) => {
		data.preventDefault();
		data.stopPropagation();
		setFormData((prevData) => ({ ...prevData, ...data }));
		console.log(formData);
		nextForm();
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		console.log(formData.currentForm);
	};
	const nextForm = () => {
		setCurrentForm((currentForm) => (currentForm < 3 ? currentForm + 1 : 1));
	};

	const prevForm = () => {
		setCurrentForm((currentForm) => (currentForm > 1 ? currentForm - 1 : 3));
	};
	useEffect(() => {
        switch (currentForm) {
            case 1:
                setFormName("Car");
                break;
            case 2:
                setFormName("Mileage");
                break;
            case 3:
                setFormName("Miles Per Month");
                break;
            default:
                setFormName("FirstForm");
        }
	}, [currentForm]);
	let formComponent;


	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<label className="text-white text-2xl font-bold px-2">
				    {formName}:
					<input
						className="border-2 border-gray-500 px-2 py-2 w-64 m-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:shadow-l"
						type="text"
						name={currentForm}
						value={formData[currentForm]}
						onChange={handleChange}
					/>
				</label>
				<button className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded" type="submit">
					Submit
				</button>
			</form>
			<button className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded" onClick={prevForm}>
				Previous
			</button>
			<button className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded" onClick={nextForm}>
				Next
			</button>
		</>
	);
};

export default Slideshow;
