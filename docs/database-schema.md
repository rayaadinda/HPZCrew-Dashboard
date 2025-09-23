# HPZ Crew Dashboard - Database Schema & Relationships

## Database Tables Overview

### 1. `tdr_applications` (User Applications)

**Purpose**: Stores user applications for HPZ crew membership
**Key Fields**:

- `id` (uuid) - Primary key
- `full_name`, `email`, `phone` - Personal info
- `instagram_handle`, `tiktok_username` - Social media handles
- `status` - Application status (pending/approved/rejected)
- `follower_count`, `content_focus` - Creator metrics
- `owns_motorcycle`, `racing_experience` - HPZ-specific qualifications

### 2. `ugc_content` (User Generated Content)

**Purpose**: Stores collected UGC from social media platforms
**Key Fields**:

- `id` (uuid) - Primary key
- `platform` - Source platform (instagram/tiktok)
- `author_username` - Content creator
- `content_url`, `media_url` - Links to original content
- `status` - Content approval status
- `likes_count`, `comments_count` - Engagement metrics
- `hashtags` - Associated hashtags

### 3. `collection_history` (Content Collection Logs)

**Purpose**: Tracks automated content collection runs
**Key Fields**:

- `id` (uuid) - Primary key
- `success` - Collection success status
- `posts_collected`, `new_posts_added` - Collection metrics
- `errors` - Error logs
- `timestamp` - Collection time

### 4. `submission_rate_limit` (Rate Limiting)

**Purpose**: Prevents spam and manages submission rates
**Key Fields**:

- `id` (int4) - Primary key
- `ip_address`, `email` - User identification
- `submission_count` - Number of submissions
- `is_blocked` - Blocking status
- `first_submission`, `last_submission` - Time tracking

## Proposed Relationships for User Dashboard

### Primary Relationships:

1. **User Identity**: `tdr_applications.email` ↔ `ugc_content.author_username` (via Instagram handle)
2. **Content Ownership**: Link user applications to their UGC submissions
3. **Rate Limiting**: `submission_rate_limit.email` ↔ `tdr_applications.email`

### Additional Tables Needed for User Dashboard:

#### `user_points` (New)

```sql
CREATE TABLE user_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES tdr_applications(id),
  submission_points int DEFAULT 0,
  approval_points int DEFAULT 0,
  engagement_points int DEFAULT 0,
  weekly_win_points int DEFAULT 0,
  total_points int GENERATED ALWAYS AS (submission_points + approval_points + engagement_points + weekly_win_points) STORED,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

#### `user_achievements` (New)

```sql
CREATE TABLE user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES tdr_applications(id),
  achievement_type varchar,
  name varchar,
  description text,
  points_awarded int,
  unlocked_at timestamp DEFAULT now()
);
```

#### `user_sessions` (New)

```sql
CREATE TABLE user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES tdr_applications(id),
  login_at timestamp DEFAULT now(),
  last_activity timestamp DEFAULT now()
);
```

## Points System Logic

### Point Earning Rules:

- **Content Submission**: +10 points
- **Content Approved**: +50 points
- **Weekly Winner**: +200 points
- **Engagement Bonus**: +1 point per 100 likes/comments
- **Consistency Bonus**: +25 points for weekly submissions

### Achievement Categories:

1. **Content Creator**: Submit X posts
2. **Quality Creator**: X% approval rate
3. **Engagement Master**: Reach X total likes
4. **Weekly Champion**: Win X weekly contests
5. **Consistent Poster**: Post for X consecutive weeks

## User Dashboard Data Flow

1. **Authentication**: Validate user from `tdr_applications` with `status = 'approved'`
2. **Statistics**: Aggregate from `ugc_content` where `author_username` matches user's Instagram
3. **Points**: Calculate from `user_points` table
4. **Leaderboard**: Rank users by `total_points`
5. **Achievements**: Check `user_achievements` and unlock new ones
6. **Rate Limits**: Monitor `submission_rate_limit` for user's submission quotas
