import { SkillPath } from "@/libs/types";

const skillPaths: SkillPath[] = [
  {
    id: 1,
    title: "Introduction to Digital Marketing",
    requiredSubscriptionLevel: "Free",
    description: "Learn the basics of digital marketing strategies.",
    difficulty_level: "Beginner",
    duration: 3,
    has_access: true,
    courses: [
      {
        id: 1,
        title: "SEO Basics",
        description: "Learn the basics of SEO",
        lessons: [
          {
            id: 1,
            title: "What is SEO?",
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
    requiredSubscriptionLevel: "Advanced",
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
        lessons: [
          {
            id: 2,
            title: "On-Page SEO",
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
    requiredSubscriptionLevel: "Basic",
    title: "Introduction to Zapier",
    description: "Learn automation with social media platforms",
    difficulty_level: "Beginner",
    duration: 4,
    has_access: true,
    courses: [
      {
        id: 3,
        title: "Zapier 101",
        description: "Learn the basics of Zapier",
        lessons: [
          {
            id: 1,
            title: "Getting Started",
            video: {
              title: "Zapier 101",
              url: "https://youtu.be/PZyXBkn9lnI",
              quiz: [
                // Existing quiz content
              ],
            },
            resources: [
              // Existing resources
            ],
          },
          {
            id: 2,
            title: "Zapier Episode 1",
            video: {
              title: "Zapier Episode 1",
              url: "https://youtu.be/KP1T2QPfKoI",
              quiz: [
                {
                  id: 1,
                  questions: [
                    {
                      id: 1,
                      question_text:
                        "Where can you go to set-up your first Zap?",
                      options: [
                        {
                          id: 1,
                          option_text: 'Homepage under "Start from scratch"',
                          is_correct: false,
                        },
                        {
                          id: 2,
                          option_text:
                            "Left-hand sidebar anywhere on the website",
                          is_correct: false,
                        },
                        {
                          id: 3,
                          option_text:
                            '"Create" in the top-left side on the homepage',
                          is_correct: false,
                        },
                        {
                          id: 4,
                          option_text: "All of the above",
                          is_correct: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [],
            projectTasks: [
              {
                id: 1,
                title: "Signup",
                description:
                  "Create an account at https://zapier.com/sign-up/.",
              },
              {
                id: 2,
                title: "Setup Zap",
                description:
                  "Go to the homepage and click on 'Create Zap' to set up your first Zap.",
              },
              {
                id: 3,
                title: "Set up Trigger",
                description:
                  "Choose an app and event that will trigger the Zap.",
              },
              {
                id: 4,
                title: "Set up Action",
                description:
                  "Choose an app and action that will be performed when the Zap is triggered.",
              },
            ],
          },
          {
            id: 3,
            title: "Zapier Episode 2",
            video: {
              title: "Zapier Episode 2",
              url: "https://youtu.be/Y_Nwe9hJOww",
              quiz: [
                {
                  id: 2,
                  questions: [
                    {
                      id: 2,
                      question_text:
                        "What is the purpose of a filter in Zapier?",
                      options: [
                        {
                          id: 5,
                          option_text:
                            "To allow tasks to proceed only when certain conditions are met.",
                          is_correct: true,
                        },
                        {
                          id: 6,
                          option_text: "To schedule tasks for a specific time.",
                          is_correct: false,
                        },
                        {
                          id: 7,
                          option_text:
                            "To add delays between actions in a workflow.",
                          is_correct: false,
                        },
                        {
                          id: 8,
                          option_text:
                            "To organize Zaps into different folders.",
                          is_correct: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [],
          },
          {
            id: 4,
            title: "Zapier Episode 3",
            video: {
              title: "Zapier Episode 3",
              url: "https://youtu.be/ZqtSW-LMhcE",
              quiz: [
                {
                  id: 3,
                  questions: [
                    {
                      id: 3,
                      question_text:
                        'How did we find "YouTube" when we set up our Trigger?',
                      options: [
                        {
                          id: 9,
                          option_text:
                            "By searching for it in the app search bar.",
                          is_correct: true,
                        },
                        {
                          id: 10,
                          option_text:
                            "By typing it directly into the Zap action field.",
                          is_correct: false,
                        },
                        {
                          id: 11,
                          option_text:
                            "By selecting it from a dropdown menu of pre-integrated apps.",
                          is_correct: false,
                        },
                        {
                          id: 12,
                          option_text:
                            "By adding it manually through the API connection settings.",
                          is_correct: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [],
          },
          {
            id: 5,
            title: "Zapier Episode 4",
            video: {
              title: "Zapier Episode 4",
              url: "https://youtu.be/UULL5eRTlEQ",
              quiz: [
                {
                  id: 4,
                  questions: [
                    {
                      id: 4,
                      question_text: "What is a knowledge source?",
                      options: [
                        {
                          id: 13,
                          option_text:
                            "A data visualization tool integrated into the chatbot interface.",
                          is_correct: false,
                        },
                        {
                          id: 14,
                          option_text:
                            "A repository of information that a chatbot uses to provide answers or perform tasks.",
                          is_correct: true,
                        },
                        {
                          id: 15,
                          option_text:
                            "A feature that allows chatbots to translate languages in real time.",
                          is_correct: false,
                        },
                        {
                          id: 16,
                          option_text:
                            "A plugin used to train chatbots for natural language understanding.",
                          is_correct: false,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            resources: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    requiredSubscriptionLevel: "Basic",
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
        lessons: [
          {
            id: 4,
            title: "Introduction to Email Marketing",
            video: {
              title: "Introduction to Email Marketing",
              url: "https://www.youtube.com/watch?v=example11",
              quiz: [
                {
                  id: 4,
                  questions: [
                    {
                      id: 4,
                      question_text:
                        "What is the primary goal of email marketing?",
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
    requiredSubscriptionLevel: "Free",
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
        lessons: [
          {
            id: 5,
            title: "Introduction to Content Marketing",
            video: {
              title: "Introduction to Content Marketing",
              url: "https://www.youtube.com/watch?v=example12",
              quiz: [
                {
                  id: 5,
                  questions: [
                    {
                      id: 5,
                      question_text:
                        "What is the primary goal of content marketing?",
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
                resource_link:
                  "https://www.example.com/content-marketing-basics",
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
