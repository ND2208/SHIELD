import { Creator, CreatorNiche, NotificationItem, UserProfile, ProjectCollaboration, ProposalItem } from '../types';

export const allCreatorNiches: CreatorNiche[] = [
  'Gaming',
  'Animations',
  'Blog Writing',
  'Personal Video Editors',
  'Brand Promotion',
  'Travel',
  'Business',
  'Wedding',
  'Thumbnail',
  'Product Promotions',
  'Social Media / Reels',
  'Podcast & Audio'
];

export const initialClientUser: UserProfile = {
  id: 'usr_client_01',
  name: 'Rahul',
  email: 'rahul@gmail.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  role: 'client',
  accountType: 'personal',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  preferences: ['Video Editing', 'Motion Graphics', 'Design', 'Brand Promotion'],
  targetNiches: ['Brand Promotion', 'Personal Video Editors', 'Thumbnail', 'Product Promotions'],
  location: 'Bangalore, India',
  bio: 'Content producer and digital brand strategist looking for world-class video, thumbnail, and brand promotional creators for upcoming multi-channel product campaigns.'
};

export const initialCreatorUser: UserProfile = {
  id: 'usr_creator_01',
  name: 'Arjun Mehta',
  email: 'arjun.mehta@shield.studio',
  phone: '+91 98450 12345',
  whatsapp: '+91 98450 12345',
  role: 'creator',
  accountType: 'business',
  companyName: 'Mehta Motion Labs',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  preferences: ['Video Editing', 'Motion Graphics', 'Brand Promotion'],
  primaryNiche: 'Brand Promotion',
  location: 'Bangalore, India',
  bio: 'Passionate video editor and motion designer with 3+ years of experience in creating engaging visual stories and high-conversion brand promo films.'
};

