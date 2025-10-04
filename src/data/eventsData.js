import modelforgeImg from '../assets/modelforge.jpg';

export const upcomingEvents = [
  {
    id: 1,
    title: 'ModelForge',
    date: '6th October 2025',
    location: 'Offline',
    description: 'ModelForge is an exciting model training competition where participants build and train machine learning models to solve real-world problems. Teams compete to achieve the highest accuracy and efficiency in their models, showcasing innovative approaches to data science and AI. Join us to test your skills in model development, optimization, and deployment in a competitive environment.',
    participants: 'TBD',
    category: 'Competition',
    spots: 'Team Participation (3 members)',
    registrationLink: '',
  image: modelforgeImg,
    status: 'upcoming'
  },
];

export const pastEvents = [
  {
    id: 1,
    title: 'AI Model poster competition',
    date: '',
    location: '',
    participants: '',
    category: '',
    summary: ''
  }
];

export const getCategoryColor = (category) => {
  const colors = {
    'Workshop': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Contest': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Seminar': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Bootcamp': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Hackathon': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  };
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};
