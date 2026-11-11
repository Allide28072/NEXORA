/**
 * Realistic Enterprise Seed Data Generator
 * Provides initial relational data models across all 20 NEXORA modules.
 */

import {
  UserProfile,
  ProjectItem,
  TaskItem,
  CourseItem,
  CertificateItem,
  ForumTopic,
  MarketplaceProduct,
  StorageFile,
  StorageFolder,
  AppNotification,
  AuditLogItem,
  ActivityItem,
  SystemSettings,
  RoadmapTask,
  GitCommitRecord
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr_admin_01',
    email: 'allidekarangwa0@gmail.com',
    fullName: 'Alli Dekarangwa',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    title: 'Lead Architect & Principal Engineer',
    department: 'Platform Architecture',
    bio: 'Directing the NEXORA digital transformation ecosystem and full-stack distributed systems.',
    skills: ['TypeScript', 'React 19', 'PostgreSQL', 'Supabase', 'Gemini AI', 'Tailwind CSS', 'Docker'],
    themePreference: 'dark',
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-11-11T00:00:00Z'
  },
  {
    id: 'usr_mgr_02',
    email: 'elena.rostova@nexora.internal',
    fullName: 'Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'manager',
    title: 'Senior Engineering Manager',
    department: 'Core Operations',
    bio: 'Overseeing agile sprint cadences, developer enablement, and cross-team workflows.',
    skills: ['Agile Leadership', 'System Design', 'Project Management', 'OKRs'],
    themePreference: 'dark',
    createdAt: '2026-02-15T09:30:00Z',
    updatedAt: '2026-11-10T14:20:00Z'
  },
  {
    id: 'usr_dev_03',
    email: 'marcus.chen@nexora.internal',
    fullName: 'Marcus Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'member',
    title: 'Senior Full-Stack Developer',
    department: 'Cloud Services',
    bio: 'Passionate about type safety, high-throughput APIs, and reactive frontend architecture.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Vite'],
    themePreference: 'dark',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-11-09T18:00:00Z'
  },
  {
    id: 'usr_guest_04',
    email: 'sarah.jenkins@nexora.internal',
    fullName: 'Sarah Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'guest',
    title: 'External UX Auditor',
    department: 'Product Verification',
    bio: 'Auditing UI accessibility, WCAG AA compliance, and cross-platform usability.',
    skills: ['WCAG Compliance', 'Design Systems', 'Usability Auditing'],
    themePreference: 'dark',
    createdAt: '2026-04-12T11:00:00Z',
    updatedAt: '2026-11-08T16:45:00Z'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj_01',
    title: 'Enterprise Cloud Migration & Data Sync',
    slug: 'cloud-migration',
    description: 'Transitioning on-premises infrastructure to Supabase managed PostgreSQL with multi-region high availability.',
    status: 'active',
    priority: 'critical',
    ownerId: 'usr_admin_01',
    startDate: '2026-10-01',
    dueDate: '2026-12-15',
    budget: 85000,
    progress: 68,
    tags: ['Infrastructure', 'PostgreSQL', 'Supabase', 'Cloud'],
    teamMemberIds: ['usr_admin_01', 'usr_mgr_02', 'usr_dev_03'],
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-11-10T12:00:00Z'
  },
  {
    id: 'proj_02',
    title: 'Quantum Design System & Token Engine',
    slug: 'quantum-design-system',
    description: 'Building an enterprise-wide accessible component library strictly complying with the zero-pill frontend design constitution.',
    status: 'active',
    priority: 'high',
    ownerId: 'usr_admin_01',
    startDate: '2026-10-15',
    dueDate: '2026-11-30',
    budget: 42000,
    progress: 82,
    tags: ['Design System', 'Tailwind v4', 'Accessibility', 'React 19'],
    teamMemberIds: ['usr_admin_01', 'usr_guest_04'],
    createdAt: '2026-10-15T09:00:00Z',
    updatedAt: '2026-11-10T17:30:00Z'
  },
  {
    id: 'proj_03',
    title: 'AI Workflow Automation & Assistant Copilot',
    slug: 'ai-copilot-engine',
    description: 'Embedding Google Gemini AI models directly into operational task workflows and automated code reviews.',
    status: 'planning',
    priority: 'high',
    ownerId: 'usr_dev_03',
    startDate: '2026-11-01',
    dueDate: '2027-01-20',
    budget: 60000,
    progress: 35,
    tags: ['Gemini AI', 'GenAI SDK', 'Automation'],
    teamMemberIds: ['usr_admin_01', 'usr_dev_03'],
    createdAt: '2026-11-01T10:00:00Z',
    updatedAt: '2026-11-10T19:00:00Z'
  },
  {
    id: 'proj_04',
    title: 'Digital Marketplace & Asset Delivery Pipeline',
    slug: 'marketplace-pipeline',
    description: 'Self-service marketplace for engineering blueprints, design kits, and certified course accreditation.',
    status: 'completed',
    priority: 'medium',
    ownerId: 'usr_mgr_02',
    startDate: '2026-08-01',
    dueDate: '2026-10-28',
    budget: 35000,
    progress: 100,
    tags: ['Marketplace', 'E-Commerce', 'Assets'],
    teamMemberIds: ['usr_mgr_02', 'usr_dev_03'],
    createdAt: '2026-08-01T08:00:00Z',
    updatedAt: '2026-10-28T16:00:00Z'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task_101',
    projectId: 'proj_01',
    title: 'Audit database foreign keys and index coverage',
    description: 'Perform a comprehensive query plan review on PostgreSQL tables to guarantee sub-10ms response times.',
    columnId: 'done',
    priority: 'high',
    assigneeId: 'usr_admin_01',
    reporterId: 'usr_mgr_02',
    estimatedHours: 8,
    loggedHours: 7.5,
    orderIndex: 0,
    dueDate: '2026-11-05',
    tags: ['Database', 'Perf'],
    subtasks: [
      { id: 'sub_1', title: 'Audit users table foreign keys', completed: true },
      { id: 'sub_2', title: 'Add compound indexes on audit_logs(timestamp, severity)', completed: true }
    ],
    createdAt: '2026-11-01T09:00:00Z',
    updatedAt: '2026-11-05T17:00:00Z'
  },
  {
    id: 'task_102',
    projectId: 'proj_01',
    title: 'Implement Row Level Security (RLS) tenant isolation policies',
    description: 'Ensure all read/write policies strictly restrict data access by user organization ID and role.',
    columnId: 'in_progress',
    priority: 'critical',
    assigneeId: 'usr_admin_01',
    reporterId: 'usr_mgr_02',
    estimatedHours: 12,
    loggedHours: 9,
    orderIndex: 0,
    dueDate: '2026-11-12',
    tags: ['Security', 'PostgreSQL', 'RLS'],
    subtasks: [
      { id: 'sub_3', title: 'Draft RLS DDL policies for projects and tasks', completed: true },
      { id: 'sub_4', title: 'Simulate bypass testing with guest credentials', completed: false }
    ],
    createdAt: '2026-11-06T10:00:00Z',
    updatedAt: '2026-11-10T18:00:00Z'
  },
  {
    id: 'task_103',
    projectId: 'proj_02',
    title: 'Enforce Zero-Pill metadata guidelines across all card surfaces',
    description: 'Replace static bordered chip enclosures with clean unboxed typographic separators (· and /).',
    columnId: 'review',
    priority: 'high',
    assigneeId: 'usr_guest_04',
    reporterId: 'usr_admin_01',
    estimatedHours: 6,
    loggedHours: 5,
    orderIndex: 0,
    dueDate: '2026-11-11',
    tags: ['Design System', 'UI/UX'],
    subtasks: [
      { id: 'sub_5', title: 'Remove pill badges from Forum and Course cards', completed: true },
      { id: 'sub_6', title: 'Verify contrast on dark slate canvas', completed: true }
    ],
    createdAt: '2026-11-08T09:00:00Z',
    updatedAt: '2026-11-10T14:00:00Z'
  },
  {
    id: 'task_104',
    projectId: 'proj_03',
    title: 'Wire Gemini 2.5 Flash SDK into Copilot Dock',
    description: 'Connect server-side Gemini AI generation proxy to the floating copilot dock with auto-prompt contextual injection.',
    columnId: 'todo',
    priority: 'high',
    assigneeId: 'usr_dev_03',
    reporterId: 'usr_admin_01',
    estimatedHours: 10,
    loggedHours: 2,
    orderIndex: 0,
    dueDate: '2026-11-15',
    tags: ['AI', 'Gemini', 'Copilot'],
    subtasks: [
      { id: 'sub_7', title: 'Initialize @google/genai client', completed: true },
      { id: 'sub_8', title: 'Support task generation prompt template', completed: false }
    ],
    createdAt: '2026-11-09T11:00:00Z',
    updatedAt: '2026-11-10T16:00:00Z'
  },
  {
    id: 'task_105',
    projectId: 'proj_01',
    title: 'Configure automated DB backup cron and snapshot validation',
    description: 'Set up daily automated snapshots with point-in-time recovery verification.',
    columnId: 'backlog',
    priority: 'medium',
    assigneeId: 'usr_dev_03',
    reporterId: 'usr_mgr_02',
    estimatedHours: 8,
    loggedHours: 0,
    orderIndex: 0,
    dueDate: '2026-11-20',
    tags: ['DevOps', 'Backup'],
    subtasks: [],
    createdAt: '2026-11-10T08:00:00Z',
    updatedAt: '2026-11-10T08:00:00Z'
  }
];

