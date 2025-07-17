import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-secondary/10 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Clock className="mx-auto mb-4 text-primary" size={48} />
          <h3 className="text-xl font-semibold mb-2">Service Times</h3>
          <p>Sunday Service: 9:00 AM</p>
          <p>Wednesday Prayer Meeting: 6:00 PM</p>
          <p>Friday Youth Service: 7:00 PM</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <MapPin className="mx-auto mb-4 text-primary" size={48} />
          <h3 className="text-xl font-semibold mb-2">Location</h3>
          <p>Kiganjo West</p>
          <p>Main Road, Near Community Center</p>
          <p>Kiganjo, Kenya</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Phone className="mx-auto mb-4 text-primary" size={48} />
          <h3 className="text-xl font-semibold mb-2">Contact</h3>
          <p>Tel: +254 xxx xxx xxx</p>
          <p>Email: clfmkiganjowest@church.org</p>
        </div>
      </div>
    </section>
  );
};

export default Services;