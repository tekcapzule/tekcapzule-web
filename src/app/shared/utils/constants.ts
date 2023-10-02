export const Constants = {
  None: 'none',
  NotAvailable: 'N/A',
  AdminUserGroup: 'admin_users_group',
  DefaultApiCacheExpiryHours: 12,
  DefaultSubscriptionTopics: ['NLP', 'MLR', 'CVS'],
  HeaderMenu: [
    { uniqueId: 'HOME', displayName: 'Home', navUrl: '/', available: 'PRELOGIN'},
    { uniqueId: 'My_Feeds', displayName: 'Home', navUrl: '/capsules', viewType: 'MOBILE', available: 'POSTLOGIN' },
    { uniqueId: 'Skill_Studio', displayName: 'SkillStudio', navUrl: '/ai-hub/dashboard', viewType: 'DESKTOP', available: 'ALL',
      enablePostLogin: false,
      children: [
        {
          uniqueId: 'Tekbyte',
          displayName: 'Tekbyte',
          navUrl: '/ai-hub/tekbyte/explore',
          enablePostLogin: true,
          desc:
          'Boost your AI lexicon effortlessly! Simplified explanations for complex AI terms to improve your understanding.',
        },
        {
          uniqueId: 'Courses',
          displayName: 'Courses',
          navUrl: '/ai-hub/courses',
          enablePostLogin: true,
          desc: 'Chart your AI learning path with hand-picked, industry-leading courses.',
        },
        {
          uniqueId: 'Interview_Prep',
          displayName: 'Interview Prep',
          navUrl: '/ai-hub/interview-prepartion',
          enablePostLogin: true,
          desc:
          'Ace AI interviews! Your one-stop shop for top-tier interview preparation materials.',
        },        
        {
          uniqueId: 'Research_Papers',
          displayName: 'Research papers',
          navUrl: '/ai-hub/research-papers',
          enablePostLogin: true,
          desc:
            'Explore the best in AI research. Access groundbreaking papers that shape the AI landscape.',
        },
        {
          uniqueId: 'Video_Library',
          displayName: 'Video Library',
          navUrl: '/ai-hub/video-library',
          enablePostLogin: true,
          desc: 'Gain practical AI insights through our selection of informative videos.',
        },
        {
          uniqueId: 'Weekly_Digest',
          displayName: 'Weekly Digest',
          navUrl: '/ai-hub/weekly-digest',
          enablePostLogin: true,
          desc:
            'Get the best of AI with our curated list of leading weekly newsletters and podcasts.',
        }        
      ],
    },
    { uniqueId: 'Market_Place', displayName: 'Marketplace', navUrl: '/market-place', available: 'ALL', enablePostLogin: true},
    { uniqueId: 'Insights', displayName: 'Insights', navUrl: '/insights', available: 'ALL', enablePostLogin: true },
    { uniqueId: 'events', displayName: 'Events', navUrl: '/ai-hub/events', available: 'ALL', enablePostLogin: true },
    //{ uniqueId: 'Contribute', displayName: 'Contribute', navUrl: 'capsules/contribute', showOnMobile: true, disablePreLogin: true },
    //{ uniqueId: 'LLM_Hub', displayName: 'LLM-Hub', navUrl: '/llm-hub', disablePreLogin: true },
    // { uniqueId: 'Mentoring', displayName: 'Mentoring', isPageReady: false, navUrl: '/ai-hub/mentoring', disablePreLogin: true },
    //{ uniqueId: 'Jobs', displayName: 'Jobs', navUrl: '/jobs', disablePreLogin: true },
    // { uniqueId: 'Community', displayName: 'Community', navUrl: '/community', disablePreLogin: true },
    // { uniqueId: 'Our_Mission', displayName: 'Our Mission', navUrl: '/mission', disablePreLogin: true },
  ],
  SkillTiles: [
    {
      uniqueId: 'tekbyte',
      displayName: 'Tekbytes',
      desc:
        'Boost your AI lexicon effortlessly! Simplified explanations for complex AI terms to improve your understanding',
      navUrl: '/ai-hub/tekbyte/explore',
    },
    {
      uniqueId: 'courses',
      displayName: 'Courses',
      desc: 'Chart your AI learning path with hand-picked, industry-leading courses',
      navUrl: '/ai-hub/courses',
    },
    {
      uniqueId: 'interview_prep',
      displayName: 'Interview Prep',
      desc: 'Ace AI interviews! Your one-stop shop for top-tier interview preparation materials',
      navUrl: '/ai-hub/interview-prepartion',
    },
    {
      uniqueId: 'video_library',
      displayName: 'Video Library',
      desc: 'Gain practical AI insights through our selection of informative videos',
      navUrl: '/ai-hub/video-library',
    },
    {
      uniqueId: 'research_papers',
      displayName: 'Research Papers',
      desc: 'Explore the best in AI research. Access groundbreaking papers that shape the AI landscape',
      navUrl: '/ai-hub/research-papers',
    },
    {
      uniqueId: 'weekly_digest',
      displayName: 'Weekly Digest',
      desc: 'Get the best of AI with our curated list of leading weekly newsletters and podcasts',
      navUrl: '/ai-hub/weekly-digest',
    },
    //{uniqueId: 'prompts', displayName: 'Prompts', desc: 'Get your AI Vocabulary Right', navUrl:'/ai-hub/prompts'},
    //{uniqueId: 'largeLanguageModel', displayName: 'Large Language Model (LLM)', desc: 'Get ahead in your AI journey with our cutting edge courses', navUrl:'/ai-hub/courses'},
    //{uniqueId: 'generativeAI', displayName: 'Generative AI', desc: 'Go ahead and prepare for your interview', navUrl:'/ai-hub/interview-prepartion'},
    //{uniqueId: 'Insights', displayName: 'Insights', desc: 'Mentoring is our top priority for the people need mentor', navUrl:'/ai-hub/mentoring'}
  ],
  FooterItems: ['My_Feeds', 'Skill_Studio', 'Market_Place', 'Insights'],
  ResponsiveOptions: [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ],
};

Object.freeze(Constants);