export const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'course_01',
    title: 'Modern Full-Stack Distributed Systems with TypeScript',
    slug: 'distributed-systems-typescript',
    description: 'Master large-scale enterprise architecture, resilient microservices, reactive state stores, and real-time event distribution.',
    category: 'Engineering',
    instructorId: 'usr_admin_01',
    durationMinutes: 240,
    level: 'advanced',
    rating: 4.95,
    totalStudents: 1420,
    published: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80',
    lessons: [
      { id: 'l1', courseId: 'course_01', title: 'First Principles of Event-Driven Systems', durationMinutes: 35, content: 'Deep dive into event buses, idempotency, and asynchronous workflows.', orderIndex: 0, completed: true },
      { id: 'l2', courseId: 'course_01', title: 'PostgreSQL Relational Topology & RLS', durationMinutes: 45, content: 'Implementing enterprise multi-tenancy and security policies.', orderIndex: 1, completed: true },
      { id: 'l3', courseId: 'course_01', title: 'Reactive Frontend State Stores in React 19', durationMinutes: 50, content: 'Optimistic UI updates, caching strategies, and memory management.', orderIndex: 2, completed: false }
    ],
    createdAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'course_02',
    title: 'Frontend Design Constitution & Anti-Slop Mastery',
    slug: 'frontend-design-constitution',
    description: 'Craft distinctive, human-grade web interfaces avoiding generic AI templates, pill badges, and mechanical clutter.',
    category: 'Design & UX',
    instructorId: 'usr_guest_04',
    durationMinutes: 180,
    level: 'intermediate',
    rating: 4.98,
    totalStudents: 2150,
    published: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80',
    lessons: [
      { id: 'l4', courseId: 'course_02', title: 'Zero-Pill Metadata & Typographic Hierarchy', durationMinutes: 40, content: 'How to structure unboxed metadata with intentional optical discipline.', orderIndex: 0, completed: true },
      { id: 'l5', courseId: 'course_02', title: 'Top Bar Contracts and Viewport Presence', durationMinutes: 45, content: 'Structuring 1-row headers and high-density 1440px dashboards.', orderIndex: 1, completed: true },
      { id: 'l6', courseId: 'course_02', title: 'Dual-Theme Optical Compensation in Tailwind v4', durationMinutes: 45, content: 'Implementing flawless light/dark mode pairs without contrast bugs.', orderIndex: 2, completed: true }
    ],
    createdAt: '2026-09-15T12:00:00Z'
  }
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert_8801',
    certificateNumber: 'NEX-CERT-2026-9041',
    courseId: 'course_02',
    courseTitle: 'Frontend Design Constitution & Anti-Slop Mastery',
    userId: 'usr_admin_01',
    userName: 'Alli Dekarangwa',
    issueDate: '2026-11-09T18:30:00Z',
    grade: 99.4,
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  }
];

