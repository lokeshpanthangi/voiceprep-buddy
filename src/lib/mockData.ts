export interface Company {
  id: string;
  name: string;
  logo: string;
}

export interface Role {
  id: string;
  title: string;
}

export interface Interview {
  id: string;
  companyId: string;
  roleId: string;
  date: string;
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  problemSolvingScore: number;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  userAnswer: string;
  score: number;
  feedback: string;
}

export const companies: Company[] = [
  { id: "google", name: "Google", logo: "🔍" },
  { id: "amazon", name: "Amazon", logo: "📦" },
  { id: "microsoft", name: "Microsoft", logo: "🪟" },
  { id: "meta", name: "Meta", logo: "📘" },
  { id: "apple", name: "Apple", logo: "🍎" },
  { id: "netflix", name: "Netflix", logo: "🎬" },
];

export const roles: Role[] = [
  { id: "swe", title: "Software Engineer" },
  { id: "pm", title: "Product Manager" },
  { id: "ds", title: "Data Scientist" },
  { id: "designer", title: "Product Designer" },
  { id: "devops", title: "DevOps Engineer" },
];

export const mockInterviews: Interview[] = [
  {
    id: "1",
    companyId: "google",
    roleId: "swe",
    date: "2025-01-15",
    overallScore: 85,
    technicalScore: 88,
    communicationScore: 82,
    problemSolvingScore: 85,
    questions: [
      {
        id: "q1",
        text: "Tell me about a challenging technical problem you solved recently.",
        userAnswer: "I recently optimized our database queries to reduce response time by 60%. The challenge was identifying the bottleneck without disrupting production.",
        score: 90,
        feedback: "Excellent answer with specific metrics and clear problem-solving approach.",
      },
      {
        id: "q2",
        text: "How would you design a URL shortener service?",
        userAnswer: "I would use a hash function to generate short codes, store mappings in a database with caching, and implement rate limiting for security.",
        score: 85,
        feedback: "Good system design understanding. Consider discussing scalability and analytics.",
      },
      {
        id: "q3",
        text: "Explain the difference between REST and GraphQL.",
        userAnswer: "REST uses fixed endpoints while GraphQL allows clients to request specific data. GraphQL reduces over-fetching but has a steeper learning curve.",
        score: 88,
        feedback: "Clear comparison with practical insights. Well articulated.",
      },
    ],
  },
  {
    id: "2",
    companyId: "amazon",
    roleId: "pm",
    date: "2025-01-10",
    overallScore: 78,
    technicalScore: 75,
    communicationScore: 80,
    problemSolvingScore: 79,
    questions: [
      {
        id: "q4",
        text: "How would you prioritize features for a new product launch?",
        userAnswer: "I would use a framework like RICE to score features based on reach, impact, confidence, and effort. Then align with business goals and customer needs.",
        score: 82,
        feedback: "Good framework knowledge. Could strengthen with specific examples.",
      },
      {
        id: "q5",
        text: "Tell me about a time you had to make a decision with incomplete information.",
        userAnswer: "During a product launch, we had to decide on pricing without full market data. I gathered what we had, consulted stakeholders, and made a decision with a plan to iterate.",
        score: 75,
        feedback: "Decent example. More emphasis on the outcome would strengthen this answer.",
      },
    ],
  },
];

export const sampleQuestions = {
  swe: [
    "Tell me about a challenging technical problem you solved recently.",
    "How would you design a URL shortener service?",
    "Explain the difference between REST and GraphQL.",
    "What's your experience with distributed systems?",
    "How do you approach debugging a production issue?",
  ],
  pm: [
    "How would you prioritize features for a new product launch?",
    "Tell me about a time you had to make a decision with incomplete information.",
    "How do you handle conflicting stakeholder requirements?",
    "Describe your approach to user research.",
    "How would you measure the success of a new feature?",
  ],
  ds: [
    "Explain how you would approach A/B testing for a new feature.",
    "What's your experience with machine learning models?",
    "How do you communicate technical findings to non-technical stakeholders?",
    "Describe a time you identified an important insight from data.",
    "What statistical methods do you commonly use?",
  ],
};
