import clash_of_coders from '../assets/Team-2022-2023/events/clash_of_coders.png';
import codeflex from '../assets/Team-2025-2026/event/codeflex.jpg';

export const upcomingEvents = [
  {
    id: 1,
    title: 'GFG CodeFlex',
    date: '01-08-2025 to 21-08-2025',
    time: '9:00 AM',
    location: 'Online',
    description: 'Build an innovative project and showcase your technical creativity! GFG CodeFlex is a monthly coding initiative where students can submit their unique projects to compete. Projects are judged based on creativity, execution, technical depth, and presentation. Winners will be featured on GFG socials and can earn certificates and recognition!',
    participants: 500,
    category: 'Competition',
    spots: 'Individual Participation',
    registrationLink: 'https://forms.gle/6EPterrEZQ9zuVVG6',
    image: codeflex,
    status: 'live'
  },
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
