import React, { useState } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  isAdminView?: boolean;
  onNavigateAdmin?: () => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAdminView = false,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (isAdminView && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-[200] w-full backdrop-blur-xl bg-white/85 border-b border-[#E4E7F5] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand with official uploaded SVG logo */}
        <button
          onClick={() => {
            if (isAdminView && onNavigateHome) {
              onNavigateHome();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-3.5 group text-left focus:outline-none cursor-pointer"
        >
          {/* Logo SVG Image */}
          <div className="h-11 flex items-center">
            <img
              src="/logo.png"
              alt="Mohamed Studio Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </button>

        {/* Desktop Navigation Links (Responsive breakpoint: 900px) */}
        <nav className="hidden min-[900px]:flex items-center gap-8">
          {!isAdminView ? (
            <>
              <button
                onClick={() => scrollTo('about')}
                className="text-[14.5px] font-medium text-[#595D6C] hover:text-[#9184D9] transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollTo('apps')}
                className="text-[14.5px] font-medium text-[#595D6C] hover:text-[#9184D9] transition-colors cursor-pointer"
              >
                Apps Showcase
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="text-[14.5px] font-medium text-[#595D6C] hover:text-[#9184D9] transition-colors cursor-pointer"
              >
                Contact
              </button>
              <button
                onClick={() => scrollTo('apps')}
                className="btn-pill text-xs !py-2 !px-5"
              >
                Explore Apps
              </button>
            </>
          ) : (
            <button
              onClick={onNavigateHome}
              className="btn-pill-secondary text-xs !py-2 !px-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Showcase</span>
            </button>
          )}
        </nav>

        {/* Right side controls for mobile */}
        <div className="flex items-center gap-3 min-[900px]:hidden">
          {isAdminView && (
            <button
              onClick={onNavigateHome}
              className="btn-pill-secondary text-xs !py-1.5 !px-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          {!isAdminView && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-[#595D6C] hover:text-[#161826] hover:bg-[#F3F5FE] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && !isAdminView && (
        <div className="min-[900px]:hidden border-b border-[#E4E7F5] bg-white/98 backdrop-blur-xl px-5 py-5 flex flex-col gap-3 shadow-lg">
          <button
            onClick={() => scrollTo('about')}
            className="text-left py-2.5 px-3 rounded-xl text-sm font-medium text-[#161826] hover:bg-[#F3F5FE]"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('apps')}
            className="text-left py-2.5 px-3 rounded-xl text-sm font-medium text-[#161826] hover:bg-[#F3F5FE]"
          >
            Apps Showcase
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="text-left py-2.5 px-3 rounded-xl text-sm font-medium text-[#161826] hover:bg-[#F3F5FE]"
          >
            Contact
          </button>
          <button
            onClick={() => scrollTo('apps')}
            className="btn-pill mt-2 w-full justify-center"
          >
            Explore Apps
          </button>
        </div>
      )}
    </header>
  );
};
