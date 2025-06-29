import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Users, ChevronDown, X } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { useLocation, useNavigate } from 'react-router-dom';
import { teamData, getAvailableYears } from '../data/teamData';
import Swal from 'sweetalert2';

const Team = () => {
  const years = getAvailableYears();
  const location = useLocation();
  const navigate = useNavigate();
  
  const getYearFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    const yearParam = searchParams.get('year');
    return yearParam && years.includes(yearParam) ? yearParam : (years[0] || '2025-2026');
  };
  
  const [selectedYear, setSelectedYear] = useState(getYearFromUrl());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [lightboxImage, setLightboxImage] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const urlYear = getYearFromUrl();
    const searchParams = new URLSearchParams(location.search);
    const yearParam = searchParams.get('year');
  
    if (!yearParam || !years.includes(yearParam)) {
      const currentYear = years[0] || '2025-2026';
      navigate(`/team?year=${currentYear}`, { replace: true });
      setSelectedYear(currentYear);
    } else if (selectedYear !== urlYear) {
      setSelectedYear(urlYear);
    }
  }, [location.search, years, navigate, selectedYear]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && lightboxImage) {
        closeLightbox();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .extended-core-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 24px;
        max-width: 1600px;
        margin: 0 auto;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const applynow = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Registration Closed',
      text: 'Registrations are now closed for the academic year 2025–2026. See you next year!',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6'
    });
  };

  const organizeTeamMembers = (members) => {
    if (!members || members.length === 0) return { core: [], extended: [], committee: [] };
    
    const coreRoles = ['Chairperson', 'Vice Chairperson', 'Technical Head', 'Event Head', 'Marketing Head','Secretary', 'Graphics Head'];
    const extendedRoles = ['Vice-Technical Head', 'Vice-Event Head', 'PR & Outreach Head', 'PR Outreach Head', 'Social Media Head', 'Design & Branding Head', 'Logistics Head', 'Web Head'];
    const committeeRoles = ['Inhouse & Logistics', 'Event Coordinator', 'Technical Team', 'PR & Marketing Team', 'Creatives Team', 'Technical Team', 'PR & Marketing Team', 'Creatives Team', 'Technical Member', 'Marketing Member', 'Graphics Member'];
    const core = members.filter(member => coreRoles.includes(member.role));
    const extended = members.filter(member => extendedRoles.includes(member.role));
    const committee = members.filter(member => committeeRoles.includes(member.role));
    
    return { core, extended, committee };
  };

  const currentTeamData = teamData[selectedYear] || [];
  const { core, extended, committee } = organizeTeamMembers(currentTeamData);
  const hasTeamData = currentTeamData.length > 0;  const handleImageError = (memberId) => {
    setImageErrors(prev => ({
      ...prev,
      [memberId]: true
    }));
  };

  const openLightbox = (member) => {
    // Only open lightbox if image is valid and not in error state
    const hasImageError = imageErrors[member.id] || false;
    const isValidImageSrc = member.image && 
                           member.image !== '/broken-image.jpg' && 
                           !member.image.includes('broken-image') &&
                           member.image !== '';
    
    if (!hasImageError && isValidImageSrc) {
      setLightboxImage(member);
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const renderMemberCard = (member, index, delay = 0) => {
    const hasImageError = imageErrors[member.id] || false;
    
    // Check if the image source is valid (not a broken path)
    const isValidImageSrc = member.image && 
                           member.image !== '/broken-image.jpg' && 
                           !member.image.includes('broken-image') &&
                           member.image !== '';
    
    return (
    <motion.div
      key={member.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 h-[250px] flex flex-col w-[220px] flex-shrink-0"
    >
      <div className="relative mb-4 flex-shrink-0">        
        <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center overflow-hidden">          
          {!hasImageError && isValidImageSrc ? (
            <img
              className="w-full h-full object-cover rounded-full cursor-pointer transition-transform duration-300 hover:scale-110"
              src={member.image}
              alt={member.name}
              title="Click for seeing more"
              onClick={() => openLightbox(member)}
              onError={(e) => {
                e.target.style.display = 'none';
                handleImageError(member.id);
              }}
              onLoad={(e) => {
                e.target.style.display = 'block';
              }}
            />
          ) : (
            <Users className="w-12 h-12 text-white" />
          )}
        </div>
       <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
          <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap min-w-max">
            {member.role}
          </span>
        </div>
      </div>

      <div className="text-center mb-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          {member.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
          {member.bio}
        </p>
      </div>

      <div className="flex justify-center space-x-3 flex-shrink-0">        {member.github && (
          <motion.a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </motion.a>
        )}
        
        {member.linkedin && (
          <motion.a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </motion.a>
        )}
        
        {member.twitter && (
          <motion.a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-sky-100 hover:bg-sky-200 dark:bg-sky-900 dark:hover:bg-sky-800 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Twitter className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </motion.a>
        )}
        
        {member.leetcode && (
          <motion.a
            href={member.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SiLeetcode className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
          </motion.a>
        )}
      </div>
    </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* <div className="fixed top-20 right-4 z-50">
        <button 
          onClick={() => handleImageError(1)}
          className="bg-red-500 text-white px-4 py-2 rounded shadow-lg"
        >
          Test Error ID 1
        </button>
      </div> */}
      
      <div className="pt-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="py-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Academic Year:
              </h3>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <motion.button
                    key={year}
                    onClick={() => {
                      if (year !== selectedYear) {
                        sessionStorage.setItem('react-router-navigation', 'true');
                        navigate(`/team?year=${year}`);
                      }
                    }}
                    className={`px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 ${
                      selectedYear === year
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: selectedYear === year ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {year}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Viewing: <span className="font-semibold text-green-600 dark:text-green-400">{selectedYear}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="pt-8 pb-12 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6 mt-0 dark:from-green-300 dark:to-blue-300">
              Our Team: {selectedYear} 
            </h1>
            <p className="text-20 text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Every member of the society has always been driven and committed to achieving their goals, fostering a healthy workplace culture. Our mutual support and desire to assist one another in any way possible is what makes GFG-TCET a "Team". Take a look at our diverse team of innovative thinkers that want to make a difference. Here we go!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasTeamData ? (
            <motion.div 
              key={selectedYear}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {core.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Core Members</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
                  </div>                  
                  <div className="flex flex-wrap justify-center gap-6">
                    {core.map((member, index) => renderMemberCard(member, index, 0))}
                  </div>
                </motion.div>
              )}
              {extended.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Extended Core Members</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
                  </div>                  <div 
                    className="extended-core-container"
                  >
                    {extended.map((member, index) => renderMemberCard(member, index, 0.2))}
                  </div>
                </motion.div>
              )}

              {committee.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Working Committee</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
                  </div>                  <div className="flex flex-wrap justify-center gap-6">
                    {committee.map((member, index) => renderMemberCard(member, index, 0.4))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`no-data-${selectedYear}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">No Team Data Found</h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6 max-w-md text-center">No team members are available for {selectedYear}. Please check back later or select a different year.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {years.filter(year => year !== selectedYear && teamData[year] && teamData[year].length > 0).map((year) => (
                  <motion.button
                    key={year}
                    onClick={() => {
                      sessionStorage.setItem('react-router-navigation', 'true');
                      navigate(`/team?year=${year}`);
                    }}
                    className="px-4 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View {year} Team
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Want to Join Our Team?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">We're always looking for passionate individuals to join our growing community</p>
            <motion.button 
              onClick={applynow}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Image */}
            <div className="aspect-square overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={lightboxImage.image}
                alt={lightboxImage.name}
              />
            </div>

            {/* Member Info */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {lightboxImage.name}
              </h3>
              <div className="flex justify-center mb-3">
                <span className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {lightboxImage.role}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {lightboxImage.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-3">
                {lightboxImage.github && (
                  <motion.a
                    href={lightboxImage.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </motion.a>
                )}
                
                {lightboxImage.linkedin && (
                  <motion.a
                    href={lightboxImage.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </motion.a>
                )}
                
                {lightboxImage.twitter && (
                  <motion.a
                    href={lightboxImage.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-sky-100 hover:bg-sky-200 dark:bg-sky-900 dark:hover:bg-sky-800 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  </motion.a>
                )}
                
                {lightboxImage.leetcode && (
                  <motion.a
                    href={lightboxImage.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SiLeetcode className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Team;