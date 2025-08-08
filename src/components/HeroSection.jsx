import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import Button from './Button'
import ParticleField from './ParticleField';
import Navbar from './Navbar'; // Import the new Navbar component

export default function HeroSection() {
    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
            <Navbar />
            <ParticleField />

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-purple-600 p-1">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                            <img className="w-full h-full rounded-full object-cover transform scale-150" src="https://raw.githubusercontent.com/jakesanghavi/jakesanghavi.github.io/main/images/denver_me_cropped.JPG"></img>
                        </div>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-6xl md:text-8xl font-bold mt-4 mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-relaxed"
                >
                    Jake Sanghavi
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                >
                    Data Scientist and Full-Stack Developer creating innovative products
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-4 mt-8 mb-8"
                >
                    <Button
                        onClick={() => scrollToSection('portfolio')}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                        View My Work
                    </Button>
                    <Button
                        onClick={() => scrollToSection('contact')}
                        variant="outline"
                        className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                        Get In Touch
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex justify-center gap-6 mb-8"
                >
                    <a
                        href="https://github.com/jakesanghavi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                    >
                        <Github size={28} />
                    </a>
                    <a
                        href="https://linkedin.com/in/jake-sanghavi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                    >
                        <Linkedin size={28} />
                    </a>
                    <a
                        href="mailto:john.doe@example.com"
                        className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                    >
                        <Mail size={28} />
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="animate-bounce"
                >
                    <button
                        onClick={() => scrollToSection('about')}
                        className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                    >
                        <ChevronDown size={32} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
