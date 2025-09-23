# Crew Dashboard - AI Coding Instructions

This is a Next.js 15 user dashboard application for HPZ crew members, built with shadcn/ui components and Supabase backend integration.

## Architecture Overview

- **Framework**: Next.js 15 with App Router, TypeScript, and Turbopack for fast builds
- **Backend**: Supabase (PostgreSQL database + Auth + Storage)
- **Styling**: Tailwind CSS 4 with shadcn/ui component system using "new-york" style
- **UI Library**: Radix UI primitives + custom shadcn/ui components in `components/ui/`
- **Icons**: Tabler Icons (`@tabler/icons-react`) for main UI, Lucide React for supplementary icons
- **State & Data**: React hooks + Supabase client, drag-and-drop with @dnd-kit

## Key Patterns & Conventions

### Component Structure

- **Layout Pattern**: `SidebarProvider` → `AppSidebar` + `SidebarInset` with `SiteHeader` (see `app/dashboard/page.tsx`)
- **Navigation**: Composed navigation with `NavMain`, `NavSecondary`, `NavDocuments`, `NavUser` components
- **Data Components**: Complex table with sorting, filtering, drag-and-drop (`components/data-table.tsx`)
- **Utility Function**: Use `cn()` from `lib/utils.ts` for conditional CSS classes (clsx + tailwind-merge)

### Development Workflow

```bash
# Development with Turbopack (faster than default webpack)
npm run dev

# Build with Turbopack
npm run build

# Production start
npm start
```

### File Naming & Organization

- **Components**: kebab-case filenames (`app-sidebar.tsx`, `chart-area-interactive.tsx`)
- **UI Components**: Located in `components/ui/` following shadcn/ui conventions
- **Path Aliases**: Use `@/` prefix for imports (configured in `components.json`)
- **Static Data**: JSON files co-located with pages (`app/dashboard/data.json`)

### shadcn/ui Integration

- **Config**: `components.json` defines aliases, styling, and component paths
- **Base Color**: "stone" theme with CSS variables enabled
- **Component Variants**: Use `class-variance-authority` for component variants
- **Installation**: Components are pre-configured, add new ones with shadcn CLI

### Database & Authentication

- **Supabase Integration**: PostgreSQL database with typed client (`lib/supabase.ts`)
- **Database Tables**: `tdr_applications`, `ugc_content`, `collection_history`, `submission_rate_limit`
- **User Flow**: Only approved users from `tdr_applications` can access dashboard
- **Data Access**: Helper functions for user stats, content, and rate limiting
- **Types**: Full TypeScript support via `types/supabase.ts` and `types/database.ts`

### User Dashboard Features

- **Personal Statistics**: UGC performance metrics, engagement rates, approval rates
- **Gamification**: Points system, achievements, leaderboards
- **Content Management**: User's submitted content tracking and portfolio
- **Welcome Kit**: Onboarding guides, brand assets, content creation templates
- **Rate Limiting**: Submission controls to prevent spam

## Critical Implementation Details

### Sidebar System

The sidebar uses a complex provider pattern with CSS custom properties:

```tsx
<SidebarProvider style={{"--sidebar-width": "calc(var(--spacing) * 72)"}}>
```

### Table Implementation

- Uses TanStack Table with sortable, filterable columns
- Drag-and-drop reordering with @dnd-kit
- Custom row components with grip handles
- Status badges and progress indicators

### Component Composition

- Heavy use of compound components (Sidebar*, Nav*, etc.)
- Consistent prop patterns with variant props
- Forward ref patterns for UI components

When adding features, follow the established patterns of composable components, use the configured path aliases, and maintain the shadcn/ui styling conventions.
