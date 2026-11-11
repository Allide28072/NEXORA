/**
 * Decoupled Inter-Module Event Bus
 * Pub/Sub event dispatcher for cross-module notifications, audit triggers, and real-time alerts.
 */

type EventHandler<T = any> = (payload: T) => void;

class EventBus {
  private handlers: Map<string, Set<EventHandler>> = new Map();

  /**
   * Subscribe to an event
   */
  public on<T = any>(event: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);

    // Return unsubscribe function
    return () => {
      this.off(event, handler);
    };
  }

  /**
   * Unsubscribe from an event
   */
  public off<T = any>(event: string, handler: EventHandler<T>): void {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.delete(handler);
      if (eventHandlers.size === 0) {
        this.handlers.delete(event);
      }
    }
  }

  /**
   * Publish an event to all subscribers
   */
  public emit<T = any>(event: string, payload: T): void {
    const eventHandlers = this.handlers.get(event);
    if (eventHandlers) {
      eventHandlers.forEach((handler) => {
        try {
          handler(payload);
        } catch (err) {
          console.error(`[EventBus] Error in handler for event "${event}":`, err);
        }
      });
    }

    // Also trigger wildcard subscribers
    const wildcardHandlers = this.handlers.get('*');
    if (wildcardHandlers) {
      wildcardHandlers.forEach((handler) => {
        try {
          handler({ event, payload });
        } catch (err) {
          console.error(`[EventBus] Error in wildcard handler:`, err);
        }
      });
    }
  }

  /**
   * Clear all subscribers (useful for test resets)
   */
  public clear(): void {
    this.handlers.clear();
  }
}

export const eventBus = new EventBus();

// Standard System Event Names
export const EVENTS = {
  // Auth
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_ROLE_CHANGED: 'auth:role_changed',
  
  // Projects & Tasks
  PROJECT_CREATED: 'project:created',
  PROJECT_UPDATED: 'project:updated',
  TASK_CREATED: 'task:created',
  TASK_MOVED: 'task:moved',
  TASK_COMPLETED: 'task:completed',

  // LMS
  COURSE_ENROLLED: 'lms:course_enrolled',
  LESSON_COMPLETED: 'lms:lesson_completed',
  CERTIFICATE_ISSUED: 'lms:certificate_issued',

  // Community
  TOPIC_CREATED: 'community:topic_created',
  COMMENT_ADDED: 'community:comment_added',
  REACTION_TOGGLED: 'community:reaction_toggled',

  // Marketplace
  ORDER_PLACED: 'marketplace:order_placed',

  // Storage
  FILE_UPLOADED: 'storage:file_uploaded',
  FILE_DELETED: 'storage:file_deleted',

  // Audit & Alerts
  AUDIT_LOG_ENTRY: 'audit:entry',
  NOTIFICATION_PUSH: 'notification:push',
  TOAST_SHOW: 'toast:show'
} as const;
