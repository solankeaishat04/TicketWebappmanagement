import React from "react";
import { FaArrowRight, FaSignInAlt } from "react-icons/fa";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section
      className="hero relative flex flex-col items-center justify-center text-center 
                 min-h-[600px] md:min-h-[700px] lg:min-h-[750px] xl:min-h-[800px] 
                 bg-gradient-to-b from-indigo-100 to-white overflow-hidden px-4"
    >
      {/* Decorative Circles */}
      <div className="decorative-circle circle-1 z-0 block md:block"></div>
      <div className="decorative-circle circle-2 z-0 block md:block"></div>
      <div className="decorative-circle circle-3 z-0 hidden md:block"></div>
      <div className="decorative-circle circle-4 z-0 hidden md:block"></div>
      <div className="decorative-circle circle-5 z-0 hidden md:block"></div>
      <div className="decorative-circle circle-6 z-0 hidden md:block"></div>

      {/* Hero Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 z-10 font-hero">
        <span className="text-gray-800">Manage</span>{" "}
        <span className="text-green-500">Your</span>{" "}
        <span className="text-indigo-700">Tickets</span>{" "}
        <span className="text-gray-600">Easily</span>
      </h1>

      {/* Hero Description */}
      <p className="text-gray-700 max-w-2xl mb-8 z-10 text-base md:text-lg lg:text-xl">
        Streamline your customer support and handle all tickets in one place. Join
        thousands of businesses using TicketMaster to enhance their support
        experience.
      </p>

      {/* Call-To-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 z-10 justify-center">
        <a
          href="/login"
          className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r 
                     from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 
                     transition-all w-48 text-center flex items-center justify-center gap-2"
        >
          Login
          <FaSignInAlt />
        </a>

        <a
          href="/signup"
          className="px-8 py-3 rounded-lg font-semibold text-green-600 border-2 border-green-500 
                     hover:bg-green-50 transition-all w-48 text-center flex items-center justify-center gap-2"
        >
          Get Started
          <FaArrowRight />
        </a>
      </div>

      {/* Wave SVG */}
      <img
        src="/images/wave.svg"
        alt="wave"
        className="absolute bottom-0 left-0 w-full pointer-events-none z-0"
      />
    </section>
  );
};

export default Hero;
