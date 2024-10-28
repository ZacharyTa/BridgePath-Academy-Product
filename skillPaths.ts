import { SkillPath } from '@/libs/types';

const skillPaths: SkillPath[] = [
  {
    id: 1,
    title: "Introduction to Digital Marketing",
    description: "Learn the basics of digital marketing strategies.",
    difficulty_level: "Beginner",
    duration: 3,
    has_access: true,
    courses: [
      {
        id: 1,
        title: "SEO Basics",
        description: "Learn the basics of SEO",
        progress: 0,
        lessons: [
          {
            id: 1,
            title: "What is SEO?",
            completed: false,
            video: {
              title: "What is SEO?",
              url: "https://www.youtube.com/watch?v=0eDyZfY8h4Q",
              quiz: [
                {
                  id: 1,
                  questions: [
                    {
                      id: 1,
                      question_text: "What does SEO stand for?",
                      options: [
                        {
                          id: 1,
                          option_text: "Search Engine Optimization",
                          is_correct: true,
                        },
                        {
                          id: 2,
                          option_text: "Search Engine Operations",
                          is_correct: false,
                        },
                        {
                          id: 3,
                          option_text: "Search Engine Orders",
                          is_correct: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [
              {
                id: 1,
                resource_link: "https://moz.com/beginners-guide-to-seo",
                resource_type: "article",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Advanced Digital Marketing",
    description: "Master advanced digital marketing strategies.",
    difficulty_level: "Advanced",
    duration: 5,
    has_access: true,
    courses: [
      {
        id: 2,
        title: "Advanced SEO Techniques",
        description: "Learn advanced SEO techniques",
        progress: 0,
        lessons: [
          {
            id: 2,
            title: "On-Page SEO",
            completed: false,
            video: {
              title: "On-Page SEO",
              url: "https://www.youtube.com/watch?v=example9",
              quiz: [
                {
                  id: 2,
                  questions: [
                    {
                      id: 2,
                      question_text: "What is On-Page SEO?",
                      options: [
                        {
                          id: 4,
                          option_text: "Optimizing individual web pages",
                          is_correct: true,
                        },
                        {
                          id: 5,
                          option_text: "Optimizing the entire website",
                          is_correct: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [
              {
                id: 2,
                resource_link: "https://www.example.com/on-page-seo",
                resource_type: "article",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Social Media Marketing",
    description: "Master social media platforms for business growth.",
    difficulty_level: "Intermediate",
    duration: 4,
    has_access: false,
    courses: [
      {
        id: 3,
        title: "Social Media Basics",
        description: "Learn the basics of social media marketing",
        progress: 0,
        lessons: [
          {
            id: 3,
            title: "Introduction to Social Media",
            completed: false,
            video: {
              title: "Introduction to Social Media",
              url: "https://www.youtube.com/watch?v=example10",
              quiz: [
                {
                  id: 3,
                  questions: [
                    {
                      id: 3,
                      question_text: "Which platform is best for B2B marketing?",
                      options: [
                        {
                          id: 6,
                          option_text: "LinkedIn",
                          is_correct: true,
                        },
                        {
                          id: 7,
                          option_text: "Instagram",
                          is_correct: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [
              {
                id: 3,
                resource_link: "https://www.example.com/social-media-basics",
                resource_type: "article",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Email Marketing",
    description: "Automate your email marketing campaigns.",
    difficulty_level: "Intermediate",
    duration: 4,
    has_access: false,
    courses: [
      {
        id: 4,
        title: "Email Marketing Basics",
        description: "Learn the basics of email marketing",
        progress: 0,
        lessons: [
          {
            id: 4,
            title: "Introduction to Email Marketing",
            completed: false,
            video: {
              title: "Introduction to Email Marketing",
              url: "https://www.youtube.com/watch?v=example11",
              quiz: [
                {
                  id: 4,
                  questions: [
                    {
                      id: 4,
                      question_text: "What is the primary goal of email marketing?",
                      options: [
                        {
                          id: 8,
                          option_text: "Increase sales",
                          is_correct: true,
                        },
                        {
                          id: 9,
                          option_text: "Reduce costs",
                          is_correct: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [
              {
                id: 4,
                resource_link: "https://www.example.com/email-marketing-basics",
                resource_type: "article",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Content Marketing",
    description: "Create and distribute valuable content.",
    difficulty_level: "Beginner",
    duration: 3,
    has_access: false,
    courses: [
      {
        id: 5,
        title: "Content Marketing Basics",
        description: "Learn the basics of content marketing",
        progress: 0,
        lessons: [
          {
            id: 5,
            title: "Introduction to Content Marketing",
            completed: false,
            video: {
              title: "Introduction to Content Marketing",
              url: "https://www.youtube.com/watch?v=example12",
              quiz: [
                {
                  id: 5,
                  questions: [
                    {
                      id: 5,
                      question_text: "What is the primary goal of content marketing?",
                      options: [
                        {
                          id: 10,
                          option_text: "Engage the audience",
                          is_correct: true,
                        },
                        {
                          id: 11,
                          option_text: "Increase costs",
                          is_correct: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [
              {
                id: 5,
                resource_link: "https://www.example.com/content-marketing-basics",
                resource_type: "article",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default skillPaths;