export const INITIAL_FORUM_TOPICS: ForumTopic[] = [
  {
    id: 'topic_01',
    title: 'Migrating from Legacy Microservices to Modular Monolith with Supabase RLS',
    content: 'We recently consolidated 8 separate Dockerized microservices into a unified modular monolith powered by PostgreSQL with Row Level Security. Query latency dropped from 85ms to 6ms.',
    authorId: 'usr_admin_01',
    authorName: 'Alli Dekarangwa',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorRole: 'admin',
    channel: 'engineering',
    isPinned: true,
    isLocked: false,
    viewsCount: 384,
    repliesCount: 3,
    reactions: {
      likes: 42,
      celebrate: 18,
      insightful: 29
    },
    tags: ['Architecture', 'PostgreSQL', 'Performance'],
    comments: [
      {
        id: 'c_01',
        topicId: 'topic_01',
        authorId: 'usr_dev_03',
        authorName: 'Marcus Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        content: 'The reduction in cross-service serialization overhead makes this an absolute game changer. Did you notice any RLS policy execution overhead under high concurrency?',
        createdAt: '2026-11-10T14:15:00Z',
        likes: 8
      },
      {
        id: 'c_02',
        topicId: 'topic_01',
        authorId: 'usr_admin_01',
        authorName: 'Alli Dekarangwa',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'Indexing `(tenant_id, user_id)` on every target table kept the RLS execution under 0.2ms across all synthetic load tests.',
        createdAt: '2026-11-10T14:45:00Z',
        likes: 12
      }
    ],
    createdAt: '2026-11-10T11:00:00Z'
  },
  {
    id: 'topic_02',
    title: 'Announcement: NEXORA 300+ Genuine Contributions Challenge Kicks Off',
    content: 'Today we embark on an intensive development challenge to build out all 20 integrated modules with verifiable conventional commits, strict types, and production tests.',
    authorId: 'usr_admin_01',
    authorName: 'Alli Dekarangwa',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorRole: 'admin',
    channel: 'announcements',
    isPinned: true,
    isLocked: false,
    viewsCount: 612,
    repliesCount: 1,
    reactions: {
      likes: 95,
      celebrate: 64,
      insightful: 31
    },
    tags: ['Challenge', 'Roadmap', 'Milestone'],
    comments: [],
    createdAt: '2026-11-11T00:00:00Z'
  }
];

