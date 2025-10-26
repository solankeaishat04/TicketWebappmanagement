import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import Features from "../components/layout/Features";
import Footer from "../components/layout/Footer";

const Landing: React.FC = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto ">
    <div className="flex flex-col">
      <Navbar />
      <Hero /> 
    </div>
    <Features />
    <Footer/>
       </div>
  );
};

export default Landing;