export const sampleCreators: Creator[] = [
  {
    id: 'cr_arjun',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@shield.studio',
    phone: '+91 98450 12345',
    whatsapp: '+91 98450 12345',
    verified: true,
    role: 'Brand Promo & Commercial Video Editor',
    category: 'Video Editing',
    primaryNiche: 'Brand Promotion',
    secondaryNiches: ['Product Promotions', 'Personal Video Editors'],
    rating: 4.8,
    reviewsCount: 24,
    followers: '3.2k',
    projectsCount: 24,
    location: 'Bangalore, India',
    city: 'Bangalore',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    skills: ['Video Editing', 'Motion Graphics', 'After Effects', 'Premiere Pro', 'Commercials'],
    about: "I'm a passionate video editor and motion designer specializing in brand promotion videos, product launch teasers, and commercial edits with high viewer retention.",
    hourlyRate: '$45/hr',
    responseTime: '< 1 hour',
    recommendationScore: 99,
    recommendationBadge: 'Top Pick for Brands',
    completedCampaignsCount: 38,
    portfolio: [
      {
        id: 'port_1',
        title: 'Apex Brand Promo Film (Flagship 4K)',
        duration: '1:42',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
        category: 'Brand Promotion',
        description: 'Dynamic 4K cinematic commercial for leading modern lifestyle brand with bespoke kinetic typography and sound design.',
        clientName: 'Rahul (Apex Innovations)'
      },
      {
        id: 'port_2',
        title: 'Hardware Feature Teaser Reel',
        duration: '1:15',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
        category: 'Product Promotions',
        description: 'Hardware feature breakdown and launch teaser with kinetic pacing and color balance.',
        clientName: 'Nova Hardware'
      },
      {
        id: 'port_3',
        title: 'Creator Vlog & Studio Tour',
        duration: '3:10',
        year: '2023',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        category: 'Personal Video Editors',
        description: 'Polished personal creator vlog edit with fast cuts, audio leveling, and dynamic B-roll overlays.',
        clientName: 'Kunal Studio'
      }
    ],
    reviews: [
      {
        id: 'rev_1',
        clientName: 'Rahul',
        clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        rating: 5.0,
        date: '2 weeks ago',
        projectTitle: 'Apex Brand Promo Commercial',
        comment: 'Arjun exceeded all our expectations! The brand promo video pacing and 3D graphics were exceptional.'
      },
      {
        id: 'rev_2',
        clientName: 'Priya Sundaram',
        clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        rating: 4.8,
        date: '1 month ago',
        projectTitle: 'Brand Promotion Series',
        comment: 'High retention and crisp delivery. Arjun delivered on time with prompt communication.'
      }
    ]
  },
  {
    id: 'cr_devanshi',
    name: 'Devanshi Shah',
    email: 'devanshi.promos@shield.studio',
    phone: '+91 99201 88722',
    whatsapp: '+91 99201 88722',
    verified: true,
    role: 'Luxury Brand Commercial & 3D Director',
    category: 'Video Editing',
    primaryNiche: 'Brand Promotion',
    secondaryNiches: ['Animations', 'Product Promotions'],
    rating: 5.0,
    reviewsCount: 38,
    followers: '7.8k',
    projectsCount: 46,
    location: 'Mumbai, India',
    city: 'Mumbai',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    skills: ['Brand Promos', 'Luxury Commercials', 'Color Mastery', 'Script-to-Screen', 'Sound Design'],
    about: 'Directing and editing high-converting brand promo campaigns and photorealistic 3D product animations for luxury and consumer tech brands.',
    hourlyRate: '$70/hr',
    responseTime: '< 30 mins',
    recommendationScore: 100,
    recommendationBadge: 'Shield Certified Partner',
    completedCampaignsCount: 52,
    portfolio: [
      {
        id: 'port_dev1',
        title: 'Autumn Luxury Apparel Campaign Film',
        duration: '1:00',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
        category: 'Brand Promotion',
        description: 'Vogue-style brand commercial with high-contrast color grading and bespoke orchestral pacing.',
        clientName: 'Aura Couture'
      },
      {
        id: 'port_dev2',
        title: 'Aura Smartwatch 3D Photorealistic Reveal',
        duration: '0:45',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
        category: 'Animations',
        description: 'Exploded CAD mechanical reveal with liquid simulation and titanium lighting.',
        clientName: 'Rahul (Apex Innovations)'
      }
    ],
    reviews: [
      {
        id: 'rev_d1',
        clientName: 'Rajesh K.',
        clientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        rating: 5.0,
        date: '1 week ago',
        projectTitle: 'Brand Promotion Teaser',
        comment: 'Absolute masterclass. Devanshi delivered a television-grade commercial that doubled our launch conversions.'
      }
    ]
  },
  {
    id: 'cr_samir',
    name: 'Samir Joshi',
    email: 'samir.gaming@shield.studio',
    phone: '+91 98221 44882',
    whatsapp: '+91 98221 44882',
    verified: true,
    role: 'Gaming Video Editor & Montage Specialist',
    category: 'Video Editing',
    primaryNiche: 'Gaming',
    secondaryNiches: ['Thumbnail', 'Personal Video Editors'],
    rating: 4.9,
    reviewsCount: 36,
    followers: '8.4k',
    projectsCount: 52,
    location: 'Mumbai, India',
    city: 'Mumbai',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    skills: ['Gaming Edits', 'Valorant/CS2 Sync', 'Sound FX', '3D Kill Cams', 'Memes & VFX'],
    about: 'Specialized in high-energy gaming montages, funny moments, esports tournament recap edits, and click-through optimized thumbnails for gaming creators.',
    hourlyRate: '$40/hr',
    responseTime: '< 30 mins',
    recommendationScore: 98,
    recommendationBadge: 'Esports Specialist',
    completedCampaignsCount: 65,
    portfolio: [
      {
        id: 'port_g1',
        title: 'Cyberpunk Esports Tournament Highlight Reel',
        duration: '2:45',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        category: 'Gaming',
        description: 'Beatsynced Valorant & Apex Legends frag movie with 3D camera tracker effects.',
        clientName: 'Rahul'
      }
    ],
    reviews: []
  },
  {
    id: 'cr_alisha',
    name: 'Alisha Menon',
    email: 'alisha.3d@shield.studio',
    phone: '+91 97112 33901',
    whatsapp: '+91 97112 33901',
    verified: true,
    role: '3D Character & Motion Animator',
    category: 'Video Editing',
    primaryNiche: 'Animations',
    secondaryNiches: ['Product Promotions', 'Brand Promotion'],
    rating: 4.9,
    reviewsCount: 29,
    followers: '5.1k',
    projectsCount: 38,
    location: 'Bangalore, India',
    city: 'Bangalore',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    skills: ['Blender 3D', 'Character Animation', 'Motion Graphics', 'Cinema 4D', 'Unreal Engine'],
    about: 'Crafting bespoke 2D/3D animated explainers, futuristic CGI product reveals, and character animations for startups and tech leaders.',
    hourlyRate: '$60/hr',
    responseTime: '< 2 hours',
    recommendationScore: 99,
    recommendationBadge: '3D Cinema Master',
    completedCampaignsCount: 42,
    portfolio: [
      {
        id: 'port_a1',
        title: '3D Cybernetic Character Animation',
        duration: '1:10',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        category: 'Animations',
        description: 'Photorealistic character rigging and lighting in Unreal Engine 5.',
        clientName: 'MetaRealm Studios'
      }
    ],
    reviews: []
  },
  {
    id: 'cr_kabir',
    name: 'Kabir Varma',
    email: 'contact@kabirweddingfilms.com',
    phone: '+91 99881 22334',
    whatsapp: '+91 99881 22334',
    verified: true,
    role: 'Cinematic Wedding Film Creator & Colorist',
    category: 'Video Editing',
    primaryNiche: 'Wedding',
    secondaryNiches: ['Travel', 'Personal Video Editors'],
    rating: 5.0,
    reviewsCount: 42,
    followers: '9.2k',
    projectsCount: 65,
    location: 'Delhi, India',
    city: 'Delhi',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    skills: ['Wedding Teasers', 'Slow Motion Color Grade', 'Emotional Storytelling', 'Drone Footage', 'Audio Sync'],
    about: 'Award-winning wedding cinematographers and editors delivering unforgettable royal destination wedding films, teaser reels, and 4K memories.',
    hourlyRate: '$75/hr',
    responseTime: '< 1 hour',
    recommendationScore: 100,
    recommendationBadge: 'Top Wedding Cinematographer',
    completedCampaignsCount: 78,
    portfolio: [
      {
        id: 'port_w1',
        title: 'Udaipur Palace Destination Wedding Film',
        duration: '4:20',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
        category: 'Wedding',
        description: 'Cinematic royal wedding teaser with rich warm color tones and heartfelt vocal overlays.',
        clientName: 'Rahul'
      }
    ],
    reviews: [
      {
        id: 'rev_k1',
        clientName: 'Rahul',
        clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        rating: 5.0,
        date: 'Oct 05, 2026',
        projectTitle: 'Udaipur Royal Heritage Destination Film',
        comment: 'Absolutely breathtaking film. Kabir captured the emotion and palace grandeur flawlessly.'
      }
    ]
  },
  {
    id: 'cr_vikas_thumbnail',
    name: 'Vikas Sharma',
    email: 'vikas.thumbnails@shield.studio',
    phone: '+91 97890 11223',
    whatsapp: '+91 97890 11223',
    verified: true,
    role: 'Elite YouTube Thumbnail Designer',
    category: 'Design',
    primaryNiche: 'Thumbnail',
    secondaryNiches: ['Gaming', 'Personal Video Editors'],
    rating: 4.9,
    reviewsCount: 47,
    followers: '6.8k',
    projectsCount: 140,
    location: 'Pune, India',
    city: 'Pune',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    skills: ['Photoshop', 'CTR Optimization', 'Lighting Effects', '3D Typography', 'Facial Retouching'],
    about: 'Generated over 50M+ views for top tech, business, and educational creators through psychology-backed YouTube thumbnails.',
    hourlyRate: '$25/hr',
    responseTime: '< 15 mins',
    recommendationScore: 99,
    recommendationBadge: '50M+ Views Driven',
    completedCampaignsCount: 160,
    portfolio: [
      {
        id: 'port_th1',
        title: 'Finance & Crypto 15% CTR Thumbnail Pack',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
        category: 'Thumbnail',
        description: 'Vibrant contrasting thumbnails with high click-through psychology for tech podcasts.',
        clientName: 'FinTech Daily'
      }
    ],
    reviews: []
  },
  {
    id: 'cr_ryan_personal',
    name: 'Ryan Patel',
    email: 'ryan.edits@shield.studio',
    phone: '+91 98330 44119',
    whatsapp: '+91 98330 44119',
    verified: true,
    role: 'Creator Retention Editor (Shorts & Long Form)',
    category: 'Video Editing',
    primaryNiche: 'Personal Video Editors',
    secondaryNiches: ['Brand Promotion', 'Thumbnail'],
    rating: 4.9,
    reviewsCount: 33,
    followers: '7.1k',
    projectsCount: 84,
    location: 'Bangalore, India',
    city: 'Bangalore',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    skills: ['Alex Hormozi Style', 'Sound Design', 'Kinetic Captions', 'Hook Engineering', 'High Retention'],
    about: 'Personal video editor for high-profile influencers and founders. I turn raw footage into high-retention video stories with motion graphics and tight pacing.',
    hourlyRate: '$40/hr',
    responseTime: '< 45 mins',
    recommendationScore: 99,
    recommendationBadge: 'Top Retention Editor',
    completedCampaignsCount: 95,
    portfolio: [
      {
        id: 'port_ry1',
        title: 'Founder Story Reel (2.4M Views)',
        duration: '0:58',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
        category: 'Personal Video Editors',
        description: 'Fast-paced viral vertical reel with animated sound effects and keyframed zoom punch-ins.',
        clientName: 'Founder Uncut'
      }
    ],
    reviews: []
  },
  {
    id: 'cr_marcus',
    name: 'Marcus Vance',
    email: 'marcus.vance@shield.studio',
    phone: '+1 415 889 0122',
    whatsapp: '+1 415 889 0122',
    verified: true,
    role: 'Global Product Launch & Hardware Commercial Director',
    category: 'Video Editing',
    primaryNiche: 'Product Promotions',
    secondaryNiches: ['Brand Promotion', 'Animations'],
    rating: 5.0,
    reviewsCount: 28,
    followers: '6.4k',
    projectsCount: 39,
    location: 'San Francisco, USA',
    city: 'San Francisco',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    skills: ['Product Commercials', 'Studio Lighting', 'Macro Lens', 'After Effects', 'CAD Visualization'],
    about: 'Creating sleek Apple-style hardware promo videos, cinematic unboxings, and product launch sizzle reels.',
    hourlyRate: '$85/hr',
    responseTime: '< 1 hour',
    recommendationScore: 99,
    recommendationBadge: 'Hardware Commercial Leader',
    completedCampaignsCount: 45,
    portfolio: [
      {
        id: 'port_mv1',
        title: 'NextGen Smart Glasses Commercial Launch',
        duration: '1:12',
        year: '2024',
        thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
        category: 'Product Promotions',
        description: 'Titanium chassis macro shots, glass glare treatment and electronic soundscape.',
        clientName: 'Optix Innovations'
      }
    ],
    reviews: []
  },
  {
    id: 'cr_pooja',
    name: 'Pooja Sharma',
    email: 'pooja.writes@shield.studio',
    phone: '+91 98110 55443',
    whatsapp: '+91 98110 55443',
    verified: true,
    role: 'B2B Blog & SEO Content Strategist',
    category: 'Content Writing',
    primaryNiche: 'Blog Writing',
    secondaryNiches: ['Business', 'Product Promotions'],
    rating: 4.7,
    reviewsCount: 19,
    followers: '3.1k',
    projectsCount: 28,
    location: 'Mumbai, India',
    city: 'Mumbai',
    experienceLevel: 'Expert',
    available: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    skills: ['Blog Writing', 'SEO Content', 'Long-form Essays', 'Case Studies', 'Tech Writing'],
    about: 'I craft research-backed, high-converting blog posts and long-form articles that rank on Google page 1 and drive qualified buyers.',
    hourlyRate: '$35/hr',
    responseTime: '< 2 hours',
    recommendationScore: 96,
    recommendationBadge: 'SEO Google Rank 1',
    completedCampaignsCount: 35,
    portfolio: [],
    reviews: []
  }
];