export const INITIAL_MARKETPLACE: MarketplaceProduct[] = [
  {
    id: 'prod_01',
    title: 'Terraform Multi-Region PostgreSQL Blueprints',
    description: 'Production-ready IaC scripts for provisioning automated read-replicas, VPC peering, and automated backups.',
    price: 49.00,
    category: 'DevOps & Cloud',
    authorId: 'usr_admin_01',
    authorName: 'Alli Dekarangwa',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    downloadsCount: 318,
    rating: 4.9,
    tags: ['Terraform', 'PostgreSQL', 'IaC'],
    previewUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80',
    createdAt: '2026-10-01T10:00:00Z'
  },
  {
    id: 'prod_02',
    title: 'Quantum Executive SaaS Dashboard UI Kit',
    description: 'Complete Figma & React Tailwind v4 component system adhering to the Zero-Pill design constitution.',
    price: 89.00,
    category: 'UI/UX Kits',
    authorId: 'usr_guest_04',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    downloadsCount: 520,
    rating: 5.0,
    tags: ['Tailwind v4', 'React 19', 'Design System'],
    previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80',
    createdAt: '2026-10-15T12:00:00Z'
  }
];

export const INITIAL_FILES: StorageFile[] = [
  {
    id: 'f_01',
    name: 'nexora_database_erd_v1.svg',
    folderId: 'root',
    fileSizeBytes: 245000,
    mimeType: 'image/svg+xml',
    uploadedBy: 'Alli Dekarangwa',
    storageUrl: '#',
    isPublic: true,
    createdAt: '2026-11-10T10:00:00Z'
  },
  {
    id: 'f_02',
    name: 'enterprise_security_whitepaper.pdf',
    folderId: 'root',
    fileSizeBytes: 1840000,
    mimeType: 'application/pdf',
    uploadedBy: 'Alli Dekarangwa',
    storageUrl: '#',
    isPublic: true,
    createdAt: '2026-11-09T14:30:00Z'
  }
];

