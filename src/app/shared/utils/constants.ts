export const Constants = {
  None: 'none',
  NotAvailable: 'N/A',
  AdminUserGroup: 'admin_users_group',
  DefaultApiCacheExpiryHours: 12,
  DefaultSubscriptionTopics: ['NLP', 'MLR', 'CVS'],
  HeaderMenu: [
    { uniqueId: 'HOME', displayName: 'Home', navUrl: '/', showOnMobile: true },
    {
      uniqueId: 'My_Feeds',
      displayName: 'Feeds',
      navUrl: '/capsules',
      viewType: 'MOBILE',
      children: [
        { uniqueId: 'For_You', displayName: 'For You', navUrl: '/capsules/myfeeds' },
        { uniqueId: 'Trending', displayName: 'Trending', navUrl: '/capsules/trending' },
        { uniqueId: 'Editor_Pick', displayName: 'Editor Pick', navUrl: '/capsules/editorspick' },
        { uniqueId: 'BROWSE_BYTOPIC', displayName: 'Explore Topic', navUrl: '' },
      ],
    },
    { 
      uniqueId: 'Skill_Studio', 
      displayName: 'SkillStudio', 
      navUrl: '/ai-hub/dashboard',
      viewType: 'ALL',
      
      children: [
        { uniqueId: 'Tekbyte', displayName: 'Tekbyte', navUrl: '/ai-hub/tekbyte/explore', desc: 'Boost your AI lexicon effortlessly! Simplified explanations for complex AI terms to improve your understanding.' },
        { uniqueId: 'Courses', displayName: 'Courses', navUrl: '/ai-hub/courses', desc: 'Chart your AI learning path with hand-picked, industry-leading courses.' },
        { uniqueId: 'Interview_Prep', displayName: 'Interview Prep', navUrl: '/ai-hub/interview-prepartion', desc: 'Ace AI interviews! Your one-stop shop for top-tier interview preparation materials.' },
        { uniqueId: 'Mentoring', displayName: 'Mentoring', navUrl: '/ai-hub/mentoring', desc: 'Master AI effortlessly. Unleash the power of AI powered mentorship, customized to your learning needs.' },
        { uniqueId: 'Research_Papers', displayName: 'Research papers', navUrl: '/ai-hub/research-papers', desc: 'Explore the best in AI research. Access groundbreaking papers that shape the AI landscape.' },
        { uniqueId: 'Video_Library', displayName: 'Video Library', navUrl: '/ai-hub/video-library', desc: 'Gain practical AI insights through our selection of informative videos.' },
        { uniqueId: 'Weekly_Digest', displayName: 'Weekly Digest', navUrl: '/ai-hub/weekly-digest', desc: 'Get the best of AI with our curated list of leading weekly newsletters and podcasts.' },
        { uniqueId: 'events', displayName: 'Events', navUrl: '/ai-hub/events', desc: 'AI without borders. We curate a list of global AI events, enabling you to learn from the world’s leading experts.' }
      ], 
    },
    {
      uniqueId: 'Contribute',
      displayName: 'Contribute',
      navUrl: 'capsules/contribute',
      showOnMobile: true,
    },
    { uniqueId: 'Market_Place', displayName: 'Market Place', navUrl: '/market-place' },
    // { uniqueId: 'LLM_Hub', displayName: 'LLM-Hub', navUrl: '/llm-hub' },
    { uniqueId: 'Insights', displayName: 'Insights', navUrl: '/insights' },
    // { uniqueId: 'Jobs', displayName: 'Jobs', navUrl: '/jobs' },
    // { uniqueId: 'Community', displayName: 'Community', navUrl: '/community' },
    // { uniqueId: 'Our_Mission', displayName: 'Our Mission', navUrl: '/mission' },
  ],
  SkillTiles: [
    {uniqueId: 'tekbytes', displayName: 'Tekbytes', desc: 'Boost your AI lexicon effortlessly! Simplified explanations for complex AI terms to improve your understanding', navUrl:'/ai-hub/tekbyte/explore'},
    {uniqueId: 'weeklyDigest', displayName: 'Weekly Digest', desc: 'Get the best of AI with our curated list of leading weekly newsletters and podcasts', navUrl:'/ai-hub/weekly-digest'},
    {uniqueId: 'events', displayName: 'Events', desc: 'AI without borders. We curate a list of global AI events, enabling you to learn from the world’s leading experts', navUrl:'/ai-hub/events'},
    {uniqueId: 'courses', displayName: 'Courses', desc: 'Chart your AI learning path with hand-picked, industry-leading courses', navUrl:'/ai-hub/courses'},
    {uniqueId: 'interviewPrep', displayName: 'Interview Prep', desc: 'Ace AI interviews! Your one-stop shop for top-tier interview preparation materials', navUrl:'/ai-hub/interview-prepartion'},
    {uniqueId: 'mentoring', displayName: 'Mentoring', desc: 'Master AI effortlessly. Unleash the power of AI powered mentorship, customized to your learning needs', navUrl:'/ai-hub/mentoring'},

    {uniqueId: 'prompts', displayName: 'Prompts', desc: 'Get your AI Vocabulary Right', navUrl:'/ai-hub/prompts'},
    {uniqueId: 'Video_Library', displayName: 'Video Library', desc: 'Gain practical AI insights through our selection of informative videos', navUrl:'/ai-hub/video-library'},
    {uniqueId: 'Research_Papers', displayName: 'Research Papers', desc: 'Explore the best in AI research. Access groundbreaking papers that shape the AI landscape', navUrl:'/ai-hub/research-papers'},
    {uniqueId: 'largeLanguageModel', displayName: 'Large Language Model (LLM)', desc: 'Get ahead in your AI journey with our cutting edge courses', navUrl:'/ai-hub/courses'},
    {uniqueId: 'generativeAI', displayName: 'Generative AI', desc: 'Go ahead and prepare for your interview', navUrl:'/ai-hub/interview-prepartion'},
    {uniqueId: 'insights', displayName: 'Insights', desc: 'Mentoring is our top priority for the people need mentor', navUrl:'/ai-hub/mentoring'}
  ]
};

Object.freeze(Constants);
