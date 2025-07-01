import React from 'react';

const heroSlideImage_1 = 'http://localhost:3000/images/hero-slider/hero-slider-1.webp';

const HeroSection = () => {
  return (
    <section className="w-full h-[80%] bg-gray-100 relative">

      <img
        src={heroSlideImage_1}
        alt="Hero"
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default HeroSection;