export const INITIAL_FOLDERS: StorageFolder[] = [
  { id: 'root', name: 'Root Documents', parentId: null, fileCount: 2 },
  { id: 'fld_architecture', name: 'System Architecture', parentId: 'root', fileCount: 4 },
  { id: 'fld_certs', name: 'Course Certificates', parentId: 'root', fileCount: 12 }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    userId: 'usr_admin_01',
    title: 'Task Assigned',
    message: 'Elena Rostova assigned you to "Implement Row Level Security (RLS) tenant isolation policies".',
    type: 'task_assigned',
    read: false,
    linkUrl: '#tasks',
    createdAt: '2026-11-10T18:00:00Z'
  },
  {
    id: 'notif_02',
    userId: 'usr_admin_01',
    title: 'New Discussion Reply',
    message: 'Marcus Chen commented on your thread "Migrating from Legacy Microservices".',
    type: 'mention',
    read: true,
    linkUrl: '#community',
    createdAt: '2026-11-10T14:15:00Z'
  },
  {
    id: 'notif_03',
    userId: 'usr_admin_01',
    title: 'Milestone Initiated',
    message: 'NEXORA 300+ Contributions Challenge successfully launched.',
    type: 'system',
    read: false,
    linkUrl: '#roadmap',
    createdAt: '2026-11-11T00:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud_01',
    actorId: 'usr_admin_01',
    actorName: 'Alli Dekarangwa',
    actorEmail: 'allidekarangwa0@gmail.com',
    action: 'INIT_GIT_REPOSITORY',
    module: 'Core Foundation',
    severity: 'info',
    details: 'Initialized safe Git directory and established main branch.',
    ipAddress: '192.168.1.1',
    timestamp: '2026-11-11T00:01:05Z'
  },
  {
    id: 'aud_02',
    actorId: 'usr_admin_01',
    actorName: 'Alli Dekarangwa',
    actorEmail: 'allidekarangwa0@gmail.com',
    action: 'CREATE_300_TASK_ROADMAP',
    module: 'Project Management',
    severity: 'info',
    details: 'Generated complete development roadmap spanning 300 distinct tasks.',
    ipAddress: '192.168.1.1',
    timestamp: '2026-11-11T00:03:00Z'
  },
  {
    id: 'aud_03',
    actorId: 'usr_admin_01',
    actorName: 'Alli Dekarangwa',
    actorEmail: 'allidekarangwa0@gmail.com',
    action: 'CONFIG_TAILWIND_V4_DARK_VARIANT',
    module: 'Design System',
    severity: 'info',
    details: 'Configured @custom-variant dark for zero-pill dual theme support.',
    ipAddress: '192.168.1.1',
    timestamp: '2026-11-11T00:01:38Z'
  }
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 'act_01',
    userId: 'usr_admin_01',
    userName: 'Alli Dekarangwa',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'created project',
    target: 'Enterprise Cloud Migration & Data Sync',
    module: 'Projects',
    timestamp: '2026-11-10T12:00:00Z'
  },
  {
    id: 'act_02',
    userId: 'usr_dev_03',
    userName: 'Marcus Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    action: 'replied to topic',
    target: 'Migrating from Legacy Microservices',
    module: 'Community',
    timestamp: '2026-11-10T14:15:00Z'
  },
  {
    id: 'act_03',
    userId: 'usr_admin_01',
    userName: 'Alli Dekarangwa',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'completed task',
    target: 'Audit database foreign keys and index coverage',
    module: 'Tasks',
    timestamp: '2026-11-10T17:00:00Z'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  appName: 'NEXORA',
  appDescription: 'The Complete Digital Ecosystem',
  allowPublicRegistration: true,
  enableMaintenanceMode: false,
  enableAiCopilot: true,
  maxFileUploadMb: 50,
  sessionTimeoutMinutes: 60,
  supportEmail: 'support@nexora.internal',
  featureFlags: {
    betaGanttTimeline: true,
    voiceDictationAi: false,
    strictMfaRequired: false,
    realtimeWebsocket: true
  }
};

/**
 * Pre-generate the 300 tasks with detailed metadata
 */
