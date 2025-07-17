import React from 'react';
import Logo from '@/assets/church-logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={Logo} alt="C.L.F.F.M Kiganjo West" className="h-12 w-12 mr-4" />
          <span className="text-lg font-bold">C.L.F.F.M Kiganjo West</span>
        </div>
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} C.L.F.F.M Kiganjo West. All Rights Reserved.</p>
          <p>Building Faith, Serving Community</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;