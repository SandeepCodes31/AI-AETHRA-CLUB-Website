// Projects page static data
export const projects = [
  {
    id: 1,
    title: 'AI-Powered Study Assistant',
    description: 'A machine learning application that provides personalized study recommendations based on learning patterns and performance analytics.',
    techStack: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
    author: 'Team Alpha',
    date: '2024-12',
    category: 'AI/ML',
    githubLink: 'https://github.com/teamalpha/study-assistant',
    demoLink: 'https://study-assistant-demo.vercel.app',
    image: '/api/placeholder/400/250',
    featured: true
  },
  {
    id: 2,
    title: 'Campus Event Management System',
    description: 'A comprehensive web application for managing college events, registrations, and notifications with real-time updates.',
    techStack: ['React', 'Express.js', 'PostgreSQL', 'Socket.io', 'Tailwind CSS'],
    author: 'WebDev Warriors',
    date: '2024-11',
    category: 'Web Development',
    githubLink: 'https://github.com/webdevwarriors/event-management',
    demoLink: 'https://campus-events.netlify.app',
    image: '/api/placeholder/400/250',
    featured: false
  },
  {
    id: 3,
    title: 'Code Collaboration Platform',
    description: 'Real-time collaborative coding platform with video chat, screen sharing, and integrated compiler for multiple programming languages.',
    techStack: ['Vue.js', 'Socket.io', 'Docker', 'Redis', 'WebRTC'],
    author: 'Code Together',
    date: '2024-10',
    category: 'Web Development',
    githubLink: 'https://github.com/codetogether/collaboration-platform',
    demoLink: 'https://codecollab.herokuapp.com',
    image: '/api/placeholder/400/250',
    featured: true
  },
  {
    id: 4,
    title: 'Mobile Expense Tracker',
    description: 'Cross-platform mobile app for tracking personal expenses with budget management, bill reminders, and financial insights.',
    techStack: ['React Native', 'Firebase', 'Chart.js', 'AsyncStorage'],
    author: 'FinTech Innovators',
    date: '2024-09',
    category: 'Mobile Development',
    githubLink: 'https://github.com/fintech/expense-tracker',
    demoLink: '#',
    image: '/api/placeholder/400/250',
    featured: false
  },
  {
    id: 5,
    title: 'Smart Home Automation',
    description: 'IoT-based home automation system with voice control, mobile app integration, and energy consumption monitoring.',
    techStack: ['Arduino', 'Python', 'Flutter', 'MQTT', 'Firebase'],
    author: 'IoT Masters',
    date: '2024-08',
    category: 'IoT',
    githubLink: 'https://github.com/iotmasters/smart-home',
    demoLink: '#',
    image: '/api/placeholder/400/250',
    featured: false
  },
  {
    id: 6,
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for visualizing complex datasets with various chart types, filters, and real-time data updates.',
    techStack: ['D3.js', 'React', 'Python', 'FastAPI', 'PostgreSQL'],
    author: 'Data Wizards',
    date: '2024-07',
    category: 'Data Science',
    githubLink: 'https://github.com/datawizards/visualization-dashboard',
    demoLink: 'https://dataviz-dashboard.vercel.app',
    image: '/api/placeholder/400/250',
    featured: true
  }
];

export const categories = ['all', 'AI/ML', 'Web Development', 'Mobile Development', 'IoT', 'Data Science'];

export const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'featured', label: 'Featured First' },
  { value: 'alphabetical', label: 'Alphabetical' }
];

export const getCategoryColor = (category) => {
  const colors = {
    'AI/ML': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Web Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Mobile Development': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'IoT': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Data Science': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};
