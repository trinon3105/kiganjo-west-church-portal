import React, { useState } from 'react';
import Logo from '@/assets/church-logo.png';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center space-x-4">
          <img src={Logo} alt="C.L.F.F.M Kiganjo West" className="h-12 w-12" />
          <span className="text-xl font-bold text-primary hidden sm:block">C.L.F.F.M Kiganjo West</span>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {['About', 'Services', 'Ministries', 'Contact'].map((section) => (
            <button 
              key={section}
              onClick={() => scrollToSection(section.toLowerCase())} 
              className="text-foreground hover:text-primary transition-colors"
            >
              {section}
            </button>
          ))}
          {user && (
            <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-primary/20">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{user.email}</span>
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-primary/10 px-4 py-4 space-y-4">
          {['About', 'Services', 'Ministries', 'Contact'].map((section) => (
            <button 
              key={section}
              onClick={() => scrollToSection(section.toLowerCase())} 
              className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
            >
              {section}
            </button>
          ))}
          {user && (
            <div className="pt-4 border-t border-primary/10 space-y-2">
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="font-medium text-foreground">{user.email}</span>
              </p>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;