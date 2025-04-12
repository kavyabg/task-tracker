import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";



export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Handle Dark Mode
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  // Init Particles
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };
  

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 overflow-hidden">

      {/* Background Particles */}
      <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 } }
    },
    particles: {
      color: { value: darkMode ? '#ffffff' : '#3b3b3b' }, // ✅ dynamic color
      links: {
        enable: true,
        color: darkMode ? '#ffffff' : '#3b3b3b', // ✅ dynamic link color
        distance: 150,
        opacity: 0.3
      },
      move: { enable: true, speed: 1 },
      number: { value: 50 },
      opacity: { value: 0.2 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } }
    },
  }}
  className="absolute inset-0 z-0"
/>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 bg-white dark:bg-gray-900 dark:text-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full text-center space-y-10"
      >
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4">
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm text-gray-600 dark:text-gray-300">Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="toggle-checkbox hidden"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full p-1 flex items-center transition-all duration-300 dark:bg-gray-700">
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  darkMode ? 'translate-x-5' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">🗂️ Task Tracker App</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            A smart way to organize, prioritize, and conquer your tasks — with clean UI and zero distractions.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6">
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl shadow-md hover:opacity-90 transition"
            >
              Login
            </motion.button>
          </Link>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-xl shadow-md hover:opacity-90 transition"
            >
              Register
            </motion.button>
          </Link>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid sm:grid-cols-2 gap-6 text-left"
        >
          {[
            {
              title: '🛠️ Easy Task Management',
              desc: 'Create, edit, delete, and organize tasks effortlessly.',
              bg: 'bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-blue-300',
            },
            {
              title: '🔐 Secure Authentication',
              desc: 'JWT & bcrypt protected user access for full security.',
              bg: 'bg-purple-100 dark:bg-gray-800 text-purple-700 dark:text-purple-300',
            },
            {
              title: '🌍 Fully Responsive',
              desc: 'Optimized layout for mobile, tablet, and desktop devices.',
              bg: 'bg-green-100 dark:bg-gray-800 text-green-700 dark:text-green-300',
            },
            {
              title: '📊 Dashboard Ready',
              desc: 'Manage all your work in one place. Coming soon!',
              bg: 'bg-yellow-100 dark:bg-gray-800 text-yellow-700 dark:text-yellow-300',
            }
          ].map((card, i) => (
            <div key={i} className={`p-6 rounded-xl shadow ${card.bg}`}>
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-sm mt-2">{card.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">⚙️ How It Works</h3>
          <p className="text-gray-600 dark:text-gray-400">1️⃣ Sign up → 2️⃣ Log in → 3️⃣ Start managing your tasks!</p>
        </motion.div>

        {/* Footer */}
        <footer className="pt-6 border-t border-gray-300 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400">
          Built by <a href="https://github.com/kavyabg" className="text-blue-600 dark:text-blue-400 hover:underline">Kavya B G</a> • Follow on <a href="https://linkedin.com/in/kavyabg" className="text-blue-600 dark:text-blue-400 hover:underline">LinkedIn</a>
        </footer>
      </motion.div>
    </div>
  );
}
