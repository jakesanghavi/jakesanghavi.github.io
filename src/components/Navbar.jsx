import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    // A simple function to scroll to any section by its ID
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-50 bg-slate-900/50 backdrop-blur-md transition-all duration-300"
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Name and logo */}
                <button
                    onClick={() => scrollToSection('hero')}
                    className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
                >
                    Jake Sanghavi
                </button>

                {/* Navigation Links to Scroll To */}
                <div className="flex space-x-6">
                    <button
                        onClick={() => scrollToSection('about')}
                        className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
                    >
                        About
                    </button>
                    <button
                        onClick={() => scrollToSection('portfolio')}
                        className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
                    >
                        Portfolio
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="text-slate-300 hover:text-blue-400 transition-colors duration-300 font-medium"
                    >
                        Contact
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
