import { motion } from 'framer-motion';
import { Users, Calendar, MapPin, ExternalLink, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { stats, achievements, values } from '../data/aboutData';
import club_logo from '../assets/club_logo.png';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="pt-24 pb-16 bg-gradient-to-r from-sky-200/10 to-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent mb-6 dark:from-sky-300 dark:to-blue-400">
              About Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Learn more about our journey, mission, and the incredible community we've built together
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <img className="rounded-full" src={club_logo}></img>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About AI Aethra Club</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  The AI Aethra Club, established in 2025 under the Department of Computer Engineering, is a student-driven body dedicated to learning, innovation, and project development in the field of Artificial Intelligence. The club provides a collaborative platform where students explore diverse AI domains such as Machine Learning, Deep Learning, Natural Language Processing, Robotics, and Data Science. With a focus on hands-on projects and peer learning, AI Aethra Club aims to bridge academic knowledge with real-world applications, nurturing creativity, technical expertise, and problem-solving skills among aspiring engineers.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-sky-500 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Numbers that showcase our growing community and achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 mb-4">
                    <IconComponent className="w-8 h-8 text-white mx-auto mb-4" />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/90 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The principles that guide our community and shape our culture</p>
          </motion.div>          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-sky-400 to-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
};

export default About;
