import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import Contact from './pages/Contact';
import useSecurity from './hooks/useSecurity';
import './App.css';

function App() {
  const { showWarning, closeWarning } = useSecurity();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {showWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md mx-4 border-2 border-red-500">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Security Warning
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Unauthorized access attempts detected. This activity has been logged and monitored for security purposes.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Please use the website normally without attempting to access developer tools or copy content.
                </p>
                <button
                  onClick={closeWarning}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
