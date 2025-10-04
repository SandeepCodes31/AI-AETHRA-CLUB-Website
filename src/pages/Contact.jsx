import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };  
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const url = "https://script.google.com/macros/s/AKfycbwZx_0ONXnvFAN3WRnYPqw6Ry2wWAn3Z9urbtLkyKl-bNaRD3leP08XZpRcg33APSeQ/exec";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        Name: formData.name,
        Email: formData.email,
        Message: formData.message
      })
    });
    console.log('Response:', response);
    const result = await response.text();
     Swal.fire({
      icon: 'success',
      title: 'Submitted!',
      text: 'Your message has been sent.',
      confirmButtonColor: '#3085d6'
    });
    setFormData({ name: '', email: '', message: '' });

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Please try again later.',
      confirmButtonColor: '#d33'
    });
    console.error('Error:', error);
    alert("Error submitting form");
  } finally {
    setIsSubmitting(false);
  }
};

  const contactInfo = [
    // {
    //   icon: Mail,
    //   title: 'Email',
    //   detail: 'gfg.tcet@gmail.com',
    //   link: 'mailto:gfg.tcet@gmail.com'
    // },
    // {
    //   icon: Phone,
    //   title: 'Phone',
    //   detail: '+91 98765 43210',
    //   link: 'tel:+919876543210'
    // },
    {
      icon: MapPin,
      title: 'Location',
      detail: 'Thakur College of Engineering and Technology, Kandivali, Mumbai',
      link: 'https://maps.google.com'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: '#',
      color: 'hover:bg-gray-900'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/ai.aethra.club?igsh=dHcyNXh0aGtoNXZy',
      color: 'hover:bg-pink-600'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: '#',
      color: 'hover:bg-blue-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      url: '#',
      color: 'hover:bg-blue-400'
    }
  ];

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
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent mb-6 dark:from-sky-300 dark:to-blue-400">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">Have questions, suggestions, or want to collaborate? We'd love to hear from you!</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-sky-900 dark:text-sky-300 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sky-900 dark:text-sky-300 mb-2">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-sky-300 dark:border-sky-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="Enter your full name"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sky-900 dark:text-sky-300 mb-2">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-sky-300 dark:border-sky-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="Enter your email address"/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-sky-900 dark:text-sky-300 mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 border border-sky-300 dark:border-sky-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none" placeholder="Tell us about your query, suggestion, or collaboration idea..."/>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-sky-500 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-sky-600 hover:to-blue-800 transform hover:scale-[1.02]'
                  }`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-sky-900 dark:text-sky-300 mb-6">Get in Touch</h2>
                <p className="text-sky-700 dark:text-sky-400 leading-relaxed"> Whether you're a student looking to join our community, a fellow developer  wanting to collaborate, or an organization interested in partnerships,  we're here to connect and create amazing things together.</p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-700 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sky-900 dark:text-sky-300">
                          {info.title}
                        </h3>
                        <p className="text-sky-700 dark:text-sky-400 text-sm">
                          {info.detail}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-sky-900 dark:text-sky-300 mb-4">Follow Us</h3>
                <p className="text-sky-700 dark:text-sky-400 mb-6 text-sm">Stay updated with our latest events, projects, and community highlights</p>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        className={`flex items-center space-x-3 p-3 bg-sky-100 dark:bg-sky-700 rounded-lg transition-all duration-300 ${social.color} hover:text-white group`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium text-sm">{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-4 border border-sky-200 dark:border-sky-800">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">PM</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-sky-900 dark:text-sky-300">Prince Maurya</h3>
                    <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-2">Secretary of AI AETHRA-TCET 2025</p>
                    <p className="text-xs text-sky-700 dark:text-sky-400 leading-relaxed">
                      Website crafted with ❤️ in 2025. For any website issues, contact: princemaurya8879@gmail.com | +91 99877 42369
                    </p>
                  </div>
                </div>
              </div>
             
              <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md p-4 border border-sky-200 dark:border-sky-800 mt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">SP</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-sky-900 dark:text-sky-300">Sandeep Pal</h3>
                    <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-2">Technical Member of AI AETHRA-TCET</p>
                    <p className="text-xs text-sky-700 dark:text-sky-400 leading-relaxed">
                     Website crafted with ❤️ in 2025 | Contributing to the technical excellence of AI AETHRA-TCET.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-sky-500 to-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Visit Our Campus
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Come visit us at Thakur College of Engineering and Technology
            </p>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white mr-3" />
                <h3 className="text-2xl font-bold text-white">Our Location</h3>
              </div>
              <p className="text-white/90 leading-relaxed">
                Thakur College of Engineering and Technology<br />
                A-Block, Thakur Educational Campus,<br />
                Shyamnarayan Thakur Marg, Thakur Village,<br />
                Kandivali (East), Mumbai - 400101
              </p>
              <motion.a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-white text-sky-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Directions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
