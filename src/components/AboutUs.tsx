import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="bg-secondary/20 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">About Us</h2>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg mb-4">
          C.L.F.F.M Kiganjo West is a vibrant Christian community dedicated to spreading 
          the love of Christ and serving our local community with passion and compassion.
        </p>
        <p className="text-lg">
          Founded in [Year], our church has been a beacon of hope, unity, and spiritual growth 
          for the people of Kiganjo West. We believe in transforming lives through faith, 
          worship, and active community engagement.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;