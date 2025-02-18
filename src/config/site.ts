export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'CV Expert',
  description: 'Optimize Your Resume with AI & Land Your Dream Job Faster!',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Upload Your CV',
      href: '/upload',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/abhiphile',
    twitter: 'https://x.com/kr__abhishek',
    docs: '',
    discord: 'https://discord.gg/',
    sponsor: 'https://patreon.com/abhiphile',
  },
};