export const sampleProposals: ProposalItem[] = [
  {
    id: 'prop_apex_01',
    title: 'YouTube Tech Series Editing & Color Grading',
    creatorId: 'cr_arjun',
    creatorName: 'Arjun Mehta',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    clientId: 'usr_client_01',
    clientName: 'Rahul (Apex Innovations)',
    clientEmail: 'rahul@gmail.com',
    clientPhone: '+91 98765 43210',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    budget: '$2,400',
    timeline: '2 Weeks',
    scope: 'Looking for 4 episode edits with custom motion typography, sound design, hook retention pacing, and cinematic intro stings for our flagship tech series.',
    niche: 'Brand Promotion',
    date: 'Today, 10:45 AM',
    status: 'pending'
  },
  {
    id: 'prop_sarah_02',
    title: 'Commercial Product Launch Teaser (30s & 60s)',
    creatorId: 'cr_arjun',
    creatorName: 'Arjun Mehta',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    clientId: 'usr_sarah_02',
    clientName: 'Sarah Jenkins (Lumix Studio)',
    clientEmail: 'sarah.j@lumix.co',
    clientPhone: '+1 415 555 2671',
    clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    budget: '$3,800',
    timeline: '3 Weeks',
    scope: 'High-energy commercial cuts for our Fall hardware lineup with speed ramping, custom SFX drops, and 9:16 vertical social cutdowns.',
    niche: 'Product Promotions',
    date: 'Yesterday, 3:20 PM',
    status: 'pending'
  }
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'notif_creator_prop_1',
    title: 'New Proposal Received',
    message: 'Rahul sent you a proposal for "YouTube Tech Series Editing & Color Grading" ($2,400).',
    time: '15m ago',
    read: false,
    type: 'proposal',
    targetRole: 'creator',
    proposalId: 'prop_apex_01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif_1',
    title: 'Milestone Approved',
    message: 'Rahul approved Milestone 2: Storyboard & Assembly Cut for Apex Launch Commercial.',
    time: '25m ago',
    read: false,
    type: 'proposal',
    targetRole: 'all',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'notif_2',
    title: 'Top Brand Match Found',
    message: 'Devanshi Shah and Marcus Vance specialize in your requested "Brand Promotion" specification.',
    time: '45m ago',
    read: false,
    type: 'match',
    targetRole: 'client',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
  }
];

