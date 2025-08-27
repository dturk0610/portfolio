# Overview

This is a full-stack portfolio website built with React and Express, featuring a modern tech stack with TypeScript, shadcn/ui components, and Drizzle ORM. The application serves as a professional portfolio showcasing developer experience, skills, education, career history, and projects through an interactive single-page application.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Component Structure**: Modular component architecture with separate UI components, page components, and business logic components

## Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API structure with /api prefix for all endpoints
- **Storage Layer**: Abstracted storage interface supporting both in-memory storage (development) and database persistence
- **Middleware**: Express middleware for JSON parsing, URL encoding, and request logging
- **Development**: Hot module replacement with Vite integration for seamless development experience

## Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Management**: Centralized schema definitions in shared directory with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for rapid development and testing

## Project Structure
- **Monorepo Architecture**: Client, server, and shared code organized in separate directories
- **Shared Types**: Common TypeScript types and schemas shared between frontend and backend
- **Path Aliases**: Configured path mapping for clean imports (@/, @shared/, @assets/)
- **Build System**: Separate build processes for client (Vite) and server (esbuild) with optimized bundling

## Development Features
- **TypeScript**: Full TypeScript support across the entire stack with strict type checking
- **ESModules**: Modern ES module syntax throughout the application
- **Development Tools**: Integrated error overlay, hot reloading, and development banner for Replit environment
- **Code Quality**: Configured with path aliases and TypeScript strict mode for maintainable code