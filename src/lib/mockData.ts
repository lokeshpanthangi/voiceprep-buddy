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
        userAnswer: "I recently optimized our database queries to reduce response time by 60%. The challenge was identifying the bottleneck without disrupting production. I used query profiling tools to analyze slow queries, added strategic indexes, and implemented caching for frequently accessed data. I also worked with the team to refactor some N+1 query patterns in our ORM code.",
        score: 90,
        feedback: "Excellent answer with specific metrics and clear problem-solving approach. You demonstrated systematic debugging, performance optimization skills, and team collaboration. The 60% improvement is impressive and quantifiable. To make it even stronger, you could briefly mention how you validated the changes and ensured no regressions.",
      },
      {
        id: "q2",
        text: "How would you design a URL shortener service?",
        userAnswer: "I would use a hash function to generate short codes from the original URLs, possibly using base62 encoding to create human-friendly short codes. For storage, I'd use a distributed database like Cassandra for high availability, with Redis caching for frequently accessed URLs. I would implement rate limiting using token buckets to prevent abuse, and add analytics tracking for click metrics. For scalability, I'd use load balancers and horizontal scaling.",
        score: 85,
        feedback: "Good system design understanding with attention to key components like caching, rate limiting, and scalability. You covered the main architectural decisions well. Consider discussing collision handling strategies, TTL for expired URLs, custom domain support, and how you'd handle peak traffic scenarios. Also think about monitoring and observability.",
      },
      {
        id: "q3",
        text: "Explain the difference between REST and GraphQL.",
        userAnswer: "REST uses fixed endpoints for resources and returns all data for that endpoint, which can lead to over-fetching or under-fetching. GraphQL provides a single endpoint where clients can request exactly the data they need using a query language. GraphQL offers strong typing through schemas, built-in documentation, and real-time updates via subscriptions. However, REST is simpler to implement and has better caching support out of the box, while GraphQL has a steeper learning curve and requires more careful query optimization to avoid N+1 problems.",
        score: 88,
        feedback: "Clear and comprehensive comparison with practical insights. You demonstrated understanding of both technologies' strengths and trade-offs. Well articulated with real-world considerations. To enhance further, you could mention when you'd choose one over the other based on specific use cases.",
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
        userAnswer: "I would use a framework like RICE to score features based on reach, impact, confidence, and effort. I start by gathering input from customers, stakeholders, and the engineering team. Then I evaluate each feature against our business objectives and user needs. I also consider technical dependencies and market timing. After scoring, I create a roadmap that balances quick wins with longer-term strategic initiatives, and I communicate trade-offs transparently with all stakeholders.",
        score: 82,
        feedback: "Good framework knowledge and comprehensive process. You showed understanding of multiple inputs and stakeholder management. The mention of trade-off communication is valuable. To strengthen, provide a specific example of how you applied this framework and what the outcome was. Also consider mentioning how you validate priorities with user research or data.",
      },
      {
        id: "q5",
        text: "Tell me about a time you had to make a decision with incomplete information.",
        userAnswer: "During a product launch, we had to decide on pricing without full market data due to time constraints. I gathered all available data including competitor pricing, customer feedback from early users, and our cost structure. I consulted with sales, marketing, and finance teams to get their perspectives. We decided to launch with a competitive middle-tier price with the plan to adjust based on customer response. I set up analytics to track conversion rates and customer feedback closely. After two months, we had enough data to optimize pricing and increase it by 15% without impacting conversions.",
        score: 75,
        feedback: "Good example showing practical decision-making under uncertainty. You demonstrated collaboration and data-driven iteration. The outcome with the 15% price increase validates your approach. To improve, discuss more about the framework you used to make the decision, what your hypothesis was, and how you mitigated risks of getting the pricing wrong initially.",
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
