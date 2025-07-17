import React from 'react';
import HeroImage from '@/assets/church-hero.jpg';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50" 
        style={{ backgroundImage: `url(${HeroImage})` }}
      />
      <div className="relative z-10 text-white px-4">
        <h1 className="text-5xl font-bold mb-4 text-primary-foreground drop-shadow-xl">
          C.L.F.F.M Kiganjo West
        </h1>
        <p className="text-2xl text-primary-foreground drop-shadow-md">
          Building Faith, Serving Community
        </p>
      </div>
    </div>
  );
};

export default Hero;