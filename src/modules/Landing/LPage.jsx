import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import landing from "../../assets/landing.jpg";
import Logo from "../../assets/slogo.png";
import { Link } from "react-router-dom";

function Lpage() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-8 md:px-16 lg:px-24 py-4 flex justify-between items-center">
        <div className="w-40 md:w-48 h-auto">
          <img
            src={Logo}
            alt="Sneaker Street Logo"
            className="w-full h-full object-contain filter brightness-110 contrast-110 drop-shadow-md"
          />
        </div>
        <Link to="/Userlogin">
        <motion.button
          className="relative overflow-hidden bg-green-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base group border-2 border-green-400/30"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(72, 187, 120, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          
            <span className="relative z-10 font-medium tracking-wider">
              LOGIN
            </span>
          
          <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </motion.button>
        </Link>
      </nav>

      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={landing}
          alt="Premium Sneaker"
          className="w-full h-full object-cover object-center opacity-90"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-transparent "></div>

      {/* Main Content - Tightly spaced */}
      <div
        ref={ref}
        className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 pb-8" // Added pb-8 for bottom padding
      >
        <motion.div
          initial="hidden"
          animate={controls}
          variants={textVariants}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-2 tracking-tighter font-['Bebas_Neue'] mt-40">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200">
              <span className="text-7xl md:text-9xl">S</span>NEAKER{" "}
              <span className="text-7xl md:text-9xl">S</span>TREET
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-green-400 font-semibold mb-4 tracking-[0.3em] font-['Oswald']" // Reduced mb-6 to mb-4
          initial="hidden"
          animate={controls}
          variants={textVariants}
          transition={{ delay: 0.4 }}
        >
          NEW ANNUAL
        </motion.p>

        <motion.div
          initial="hidden"
          animate={controls}
          transition={{ staggerChildren: 0.1, delay: 0.6 }}
        >
          <motion.p
            className="text-xl text-white font-mono mb-1 tracking-widest"
            variants={textVariants}
          >
            {" "}
            {/* Reduced mb-2 to mb-1 */}
            KEY
          </motion.p>
          <motion.p
            className="text-xl text-white font-mono mb-6 tracking-widest"
            variants={textVariants}
          >
            {" "}
            {/* Reduced mb-8/mb-12 to mb-6 */}
            WORKCH
          </motion.p>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight" // Reduced mb-6 to mb-4
          initial="hidden"
          animate={controls}
          variants={textVariants}
          transition={{ delay: 0.8 }}
        >
          Step Into <br />
          Style, Own <br />
          Your Journey!
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={controls}
          transition={{ staggerChildren: 0.1, delay: 1.0 }}
        >
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-lg mb-2"
            variants={textVariants}
          >
            {" "}
            {/* Reduced mb-4 to mb-2 */}
            Find the perfect pair that fits your every step.
          </motion.p>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-lg mb-6"
            variants={textVariants}
          >
            {" "}
            {/* Reduced mb-8/mb-10 to mb-6 */}
            From sneakers to formal shoes, redefine your style.
          </motion.p>
        </motion.div>
        <Link to="/products">
        <motion.button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg mb-6" // Added mb-6
          initial="hidden"
          animate={controls}
          variants={textVariants}
          transition={{ delay: 1.2 }}
        >
         SHOP NOW
        </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default Lpage;
