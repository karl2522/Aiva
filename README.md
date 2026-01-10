# Aiva

Aiva is a next-generation, local-first task management application designed to master your day with AI-powered prioritization and seamless organization.

## Features

- **Local-First Architecture**: Your data lives on your device. Zero latency, works offline, and complete privacy using Dexie.js (IndexedDB).
- **Smart Kanban Board**: Organize tasks with a fluid drag-and-drop interface across customizable workflows (Backlog, Planned, In Progress, Blocked, Done).
- **Intelligent Calendar**: Visual day and month views to manage your schedule effectively.
- **AI-Powered Insights**: (Beta) Smart suggestions for task prioritization to help you focus on what matters most.
- **Modern UI**: A sleek, responsive interface built with Shadcn UI and Tailwind CSS, featuring seamless dark mode support.

## Architecture

Aiva is built on a modern, robust stack designed for performance and maintainability:

- **Framework**: Next.js 14 (App Router) & React
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Framer Motion
- **Components**: Radix UI / Shadcn UI
- **Persistence**: Dexie.js (IndexedDB wrapper) for client-side storage

## Future Roadmap

We are actively working on expanding Aiva's capabilities:

- **Desktop Application**: A native version with global shortcuts and deeper OS integration.
- **Aiva Cloud Sync**: Optional end-to-end encrypted synchronization across multiple devices.
- **Autonomous Agents**: AI agents that can auto-schedule your week based on deadlines and velocity.
- **Plugin System**: Community-driven extensions for custom integrations.
