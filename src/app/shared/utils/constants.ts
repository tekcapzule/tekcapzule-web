export const Constants = {
  None: 'none',
  NotAvailable: 'N/A',
  AdminUserGroup: 'admin_users_group',
  DefaultApiCacheExpiryHours: 12,
  TopMenu: [
    { uniqueId: 'Products', displayName: 'Products', navUrl: '/products'},
    { uniqueId: 'Services', displayName: 'Services', navUrl: '/services'},
    { uniqueId: 'About Us', displayName: 'About Us', navUrl: '/aboutus'},
    { uniqueId: 'Careers', displayName: 'Careers', navUrl: '/careers'},
    { uniqueId: 'Contactus', displayName: 'Contact Us', navUrl: '/contactus'},
  ],
  HeaderMenu: [
    { uniqueId: 'Products', displayName: 'Products', navUrl: '/products', viewType: 'DESKTOP', available: 'ALL',
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
    { uniqueId: 'Services', displayName: 'Services', navUrl: '/services', viewType: 'DESKTOP', available: 'ALL',
    enablePostLogin: false,
    children: [
      {
        uniqueId: 'Branding_Solutions',
        displayName: 'Branding Solutions',
        navUrl: '/services/Branding_Solutions',
        enablePostLogin: false,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Product_Engineering',
        displayName: 'Product Engineering',
        navUrl: '/services/Product_Engineering',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Course_Development',
        displayName: 'Course Development',
        navUrl: '/services/Course_Development',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Talent_Solutions',
        displayName: 'Talent Solutions',
        navUrl: '/services/Talent_Solutions',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Corporate_Trainings',
        displayName: 'Corporate Trainings',
        navUrl: '/services/Corporate_Trainings',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },
      {
        uniqueId: 'Candidate_Screening',
        displayName: 'Candidate Screening',
        navUrl: '/services/Candidate_Screening',
        enablePostLogin: true,
        desc: 'Optimize your hiring process with our Candidate Screening services.',
      },

    ],
  },
    { uniqueId: 'About Us', displayName: 'About Us', navUrl: '/aboutus', available: 'PRELOGIN'},
    { uniqueId: 'Careers', displayName: 'Careers', navUrl: '/careers', available: 'PRELOGIN'},
    { uniqueId: 'Contactus', displayName: 'Contact Us', navUrl: '/contactus', available: 'PRELOGIN'},

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
