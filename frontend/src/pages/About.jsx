import React from "react";
import "../index.css";
import { IoMdArrowBack } from "react-icons/io";
import reactIcon from "../assets/reacticon.png";
import threeIcon from "../assets/threejs.png";
import blenderIcon from "../assets/blender.png";
import flaskIcon from "../assets/flask.png";
import tfIcon from "../assets/tensorflow.png";
import dockerIcon from "../assets/docker.jpg";
import { useEffect } from "react";

const About = () => {

    useEffect(() => {
        document.body.style = "background:#4B5563";
        document.title = "About";
    }, []);
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[80vw] absolute top-2 bg-gray-900 rounded-lg  p-6 text-white">
                <button
                    onClick={() => {
                        window.top.location.href = "/";
                    }}
                    className="text-lg lg:text-xl bg-green-600 p-2 rounded-lg lg:absolute lg:top-6 lg:left-6 hover:scale-110 hover:shadow-2xl hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center"
                >
                    <IoMdArrowBack className="mr-2" />
                    Return Home
                </button>
                <h1 className=" text-center text-7xl p-4 font-bold">About</h1>
                <div className="text-center text-blue-500 mb-4 text-2xl">
                    <a
                        href="student-copyright-checklist-signed.pdf"
                        className="hover:underline"
                    >
                        Copyright Checklist
                    </a>
                    <div>
                        <a
                            href="work-log.pdf"
                            className="hover:underline"
                        >
                            Plan of Work Log
                        </a>
                    </div>
                </div>
                <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-3 relative">
                    <h2 className="text-center text-3xl p-2">Sources</h2>
                    <div className="pl-14 -indent-12 p-2 break-words">
                        <p>
                            "Air Source Heat Pumps." Energy.gov, U.S. Department
                            of Energy,
                            www.energy.gov/energysaver/air-source-heat-pumps.
                        </p>

                        <p>
                            "Alternative Fuels Data Center." Energy.gov, U.S.
                            Department of Energy,
                            afdc.energy.gov/fuels/electricity_benefits.html.
                            Accessed 15 Feb. 2024.
                        </p>

                        <p>
                            "Are electric vehicles definitely better for the
                            climate than gas-powered cars?" MIT Climate Portal,
                            MIT, 12 Oct. 2022,
                            climate.mit.edu/ask-mit/are-electric-vehicles-definitely-better-climate-gas-powered-cars.
                            Accessed 15 Feb. 2024.
                        </p>

                        <p>
                            Crail, Chauncey, and Corinne Tyane. "Solar Energy
                            Pros And Cons: What Are The Advantages And
                            Disadvantages?" Edited by Samantha Allen. Forbes,
                            Forbes Media, 6 Feb. 2024,
                            www.forbes.com/home-improvement/solar/solar-energy-pros-and-cons/.
                            Accessed 15 Feb. 2024.
                        </p>

                        <p>
                            "Credits for new clean vehicles purchased in 2023 or
                            after." IRS,
                            www.irs.gov/credits-deductions/credits-for-new-clean-vehicles-purchased-in-2023-or-after.
                            Accessed 15 Feb. 2024.
                        </p>

                        <p>
                            "Energy Efficient Home Improvement Credit." IRS,
                            www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit.
                            Accessed 16 Feb. 2024.
                        </p>

                        <p>
                            "Furnaces and Boilers." Energy.gov, U.S. Department
                            of Energy,
                            www.energy.gov/energysaver/furnaces-and-boilers.
                            Accessed 15 Feb. 2024.
                        </p>

                        <p>
                            Gaur, Ankita Singh, et al. "Heat pumps and our
                            low-carbon future: A comprehensive review."
                            ScienceDirect, Elsevier B.V., 2020,
                            www.sciencedirect.com/science/article/abs/pii/S221462962030339X.
                            Accessed 18 Feb. 2024.
                        </p>

                        <p>
                            "New-Vehicle Transaction Prices Decline Further in
                            September, Led by Price Cuts at Tesla, According to
                            Kelley Blue Book Report." Cox Automotive, 11 Oct.
                            2023,
                            www.coxautoinc.com/market-insights/kbb-atp-september-2023/.
                            Accessed 15 Feb. 2024.
                        </p>

                        <p>
                            Ogletree, Allie, and Nick Cellucci. "How Much Do
                            Solar Panels Cost In 2024?" Edited by Lowe Saddler.
                            Forbes, Forbes Media, 22 Feb. 2024,
                            www.forbes.com/home-improvement/solar/cost-of-solar-panels/#factors_that_affect_solar_panel_costs_section.
                            Accessed 15 Feb. 2024.
                        </p>

                        <p>
                            "Residential Clean Energy Credit." IRS,
                            www.irs.gov/credits-deductions/residential-clean-energy-credit.
                            Accessed 18 Feb. 2024.
                        </p>
                        <p>
                            "Kitchen Appliances." Energy.gov, U.S. Department of
                            Energy, www.energy.gov/
                            energysaver/kitchen-appliances. Accessed 16 Feb.
                            2024.
                        </p>
                        <p>
                            "Buying Energy-Efficient Appliances." Green America,
                            www.greenamerica.org/
                            green-living/energy-efficient-appliances. Accessed
                            16 Feb. 2024.
                        </p>
                        <p>
                            "Composting at Home." United States Environmental
                            Protection Agency, 18 Dec. 2023,
                            www.epa.gov/recycle/composting-home#whycom. Accessed
                            15 Feb. 2024.
                        </p>
                        <p>
                            "Composting: Solution to Food Loss and Waste."
                            United Nations Environment Programme, 25 Sept. 2023,
                            www.unep.org/ietc/news/story/
                            composting-solution-food-loss-and-waste. Accessed 15
                            Feb. 2024.
                        </p>
                        <p>
                            Cathey, Amber, and Pahriya Ashrap. "Trash to
                            Treasure: The Incredible Benefits of Composting."
                            University of Michigan School of Public Health, The
                            Regents of the University of Michigan, 19 Sept.
                            2019, sph.umich.edu/pursuit/
                            2019posts/benefits-of-composting.html. Accessed 15
                            Feb. 2024.
                        </p>
                    </div>
                </div>
                <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-3 relative">
                    <h2 className="text-center text-3xl p-2">Images</h2>
                    <div className="pl-14 -indent-12 p-2 break-words">
                        <p>
                            Madubuike, Precious. White and black car in front of
                            white building during daytime. Unsplash.com, 15 Mar.
                            2021, unsplash.com/photos/
                            white-and-black-car-in-front-of-white-building-during-daytime-N2Td7KpIvYc.
                        </p>

                        <p>
                            Moss, Olly. "Early Morning Green."
                            Blog.campsanto.com, 8 Feb. 2016,
                            blog.camposanto.com/post/138965082204/
                            firewatch-launch-wallpaper-when-we-redid-the
                        </p>

                        <p>
                            Phonsri, Praewpailin. Condensing unit of air
                            conditioning systems. Vecteezy.com,
                            www.vecteezy.com/photo/
                            5354658-condensing-unit-of-air-conditioning-systems.
                        </p>

                        <p>
                            VivintSolar. Brown brick house with solar panels on
                            roof. Unsplash.com, 26 Aug. 2019,
                            unsplash.com/photos/
                            brown-brick-house-with-solar-panels-on-roof-9CalgkSRZb8.
                        </p>
                        <p>
                            Spiske, Markus. Selective focus photo of shovel on
                            sand. Unsplash.com, 18 Aug. 2018,
                            unsplash.com/photos/
                            selective-focus-photo-of-shovel-on-sand-pASHRAKiDeU.
                        </p>
                        <p>
                            Jamil, Latrach Med. Fridge in a corner.
                            Unsplash.com, 15 Oct. 2019, unsplash.com/
                            photos/blue-refrigerator-beside-green-leafed-plant-Eb6hMEhGlKY.
                        </p>
                        <p>
                            Apart Labs. World Eclipse Spinning Animation. Dribbble, https://dribbble.com/shots/4872252-World-Eclipse-Spinning-Animation
                        </p>
                    </div>
                </div>
                <div className="rounded-lg bg-gray-800 p-2 lg:p-3 mt-3 relative">
                    <h2 className="text-center text-3xl p-2">Models</h2>
                    <div className="p-2 break-words">
                        <p>
                            "Tesla Powerwall 2" by Steven Samuel used under CC
                            BY 4.0
                            https://sketchfab.com/3d-models/tesla-powerwall-2-685ca14d035347dd91c79b19c34a1a8e
                        </p>

                        <p>
                            "Warmtepomp | Panasonic WC05H3E5" by Stichting
                            Consortium Beroepsonderwijs used under CC BY 4.0
                            https://sketchfab.com/3d-models/warmtepomp-panasonic-wc05h3e5-30e678e5ddf6469c81558deefc701370
                        </p>
                        <p>
                            "Low Poly Kitchen" by Bubble Tea
                            https://www.turbosquid.com/3d-models/low-poly-kitchen-1922088
                        </p>
                        <p>"Interior office modern chair" by panerebus https://www.cgtrader.com/free-3d-models/interior/interior-office/interior-office-modern-chair</p>
                    </div>
                </div>
                <div className="mt-3 bg-gray-800 rounded-lg p-4">
                    <h2 className="text-center text-3xl">
                        Libraries and Tools Used:
                    </h2>
                    <div className="flex flex-col items-center lg:flex-row justify-center">
                        <div>
                            <button
                                onClick={() => {
                                    window.top.location.href =
                                        "https://react.dev/";
                                }}
                                className="text-lg lg:text-xl m-4 rounded-lg hover:scale-110 hover:shadow-2xl hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center"
                            >
                                <img
                                    src={reactIcon}
                                    className="w-20, h-20 rounded-lg"
                                />
                            </button>
                            <p className="text-center">ReactJS</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    window.top.location.href =
                                        "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction";
                                }}
                                className="text-lg lg:text-xl m-4 rounded-lg hover:scale-110 hover:shadow-2xl hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center"
                            >
                                <img
                                    src={threeIcon}
                                    className="w-20, h-20 rounded-lg"
                                />
                            </button>
                            <p className="text-center">React-3F</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    window.top.location.href =
                                        "https://www.blender.org/";
                                }}
                                className="text-lg lg:text-xl m-4 rounded-lg hover:scale-110 hover:shadow-2xl hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center"
                            >
                                <img
                                    src={blenderIcon}
                                    className="w-20, h-20 rounded-lg"
                                />
                            </button>
                            <p className="text-center">Blender</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    window.top.location.href =
                                        "https://flask.palletsprojects.com/en/3.0.x/";
                                }}
                                className="text-lg lg:text-xl m-4 bg-white rounded-lg hover:scale-110 hover:shadow-2xl hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center"
                            >
                                <img
                                    src={flaskIcon}
                                    className="w-20, h-20 rounded-lg p-2"
                                />
                            </button>
                            <p className="text-center">Flask</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    window.top.location.href =
                                        "https://www.tensorflow.org/";
                                }}
                                className="text-lg lg:text-xl m-4 bg-white rounded-lg hover:scale-110 hover:shadow-2xl hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center"
                            >
                                <img
                                    src={tfIcon}
                                    className="w-20, h-20 rounded-lg"
                                />
                            </button>
                            <p className="text-center">Tensorflow</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    window.top.location.href =
                                        "https://www.docker.com/";
                                }}
                                className="text-lg lg:text-xl m-4 bg-white rounded-lg hover:scale-110 hover:shadow-2xl hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center"
                            >
                                <img
                                    src={dockerIcon}
                                    className="w-20, h-20 rounded-lg"
                                />
                            </button>
                            <p className="text-center">Docker</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
