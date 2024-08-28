export const Constants = {
  None: 'none',
  NotAvailable: 'N/A',
  AdminUserGroup: 'admin_users_group',
  DefaultApiCacheExpiryHours: 12,
  TopMenu: [
    { uniqueId: 'Products', displayName: 'Products', navUrl: '/products' },
    { uniqueId: 'Services', displayName: 'Services', navUrl: '/services' },
    { uniqueId: 'About Us', displayName: 'About Us', navUrl: '/aboutus' },
    { uniqueId: 'Careers', displayName: 'Careers', navUrl: '/careers' },
    { uniqueId: 'Contactus', displayName: 'Contact Us', navUrl: '/contactus' },
  ],
  HeaderMenu: [
    {
      uniqueId: 'Products', displayName: 'Products', navUrl: '/products', viewType: 'DESKTOP', available: 'ALL',
      enablePostLogin: false,
      children: [
        {
          uniqueId: 'LMS',
          displayName: 'TekCapzule LMS',
          navUrl: '/products/LMS',
          enablePostLogin: false,
          desc: 'Create and manage engaging learning experiences with AI-powered LMS.',
        },
        {
          uniqueId: 'Hire',
          displayName: 'TekCapzule Hire',
          navUrl: '/products/Hire',
          enablePostLogin: true,
          desc: 'AI-powered solution for precise candidate screening and CV analysis.',
        },
      ],
    },
    {
      uniqueId: 'Services', displayName: 'Services', navUrl: '/services', viewType: 'DESKTOP', available: 'ALL',
      enablePostLogin: false,
      children: [
        {
          uniqueId: 'Branding_Solutions',
          displayName: 'Branding Solutions',
          navUrl: '/services/Branding_Solutions',
          enablePostLogin: false,
          desc: 'Launch and elevate your brand with a complete branding package, from websites to social media templates.',
        },
        {
          uniqueId: 'Product_Engineering',
          displayName: 'Product Engineering',
          navUrl: '/services/Product_Engineering',
          enablePostLogin: true,
          desc: 'Bring your ideas to life with bespoke product development designed to meet your specific requirements.',
        },
        {
          uniqueId: 'Course_Development',
          displayName: 'Course Development',
          navUrl: '/services/Course_Development',
          enablePostLogin: true,
          desc: 'Create impactful and engaging courses with our expert LMS course development services.',
        },
        {
          uniqueId: 'Talent_Solutions',
          displayName: 'Talent Solutions',
          navUrl: '/services/Talent_Solutions',
          enablePostLogin: true,
          desc: 'Find top talent quickly with expert staffing services tailored to your needs.',
        },
        {
          uniqueId: 'Corporate_Trainings',
          displayName: 'Corporate Trainings',
          navUrl: '/services/Corporate_Trainings',
          enablePostLogin: true,
          desc: 'Enhance skills and drive growth with tailored corporate training programs.',
        },
        {
          uniqueId: 'Candidate_Screening',
          displayName: 'Candidate Screening',
          navUrl: '/services/Candidate_Screening',
          enablePostLogin: true,
          desc: 'Streamline your hiring process with AI-powered candidate screening and CV analysis.',
        },
      ]
    },
    { uniqueId: 'About Us', displayName: 'About Us', navUrl: '/aboutus', available: 'PRELOGIN' },
    { uniqueId: 'Careers', displayName: 'Careers', navUrl: '/careers', available: 'PRELOGIN' },
    { uniqueId: 'Contactus', displayName: 'Contact Us', navUrl: '/contactus', available: 'PRELOGIN' },
    {
      uniqueId: 'Blogs', displayName: 'Blogs', navUrl: '/', viewType: 'DESKTOP', available: 'ALL',
      enablePostLogin: false,
      children: [
        {
          uniqueId: 'TekCapzule_Blog',
          displayName: 'TekCapzule Blog',
          navUrl: 'https://blog.tekcapzule.com',
          enablePostLogin: false,
          desc: 'Stay updated with the latest technology trends and talent management insights through our TekCapzule Blog.',
        },
        {
          uniqueId: 'AIToday_Blog',
          displayName: 'AIToday Blog',
          navUrl: 'https://aitoday.dev',
          enablePostLogin: true,
          desc: 'Explore the latest insights and developments in AI with our in-depth articles and expert analysis on AIToday.',
        },
      ],
    },
  ],
  FooterItems: ['HOME', 'Skill_Studio', 'Market_Place', 'Insights'],
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
