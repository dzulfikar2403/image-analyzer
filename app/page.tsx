import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainContainer from "@/components/MainContainer";
import { featureArr, howItWorksArr } from "@/constant/data";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <MainContainer />
      <section id="how-it-work" className="max-w-7xl px-4 py-6 mx-auto">
        <h1 className="text-4xl font-bold text-center py-4">How It Works</h1>
        <div className="py-4 flex justify-between gap-6">
          {howItWorksArr.map((el, i) => (
            <div key={i} className="bg-white rounded px-6 py-3">
              <h2 className="text-xl font-bold text-indigo-600">{i+1}</h2>
              <h3 className="text-xl font-medium">{el}</h3>
              <p className="text-lg">
                Our advanced AI analyzes your uploaded image and provides
                detailed information about its contents.
              </p>
            </div>
          ))}
        </div>
      </section>
      <section id="feature" className="max-w-7xl px-4 py-6 mx-auto">
        <h1 className="text-4xl font-bold text-center py-4">Features</h1>
        <div className="grid grid-cols-2 gap-6 py-4">
          {featureArr.map((el,i) => (
            <div key={i} className="bg-white rounded px-6 py-3">
              <h2 className="text-xl font-bold text-indigo-400">{el}</h2>
              <p className="text-lg">
                Our image identifier provides quick and accurate results with a
                simple, easy-to-use interface.
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default page;
