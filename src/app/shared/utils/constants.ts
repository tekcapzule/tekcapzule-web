export const Constants = {
  None: 'none',
  NotAvailable: 'N/A',
  AdminUserGroup: 'admin_users_group',
  DefaultApiCacheExpiryHours: 12,
  DefaultSubscriptionTopics: ['NLP', 'MLR', 'CVS'],
  TopMenu: [
    { uniqueId: 'products', displayName: 'Products', navUrl: '/products'},
    { uniqueId: 'Services', displayName: 'Services', navUrl: '/services'},
    { uniqueId: 'About Us', displayName: 'About Us', navUrl: '/aboutus'},
    { uniqueId: 'Careers', displayName: 'Careers', navUrl: '/careers'},
    { uniqueId: 'Contactus', displayName: 'Contact Us', navUrl: '/contactus'},
  ],
  HeaderMenu: [
    { uniqueId: 'Products', displayName: 'Products', navUrl: '/products', available: 'PRELOGIN'},
    { uniqueId: 'Services', displayName: 'Services', navUrl: '/services', viewType: 'DESKTOP', available: 'ALL',
    enablePostLogin: false,
    children: [
      {
        uniqueId: 'UX_Design_Prototyping',
        displayName: 'UX Design & Prototyping',
        navUrl: '/services/services-categories',
        enablePostLogin: false,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Product_Engineering',
        displayName: 'Product Engineering',
        navUrl: '/services/services-categories',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Custom_LMS_Development',
        displayName: 'Custom LMS Development',
        navUrl: '/services/services-categories',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Staffing_Management',
        displayName: 'Staffing Management',
        navUrl: '/services/services-categories',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Corporate_Trainings',
        displayName: 'Corporate Trainings',
        navUrl: '/services/services-categories',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Candidate_Screening',
        displayName: 'Candidate Screening',
        navUrl: '/services/services-categories',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },


    ],
  },
    // { uniqueId: 'Services', displayName: 'Services', navUrl: '/services', viewType: 'MOBILE', available: 'PRELOGIN'},
    { uniqueId: 'About Us', displayName: 'About Us', navUrl: '/aboutus', available: 'PRELOGIN'},
    { uniqueId: 'Careers', displayName: 'Careers', navUrl: '/careers', available: 'PRELOGIN'},
    { uniqueId: 'Contactus', displayName: 'Contact Us', navUrl: '/contactus', available: 'PRELOGIN'},



    // { uniqueId: 'Market_Place', displayName: 'Marketplace', navUrl: '/market-place', available: 'ALL', enablePostLogin: true},
    // { uniqueId: 'Insights', displayName: 'Insights', navUrl: '/insights', available: 'ALL', enablePostLogin: true },
    // { uniqueId: 'events', displayName: 'Events', navUrl: '/ai-hub/events', available: 'ALL', enablePostLogin: true },
    //{ uniqueId: 'Contribute', displayName: 'Contribute', navUrl: 'capsules/contribute', showOnMobile: true, disablePreLogin: true },
    //{ uniqueId: 'LLM_Hub', displayName: 'LLM-Hub', navUrl: '/llm-hub', disablePreLogin: true },
    // { uniqueId: 'Mentoring', displayName: 'Mentoring', isPageReady: false, navUrl: '/ai-hub/mentoring', disablePreLogin: true },
    //{ uniqueId: 'Jobs', displayName: 'Jobs', navUrl: '/jobs', disablePreLogin: true },
    // { uniqueId: 'Community', displayName: 'Community', navUrl: '/community', disablePreLogin: true },
    // { uniqueId: 'Our_Mission', displayName: 'Our Mission', navUrl: '/aboutus', disablePreLogin: true },
  ],
  // SkillTiles: [
  //   {
  //     uniqueId: 'tekbyte',
  //     displayName: 'Tekbytes',
  //     desc:
  //       'Boost your tech lexicon effortlessly! Simplified explanations for complex tech terms to improve your understanding.',
  //     navUrl: '/ai-hub/tekbyte/explore',
  //   },
  //   {
  //     uniqueId: 'courses',
  //     displayName: 'Courses',
  //     desc: 'Chart your tech learning path with hand-picked, industry-leading courses',
  //     navUrl: '/ai-hub/courses',
  //   },
  //   {
  //     uniqueId: 'Interview_Prep',
  //     displayName: 'Interview Prep',
  //     desc: 'Ace tech interviews! Your one-stop shop for top-tier interview preparation materials',
  //     navUrl: '/ai-hub/interview-prepartion',
  //   },
  //   {
  //     uniqueId: 'video_library',
  //     displayName: 'Video Library',
  //     desc: 'Gain practical tech insights through our selection of informative videos',
  //     navUrl: '/ai-hub/video-library',
  //   },
  //   {
  //     uniqueId: 'Research_Papers',
  //     displayName: 'Research Papers',
  //     desc: 'Explore the best in emerging tech research. Access groundbreaking papers that shape the tech landscape',
  //     navUrl: '/ai-hub/research-papers',
  //   },
  //   {
  //     uniqueId: 'Weekly_Digest',
  //     displayName: 'Newsletter',
  //     desc: 'Get the best of emerging tech with our curated list of leading weekly newsletters and podcasts',
  //     navUrl: '/ai-hub/weekly-digest',
  //   },
  //   //{uniqueId: 'prompts', displayName: 'Prompts', desc: 'Get your AI Vocabulary Right', navUrl:'/ai-hub/prompts'},
  //   //{uniqueId: 'largeLanguageModel', displayName: 'Large Language Model (LLM)', desc: 'Get ahead in your AI journey with our cutting edge courses', navUrl:'/ai-hub/courses'},
  //   //{uniqueId: 'generativeAI', displayName: 'Generative AI', desc: 'Go ahead and prepare for your interview', navUrl:'/ai-hub/interview-prepartion'},
  //   //{uniqueId: 'Insights', displayName: 'Insights', desc: 'Mentoring is our top priority for the people need mentor', navUrl:'/ai-hub/mentoring'}
  // ],
  FooterItems: ['HOME', 'Skill_Studio', 'Market_Place', 'Insights'],
  // ExtraLink: [
  //   {
  //     uniqueId: 'Subscribe',
  //     displayName: 'Subscribe',
  //     desc: 'Subscribe Page',
  //     navUrl: '/subscribe',
  //   }
  // ],
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