export const allSkillTags = [
  'Brand Promotion',
  'Commercials',
  'Gaming Edits',
  '3D Animations',
  'Blender 3D',
  'Wedding Films',
  'YouTube Thumbnails',
  'Product Teasers',
  'Personal Video Editing',
  'Travel Vlogs',
  'Corporate Business Films',
  'B2B Blog Writing',
  'SEO Copywriting',
  'Video Editing',
  'Motion Graphics',
  'Color Grading',
  'After Effects',
  'Premiere Pro',
  'UI/UX Design',
  'Drone Cinematography'
];

export const sampleProjects: ProjectCollaboration[] = [
  {
    id: 'proj_apex_01',
    title: 'Apex Launch Commercial & Brand Promo Campaign',
    description: 'High-conversion 60-second flagship commercial film with kinetic motion typography and 3D product integration for Apex Innovations launch.',
    clientId: 'usr_client_01',
    clientName: 'Rahul',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    clientEmail: 'rahul@gmail.com',
    clientPhone: '+91 98765 43210',
    creatorId: 'cr_arjun',
    creatorName: 'Arjun Mehta',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    creatorRole: 'Brand Promo & Commercial Video Editor',
    creatorPhone: '+91 98450 12345',
    creatorWhatsapp: '+91 98450 12345',
    niche: 'Brand Promotion',
    budget: '$2,800',
    status: 'in_progress',
    progressPercentage: 65,
    startDate: 'Oct 04, 2026',
    deadline: 'Oct 24, 2026',
    priority: 'high',
    currentStage: 'production',
    milestones: [
      {
        id: 'ms_1',
        title: 'Brief & Creative Direction',
        description: 'Brand moodboard, sound treatment, pacing reference & key message alignment.',
        stage: 'brief',
        status: 'completed',
        dueDate: 'Oct 06, 2026',
        completedDate: 'Oct 05, 2026',
        deliverableSummary: 'Creative brief signed off with 3 reference moodboards.'
      },
      {
        id: 'ms_2',
        title: 'Storyboard & Assembly Cut',
        description: 'Shot selection, timing draft, rough music sync, and transition layout.',
        stage: 'concept',
        status: 'completed',
        dueDate: 'Oct 11, 2026',
        completedDate: 'Oct 10, 2026',
        deliverableSummary: 'Rough assembly approved with 9:16 and 16:9 frame markers.'
      },
      {
        id: 'ms_3',
        title: 'Motion Graphics & Color Grading',
        description: '3D title typography, custom sound design, cinematic grade, and speed ramping.',
        stage: 'production',
        status: 'in_progress',
        dueDate: 'Oct 17, 2026',
        deliverableSummary: 'Draft v1 uploaded. Refining outro motion blur.'
      },
      {
        id: 'ms_4',
        title: 'Client Review & Revisions',
        description: 'Collaborative feedback round, subtitle timing adjustments, and client approvals.',
        stage: 'review',
        status: 'pending',
        dueDate: 'Oct 21, 2026'
      },
      {
        id: 'ms_5',
        title: 'Final 4K Master Handover',
        description: 'Uncompressed ProRes 422 masters, web-optimized MP4s & clean audio stems.',
        stage: 'delivery',
        status: 'pending',
        dueDate: 'Oct 24, 2026'
      }
    ],
    deliverables: [
      {
        id: 'del_1',
        title: 'Creative Brief & Concept Deck',
        type: 'document',
        status: 'approved',
        fileName: 'Apex_Commercial_Brief_v2.pdf',
        fileSize: '4.2 MB',
        submittedAt: 'Oct 05, 2026',
        version: 'v2.0',
        feedback: 'Approved without edits. Excellent narrative hook.'
      },
      {
        id: 'del_2',
        title: 'Assembly Rough Cut (1080p Preview)',
        type: 'video',
        status: 'approved',
        fileName: 'Apex_Rough_Cut_Assembly.mp4',
        fileSize: '185 MB',
        submittedAt: 'Oct 10, 2026',
        version: 'v1.1',
        feedback: 'Energy is fantastic. Proceeding to visual effects and sound design.'
      },
      {
        id: 'del_3',
        title: 'First Cut with Motion Graphics & SFX',
        type: 'video',
        status: 'submitted',
        fileName: 'Apex_Brand_Promo_v1_RoughSFX.mp4',
        fileSize: '342 MB',
        submittedAt: 'Oct 13, 2026',
        version: 'v1.0',
        feedback: 'Under review by client. Sound cues look spot on!'
      }
    ],
    activityLog: [
      {
        id: 'act_1',
        authorName: 'Arjun Mehta',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        authorRole: 'creator',
        action: 'uploaded a new deliverable',
        timestamp: 'Today at 10:15 AM',
        comment: 'Uploaded First Cut with Motion Graphics & SFX. Ready for client review!'
      },
      {
        id: 'act_2',
        authorName: 'Rahul',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        authorRole: 'client',
        action: 'reviewed Milestone 2',
        timestamp: 'Yesterday at 4:30 PM',
        comment: 'Approved the assembly cut. Pacing is sharp, let us make sure the audio drop hits on second 24.'
      }
    ],
    attachments: [
      {
        id: 'att_1',
        name: 'Brand_Assets_Logo_Pack.zip',
        size: '28 MB',
        type: 'doc',
        url: '#',
        uploadedBy: 'Rahul',
        uploadedAt: 'Oct 04, 2026'
      }
    ]
  },
  {
    id: 'proj_samir_02',
    title: 'Cyberpunk Esports Tournament Highlight Reel',
    description: 'High-octane fast-paced cinematic gaming montage with 3D camera projections, beat-synced hitmarkers, and color-graded tournament moments.',
    clientId: 'usr_client_01',
    clientName: 'Rahul',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    clientEmail: 'rahul@gmail.com',
    clientPhone: '+91 98765 43210',
    creatorId: 'cr_samir',
    creatorName: 'Samir Joshi',
    creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    creatorRole: 'Gaming Video Editor & Montage Specialist',
    creatorPhone: '+91 98221 44882',
    creatorWhatsapp: '+91 98221 44882',
    niche: 'Gaming',
    budget: '$1,400',
    status: 'in_review',
    progressPercentage: 85,
    startDate: 'Sep 28, 2026',
    deadline: 'Oct 18, 2026',
    priority: 'medium',
    currentStage: 'review',
    milestones: [
      {
        id: 'ms_v1',
        title: 'Gameplay Clip Selection',
        description: 'Logging 40+ hours of tournament VODs and indexing clutch multi-kills.',
        stage: 'brief',
        status: 'completed',
        dueDate: 'Oct 01, 2026',
        completedDate: 'Sep 30, 2026'
      },
      {
        id: 'ms_v2',
        title: 'Music Synced Ramping & SFX',
        description: 'Electronic bass beat-matching, custom gun audio enhancement, and camera velocity curves.',
        stage: 'concept',
        status: 'completed',
        dueDate: 'Oct 07, 2026',
        completedDate: 'Oct 06, 2026'
      },
      {
        id: 'ms_v3',
        title: '3D Camera Tracking & Kill Effects',
        description: 'Floating damage numbers, neon HUD overlay, and anamorphic flares.',
        stage: 'production',
        status: 'completed',
        dueDate: 'Oct 12, 2026',
        completedDate: 'Oct 11, 2026'
      },
      {
        id: 'ms_v4',
        title: 'Client Review & Feedback Polish',
        description: 'Audio ducking adjustment and player tag positioning.',
        stage: 'review',
        status: 'in_progress',
        dueDate: 'Oct 15, 2026'
      },
      {
        id: 'ms_v5',
        title: 'YouTube 4K 60FPS Final Master Delivery',
        description: 'Master render with high bitrate encode and custom thumbnail package.',
        stage: 'delivery',
        status: 'pending',
        dueDate: 'Oct 18, 2026'
      }
    ],
    deliverables: [
      {
        id: 'del_v1',
        title: 'Draft Montage with VFX Cuts',
        type: 'video',
        status: 'submitted',
        fileName: 'Esports_Tournament_Highlight_Draft_v2.mp4',
        fileSize: '410 MB',
        submittedAt: 'Oct 11, 2026',
        version: 'v2.0',
        feedback: 'Awaiting final approval on audio balance.'
      }
    ],
    activityLog: [
      {
        id: 'act_v1',
        authorName: 'Samir Joshi',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        authorRole: 'creator',
        action: 'requested final client review',
        timestamp: 'Oct 11, 2026',
        comment: 'Draft v2 is uploaded! All VFX tracking complete. Ready for client inspection.'
      }
    ],
    attachments: []
  },
  {
    id: 'proj_devanshi_03',
    title: 'Aura Smartwatch 3D Photorealistic Product Reveal',
    description: '3D CAD assembly visualization, exploded magnetic strap mechanics, and raytraced liquid splash rendering for international social launch.',
    clientId: 'usr_client_01',
    clientName: 'Rahul',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    clientEmail: 'rahul@gmail.com',
    clientPhone: '+91 98765 43210',
    creatorId: 'cr_devanshi',
    creatorName: 'Devanshi Shah',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    creatorRole: 'Luxury Brand Commercial & 3D Director',
    creatorPhone: '+91 99201 88722',
    creatorWhatsapp: '+91 99201 88722',
    niche: 'Animations',
    budget: '$3,200',
    status: 'in_progress',
    progressPercentage: 40,
    startDate: 'Oct 02, 2026',
    deadline: 'Oct 30, 2026',
    priority: 'high',
    currentStage: 'concept',
    milestones: [
      {
        id: 'ms_d1',
        title: '3D CAD Ingestion & Shader Tuning',
        description: 'Titanium bezel textures, micro-etched glass optics, and lighting studio rig.',
        stage: 'brief',
        status: 'completed',
        dueDate: 'Oct 05, 2026',
        completedDate: 'Oct 04, 2026'
      },
      {
        id: 'ms_d2',
        title: 'Camera Choreography & Exploded View',
        description: 'Cinematic orbit camera movement showing sensor internals and magnetic pins.',
        stage: 'concept',
        status: 'in_progress',
        dueDate: 'Oct 15, 2026'
      },
      {
        id: 'ms_d3',
        title: 'Photorealistic Raytraced GPU Render',
        description: 'Redshift 4K frame output with motion vector passes.',
        stage: 'production',
        status: 'pending',
        dueDate: 'Oct 22, 2026'
      },
      {
        id: 'ms_d4',
        title: 'Sound Design & Color Conforming',
        description: 'Haptic click foley, sub-bass riser, and OLED black level tuning.',
        stage: 'review',
        status: 'pending',
        dueDate: 'Oct 26, 2026'
      },
      {
        id: 'ms_d5',
        title: 'Master Deliverable Package',
        description: '16:9 4K landscape, 9:16 vertical TikTok/Reel cut, and transparent alpha looping badge.',
        stage: 'delivery',
        status: 'pending',
        dueDate: 'Oct 30, 2026'
      }
    ],
    deliverables: [
      {
        id: 'del_d1',
        title: 'Camera Animatics Preview (Low-poly)',
        type: 'design',
        status: 'approved',
        fileName: 'Aura_Camera_Flight_Pass.mp4',
        fileSize: '48 MB',
        submittedAt: 'Oct 08, 2026',
        version: 'v1.0'
      }
    ],
    activityLog: [
      {
        id: 'act_d1',
        authorName: 'Devanshi Shah',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
        authorRole: 'creator',
        action: 'updated timeline milestone',
        timestamp: 'Oct 08, 2026',
        comment: 'Camera animatics shared. Currently rendering the magnetic clasp simulation!'
      }
    ],
    attachments: []
  },
  {
    id: 'proj_kabir_04',
    title: 'The Udaipur Royal Heritage Destination Wedding Film',
    description: 'Cinematic 4K 10-bit multicam wedding story with drone cinematography, personalized vow audio mixing, and Bollywood-grade warm color grading.',
    clientId: 'usr_client_01',
    clientName: 'Rahul',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    clientEmail: 'rahul@gmail.com',
    clientPhone: '+91 98765 43210',
    creatorId: 'cr_kabir',
    creatorName: 'Kabir Varma',
    creatorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    creatorRole: 'Cinematic Wedding Film Creator & Colorist',
    creatorPhone: '+91 99881 22334',
    creatorWhatsapp: '+91 99881 22334',
    niche: 'Wedding',
    budget: '$4,500',
    status: 'completed',
    progressPercentage: 100,
    startDate: 'Sep 08, 2026',
    deadline: 'Oct 05, 2026',
    priority: 'high',
    currentStage: 'completed',
    milestones: [
      {
        id: 'ms_k1',
        title: 'Multicam Audio Sync & Ingestion',
        description: 'Dual lavalier mic sync with 3 camera angles across 3-day events.',
        stage: 'brief',
        status: 'completed',
        dueDate: 'Sep 12, 2026',
        completedDate: 'Sep 11, 2026'
      },
      {
        id: 'ms_k2',
        title: '3-Minute Instagram Teaser Cut',
        description: 'Fast-turnaround cinematic trailer for social sharing.',
        stage: 'concept',
        status: 'completed',
        dueDate: 'Sep 18, 2026',
        completedDate: 'Sep 16, 2026'
      },
      {
        id: 'ms_k3',
        title: 'Full 22-Minute Film Assembly & Color Grade',
        description: 'Complete narrative film featuring vows, sangeet dances, and sunset ceremonies.',
        stage: 'production',
        status: 'completed',
        dueDate: 'Sep 28, 2026',
        completedDate: 'Sep 27, 2026'
      },
      {
        id: 'ms_k4',
        title: 'Client Review & Audio Polish',
        description: 'Song pacing checks and family feedback approval.',
        stage: 'review',
        status: 'completed',
        dueDate: 'Oct 02, 2026',
        completedDate: 'Oct 02, 2026'
      },
      {
        id: 'ms_k5',
        title: 'Archival 4K SSD Master Delivery',
        description: 'Custom USB box handover and cloud delivery gallery.',
        stage: 'delivery',
        status: 'completed',
        dueDate: 'Oct 05, 2026',
        completedDate: 'Oct 04, 2026'
      }
    ],
    deliverables: [
      {
        id: 'del_k1',
        title: 'Official Teaser Cut (4K)',
        type: 'video',
        status: 'approved',
        fileName: 'Udaipur_Wedding_Teaser_Master.mp4',
        fileSize: '620 MB',
        submittedAt: 'Sep 16, 2026'
      },
      {
        id: 'del_k2',
        title: 'Full Feature Wedding Film (22 Mins)',
        type: 'video',
        status: 'approved',
        fileName: 'Royal_Heritage_Film_4K_Master.mp4',
        fileSize: '3.8 GB',
        submittedAt: 'Oct 04, 2026'
      }
    ],
    activityLog: [
      {
        id: 'act_k1',
        authorName: 'Rahul',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        authorRole: 'client',
        action: 'marked project completed & released payment',
        timestamp: 'Oct 05, 2026',
        comment: 'Absolutely breathtaking film. You captured the emotion perfectly. Thank you Kabir!'
      }
    ],
    attachments: []
  }
];
