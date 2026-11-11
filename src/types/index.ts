/**
 * NEXORA Domain Types
 * Unified TypeScript interfaces for all 20 integrated modules
 */

export type UserRole = 'admin' | 'manager' | 'member' | 'guest';

export interface UserPermission {
  canManageUsers: boolean;
  canEditSettings: boolean;
  canDeleteProjects: boolean;
  canCreateCourses: boolean;
  canModerateCommunity: boolean;
  canPublishMarketplace: boolean;
  canViewAuditLogs: boolean;
  canUseAiTools: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  role: UserRole;
  title: string;
  department: string;
  bio: string;
  skills: string[];
  themePreference: 'light' | 'dark' | 'system';
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'planning' | 'active' | 'paused' | 'completed';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';
export type KanbanColumnId = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  columnId: KanbanColumnId;
  priority: PriorityLevel;
  assigneeId?: string;
  reporterId: string;
  estimatedHours: number;
  loggedHours: number;
  orderIndex: number;
  dueDate: string;
  tags: string[];
  subtasks: Subtask[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  priority: PriorityLevel;
  ownerId: string;
  startDate: string;
  dueDate: string;
  budget: number;
  progress: number; // 0 - 100
  tags: string[];
  teamMemberIds: string[];
  createdAt: string;
  updatedAt: string;
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface CourseLesson {
  id: string;
  courseId: string;
  title: string;
  durationMinutes: number;
  content: string;
  orderIndex: number;
  completed?: boolean;
}

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  instructorId: string;
  durationMinutes: number;
  level: CourseLevel;
  rating: number;
  totalStudents: number;
  published: boolean;
  thumbnailUrl: string;
  lessons: CourseLesson[];
  createdAt: string;
}

export interface CertificateItem {
  id: string;
  certificateNumber: string;
  courseId: string;
  courseTitle: string;
  userId: string;
  userName: string;
  issueDate: string;
  grade: number;
  verificationHash: string;
}

export type ForumChannel = 'general' | 'engineering' | 'design' | 'announcements' | 'support';

export interface PostComment {
  id: string;
  topicId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  channel: ForumChannel;
  isPinned: boolean;
  isLocked: boolean;
  viewsCount: number;
  repliesCount: number;
  reactions: {
    likes: number;
    celebrate: number;
    insightful: number;
  };
  tags: string[];
  comments: PostComment[];
  createdAt: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  downloadUrl?: string;
  downloadsCount: number;
  rating: number;
  tags: string[];
  previewUrl: string;
  createdAt: string;
}

export interface CartItem {
  product: MarketplaceProduct;
  quantity: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  licenseKey: string;
  status: 'completed' | 'processing' | 'refunded';
  createdAt: string;
}

export interface StorageFile {
  id: string;
  name: string;
  folderId: string;
  fileSizeBytes: number;
  mimeType: string;
  uploadedBy: string;
  storageUrl: string;
  isPublic: boolean;
  createdAt: string;
}

export interface StorageFolder {
  id: string;
  name: string;
  parentId: string | null;
  fileCount: number;
}

export type NotificationType = 'system' | 'mention' | 'task_assigned' | 'course_update' | 'marketplace';

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  linkUrl?: string;
  createdAt: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tokensUsed?: number;
}

export interface AiSession {
  id: string;
  title: string;
  messages: AiChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export type AuditSeverity = 'info' | 'warning' | 'critical';

export interface AuditLogItem {
  id: string;
  actorId: string;
  actorName: string;
  actorEmail: string;
  action: string;
  module: string;
  severity: AuditSeverity;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  target: string;
  module: string;
  timestamp: string;
}

export interface SystemSettings {
  appName: string;
  appDescription: string;
  allowPublicRegistration: boolean;
  enableMaintenanceMode: boolean;
  enableAiCopilot: boolean;
  maxFileUploadMb: number;
  sessionTimeoutMinutes: number;
  supportEmail: string;
  featureFlags: {
    betaGanttTimeline: boolean;
    voiceDictationAi: boolean;
    strictMfaRequired: boolean;
    realtimeWebsocket: boolean;
  };
}

export interface RoadmapTask {
  id: string;
  phase: number;
  phaseName: string;
  module: string;
  category: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Done' | 'In Progress' | 'Planned';
  filesAffected: string;
  testsPerformed: string;
  commitHash: string;
}

export interface GitCommitRecord {
  hash: string;
  date: string;
  author: string;
  message: string;
  type: 'feat' | 'fix' | 'docs' | 'test' | 'refactor' | 'style' | 'perf' | 'chore';
  scope?: string;
  filesChanged: number;
}
