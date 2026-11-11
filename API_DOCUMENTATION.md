# NEXORA RESTful API Documentation

This specification covers the endpoints and services providing data to the NEXORA client.

## Base URL
`/api/v1`

## Standard Headers
- `Authorization: Bearer <session_token>`
- `Content-Type: application/json`
- `X-Client-Version: 1.0.0`

---

## 1. Authentication & Users
- `POST /auth/login`: Authenticate with email/password, returns JWT session token & user profile.
- `POST /auth/register`: Create a new user account with initial role.
- `POST /auth/logout`: Invalidate session token.
- `GET /auth/me`: Retrieve current authenticated user profile & permissions.
- `PUT /auth/profile`: Update user display name, avatar, bio, and settings.
- `POST /auth/switch-role`: Quick role testing endpoint (Admin / Manager / Member / Guest).

## 2. Projects & Tasks
- `GET /projects`: List projects with status, priority, and date range filters.
- `POST /projects`: Create a new project.
- `GET /projects/:id`: Fetch project details with milestones and contributors.
- `PUT /projects/:id`: Update project details or status.
- `DELETE /projects/:id`: Soft delete / archive project.
- `GET /projects/:id/tasks`: List all tasks in a project grouped by Kanban column.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update task column, priority, or assignment.
- `PUT /tasks/:id/move`: Update task order and column position.

## 3. Learning Management System (LMS)
- `GET /courses`: Fetch course catalog with search, category, and level filtering.
- `GET /courses/:id`: Fetch course syllabus and enrolled progress.
- `POST /courses/:id/enroll`: Enroll current user in a course.
- `POST /courses/:id/lessons/:lessonId/complete`: Mark lesson complete and recalculate course progress.
- `GET /certificates/:id`: Verify and view issued certificate credentials.

## 4. Community & Discussions
- `GET /community/topics`: List discussion topics filtered by channel and tag.
- `POST /community/topics`: Create a new discussion thread.
- `GET /community/topics/:id`: Get thread details with nested comments.
- `POST /community/topics/:id/comments`: Post a comment or reply.
- `POST /community/topics/:id/react`: Toggle emoji reaction (like, celebrate, insightful).

## 5. Digital Marketplace
- `GET /marketplace/products`: Browse digital assets, tools, and templates.
- `GET /marketplace/products/:id`: Get product details and preview media.
- `POST /marketplace/checkout`: Process purchase and issue digital license key.
- `GET /marketplace/purchases`: Get logged-in user's library of purchased items.

## 6. Storage & Files
- `GET /storage/files`: List files and folders with hierarchy and size metadata.
- `POST /storage/upload`: Upload file and receive public/private storage URL.
- `DELETE /storage/files/:id`: Remove file from storage.

## 7. Gemini AI Assistant
- `POST /ai/chat`: Send prompt to Gemini AI model (`gemini-2.5-flash`), return response text or stream.
- `POST /ai/generate-tasks`: Special action to parse a project spec into actionable tasks.
- `GET /ai/sessions`: List stored AI conversation history.

## 8. Administration & Monitoring
- `GET /admin/stats`: Get system aggregate metrics (total users, active sessions, storage used).
- `GET /admin/users`: List all platform users with role modification capabilities.
- `PUT /admin/users/:id/role`: Update user role and permissions.
- `GET /admin/activity`: Stream of real-time user activity events.
- `GET /admin/audit-logs`: Query immutable audit trail with severity and actor filters.
- `GET /admin/settings`: Fetch current platform configuration and feature flags.
- `PUT /admin/settings`: Update platform settings.
