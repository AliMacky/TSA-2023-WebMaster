import React from "react";
import "../index.css";
import { IoMdArrowBack } from "react-icons/io";

const About = () => {
    document.body.style = "background:#4B5563";
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[80vw] absolute top-12 bg-gray-900 rounded-lg  p-6 text-white">
                <button
                    onClick={() => {
                        window.top.location.href = "/";
                    }}
                    className="text-lg lg:text-xl bg-green-600 p-2 rounded-lg lg:absolute lg:top-6 lg:left-6 hover:scale-110 hover:shadow-2xl hover:opcaity-100 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex items-center"
                >
                    <IoMdArrowBack className="mr-2" />
                    Return Home
                </button>
                <h1 className=" text-center text-6xl p-4 font-bold">About</h1>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
