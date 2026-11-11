# NEXORA Database Schema & Entity Relationship Model

This document outlines the PostgreSQL relational schema and Supabase configurations for NEXORA.

## 1. Relational Entity Overview

```
 [users] <------- [profiles]
    |                  |
    +---- [projects] <-+-- [tasks] <--- [subtasks]
    |         |
    |         +--- [sprints]
    |
    +---- [courses] <-- [lessons]
    |         |
    |         +--- [enrollments] <--- [certificates]
    |
    +---- [forum_topics] <-- [forum_posts] <-- [post_reactions]
    |
    +---- [marketplace_products] <-- [orders] <-- [order_items]
    |
    +---- [storage_files] <-- [storage_folders]
    |
    +---- [notifications]
    |
    +---- [ai_sessions] <-- [ai_messages]
    |
    +---- [audit_logs]
    |
    +---- [activity_stream]
    |
    +---- [system_settings]
```

## 2. Table Specifications

### 2.1 Users & Authentication (`users`, `profiles`)
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'manager', 'member', 'guest')),
  title TEXT,
  department TEXT,
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  theme_preference TEXT DEFAULT 'dark' CHECK (theme_preference IN ('light', 'dark', 'system')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 2.2 Projects & Tasks (`projects`, `tasks`, `subtasks`)
```sql
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('planning', 'active', 'paused', 'completed')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  start_date DATE,
  due_date DATE,
  budget NUMERIC(12, 2) DEFAULT 0.00,
  progress INTEGER DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  column_id TEXT NOT NULL DEFAULT 'todo' CHECK (column_id IN ('backlog', 'todo', 'in_progress', 'review', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  assignee_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reporter_id UUID NOT NULL REFERENCES public.profiles(id),
  estimated_hours NUMERIC(6, 2) DEFAULT 0,
  logged_hours NUMERIC(6, 2) DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  due_date DATE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 2.3 Learning Management System (`courses`, `lessons`, `enrollments`, `certificates`)
```sql
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  instructor_id UUID NOT NULL REFERENCES public.profiles(id),
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  rating NUMERIC(3, 2) DEFAULT 5.0,
  total_students INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_number TEXT NOT NULL UNIQUE,
  course_id UUID NOT NULL REFERENCES public.courses(id),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  issue_date TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  grade NUMERIC(5, 2) NOT NULL DEFAULT 100.0,
  verification_hash TEXT NOT NULL
);
```

### 2.4 Community & Discussions (`forum_topics`, `forum_posts`)
```sql
CREATE TABLE public.forum_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  channel TEXT NOT NULL CHECK (channel IN ('general', 'engineering', 'design', 'announcements', 'support')),
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  reactions JSONB DEFAULT '{"likes": 0, "celebrate": 0, "insightful": 0}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 2.5 Digital Marketplace (`marketplace_products`, `orders`)
```sql
CREATE TABLE public.marketplace_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  category TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  download_url TEXT,
  downloads_count INTEGER DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 2.6 Virtual Storage & Files (`storage_files`)
```sql
CREATE TABLE public.storage_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  folder_id TEXT DEFAULT 'root',
  file_size_bytes BIGINT NOT NULL DEFAULT 0,
  mime_type TEXT NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES public.profiles(id),
  storage_url TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 2.7 Audit Logs & Real-Time Monitoring (`audit_logs`)
```sql
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  actor_name TEXT NOT NULL,
  action TEXT NOT NULL,
  module TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
  details JSONB DEFAULT '{}',
  ip_address TEXT DEFAULT '127.0.0.1',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

## 3. Row Level Security (RLS) Policies

All tables have RLS enabled by default:
- Users can view public data and projects they are assigned to.
- Admins possess bypass privileges for all maintenance operations.
- Audit logs are append-only with immutable records.
