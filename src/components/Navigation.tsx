import React from 'react';
import Logo from '@/assets/church-logo.png';

const Navigation: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="C.L.F.F.M Kiganjo West" className="h-12 w-12" />
          <span className="text-xl font-bold text-primary">C.L.F.F.M Kiganjo West</span>
        </div>
        <div className="space-x-6">
          {['About', 'Services', 'Ministries', 'Contact'].map((section) => (
            <button 
              key={section}
              onClick={() => scrollToSection(section.toLowerCase())} 
              className="text-foreground hover:text-primary transition-colors"
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;