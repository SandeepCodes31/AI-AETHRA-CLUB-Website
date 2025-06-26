import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ExternalLink, Clock, Tag, X, Send } from 'lucide-react';
import { upcomingEvents, pastEvents, getCategoryColor } from '../data/eventsData';
import Swal from 'sweetalert2';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    name: '',
    email: '',
    contact: '',
    branch: '',
    year: '',
    division: '',
    idea: '',
    title: '',
    description: ''
  });
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);

  const handleEventInputChange = (e) => {
    setEventFormData({
      ...eventFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEventSubmit = async (e) => {
  e.preventDefault();
  setIsSubmittingEvent(true);

  const url = "https://script.google.com/macros/s/AKfycbyIZ5FrrO2kucxLKcxP7wQc6jbgiASXwrNTob0sxNMS7kjmuDoOIRbQzqFbrC-28uXr/exec";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        Name: eventFormData.name,
        Email: eventFormData.email,
        Contact: eventFormData.contact,
        Branch: eventFormData.branch,
        Year: eventFormData.year,
        Division: eventFormData.division,
        Idea: eventFormData.idea,
        Title: eventFormData.title,
        Description: eventFormData.description
      })
    });

    const result = await response.text();

    Swal.fire({
      icon: 'success',
      title: 'Event Submitted!',
      text: 'Thank you for submitting your idea. Your proposal has been successfully received!',
      confirmButtonColor: '#3085d6'
    });

    setEventFormData({
      name: '',
      email: '',
      contact: '',
      branch: '',
      year: '',
      division: '',
      idea: '',
      title: '',
      description: ''
    });
    setShowEventModal(false);

  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Submission Failed',
      text: 'Please try again later or contact GFG TCET directly.',
      confirmButtonColor: '#d33'
    });
  } finally {
    setIsSubmittingEvent(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Events
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join our workshops, contests, and seminars to enhance your skills and connect with fellow developers
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            {[
              { id: 'upcoming', label: 'Upcoming Events' },
              { id: 'past', label: 'Past Events' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'upcoming' ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                      <Calendar className="w-16 h-16 text-white" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <Users className="w-4 h-4 mr-1" />
                          {event.participants} spots
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{event.description}</p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                      <motion.a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-center inline-flex items-center justify-center space-x-2 hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Register Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="past"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="lg:flex">
                      <div className="lg:w-1/3">
                        <div className="h-64 lg:h-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center overflow-hidden border-r border-black">
                          <img 
                            src={event.images} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="lg:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                            {event.category}
                          </span>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <Users className="w-4 h-4 mr-1" />
                            {event.participants} participants
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{event.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{event.summary}</p>
                        <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 text-sm">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Have an Event Idea?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">We're always open to new ideas and collaborations. Share your event proposal with us!</p>            
            <motion.button
              onClick={() => setShowEventModal(true)}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Propose an Event
            </motion.button>
          </motion.div>        
          </div>
      </section>

      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Propose an Event</h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleEventSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name *</label>
                  <input type="text" id="name" name="name" value={eventFormData.name} onChange={handleEventInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="Enter your full name"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" value={eventFormData.email} onChange={handleEventInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="Enter your email address"/>
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number *</label>
                  <input type="tel" id="contact" name="contact" value={eventFormData.contact} onChange={handleEventInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="Enter your contact number"/>
                </div>
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Branch *</label>
                  <select id="branch" name="branch" value={eventFormData.branch} onChange={handleEventInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                    <option value="">Select Branch</option>
                    <option value="Artificial Intelligence and Machine Learning">Artificial Intelligence and Machine Learning</option>
                    <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Computer Science Engineering">Computer Science Engineering</option>
                    <option value="Internet of Things">Internet of Things</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Telecommunications">Electronics & Telecommunications</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year *</label>
                  <select  id="year"  name="year"  value={eventFormData.year}  onChange={handleEventInputChange}  required  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                    <option value="">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Fourth Year">Fourth Year</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="division" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Division *</label>
                  <select id="division" name="division" value={eventFormData.division} onChange={handleEventInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                    <option value="">Select Division</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="idea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Idea/Type *</label>
                <select id="idea" name="idea" value={eventFormData.idea} onChange={handleEventInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors">
                  <option value="">Select Event Type</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Coding Contest">Coding Contest</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Tech Talk">Tech Talk</option>
                  <option value="Project Exhibition">Project Exhibition</option>
                  <option value="Study Group">Study Group</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Title *</label>
                <input type="text" id="title" name="title" value={eventFormData.title} onChange={handleEventInputChange} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors" placeholder="Give your event a catchy title"/>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Description *</label>
                <textarea id="description" name="description" value={eventFormData.description} onChange={handleEventInputChange} required rows={5} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none" placeholder="Describe your event idea, objectives, target audience, expected outcomes, and any special requirements..."/>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => setShowEventModal(false)} className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Cancel</button>
                <motion.button
                  type="submit"
                  disabled={isSubmittingEvent}
                  className={`px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                    isSubmittingEvent ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-600 hover:to-blue-600'
                  }`}
                  whileHover={{ scale: isSubmittingEvent ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmittingEvent ? 1 : 0.95 }}
                >
                  {isSubmittingEvent ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Proposal</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Events;
