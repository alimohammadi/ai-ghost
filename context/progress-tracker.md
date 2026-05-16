# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress

## Current Goal

- Add API routes and server actions for project persistence

## Completed

- ✓ Installed shadcn/ui with all required components (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea)
- ✓ Installed lucide-react
- ✓ Created lib/utils.ts with cn() helper for Tailwind class merging
- ✓ Verified dark theme integration in globals.css
- ✓ Build verification passed with zero errors
- ✓ Initial Git commit and push to GitHub
- ✓ Created EditorNavbar with sidebar toggle (PanelLeftOpen/PanelLeftClose icons)
- ✓ Created ProjectSidebar with floating overlay, Tabs (My Projects/Shared), and New Project button
- ✓ Set up Dialog pattern types and interfaces
- ✓ All components compile without TypeScript errors
- ✓ No lint errors
- ✓ Created editor layout integrating navbar and sidebar with state management
- ✓ Created editor page demonstrating the layout in action
- ✓ Implemented Clerk authentication: provider, auth pages, route protection (proxy.ts), redirects, and UserButton in navbar
- ✓ Fixed dark mode rendering in Clerk components (UserButton dropdown)
- ✓ Merged development → main and pushed to GitHub
- ✓ Built `/editor` home screen and project dialogs: Create, Rename, Delete dialogs; slug preview; sidebar actions
- ✓ Implemented Prisma data models, Prisma client singleton, and first migration
- ✓ Fixed Prisma migration error (table `Project` not found) by running migration
- ✓ Fixed Prisma client type error (Prisma 7 requires adapter or accelerateUrl)
- ✓ Fixed 500 error on POST /api/projects (added error handling, simplified Prisma client init)
- ✓ Fixed `type "public.Status" does not exist` error via `prisma db push --force-reset`

## In Progress

- Add API routes and server actions for project persistence

## Next Up

- Implement real-time collaboration features

## Open Questions

- [Any unresolved product or technical decisions]

## Architecture Decisions

- [Decisions made that affect the system design or
  data model — include why the decision was made]

## Session Notes

- Auth spec requires `proxy.ts` at the project root, Clerk dark theme from `@clerk/ui/themes`, public sign-in/sign-up routes only, `/` redirect behavior, and Clerk `UserButton` in the editor navbar.
- **2026-05-15:** Fixed 500 error on POST /api/projects by:
  - Adding try/catch error handling to the POST handler with detailed error message in response
  - Simplifying Prisma client singleton to pass DATABASE_URL string directly to PrismaPg constructor
  - Adding guard to throw if DATABASE_URL is undefined
