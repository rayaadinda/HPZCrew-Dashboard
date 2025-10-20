# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 15** crew dashboard application for **HPZ (Honda Performance Zone)**, built as a modern TypeScript-based web application. It serves as a personalized dashboard for approved HPZ crew members to track their performance, achievements, and content contributions.

## Core Technologies

- **Next.js 15.5.3** with App Router and TurboPack
- **React 19.1.0** with TypeScript
- **Tailwind CSS v4** with OKLCH color space and stone theme
- **Supabase** for authentication and database
- **shadcn/ui** components (Radix UI primitives with custom styling)
- **@tanstack/react-table** for complex data tables with sorting and filtering
- **@dnd-kit** for drag-and-drop functionality
- **recharts** for data visualization and charts
- **Lucide React** for icons (configured as primary icon library in shadcn/ui)
- **Tabler Icons** (`@tabler/icons-react`) for supplementary UI elements
- **Drizzle ORM patterns** (database schema defined in TypeScript types)

## Architecture Patterns

### Authentication-first Design
- **Approval-based Access**: Only users with `status = 'approved'` in `tdr_applications` can register
- **Progressive Authentication**: Sign up → Email verification → Full access
- **Context-based Auth**: `AuthProvider` wraps entire app with auth state
- **Route Protection**: `ProtectedRoute` component guards all dashboard pages

### Database-driven Architecture
- **Supabase as Backend**: PostgreSQL database with real-time capabilities
- **Type Safety**: Full TypeScript types generated from database schema in `/types/supabase.ts`
- **Key Tables**: `tdr_applications` (user profiles), `ugc_content` (user content), `user_accounts` (auth mapping)

### Component Composition
- **shadcn/ui Foundation**: Accessible, unstyled Radix UI components in `/components/ui/` with "new-york" style
- **Design System**: Consistent styling with Tailwind CSS v4, stone theme, and dark mode support
- **Variant System**: Class Variance Authority for component variants
- **Utility Function**: Use `cn()` from `lib/utils.ts` for conditional CSS classes (clsx + tailwind-merge)

## Key Directories

- `/app` - Next.js App Router with layout structure and protected routes
- `/components` - React components including login forms, user profiles, and 25+ UI components
- `/lib` - Database client, auth utilities, and data fetching functions
- `/types` - TypeScript definitions including generated Supabase types
- `/docs` - Authentication and database schema documentation

## Development Commands

```bash
# Development with TurboPack (fast)
npm run dev

# Build for production (also uses TurboPack)
npm run build

# Start production server
npm start
```

**Note**: This project uses TurboPack for both development and production builds for optimal performance.

## Important Configuration Details

### Authentication Flow
1. User submits application through `/components/LoginForm.tsx`
2. Admin approval updates `tdr_applications.status = 'approved'`
3. User receives email verification link
4. After verification, user gets full dashboard access

### Database Schema
- User profiles stored in `tdr_applications` with HPZ-specific fields (motorcycle ownership, racing experience)
- Content tracking in `ugc_content` for social media submissions
- Rate limiting via `submission_rate_limit` table
- User account mapping in `user_accounts`

### Styling System
- Tailwind CSS v4 with inline configuration in `app/globals.css`
- OKLCH color space for better color consistency
- Dark mode support via `@custom-variant`
- CSS variables for theming

## Development Guidelines

### Adding New Features
1. Update TypeScript types in `/types/` first
2. Add database functions to `/lib/supabase.ts`
3. Create components in `/components/` following existing patterns
4. Wrap protected pages with `<ProtectedRoute>`
5. Update auth context if user state changes are needed

### Component Development
- Use shadcn/ui components from `/components/ui/` (Radix UI primitives with stone theme)
- Follow existing component patterns with proper TypeScript typing
- Implement loading states and error handling
- Use `className` prop for custom styling with cva variants
- Use `cn()` utility for conditional CSS class merging
- Follow kebab-case naming for component files (`app-sidebar.tsx`, `chart-area-interactive.tsx`)

### Database Operations
- All database operations go through `/lib/supabase.ts`
- Use generated types for type safety
- Implement proper error handling for missing tables/data
- Follow the database-first approach with optimistic UI updates

## Code Quality Standards

- **TypeScript**: Strict mode with full type coverage
- **Error Handling**: Graceful error boundaries and user feedback
- **Accessibility**: shadcn/ui components (Radix UI primitives) provide foundation
- **Performance**: TurboPack enabled for fast development builds
- **Path Aliases**: Use `@/` prefix for imports (configured in `components.json`)

## Security Considerations

- **Approval Validation**: Multi-step approval process for crew access
- **Rate Limiting**: IP and email-based submission limits
- **Session Management**: Automatic token refresh through Supabase
- **Input Validation**: Zod validation with runtime type checking
- **File Upload**: Ready for Supabase Storage integration

## shadcn/ui Configuration

- **Config File**: `components.json` defines aliases, styling, and component paths
- **Base Theme**: "stone" theme with CSS variables enabled
- **Style**: "new-york" variant for modern, clean appearance
- **Icon Library**: Lucide React configured as primary icon library
- **Component Variants**: Use `class-variance-authority` for component variants
- **Installation**: Components are pre-configured, add new ones with shadcn CLI

## Additional Features Ready for Implementation

- **Drag-and-Drop**: @dnd-kit configured for sortable interfaces
- **Data Tables**: TanStack Table with sorting, filtering, and pagination
- **Charts**: Recharts integration for data visualization
- **Notifications**: Sonner toast system for user feedback
- **File Management**: Vaul modal components for upload dialogs
- **Dark Mode**: next-themes integration with system preference detection