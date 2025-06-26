import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Calendar, Code, Target, Eye, X, Bell, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import gfgHomeGif from '../assets/gfg_home.gif';
import { recentEvents, pastEvents, homeTeamMembers, projectOfMonth, visionMission } from '../data/homeData';

const Home = () => {
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEventPopup(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const closeEventPopup = () => {
    setShowEventPopup(false);
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
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
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
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent dark:from-green-300 dark:to-blue-300"
            >
              Welcome to GFG-TCET Chapter
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
                className="group bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Join Our Events</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="border-2 border-green-500 text-green-600 dark:text-white-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

  
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
                  <Calendar className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {event.title}
                </h3>
                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-blue-500 mr-3" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {event.summary}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vision & Mission
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8"
            >              <div className="flex items-center mb-6">
                <Eye className="w-8 h-8 text-yellow-300 mr-4" />
                <h3 className="text-2xl font-bold text-white">{visionMission.vision.title}</h3>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                {visionMission.vision.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8"
            >              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-yellow-300 mr-4" />
                <h3 className="text-2xl font-bold text-white">{visionMission.mission.title}</h3>
              </div>
              <p className="text-white/90 text-lg leading-relaxed">
                {visionMission.mission.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white relative">
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
                🎉 Exciting Events Coming Up!
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Don't miss out on our latest coding competitions, workshops, and tech talks. 
                Join fellow geeks and level up your skills!... This is the Test Pop Up currently there is not Events Hosted
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/events"
                  onClick={closeEventPopup}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>View Events</span>
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
