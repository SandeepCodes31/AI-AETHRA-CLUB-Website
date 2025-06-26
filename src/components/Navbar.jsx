import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { getAvailableYears } from '../data/teamData';
import gfg_tcet_logo from '../assets/gfg_tcet_logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [isMobileTeamDropdownOpen, setIsMobileTeamDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const availableYears = getAvailableYears();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Team', path: '/team', hasDropdown: true },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsTeamDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsTeamDropdownOpen(false);
    }, 300); 
  };
  const handleDropdownClick = () => {
    // Clear any pending timeouts when clicking
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsTeamDropdownOpen(false);
  };

  const handleTeamButtonClick = (e) => {
    if (!isTeamDropdownOpen) {
      e.preventDefault();
      setIsTeamDropdownOpen(true);
    }
  };  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTeamDropdownOpen(false);
        if (dropdownTimeoutRef.current) {
          clearTimeout(dropdownTimeoutRef.current);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsMobileTeamDropdownOpen(false);
    }
  }, [isOpen]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-900/95'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <img className="rounded-full" src={gfg_tcet_logo}></img>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              GeeksforGeeks - TCET
            </span>
          </motion.div>         
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative">                  
                {item.hasDropdown ? (
                    <div
                      ref={dropdownRef}
                      className="relative group"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    ><Link
                        to={item.path}
                        className="flex items-center space-x-1 relative group"
                        onClick={handleTeamButtonClick}
                      >
                        <span
                          className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                            location.pathname === item.path || location.pathname.startsWith('/team')
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                          }`}
                        >
                          {item.name}
                        </span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isTeamDropdownOpen ? 'rotate-180' : ''
                          } ${
                            location.pathname === item.path || location.pathname.startsWith('/team')
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-700 group-hover:text-green-600 dark:text-gray-300 dark:group-hover:text-green-400'
                          }`}
                        />
                        {(location.pathname === item.path || location.pathname.startsWith('/team')) && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                            layoutId="activeNav"
                          />
                        )}
                      </Link>                      {/* Team Dropdown */}
                      {isTeamDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="py-2">
                            <Link
                              to="/team"
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl"
                              onClick={handleDropdownClick}
                              onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
                            >
                              All Team Members
                            </Link>
                            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
                            {availableYears.map((year) => (
                              <Link
                                key={year}
                                to={`/team?year=${year}`}
                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors last:rounded-b-xl"
                                onClick={handleDropdownClick}
                                onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
                              >
                                Team {year}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="relative group"
                    >
                      <span
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          location.pathname === item.path
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                        }`}
                      >
                        {item.name}
                      </span>
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                          layoutId="activeNav"
                        />
                      )}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div className="space-y-1">
                  <button
                    onClick={() => setIsMobileTeamDropdownOpen(!isMobileTeamDropdownOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      location.pathname === item.path || location.pathname.startsWith('/team')
                        ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isMobileTeamDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {/* Mobile Team Dropdown */}
                  {isMobileTeamDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 space-y-1"
                    >
                      <Link
                        to="/team"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-800 rounded-md transition-colors"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMobileTeamDropdownOpen(false);
                        }}
                      >
                        All Team Members
                      </Link>
                      {availableYears.map((year) => (
                        <Link
                          key={year}
                          to={`/team?year=${year}`}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-gray-800 rounded-md transition-colors"
                          onClick={() => {
                            setIsOpen(false);
                            setIsMobileTeamDropdownOpen(false);
                          }}
                        >
                          Team {year}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
