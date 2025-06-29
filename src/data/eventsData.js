// Events page static data
import clash_of_coders from '../assets/Team-2022-2023/events/clash_of_coders.png';
export const upcomingEvents = [
  {
    id: 1,
    title: 'React.js Workshop',
    date: '2025-01-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Lab 301, TCET',
    description: 'Learn the fundamentals of React.js and build your first web application',
    participants: 50,
    category: 'Workshop',
    registrationLink: 'https://forms.google.com/react-workshop',
    image: '/api/placeholder/400/250'
  },
  {
    id: 2,
    title: 'Algorithm Design Contest',
    date: '2025-01-22',
    time: '2:00 PM - 5:00 PM',
    location: 'Computer Lab A',
    description: 'Test your problem-solving skills in this competitive programming contest',
    participants: 100,
    category: 'Contest',
    registrationLink: 'https://forms.google.com/algo-contest',
    image: '/api/placeholder/400/250'
  },
  {
    id: 3,
    title: 'Industry Expert Talk: AI in Healthcare',
    date: '2025-02-05',
    time: '3:00 PM - 5:00 PM',
    location: 'Auditorium',
    description: 'Industry experts discuss the applications of AI in modern healthcare',
    participants: 200,
    category: 'Seminar',
    registrationLink: 'https://forms.google.com/ai-healthcare',
    image: '/api/placeholder/400/250'
  },
  {
    id: 4,
    title: 'Web Development Bootcamp',
    date: '2025-02-12',
    time: '9:00 AM - 6:00 PM',
    location: 'Main Campus',
    description: 'Intensive full-day bootcamp covering HTML, CSS, JavaScript, and modern frameworks',
    participants: 75,
    category: 'Bootcamp',
    registrationLink: 'https://forms.google.com/web-bootcamp',
    image: '/api/placeholder/400/250'
  }
];

export const pastEvents = [
  {
    id: 1,
    title: 'Clash of coders',
    date: '01-01-2023',
    location: 'TCET Campus',
    participants: 100,
    category: 'Contest',
    images: clash_of_coders,
    summary: 'An Online Coding Contest that will be hosted via Hackerrank.com platform. Objective To help students become aware of their knowledge in DSA.'
  },
  {
    id: 2,
    title: 'Data Structures Deep Dive',
    date: '2024-11-20',
    location: 'Lab 205',
    description: 'Comprehensive workshop on advanced data structures',
    participants: 80,
    category: 'Workshop',
    images: ['/api/placeholder/300/200'],
    summary: 'Interactive workshop covering trees, graphs, and advanced algorithms with hands-on coding sessions.'
  },
  {
    id: 3,
    title: 'Open Source Contribution Drive',
    date: '2024-10-30',
    location: 'Virtual',
    description: 'Learn how to contribute to open source projects',
    participants: 120,
    category: 'Workshop',
    images: ['/api/placeholder/300/200'],
    summary: 'Students learned about Git, GitHub, and made their first contributions to open source projects.'
  },
  {
    id: 4,
    title: 'Machine Learning Fundamentals',
    date: '2024-09-25',
    location: 'Auditorium',
    description: 'Introduction to ML algorithms and practical applications',
    participants: 180,
    category: 'Seminar',
    images: ['/api/placeholder/300/200', '/api/placeholder/300/200'],
    summary: 'Industry expert from Google explained ML concepts with real-world examples and career guidance.'
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
