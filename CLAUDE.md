# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start dev server**: `bun dev`
- **Build**: `bun build` (runs TypeScript compilation + Vite build)
- **Run tests**: `bun test` (uses Vitest)
- **Lint**: `bun lint` (Biome linter)
- **Lint + autofix**: `bun lint:fix`
- **Generate database migrations**: `bun db:generate` (runs Drizzle Kit + compilation)

## Architecture Overview

This is a bullet journal web app built with SolidJS and TypeScript. Key architectural decisions:

### Tech Stack
- **Frontend**: SolidJS (not React) - pay attention to SolidJS reactivity patterns
- **Styling**: TailwindCSS with custom color palette (black/white + custom colors in main.css)
- **Database**: SQLite via sqlocal (SQLite in WASM)
- **ORM**: Drizzle with snake_case column naming
- **Package Manager**: Bun (not npm/yarn)

### Database Architecture
- Two main tables: `journals` and `journal_entries`
- All tables include common timestamp fields (`created_at`, `updated_at`, `updated_by`)
- Bullet types: "event", "note", "mood", "task" (defined in types.ts)
- Entries support metadata for task status and mood levels
- Uses UUID primary keys

### Application Structure
- Route-based architecture with SolidJS Router
- Main routes: home layout, journal view, new journal creation
- Component system with reusable UI components in `src/components/`
- Resources pattern for data fetching (`src/resources/`)

### Special Configuration
- Vite configured with COOP/COEP headers for SQLite WASM support
- Path alias `@/*` maps to `src/*`
- Uses ES modules for web workers

### Development Guidelines
- Use **PascalCase** for component names, **kebab-case** for filenames
- Minimize external dependencies
- Follow existing project patterns and component architecture
- Check existing components before creating new ones
- Commit format: `<type>: <description>` (feat, fix, update, refactor, etc.)