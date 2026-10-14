export type UserRole = 'client' | 'creator';
export type AccountType = 'personal' | 'business';
export type ThemeMode = 'dark' | 'light';

export type LanguageCode = 
  | 'en' // English
  | 'hi' // Hindi
  | 'es' // Spanish
  | 'fr' // French
  | 'de' // German
  | 'ja' // Japanese
  | 'ar' // Arabic
  | 'zh' // Chinese
  | 'pt' // Portuguese
  | 'ru' // Russian
  | 'te' // Telugu
  | 'ta' // Tamil
  | 'bn'; // Bengali

export type CreatorNiche = 
  | 'Gaming'
  | 'Animations'
  | 'Blog Writing'
  | 'Personal Video Editors'
  | 'Brand Promotion'
  | 'Travel'
  | 'Business'
  | 'Wedding'
  | 'Thumbnail'
  | 'Product Promotions'
  | 'Social Media / Reels'
  | 'Podcast & Audio';

export interface CreatorPortfolioItem {
  id: string;
  title: string;
  category: string; // Niche or style e.g. 'Brand Promotion', 'Gaming', 'Wedding', 'Thumbnail', 'Product Promotions'
  duration?: string;
  year: string;
  thumbnail: string;
  videoUrl?: string;
  description: string;
  clientName?: string;
  isFileUpload?: boolean;
  fileType?: 'video' | 'image';
  fileName?: string;
  fileSize?: string;
}

export interface CreatorReview {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  verified: boolean;
  role: string;
  category: 'Design' | 'Development' | 'Video Editing' | 'Content Writing' | 'Marketing' | 'Photography';
  primaryNiche: CreatorNiche;
  secondaryNiches?: CreatorNiche[];
  rating: number;
  reviewsCount: number;
  followers: string;
  projectsCount: number;
  location: string;
  city: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Expert';
  available: boolean;
  avatar: string;
  coverImage?: string;
  skills: string[];
  about: string;
  portfolio: CreatorPortfolioItem[];
  reviews: CreatorReview[];
  hourlyRate?: string;
  responseTime?: string;
  recommendationScore: number; // e.g. 99 for 99% satisfaction
  recommendationBadge?: string; // e.g. "Top Brand Partner", "Shield Certified", "Trending"
  completedCampaignsCount?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  role: UserRole;
  accountType: AccountType;
  avatar: string;
  preferences: string[];
  targetNiches?: CreatorNiche[]; // specific creator specifications for client (Gaming, Wedding, etc.)
  primaryNiche?: CreatorNiche;   // primary niche selected by creator during registration/login
  companyName?: string;
  bio?: string;
  location?: string;
  hourlyRate?: string;
  uploadedWorks?: CreatorPortfolioItem[];
}

export interface ProposalItem {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAvatar?: string;
  budget: string;
  timeline: string;
  scope: string;
  niche?: CreatorNiche;
  date: string;
  status: 'pending' | 'accepted' | 'declined';
  rejectionReason?: string;
  createdAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'match' | 'message' | 'proposal' | 'system';
  avatar?: string;
  targetRole?: 'client' | 'creator' | 'all';
  targetUserId?: string;
  proposalId?: string;
  projectId?: string;
}

export interface SearchFilters {
  query: string;
  categories: string[];
  niches: string[]; // specialized specifications: Gaming, Wedding, Brand Promotion, etc.
  experienceLevel: string;
  location: string;
  sortBy: 'relevance' | 'rating' | 'reviews' | 'projects' | 'recommendation';
}

export type ProjectStage = 'brief' | 'concept' | 'production' | 'review' | 'delivery' | 'completed';
export type MilestoneStatus = 'completed' | 'in_progress' | 'pending' | 'revision';
export type ProjectStatus = 'in_progress' | 'in_review' | 'completed' | 'planning';

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  stage: ProjectStage;
  status: MilestoneStatus;
  dueDate: string;
  completedDate?: string;
  deliverableSummary?: string;
}

export interface ProjectDeliverable {
  id: string;
  title: string;
  type: 'video' | 'design' | 'script' | 'thumbnail' | 'document';
  status: 'pending' | 'submitted' | 'approved' | 'revision_requested';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  submittedAt?: string;
  version?: string;
  feedback?: string;
}

export interface ProjectActivity {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'client' | 'creator';
  action: string;
  timestamp: string;
  comment?: string;
}

export interface ProjectAttachment {
  id: string;
  name: string;
  size: string;
  type: 'video' | 'image' | 'doc';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ProjectCollaboration {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientEmail?: string;
  clientPhone?: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorRole: string;
  creatorPhone?: string;
  creatorWhatsapp?: string;
  niche: CreatorNiche;
  budget: string;
  status: ProjectStatus;
  progressPercentage: number; // 0 to 100
  startDate: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  currentStage: ProjectStage;
  milestones: ProjectMilestone[];
  deliverables: ProjectDeliverable[];
  activityLog: ProjectActivity[];
  attachments: ProjectAttachment[];
}
