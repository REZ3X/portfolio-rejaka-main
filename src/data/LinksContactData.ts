export interface LinkItem {
    type: 'email' | 'phone' | 'social';
    label: string;
    value: string;
    icon: string;
    url?: string;
  }
  
  export const linksContactData = {
    contactInfo: [
      {
        type: 'email',
        label: 'Email',
        value: 'contact@johndoe.dev',
        icon: '📧'
      },
      {
        type: 'phone',
        label: 'Phone',
        value: '+1 (555) 123-4567',
        icon: '📱'
      }
    ],
    socialLinks: [
      {
        type: 'social',
        label: 'GitHub',
        value: 'github.com/username',
        url: 'https://github.com/username',
        icon: '💻'
      },
      {
        type: 'social',
        label: 'LinkedIn',
        value: 'linkedin.com/in/username',
        url: 'https://linkedin.com/in/username',
        icon: '🔗'
      },
      {
        type: 'social',
        label: 'Instagram',
        value: '@username',
        url: 'https://instagram.com/username',
        icon: '📷'
      }
    ]
  };