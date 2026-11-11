/**
 * Relational Database Abstraction Layer
 * Provides high-level query interfaces, table isolation, and state persistence with seed hydration.
 */

import { StorageEngine } from './storage';
import { eventBus, EVENTS } from './events';
import {
  UserProfile,
  ProjectItem,
  TaskItem,
  CourseItem,
  CertificateItem,
  ForumTopic,
  MarketplaceProduct,
  StorageFile,
  AppNotification,
  AuditLogItem,
  ActivityItem,
  SystemSettings,
  RoadmapTask,
  GitCommitRecord,
  KanbanColumnId
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_COURSES,
  INITIAL_CERTIFICATES,
  INITIAL_FORUM_TOPICS,
  INITIAL_MARKETPLACE,
  INITIAL_FILES,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ACTIVITY,
  INITIAL_SETTINGS,
  INITIAL_GIT_COMMITS,
  generate300RoadmapTasks
} from './mockData';

export class Database {
  private static isInitialized = false;

  /**
   * Hydrate database tables if not already populated
   */
  public static initialize(): void {
    if (this.isInitialized) return;

    if (!StorageEngine.get('users', null)) {
      StorageEngine.set('users', INITIAL_USERS);
    }
    if (!StorageEngine.get('projects', null)) {
      StorageEngine.set('projects', INITIAL_PROJECTS);
    }
    if (!StorageEngine.get('tasks', null)) {
      StorageEngine.set('tasks', INITIAL_TASKS);
    }
    if (!StorageEngine.get('courses', null)) {
      StorageEngine.set('courses', INITIAL_COURSES);
    }
    if (!StorageEngine.get('certificates', null)) {
      StorageEngine.set('certificates', INITIAL_CERTIFICATES);
    }
    if (!StorageEngine.get('forum_topics', null)) {
      StorageEngine.set('forum_topics', INITIAL_FORUM_TOPICS);
    }
    if (!StorageEngine.get('marketplace', null)) {
      StorageEngine.set('marketplace', INITIAL_MARKETPLACE);
    }
    if (!StorageEngine.get('files', null)) {
      StorageEngine.set('files', INITIAL_FILES);
    }
    if (!StorageEngine.get('notifications', null)) {
      StorageEngine.set('notifications', INITIAL_NOTIFICATIONS);
    }
    if (!StorageEngine.get('audit_logs', null)) {
      StorageEngine.set('audit_logs', INITIAL_AUDIT_LOGS);
    }
    if (!StorageEngine.get('activity', null)) {
      StorageEngine.set('activity', INITIAL_ACTIVITY);
    }
    if (!StorageEngine.get('settings', null)) {
      StorageEngine.set('settings', INITIAL_SETTINGS);
    }
    if (!StorageEngine.get('roadmap_tasks', null)) {
      StorageEngine.set('roadmap_tasks', generate300RoadmapTasks());
    }
    if (!StorageEngine.get('git_commits', null)) {
      StorageEngine.set('git_commits', INITIAL_GIT_COMMITS);
    }

    this.isInitialized = true;
  }

  // --- Users & Profiles ---
  public static getUsers(): UserProfile[] {
    return StorageEngine.get<UserProfile[]>('users', INITIAL_USERS);
  }

  public static getUserById(id: string): UserProfile | undefined {
    return this.getUsers().find((u) => u.id === id);
  }

  public static updateUser(id: string, updates: Partial<UserProfile>): UserProfile | null {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
    StorageEngine.set('users', users);
    return users[index];
  }

  // --- Projects ---
  public static getProjects(): ProjectItem[] {
    return StorageEngine.get<ProjectItem[]>('projects', INITIAL_PROJECTS);
  }

