export const eventResults = {
  1: {
    eventTitle: "GFG CodeFlex",
    eventDate: "01-08-2025 to 25-08-2025",
    description: "Monthly Project Submission Contest Results",
    categories: {
      se: {
        title: "Second Year (SE)",
        icon: "🥈",
        topThree: [
          {
            rank: 1,
            name: "Varun Maurya",
            branch: "Artificial Intelligence and Machine Learning",
            division: "B",
            project: "Resume Screening",
            badge: "🥇",
            color: "text-yellow-600"
          },
          {
            rank: 2,
            name: "Shravan Patne",
            branch: "Artificial Intelligence and Data Science",
            division: "B",
            project: "Student Management System",
            badge: "🥈",
            color: "text-gray-600"
          },
          {
            rank: 3,
            name: "Jidnyesh Badgujar",
            branch: "Information Technology",
            division: "A",
            project: "Website Uptime Monitoring System",
            score: 89,
            badge: "🥉",
            color: "text-amber-600"
          }
        ],
      },
      te: {
        title: "Third Year (TE)",
        icon: "🥇",
        topThree: [
          {
            rank: 1,
            name: "Khushi Gupta",
            branch: "Computer Engineering",
            division: "A",
            project: "Workora- Job portal",
            badge: "🥇",
            color: "text-yellow-600"
          },
          {
            rank: 2,
            name: "Kaustubh Alshi",
            branch: "Computer Engineering",
            division: "A",
            project: "Swar Saathi - Classical Music Learning App",
            badge: "🥈",
            color: "text-gray-600"
          },
          {
            rank: 3,
            name: "Fawaz Khan",
            branch: "Information Technology",
            division: "A",
            project: "YourTitles - Real Time Subtitles for Everything",
            badge: "🥉",
            color: "text-amber-600"
          }
        ],
      }
    },
    totalParticipants: 60,
    submissionDeadline: "25-08-2025",
    judgingCriteria: [
      "Innovation / Creativity (5)",
      "Execution (5)",
      "Technical Depth (5)",
      "Presentation (5)",
      "Scalability / Maintainability (5)"
    ]
  }
};

export const getEventResults = (eventId) => {
  return eventResults[eventId] || null;
};

export const hasResults = (eventId) => {
  return eventResults.hasOwnProperty(eventId);
};
