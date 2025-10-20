# HPZ Crew Dashboard

A comprehensive **Next.js 15** crew dashboard application for **HPZ (High Performance Zone)**, built as a modern TypeScript-based web application. This serves as a personalized dashboard for approved HPZ crew members to track their performance, achievements, and content contributions.

## 🚀 Features

### Authentication & Access Control
- **Approval-based Registration**: Only approved crew members can create accounts
- **Multi-step Auth Flow**: Application → Admin Approval → Email Verification → Dashboard Access
- **Protected Routes**: All dashboard pages require authentication
- **Real-time Session Management**: Automatic token refresh through Supabase

### Dashboard & Analytics
- **Performance Tracking**: Monitor crew member achievements and metrics
- **Content Management**: Track and manage social media content submissions
- **Data Visualization**: Interactive charts and analytics with Recharts
- **Real-time Updates**: Live data synchronization with Supabase

### User Experience
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS v4
- **Dark Mode Support**: System preference detection with manual override
- **Responsive Design**: Optimized for desktop and mobile devices
- **Loading States**: Skeleton screens and smooth transitions
- **Error Handling**: Graceful error boundaries and user feedback

## 🛠 Tech Stack

### Core Framework
- **Next.js 15.5.3** with App Router and TurboPack
- **React 19.1.0** with TypeScript
- **Tailwind CSS v4** with OKLCH color space and stone theme

### Database & Authentication
- **Supabase** for authentication, database, and real-time features
- **PostgreSQL** with type-safe schema definitions
- **Drizzle ORM patterns** for database operations

### UI Components & Styling
- **shadcn/ui** components (Radix UI primitives with custom styling)
- **Lucide React** for icons (primary icon library)
- **Tabler Icons** for supplementary UI elements
- **Class Variance Authority** for component variants

### Data & Interaction
- **@tanstack/react-table** for complex data tables with sorting and filtering
- **@dnd-kit** for drag-and-drop functionality
- **recharts** for data visualization and charts
- **Sonner** for toast notifications

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages and layouts
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Tailwind CSS configuration
│   └── layout.tsx         # Root layout with providers
├── components/            # React components
│   ├── ui/               # shadcn/ui components (25+ components)
│   ├── auth/             # Authentication forms and flows
│   ├── dashboard/        # Dashboard-specific components
│   └── forms/            # Form components with validation
├── lib/                  # Utility functions and configurations
│   ├── supabase.ts       # Database client and queries
│   ├── utils.ts          # Utility functions (cn, etc.)
│   └── auth.ts           # Authentication utilities
├── types/                # TypeScript definitions
│   └── supabase.ts       # Generated database types
└── docs/                 # Documentation and schemas
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun
- Supabase project (for authentication and database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hpz-crew-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Development Commands

```bash
# Development with TurboPack (fast)
npm run dev

# Build for production (also uses TurboPack)
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🏗 Architecture

### Authentication Flow
1. **Application**: User submits crew application through registration form
2. **Admin Approval**: Admin reviews and approves application in database
3. **Email Verification**: User receives verification link via email
4. **Dashboard Access**: Approved users get full dashboard access

### Database Schema
- **tdr_applications**: User profiles with HPZ-specific fields (motorcycle ownership, racing experience)
- **ugc_content**: User-generated content tracking for social media submissions
- **user_accounts**: Authentication mapping and user account management
- **submission_rate_limit**: Rate limiting for content submissions

### Component Architecture
- **Authentication-first**: All dashboard pages wrapped in `ProtectedRoute`
- **Context-based State**: `AuthProvider` manages global authentication state
- **Type Safety**: Full TypeScript coverage with generated database types
- **Error Boundaries**: Graceful error handling throughout the application

## 🎨 Design System

### Styling Approach
- **Tailwind CSS v4** with inline configuration
- **OKLCH color space** for better color consistency
- **Stone theme** with dark mode support
- **CSS variables** for dynamic theming

### Component Library
- **shadcn/ui** foundation with Radix UI primitives
- **Consistent variants** using Class Variance Authority
- **Accessible by default** following WAI-ARIA standards
- **Customizable** through className prop and cva variants

## 🔒 Security Features

- **Approval Validation**: Multi-step approval process for crew access
- **Rate Limiting**: IP and email-based submission limits
- **Session Management**: Automatic token refresh and secure sessions
- **Input Validation**: Zod validation with runtime type checking
- **Protected Routes**: Server-side route protection for sensitive areas

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on git push

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)**: Development guidelines and AI assistant instructions
- **[docs/](./docs/)**: Additional documentation including authentication flows and database schemas
- **[components/](./components/ui/)**: Individual component documentation in JSDoc comments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the [documentation](./docs/)
- Review the [development guidelines](./CLAUDE.md)
