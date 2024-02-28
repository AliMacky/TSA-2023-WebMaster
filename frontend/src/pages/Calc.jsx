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
				<label className="text-white">
				    {formName}:
					<input
						className="text-black ml-4"
						type="text"
						name={currentForm}
						value={formData[currentForm]}
						onChange={handleChange}
					/>
				</label>
				<button className="text-white p-4" type="submit">
					Submit
				</button>
			</form>
			<button className="text-white p-4 pl-0" onClick={prevForm}>
				Previous
			</button>
			<button className="text-white p-4" onClick={nextForm}>
				Next
			</button>
		</>
	);
};

export default Slideshow;