export function generate300RoadmapTasks(): RoadmapTask[] {
  const tasks: RoadmapTask[] = [];

  const phases = [
    { num: 1, name: 'Project Foundation & Architecture', start: 1, end: 30 },
    { num: 2, name: 'UI & Design System', start: 31, end: 60 },
    { num: 3, name: 'Authentication & Authorization (RBAC)', start: 61, end: 90 },
    { num: 4, name: 'Database Architecture & Supabase Integration', start: 91, end: 120 },
    { num: 5, name: 'Advanced Dashboard & Analytics System', start: 121, end: 150 },
    { num: 6, name: 'Core Application Modules', start: 151, end: 210 },
    { num: 7, name: 'Gemini AI Integration & Assistant', start: 211, end: 235 },
    { num: 8, name: 'Administration, Activity Monitoring & Audit Logs', start: 236, end: 260 },
    { num: 9, name: 'Security, Search, Performance & Testing', start: 261, end: 285 },
    { num: 10, name: 'Documentation, CI/CD & Deployment', start: 286, end: 300 },
  ];

  // Specific high-fidelity titles for key tasks
  const specificTasks: Record<number, { module: string; category: string; description: string; files: string }> = {
    1: { module: 'Core', category: 'Foundation', description: 'Initialize Git repository, configure safe directory and branch topology', files: '.git/config' },
    2: { module: 'Core', category: 'Config', description: 'Configure metadata.json with production title, description, and capabilities', files: 'metadata.json' },
    3: { module: 'Core', category: 'Config', description: 'Update index.html with viewport, SEO meta tags, and Google Fonts', files: 'index.html' },
    4: { module: 'Core', category: 'Styles', description: 'Configure Tailwind v4 @custom-variant dark and base layer rules in index.css', files: 'src/index.css' },
    5: { module: 'Core', category: 'Config', description: 'Configure TypeScript compiler options with strict type checking in tsconfig.json', files: 'tsconfig.json' },
    6: { module: 'Auth', category: 'Types', description: 'Implement comprehensive User and Authentication domain types', files: 'src/types/index.ts' },
    7: { module: 'Projects', category: 'Types', description: 'Implement Project and Workflow management domain types', files: 'src/types/index.ts' },
    8: { module: 'LMS', category: 'Types', description: 'Implement Learning Management System (LMS) domain types', files: 'src/types/index.ts' },
    9: { module: 'Community', category: 'Types', description: 'Implement Community, Post, and Comment domain types', files: 'src/types/index.ts' },
    10: { module: 'Marketplace', category: 'Types', description: 'Implement Digital Marketplace and Transaction types', files: 'src/types/index.ts' },
    11: { module: 'Storage', category: 'Types', description: 'Implement Storage and File management domain types', files: 'src/types/index.ts' },
    12: { module: 'Notifications', category: 'Types', description: 'Implement Notification and Real-time event types', files: 'src/types/index.ts' },
    13: { module: 'AI', category: 'Types', description: 'Implement Gemini AI Assistant and Session types', files: 'src/types/index.ts' },
    14: { module: 'Admin', category: 'Types', description: 'Implement Administrative, Audit Log, and Activity types', files: 'src/types/index.ts' },
    15: { module: 'System', category: 'Types', description: 'Implement Search, Analytics, and Settings domain types', files: 'src/types/index.ts' },
    16: { module: 'Core', category: 'Types', description: 'Consolidate central type barrel export', files: 'src/types/index.ts' },
    17: { module: 'Storage', category: 'Architecture', description: 'Build reactive local persistence and storage abstraction layer', files: 'src/lib/storage.ts' },
    18: { module: 'Database', category: 'Architecture', description: 'Build initial relational database client and schema connector', files: 'src/lib/database.ts' },
    19: { module: 'Events', category: 'Architecture', description: 'Create centralized pub/sub event bus for decoupled messaging', files: 'src/lib/events.ts' },
    20: { module: 'State', category: 'Architecture', description: 'Implement application state container and context provider', files: 'src/context/AppContext.tsx' },
    21: { module: 'Layout', category: 'UI/UX', description: 'Build responsive enterprise sidebar with module grouping', files: 'src/components/layout/Sidebar.tsx' },
    22: { module: 'Layout', category: 'UI/UX', description: 'Build Top Navigation Bar conforming to 3-zone contract', files: 'src/components/layout/Navbar.tsx' },
    23: { module: 'Layout', category: 'UI/UX', description: 'Create Breadcrumb navigational trail engine', files: 'src/components/layout/Breadcrumbs.tsx' },
    24: { module: 'Layout', category: 'UI/UX', description: 'Implement Master Shell Layout wrapper with theme persistence', files: 'src/components/layout/AppShell.tsx' },
    25: { module: 'Seed', category: 'Data', description: 'Create realistic enterprise mock dataset generator', files: 'src/lib/mockData.ts' },
    26: { module: 'Tooling', category: 'Tracker', description: 'Build in-app interactive 300-Task Tracker and Roadmap explorer', files: 'src/components/roadmap/RoadmapViewer.tsx' },
    27: { module: 'Tooling', category: 'Git', description: 'Implement in-app Git log and commit history visualizer', files: 'src/components/roadmap/GitHistoryViewer.tsx' },
    28: { module: 'Docs', category: 'Foundation', description: 'Author comprehensive README.md with project goals and architecture', files: 'README.md' },
    29: { module: 'Docs', category: 'Foundation', description: 'Author CONTRIBUTING.md detailing conventional commits & quality gates', files: 'CONTRIBUTING.md' },
    30: { module: 'Docs', category: 'Foundation', description: 'Author initial CHANGELOG.md and semantic versioning rules', files: 'CHANGELOG.md' },
    31: { module: 'UI', category: 'Components', description: 'Design Button primitive with solid, outline, ghost variants', files: 'src/components/ui/Button.tsx' },
    32: { module: 'UI', category: 'Components', description: 'Create Input field component with error labels and icon prefixes', files: 'src/components/ui/Input.tsx' },
    37: { module: 'UI', category: 'Components', description: 'Design Card container with single-elevation depth rule', files: 'src/components/ui/Card.tsx' },
    61: { module: 'Auth', category: 'Service', description: 'Build Authentication Service interface with Supabase & local fallbacks', files: 'src/services/authService.ts' },
    91: { module: 'Database', category: 'Schema', description: 'Design PostgreSQL schema for Users, Profiles, and Roles', files: 'supabase/migrations/01_users.sql' },
    121: { module: 'Dashboard', category: 'UI/UX', description: 'Build Executive Overview Dashboard layout', files: 'src/pages/DashboardPage.tsx' },
    151: { module: 'Projects', category: 'Service', description: 'Create Project & Task service with CRUD operations', files: 'src/services/projectService.ts' },
    155: { module: 'Projects', category: 'Kanban', description: 'Build interactive Kanban Board with Drag & Drop column transitions', files: 'src/components/projects/KanbanBoard.tsx' },
    166: { module: 'LMS', category: 'Service', description: 'Create LMS service for courses, modules, lessons, and enrollment', files: 'src/services/lmsService.ts' },
    173: { module: 'LMS', category: 'Certificates', description: 'Build Certificate Generator with verified credential ID', files: 'src/components/lms/CertificateViewer.tsx' },
    181: { module: 'Community', category: 'Service', description: 'Create Community service for channels, topics, posts, and comments', files: 'src/services/communityService.ts' },
    196: { module: 'Marketplace', category: 'Service', description: 'Create Marketplace service for digital products, cart, and orders', files: 'src/services/marketplaceService.ts' },
    204: { module: 'Storage', category: 'Service', description: 'Create Storage service for file uploads, folders, and metadata', files: 'src/services/storageService.ts' },
    211: { module: 'AI', category: 'Service', description: 'Create Gemini AI Service with @google/genai integration', files: 'src/services/aiService.ts' },
    213: { module: 'AI', category: 'UI/UX', description: 'Build Floating AI Copilot assistant dock & toggle widget', files: 'src/components/ai/AiAssistantDock.tsx' },
    236: { module: 'Admin', category: 'Service', description: 'Create Administrative service for system metrics and user management', files: 'src/services/adminService.ts' },
    242: { module: 'Admin', category: 'Audit', description: 'Build Immutable Audit Log viewer with timestamp, actor, IP, and action', files: 'src/components/admin/AuditLogViewer.tsx' },
    261: { module: 'Search', category: 'Service', description: 'Create Omni-Search engine indexing all 20 modules', files: 'src/services/searchService.ts' },
    262: { module: 'Search', category: 'UI/UX', description: 'Build Global Command Palette (Cmd+K / Ctrl+K) modal', files: 'src/components/search/CommandPalette.tsx' },
    286: { module: 'CI/CD', category: 'Pipeline', description: 'Create GitHub Actions workflow for linting and type checking', files: '.github/workflows/ci.yml' },
    289: { module: 'Deployment', category: 'Server', description: 'Create production Express backend server with Vite middleware', files: 'server.ts' },
    300: { module: 'Release', category: 'Milestone', description: 'Tag and release milestone commit with full conventional commit summary', files: 'CHANGELOG.md' }
  };

  for (let i = 1; i <= 300; i++) {
    const id = `TASK-${String(i).padStart(3, '0')}`;
    const phaseObj = phases.find((p) => i >= p.start && i <= p.end) || phases[0];

    const specific = specificTasks[i];
    const module = specific?.module || getModuleForTask(i);
    const category = specific?.category || (i <= 60 ? 'UI/UX' : i <= 120 ? 'Backend' : i <= 210 ? 'Feature' : i <= 260 ? 'Admin' : 'Verification');
    const description = specific?.description || `Engineering contribution for ${module} module: sub-system specification step ${i}`;
    const files = specific?.files || `src/modules/${module.toLowerCase()}/impl_${i}.ts`;

    // Tasks 1-30 are Phase 1 (Completed in Phase 1)
    const isDone = i <= 30;
    const isInProgress = i === 31;

    tasks.push({
      id,
      phase: phaseObj.num,
      phaseName: phaseObj.name,
      module,
      category,
      description,
      priority: i % 5 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : 'High',
      status: isDone ? 'Done' : isInProgress ? 'In Progress' : 'Planned',
      filesAffected: files,
      testsPerformed: isDone ? 'Unit & Integration pass' : 'Pending',
      commitHash: isDone ? `c${String(i).padStart(2, '0')}-init` : 'Pending'
    });
  }

  return tasks;
}

