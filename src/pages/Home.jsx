import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar, Code, Target, Eye, X, Bell, ExternalLink, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import gfgHomeGif from '../assets/gfg_home.gif';
import { recentEvents, pastEvents, homeTeamMembers, projectOfMonth, teamTestimonials2025_2026 } from '../data/homeData';
import { getCategoryColor } from '../data/eventsData';
import AnimatedTestimonials from '../components/AnimatedTestimonials';

const Home = () => {
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    const isRouterNavigation = sessionStorage.getItem('react-router-navigation') === 'true';
    const popupSeenData = localStorage.getItem('home-popup-seen');

    let shouldShowPopup = false;
    
    if (!isRouterNavigation) {
      if (!popupSeenData) {
        shouldShowPopup = true;
      } else {
        try {
          const { timestamp } = JSON.parse(popupSeenData);
          const threeHoursInMs = 3 * 60 * 60 * 1000; 
          const currentTime = Date.now();
          
          if (currentTime - timestamp > threeHoursInMs) {
            shouldShowPopup = true;
          }
        } catch (error) {
          shouldShowPopup = true;
        }
      }
    }
    
    if (shouldShowPopup) {
      const timer = setTimeout(() => {
        setShowEventPopup(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    if (isRouterNavigation) {
      setTimeout(() => {
        sessionStorage.removeItem('react-router-navigation');
      }, 100);
    }
  }, []);

  const closeEventPopup = () => {
    setShowEventPopup(false);
    const popupData = {
      seen: true,
      timestamp: Date.now()
    };
    localStorage.setItem('home-popup-seen', JSON.stringify(popupData));
  };  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={gfgHomeGif} 
            alt="GFG Background" 
            className="w-full h-full object-cover opacity-20"
          />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-700/10"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <motion.h1
              variants={fadeIn}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent dark:from-sky-300 dark:to-blue-400"
            >
              Welcome to AI AETHRA CLUB
            </motion.h1>
            
            <motion.h2
              variants={fadeIn}
              className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300"
            >
              Thakur College of Engineering and Technology
            </motion.h2>
            
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Join our vibrant community of coding enthusiasts, innovators, and future tech leaders. 
              Together, we learn, build, and grow in the world of technology.
            </motion.p>
            
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/events"
              className="group bg-gradient-to-r from-sky-500 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-sky-600 hover:to-blue-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:animate-pulse transition-all duration-300 transform group-hover:translate-x-1">
                  Join Our Events
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 z-10 relative" />
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </Link>
              
              <Link
                to="/about"
              className="border-2 border-sky-400 text-sky-600 dark:text-white-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-400 hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

  
      <section className="py-20 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Events
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with our latest workshops, contests, and learning sessions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {recentEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-sky-400 mr-3" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                  <span className="inline-block bg-sky-100 dark:bg-yellow-900 text-sky-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                  {event.type}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Past Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-sky-400 mr-3" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <span className={`inline-block ${getCategoryColor(event.type)} px-3 py-1 rounded-full text-sm font-medium`}>
                    {event.type}
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {event.summary}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Hear from our team members about their journey and experiences</p>
          </motion.div>
          <AnimatedTestimonials testimonials={teamTestimonials2025_2026} />
        </div>
      </section> */}

      {/* Footer section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <a href="https://www.instagram.com/ai.aethra.club?igsh=dHcyNXh0aGtoNXZy" aria-label="Instagram" className="hover:text-pink-500">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AI AETHRA CLUB. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Event Announcement Popup... Important line hai hamesha update karna hai and remove karna hai is no event*/}
      {showEventPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeEventPopup}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
      <div className="bg-gradient-to-r from-sky-500 to-blue-700 p-6 text-white relative">
              <button
                onClick={closeEventPopup}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-full">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">New Event Alert!</h3>
                  <p className="text-white/90 text-sm">Fresh opportunities await</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                🎉 AI AETHRA- MODELFORGE
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                🌟 MODELFORGE is our Machine Learning Project Submission Contest, open to all SE and TE developers and innovators from TCET. 
  Whether it's a beginner-level project or an advanced build, your effort matters! 🚀<br /><br />
  🔒 The event is now closed. ✅ Go and check out the results!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                  to="/events"
                  onClick={() => {
                    closeEventPopup();
                    sessionStorage.setItem('react-router-navigation', 'true');
                  }}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-blue-700 text-white px-4 py-3 rounded-lg font-medium hover:from-sky-600 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>View Result</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={closeEventPopup}
                  className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
