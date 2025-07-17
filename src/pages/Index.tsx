// Update this page (the content is just a fallback if you fail to update the page)

import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import Ministries from '@/components/Ministries';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <div className="container mx-auto px-4 space-y-16 py-16">
        <AboutUs />
        <Services />
        <Ministries />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
