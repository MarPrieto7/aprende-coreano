# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Aprende Coreano (`artifacts/korean-learn`)
- **Type**: React + Vite (react-vite), served at `/`
- **Purpose**: App web educativa para aprender coreano desde nivel 0
- **Storage**: 100% localStorage — sin backend ni base de datos
- **Features**:
  - 4 módulos progresivos (Hangul, Sílabas, Vocabulario, Frases)
  - Ejercicios de selección múltiple y emparejar
  - Pronunciación vía Web Speech API (sin backend)
  - Sistema de progreso con XP y racha de días
  - Modo repaso (flashcards)
  - Guía inicial "¿Qué es el coreano?"

### API Server (`artifacts/api-server`)
- **Type**: Express 5 REST API
- **Paths**: `/api`

### Canvas (`artifacts/mockup-sandbox`)
- **Type**: Design/Mockup sandbox
- **Paths**: `/__mockup`
