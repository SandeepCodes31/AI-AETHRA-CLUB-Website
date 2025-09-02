import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Users, Calendar, Target } from 'lucide-react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { getEventResults } from '../data/resultsData';

const Results = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [activeCategory, setActiveCategory] = useState('se');
  const [loading, setLoading] = useState(true);
  const confettiRef = useRef(null);

  const getConfettiInstance = (instance) => {
    confettiRef.current = instance;
  };

  const makeShot = (particleRatio, opts) => {
    if (!confettiRef.current) return;
    confettiRef.current({
      ...opts,
      origin: { y: 0.6 },
      particleCount: Math.floor(200 * particleRatio),
    });
  };

  const fireConfetti = () => {
    makeShot(0.25, { spread: 26, startVelocity: 55 });
    makeShot(0.2, { spread: 60 });
    makeShot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  };

  useEffect(() => {
    if (eventId) {
      const eventResults = getEventResults(parseInt(eventId));
      if (eventResults) {
        setResults(eventResults);
        setLoading(false);
      } else {
        navigate('/events');
      }
    }
  }, [eventId, navigate]);

  // start gentle confetti bursts while mounted (desktop only)
  useEffect(() => {
    // reduce or disable on small screens
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    if (!isDesktop) return;
    // initial burst
    fireConfetti();
    const iv = setInterval(() => {
      fireConfetti();
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  const getDefaultUserImage = (name) => {
    const firstLetter = name.charAt(0).toUpperCase();
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-yellow-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;
    return {
      letter: firstLetter,
      color: colors[colorIndex]
    };
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-500" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm font-bold">#{rank}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Results Not Found</h2>
          <button
            onClick={() => navigate('/events')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative results-page overflow-hidden">
      {/* Fireworks background - subtle animated sparks */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="fireworks-wrapper w-full h-full">
          <span className="spark spark-1" />
          <span className="spark spark-2" />
          <span className="spark spark-3" />
          <span className="spark spark-4" />
          <span className="spark spark-5" />
        </div>
      </div>

      <style>{`
        .results-page { overflow: hidden; }
        @media (max-width: 1024px) {
          .results-page { overflow: auto; }
        }
        .fireworks-wrapper { position: relative; width: 100%; height: 100%; overflow: hidden; }
        .spark { position: absolute; width: 8px; height: 8px; border-radius: 50%; opacity: 0.9; box-shadow: 0 0 12px rgba(255,255,255,0.2); }
        .spark-1 { background: radial-gradient(circle at 30% 30%, #ffd166, #f4a261); left: 20%; top: 15%; animation: burst 3.2s linear infinite; }
        .spark-2 { background: radial-gradient(circle at 30% 30%, #caffbf, #2ec4b6); left: 70%; top: 25%; animation: burst 4.1s linear 0.6s infinite; }
        .spark-3 { background: radial-gradient(circle at 30% 30%, #ffd6e0, #ff6b6b); left: 40%; top: 55%; animation: burst 3.8s linear 0.3s infinite; }
        .spark-4 { background: radial-gradient(circle at 30% 30%, #bdb2ff, #845ef7); left: 80%; top: 65%; animation: burst 4.6s linear 1s infinite; }
        .spark-5 { background: radial-gradient(circle at 30% 30%, #c6f6d5, #38bdf8); left: 10%; top: 70%; animation: burst 5s linear 0.2s infinite; }
        @keyframes burst {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(-40vh) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-80vh) scale(0.3); opacity: 0; }
        }
      `}</style>
  <section className="pt-20 pb-8 bg-gradient-to-r from-purple-500/8 to-pink-500/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Events
            </button>
            
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 dark:from-purple-300 dark:to-pink-300">
              {results.eventTitle} - Results
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-1">{results.eventDate}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">{results.description}</p>
            
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{results.totalParticipants} Participants</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Deadline: {results.submissionDeadline}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4">
            {Object.entries(results.categories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.icon}</span>
                <span>{category.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {results.categories[activeCategory] && (
            <div className="space-y-8 lg:space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
                  🏆 Top 3 - {results.categories[activeCategory].title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
                  {results.categories[activeCategory].topThree.map((winner, index) => {
                    const defaultAvatar = getDefaultUserImage(winner.name);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className={`relative overflow-hidden rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-transparent`}
                      >
                        {/* decorative top stripe based on rank */}
                        <div className={`absolute left-0 top-0 w-full h-12 ${winner.rank === 1 ? 'bg-gradient-to-r from-yellow-300 to-yellow-400' : winner.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400' : 'bg-gradient-to-r from-amber-300 to-amber-400'} opacity-95`}></div>

                        {/* avatar overlapping the stripe */}
                        <div className="relative pt-6">
                          <div className="-mt-8 flex justify-center">
                            {winner.image ? (
                              <img src={winner.image} alt={winner.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl" />
                            ) : (
                              <div className={`w-20 h-20 rounded-full ${defaultAvatar.color} flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white`}>{defaultAvatar.letter}</div>
                            )}
                          </div>

                          <div className="mt-4 text-center">
                            <div className="flex items-center justify-center mb-2 space-x-3">
                              <div className="text-2xl">{getRankIcon(winner.rank)}</div>
                              <span className={`text-sm font-semibold ${winner.color}`}>#{winner.rank}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{winner.name}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{winner.branch} • Division {winner.division}</p>

                            <div className="bg-white dark:bg-gray-800 rounded-md p-2 mb-1 shadow-sm text-left max-w-full mx-auto">
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-sm text-gray-800 dark:text-gray-200 flex-none">Project:</span>
                                <span className="text-sm text-gray-700 dark:text-gray-300 truncate block flex-1" title={winner.project}>{winner.project}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">🌟 Other Top Performers</h2> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.categories[activeCategory].others && results.categories[activeCategory].others.map((participant, index) => {
                    const defaultAvatar = getDefaultUserImage(participant.name);
                    return (
                      <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.04 }} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          {participant.image ? (
                            <img src={participant.image} alt={participant.name} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                          ) : (
                            <div className={`w-10 h-10 rounded-full ${defaultAvatar.color} flex items-center justify-center text-white text-sm font-semibold`}>{defaultAvatar.letter}</div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{participant.name}</h4>
                              <div className="text-sm text-gray-500">{getRankIcon(participant.rank)}</div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300">{participant.branch} • Division {participant.division}</p>
                            <p className="text-xs text-gray-700 dark:text-gray-300 mt-2">
                              <span className="font-medium text-xs mr-2">Project:</span>
                              <span className="truncate inline-block align-middle w-[70%]" title={participant.project}>{participant.project}</span>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📋 Judging Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.judgingCriteria.map((criteria, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{criteria}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Results;