  public static createProject(project: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>): ProjectItem {
    const projects = this.getProjects();
    const newProject: ProjectItem = {
      ...project,
      id: `proj_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projects.unshift(newProject);
    StorageEngine.set('projects', projects);

    this.addAuditLog('CREATE_PROJECT', 'Projects', `Created project "${newProject.title}"`, 'info');
    eventBus.emit(EVENTS.PROJECT_CREATED, newProject);
    return newProject;
  }

  public static updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem | null {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    projects[index] = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
    StorageEngine.set('projects', projects);
    eventBus.emit(EVENTS.PROJECT_UPDATED, projects[index]);
    return projects[index];
  }

  // --- Tasks & Kanban ---
  public static getTasks(): TaskItem[] {
    return StorageEngine.get<TaskItem[]>('tasks', INITIAL_TASKS);
  }

  public static getTasksByProject(projectId: string): TaskItem[] {
    return this.getTasks().filter((t) => t.projectId === projectId);
  }

  public static createTask(task: Omit<TaskItem, 'id' | 'createdAt' | 'updatedAt'>): TaskItem {
    const tasks = this.getTasks();
    const newTask: TaskItem = {
      ...task,
      id: `task_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    StorageEngine.set('tasks', tasks);

    this.addAuditLog('CREATE_TASK', 'Tasks', `Created task "${newTask.title}" in column ${newTask.columnId}`, 'info');
    eventBus.emit(EVENTS.TASK_CREATED, newTask);
    return newTask;
  }

  public static moveTask(taskId: string, targetColumn: KanbanColumnId): TaskItem | null {
    const tasks = this.getTasks();
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return null;

    task.columnId = targetColumn;
    task.updatedAt = new Date().toISOString();
    StorageEngine.set('tasks', tasks);

    this.addAuditLog('MOVE_TASK', 'Tasks', `Moved task "${task.title}" to ${targetColumn}`, 'info');
    eventBus.emit(EVENTS.TASK_MOVED, { taskId, targetColumn });
    return task;
  }

  // --- Courses & LMS ---
  public static getCourses(): CourseItem[] {
    return StorageEngine.get<CourseItem[]>('courses', INITIAL_COURSES);
  }

  public static getCertificates(): CertificateItem[] {
    return StorageEngine.get<CertificateItem[]>('certificates', INITIAL_CERTIFICATES);
  }

  public static issueCertificate(courseId: string, userId: string, userName: string, courseTitle: string): CertificateItem {
    const certs = this.getCertificates();
    const newCert: CertificateItem = {
      id: `cert_${Date.now()}`,
      certificateNumber: `NEX-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      courseId,
      courseTitle,
      userId,
      userName,
      issueDate: new Date().toISOString(),
      grade: 98.5,
      verificationHash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };
    certs.unshift(newCert);
    StorageEngine.set('certificates', certs);

    this.addAuditLog('ISSUE_CERTIFICATE', 'LMS', `Certificate ${newCert.certificateNumber} issued to ${userName}`, 'info');
    eventBus.emit(EVENTS.CERTIFICATE_ISSUED, newCert);
    return newCert;
  }

  // --- Community Topics ---
  public static getTopics(): ForumTopic[] {
    return StorageEngine.get<ForumTopic[]>('forum_topics', INITIAL_FORUM_TOPICS);
  }

  public static addTopic(topic: Omit<ForumTopic, 'id' | 'createdAt' | 'viewsCount' | 'repliesCount' | 'comments'>): ForumTopic {
    const topics = this.getTopics();
    const newTopic: ForumTopic = {
      ...topic,
      id: `topic_${Date.now()}`,
      viewsCount: 1,
      repliesCount: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };
    topics.unshift(newTopic);
    StorageEngine.set('forum_topics', topics);

    this.addAuditLog('CREATE_TOPIC', 'Community', `Created topic "${newTopic.title}" in #${newTopic.channel}`, 'info');
    eventBus.emit(EVENTS.TOPIC_CREATED, newTopic);
    return newTopic;
  }

  public static addComment(topicId: string, comment: { authorId: string; authorName: string; authorAvatar: string; content: string }): ForumTopic | null {
    const topics = this.getTopics();
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return null;

    const newComment = {
      id: `c_${Date.now()}`,
      topicId,
      authorId: comment.authorId,
      authorName: comment.authorName,
      authorAvatar: comment.authorAvatar,
      content: comment.content,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    topic.comments.push(newComment);
    topic.repliesCount = topic.comments.length;
    StorageEngine.set('forum_topics', topics);

    eventBus.emit(EVENTS.COMMENT_ADDED, { topicId, comment: newComment });
    return topic;
  }

  public static toggleReaction(topicId: string, reaction: 'likes' | 'celebrate' | 'insightful'): ForumTopic | null {
    const topics = this.getTopics();
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return null;

    topic.reactions[reaction] = (topic.reactions[reaction] || 0) + 1;
    StorageEngine.set('forum_topics', topics);
    eventBus.emit(EVENTS.REACTION_TOGGLED, { topicId, reaction });
    return topic;
  }

  // --- Marketplace ---
  public static getMarketplaceProducts(): MarketplaceProduct[] {
    return StorageEngine.get<MarketplaceProduct[]>('marketplace', INITIAL_MARKETPLACE);
  }

  // --- Storage Files ---
  public static getFiles(): StorageFile[] {
    return StorageEngine.get<StorageFile[]>('files', INITIAL_FILES);
  }

  public static uploadFile(file: Omit<StorageFile, 'id' | 'createdAt'>): StorageFile {
    const files = this.getFiles();
    const newFile: StorageFile = {
      ...file,
      id: `f_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    files.unshift(newFile);
    StorageEngine.set('files', files);

    this.addAuditLog('UPLOAD_FILE', 'Storage', `Uploaded file ${newFile.name} (${Math.round(newFile.fileSizeBytes / 1024)} KB)`, 'info');
    eventBus.emit(EVENTS.FILE_UPLOADED, newFile);
    return newFile;
  }

  // --- Notifications ---
  public static getNotifications(): AppNotification[] {
    return StorageEngine.get<AppNotification[]>('notifications', INITIAL_NOTIFICATIONS);
  }

  public static markNotificationRead(id: string): void {
    const notifs = this.getNotifications();
    const notif = notifs.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      StorageEngine.set('notifications', notifs);
    }
  }

  public static markAllNotificationsRead(): void {
    const notifs = this.getNotifications();
    notifs.forEach((n) => (n.read = true));
    StorageEngine.set('notifications', notifs);
  }

  // --- Audit Logs & Monitoring ---
  public static getAuditLogs(): AuditLogItem[] {
    return StorageEngine.get<AuditLogItem[]>('audit_logs', INITIAL_AUDIT_LOGS);
  }

  public static addAuditLog(action: string, module: string, details: string, severity: 'info' | 'warning' | 'critical'): void {
    const logs = this.getAuditLogs();
    const users = this.getUsers();
    const currentUser = users[0] || INITIAL_USERS[0];

    const newLog: AuditLogItem = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      actorId: currentUser.id,
      actorName: currentUser.fullName,
      actorEmail: currentUser.email,
      action,
      module,
      severity,
      details,
      ipAddress: '192.168.1.1',
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    // Keep max 200 logs in local storage
    if (logs.length > 200) logs.pop();
    StorageEngine.set('audit_logs', logs);
    eventBus.emit(EVENTS.AUDIT_LOG_ENTRY, newLog);
  }

  public static getActivity(): ActivityItem[] {
    return StorageEngine.get<ActivityItem[]>('activity', INITIAL_ACTIVITY);
  }

  // --- Settings ---
  public static getSettings(): SystemSettings {
    return StorageEngine.get<SystemSettings>('settings', INITIAL_SETTINGS);
  }

  public static updateSettings(updates: Partial<SystemSettings>): SystemSettings {
    const settings = this.getSettings();
    const updated = { ...settings, ...updates };
    StorageEngine.set('settings', updated);
    this.addAuditLog('UPDATE_SETTINGS', 'Settings', 'Updated platform configuration', 'info');
    return updated;
  }

  // --- Roadmap Tasks & Git Commits ---
  public static getRoadmapTasks(): RoadmapTask[] {
    return StorageEngine.get<RoadmapTask[]>('roadmap_tasks', generate300RoadmapTasks());
  }

  public static updateRoadmapTaskStatus(id: string, status: 'Done' | 'In Progress' | 'Planned', commitHash?: string): void {
    const tasks = this.getRoadmapTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.status = status;
      if (commitHash) task.commitHash = commitHash;
      StorageEngine.set('roadmap_tasks', tasks);
    }
  }

  public static getGitCommits(): GitCommitRecord[] {
    return StorageEngine.get<GitCommitRecord[]>('git_commits', INITIAL_GIT_COMMITS);
  }

  public static addGitCommit(commit: GitCommitRecord): void {
    const commits = this.getGitCommits();
    commits.unshift(commit);
    StorageEngine.set('git_commits', commits);
  }
}
