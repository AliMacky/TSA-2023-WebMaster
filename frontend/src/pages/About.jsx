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
                            “5 Benefits of Residential Solar.” Energy.Gov, www.energy.gov/energysaver/articles/5-benefits-residential-solar. Accessed 4 Feb. 2024.
                        </p>

                        <p>
                            “Air-Source Heat Pumps.” Energy.Gov, www.energy.gov/energysaver/air-source-heat-pumps. Accessed 4 Feb. 2024.
                        </p>

                        <p>
                            “Buying Energy-Efficient Appliances.” Green America, www.greenamerica.org/green-living/energy-efficient-appliances. Accessed 4 Feb. 2024.
                        </p>

                        <p>
                            Cathey, Pahriya Ashrap and Amber. “Trash to Treasure: The Incredible Benefits of Composting: The Pursuit: University of Michigan School of Public Health: Environmental Health: Innovation: Nutrition: Pollution.” The Pursuit | University of Michigan School of Public Health | Environmental Health | Innovation | Nutrition | Pollution, University of Michigan School of Public Health, 19 Sept. 2019, sph.umich.edu/pursuit/2019posts/benefits-of-composting.html.
                        </p>

                        <p>
                            “Composting: Solution to Food Loss and Waste.” International Environmental Technology Centre, www.unep.org/ietc/news/story/composting-solution-food-loss-and-waste. Accessed 4 Feb. 2024.
                        </p>

                        <p>
                            Crail, Chauncey. “Solar Energy Pros and Cons: What Are the Advantages and Disadvantages?” Forbes, Forbes Magazine, 6 Feb. 2024, www.forbes.com/home-improvement/solar/solar-energy-pros-and-cons/.
                        </p>

                        <p>
                            “Electric Vehicle Benefits and Considerations.” Alternative Fuels Data Center: Electric Vehicle Benefits and Considerations, afdc.energy.gov/fuels/electricity_benefits.html. Accessed 4 Feb. 2024.
                        </p>

                        <p>
                            Electric Vehicle Ownership Costs - Consumers Union, advocacy.consumerreports.org/wp-content/uploads/2020/10/EV-Ownership-Cost-Final-Report-1.pdf. Accessed 4 Feb. 2024.
                        </p>

                        <p>
                            EPA, Environmental Protection Agency, www.epa.gov/recycle/composting-home#whycom. Accessed 4 Feb. 2024.
                        </p>

                        <p>
                            “Furnaces and Boilers.” Energy.Gov, www.energy.gov/energysaver/furnaces-and-boilers. Accessed 4 Feb. 2024.
                        </p>

                        <p>
                            Guar, Ankita Singh. “Heat Pumps and Our Low-Carbon Future: A Comprehensive Review.” Energy Research & Social Science, Elsevier, 27 Oct. 2020, www.sciencedirect.com/science/article/abs/pii/S221462962030339X.
                        </p>
                        <p>
                            Hailes, Dara. “New-Vehicle Transaction Prices Decline Further in September, Led by Price Cuts at Tesla, According to Kelley Blue Book Report.” Cox Automotive Inc., 11 Oct. 2023, www.coxautoinc.com/market-insights/kbb-atp-september-2023/.
                        </p>
                        <p>
                            “Homeowner's Guide to Going Solar.” Energy.Gov, www.energy.gov/eere/solar/homeowners-guide-going-solar. Accessed 4 Feb. 2024.
                        </p>
                        <p>
                            Jonweiner. “Team of Appraisers Across Six States Find Home Buyers Will Pay Premium for Solar Homes.” Berkeley Lab News Center, 11 Nov. 2015, newscenter.lbl.gov/2015/11/12/premium-for-solar-homes/.
                        </p>
                        <p>
                            “Kitchen Appliances.” Energy.Gov, www.energy.gov/energysaver/kitchen-appliances. Accessed 4 Feb. 2024.
                        </p>
                        <p>
                            Lindwall, Courtney. “Electric vs. Gas Cars: Is It Cheaper to Drive an Ev?” Be a Force for the Future, 17 Nov. 2023, www.nrdc.org/stories/electric-vs-gas-cars-it-cheaper-drive-ev.
                        </p>
                        <p>
                            McCloy, John, et al. “13 Important Health & Environmental Benefits of Solar Energy.” Green Coast, 16 Jan. 2023, greencoast.org/environmental-benefits-of-solar-energy/.
                        </p>
                        <p>
                            McMahon, Jeff. “Electric Vehicles Cost Less than Half as Much to Drive.” Forbes, Forbes Magazine, 16 Jan. 2018, www.forbes.com/sites/jeffmcmahon/2018/01/14/electric-vehicles-cost-less-than-half-as-much-to-drive/?sh=215332a03f97.
                        </p>
                        <p>
                            Ogletree, Allie. “How Much Do Solar Panels Cost in 2024?” Forbes, Forbes Magazine, 22 Feb. 2024, www.forbes.com/home-improvement/solar/cost-of-solar-panels/#factors_that_affect_solar_panel_costs_section.
                        </p>
                        <p>
                            “Residential Clean Energy Credit.” Internal Revenue Service, www.irs.gov/credits-deductions/residential-clean-energy-credit. Accessed 4 Feb. 2024.
                        </p>
                        <p>
                            Ritchie, Hannah, and Max Roser. “Sector by Sector: Where Do Global Greenhouse Gas Emissions Come From?” Our World in Data, 28 Dec. 2023, ourworldindata.org/ghg-emissions-by-sector.
                        </p>
                        <p>
                            Warwick, Sarah. “Eco Home Improvements: How to Make Your House Greener.” Homesandgardens.Com, Homes & Gardens, 8 June 2022, www.homesandgardens.com/advice/eco-home-improvements.
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
