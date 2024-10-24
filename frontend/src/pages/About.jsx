import React from 'react';
import { FaRocket, FaHandshake, FaUsers } from 'react-icons/fa';
import img1 from '../assets/pngwing.com (8).png'
import { useSelector } from 'react-redux';
import { FaCode, FaMobileAlt, FaDatabase } from 'react-icons/fa';
import { FaTruck, FaLock, FaHeadset, FaGem } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import motion for animations
import animations from '../animation/animation';

const About = () => {
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    return (
        <div className="py-12 flex flex-col justify-center">
            {/* Hero Section */}
            <section className=" py-16">
                <div className="container mx-auto px-6 text-center">
                    <motion.h1 {...animations.h1} className="text-5xl font-bold mb-4">Welcome to Our World</motion.h1>
                    <motion.p {...animations.p} className="text-lg max-w-2xl mx-auto">
                        Discover who we are, what we stand for, and how we’re shaping the future of technology and innovation.
                    </motion.p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16  flex justify-center">
                <div className="px-6 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative" >
                        <motion.h2 {...animations.h2} className="text-4xl font-bold mb-4">Our Story</motion.h2>
                        <p className="text-lg mb-6">
                            Since our inception, we've been driven by a passion to innovate and create world-class solutions that improve lives. Our journey started in a small garage, and now we’ve expanded globally, impacting millions of people with our technology.
                        </p>
                        <p className="text-lg mb-2">
                            We believe in pushing the boundaries of what’s possible and constantly evolving to meet the needs of our clients.
                        </p>
                        <button className={`px-3 py-2 rounded border  ${isDarkMode ? 'bg-gray-900' : 'bg-gray-300'}`}>
                            start now
                        </button>
                    </div>
                    <div className='flex justify-end'>
                        <motion.img {...animations.img} src={img1} alt="Our Story" className="rounded-lg w-96 shadow-lg" />
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className=" py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg max-w-3xl mx-auto mb-6">
                        To deliver cutting-edge solutions that empower businesses and individuals, driving innovation and promoting sustainable growth.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Mission Cards */}
                        <motion.div {...animations.fadeIn} className={` p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-black to-gray-900 ' : ''} `}>
                            <FaRocket className="text-blue-500 text-5xl mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Innovation</h3>
                            <p>We strive to stay ahead of the curve, embracing new technology and challenging the status quo.</p>
                        </motion.div>
                        <motion.div {...animations.fadeIn}  className={` p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-black to-gray-900 ' : ''} `}>
                            <FaHandshake className="text-blue-500 text-5xl mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Collaboration</h3>
                            <p>Success is achieved together. We build strong partnerships and foster open communication.</p>
                        </motion.div>
                        <motion.div {...animations.fadeIn}  className={` p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-black to-gray-900 ' : ''} `}>
                            <FaUsers className="text-blue-500 text-5xl mb-4 mx-auto" />
                            <h3 className="text-2xl font-bold mb-2">Community</h3>
                            <p>We care about giving back and making a positive impact on the communities we serve.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="py-16 ">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">Meet the Team</h2>
                    <p className="text-lg max-w-3xl mx-auto mb-12">
                        Our team consists of industry experts and passionate innovators who are dedicated to making a difference.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Team Member Cards */}
                        <motion.div {...animations.fadeIn} className={` p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-black to-gray-900 ' : ''} `}>
                            <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full w-32 h-32 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Jane Doe</h3>
                            <p className="text-blue-500">CEO & Founder</p>
                        </motion.div>
                        <motion.div {...animations.fadeIn} className={` p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-black to-gray-900 ' : ''} `}>
                            <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full w-32 h-32 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">John Smith</h3>
                            <p className="text-blue-500">CTO</p>
                        </motion.div>
                        <motion.div {...animations.fadeIn} className={` p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-black to-gray-900 ' : ''} `}>
                            <img src="https://via.placeholder.com/150" alt="Team Member" className="rounded-full w-32 h-32 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">Emily Johnson</h3>
                            <p className="text-blue-500">Lead Engineer</p>
                        </motion.div>
                    </div>
                </div>
            </section>



            <section className=" py-12 p-1">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6 ">Why Shop With Us?</h2>
                    <p className=" mb-10">
                        We offer top-notch services to enhance your shopping experience.
                    </p>
                    <div className='flex justify-center'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl ">
                            <motion.div {...animations.fadeInUp} className={`flex flex-col items-center justify-center rounded ${isDarkMode ? 'bg-gradient-to-r from-slate-800 to-slate-950' : 'shadow-md rounded-lg justify-center'}`}>
                                <FaTruck className="text-2xl text-blue-500 mb-4 " />
                                <h3 className="text-xl font-bold ">Fast Delivery</h3>
                                <p className=" mt-2">Get your products delivered swiftly and on time.</p>
                            </motion.div>
                            <div className='flex flex-col gap-3'>
                                <motion.div {...animations.fadeInUp}  className={`flex flex-col items-center justify-center rounded ${isDarkMode ? 'bg-gradient-to-r from-slate-800 to-slate-950' : 'shadow-md rounded-lg justify-center'}`}>
                                    <FaLock className="text-2xl text-blue-500 mb-4" />
                                    <h3 className="text-xl font-bold ">Secure Payments</h3>
                                    <p className=" mt-2">Your payment information is safe with us.</p>
                                </motion.div>
                                <motion.div {...animations.fadeInUp} className={`flex flex-col items-center justify-center rounded ${isDarkMode ? 'bg-gradient-to-r from-slate-800 to-slate-950' : 'shadow-md rounded-lg justify-center'}`}>
                                    <FaHeadset className="text-2xl text-blue-500 mb-4" />
                                    <h3 className="text-xl font-bold ">24/7 Support</h3>
                                    <p className=" mt-2">We’re here to help you any time of the day.</p>
                                </motion.div>
                            </div>
                            <motion.div {...animations.fadeInUp} className={`flex flex-col items-center justify-center rounded ${isDarkMode ? 'bg-gradient-to-r from-slate-800 to-slate-950' : 'shadow-md rounded-lg justify-center'}`}>
                                <FaGem className="text-2xl text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold ">Premium Quality</h3>
                                <p className=" mt-2">Our products are guaranteed to meet your expectations.</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
