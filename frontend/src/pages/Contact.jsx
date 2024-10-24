import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {  toast } from 'react-toastify';

const ContactPage = () => {
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        try {
            const response = await fetch('https://formspree.io/f/xvgooylb', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                console.log(response);
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setError(false);
                form.reset();
                toast.success('Thank you for your message!');
            } else {
                throw new Error('Form submission failed');
                toast.error('Failed to send your message');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(true);
        }
    };

    return (
        <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-black' : ''}`}>
            <div className={`w-full max-w-lg border  rounded-2xl shadow-2xl p-8 ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-black' : ''}`}>
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Get In Touch
                </h2>

                {submitted ? (
                    <p className="text-green-500 font-semibold text-center">
                        Thank you! Your message has been sent.
                    </p>
                ) : error ? (
                    <p className="text-red-500 font-semibold text-center">
                        Oops! Something went wrong. Please try again later.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaUser className="text-gray-400 text-xl mr-3" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Full Name"
                                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'text-gray-800 bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-400  rounded-lg`}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <FaEnvelope className="text-gray-400 text-xl mr-3" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email Address"
                                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'text-gray-800 bg-gray-100'}  focus:outline-none focus:ring-2 focus:ring-blue-400  rounded-lg`}
                            />
                        </div>

                        {/* Message Input */}
                        <div className="flex items-start border-b border-gray-300 py-2">
                            <FaCommentDots className="text-gray-400 text-xl mr-3 mt-2" />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Your Message"
                                rows="5"
                                className={`w-full px-3 py-2 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'text-gray-800 bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-400  rounded-lg`}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactPage;