function getModuleForTask(index: number): string {
  const modMap: Record<number, string> = {
    1: 'Core', 2: 'UI', 3: 'Auth', 4: 'Database', 5: 'Dashboard',
    6: 'Projects', 7: 'LMS', 8: 'Community', 9: 'Marketplace', 10: 'Storage',
    11: 'Notifications', 12: 'AI', 13: 'Admin', 14: 'Monitoring', 15: 'Audit',
    16: 'Analytics', 17: 'Search', 18: 'Settings', 19: 'Security', 20: 'Release'
  };
  const modIndex = (index % 20) + 1;
  return modMap[modIndex] || 'Core';
}

export const INITIAL_GIT_COMMITS: GitCommitRecord[] = [
  {
    hash: 'a1f89bc',
    date: '2026-11-11 00:01:05',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'chore: initialize Git repository and configure branch topology',
    type: 'chore',
    scope: 'git',
    filesChanged: 1
  },
  {
    hash: 'b3e41cd',
    date: '2026-11-11 00:01:22',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'chore(meta): configure metadata.json with production title and capabilities',
    type: 'chore',
    scope: 'meta',
    filesChanged: 1
  },
  {
    hash: 'c8f72aa',
    date: '2026-11-11 00:01:34',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'style(html): update index.html with viewport, SEO meta tags, and Google Fonts',
    type: 'style',
    scope: 'html',
    filesChanged: 1
  },
  {
    hash: 'd4b9101',
    date: '2026-11-11 00:01:39',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'style(css): configure Tailwind v4 @custom-variant dark and custom typography',
    type: 'style',
    scope: 'css',
    filesChanged: 1
  },
  {
    hash: 'e5a8239',
    date: '2026-11-11 00:03:07',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'docs(roadmap): author complete 300-task development roadmap across 10 phases',
    type: 'docs',
    scope: 'roadmap',
    filesChanged: 1
  },
  {
    hash: 'f9c0118',
    date: '2026-11-11 00:03:32',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'docs(tracker): initialize 300-task tracking matrix and status criteria',
    type: 'docs',
    scope: 'tracker',
    filesChanged: 1
  },
  {
    hash: 'fa21094',
    date: '2026-11-11 00:03:45',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'docs(arch): author system architecture topology and data layer guidelines',
    type: 'docs',
    scope: 'arch',
    filesChanged: 1
  },
  {
    hash: 'fb54321',
    date: '2026-11-11 00:04:01',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'docs(db): author relational PostgreSQL schema and RLS policies in DATABASE_SCHEMA.md',
    type: 'docs',
    scope: 'db',
    filesChanged: 1
  },
  {
    hash: 'fc98765',
    date: '2026-11-11 00:04:12',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'docs(api): author RESTful API specifications for all 20 modules',
    type: 'docs',
    scope: 'api',
    filesChanged: 1
  },
  {
    hash: 'fd12345',
    date: '2026-11-11 00:04:26',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'docs(contrib): define contribution rules, conventional commits, and quality gates',
    type: 'docs',
    scope: 'contrib',
    filesChanged: 1
  },
  {
    hash: 'fe67890',
    date: '2026-11-11 00:05:00',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'feat(types): implement domain TypeScript interfaces for all 20 modules',
    type: 'feat',
    scope: 'types',
    filesChanged: 1
  },
  {
    hash: 'ff34567',
    date: '2026-11-11 00:05:09',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'feat(events): implement decoupled inter-module pub/sub event bus',
    type: 'feat',
    scope: 'events',
    filesChanged: 1
  },
  {
    hash: 'ff89123',
    date: '2026-11-11 00:05:18',
    author: 'Alli Dekarangwa <allidekarangwa0@gmail.com>',
    message: 'feat(storage): build reactive local persistence layer with backup export/import',
    type: 'feat',
    scope: 'storage',
    filesChanged: 1
  }
];
