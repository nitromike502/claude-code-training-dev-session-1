# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TaskFlow Pro** is a Vue.js 3 task management application. It uses a simple tech stack optimized for rapid development: Vue.js 3 (CDN), json-server for REST API, and Tailwind CSS for styling.

### Current Status
- **MVP Complete**: Core task management CRUD operations are fully functional
- **Next Feature**: Search and filtering capabilities (see `docs/search-feature-prd.md`)
- The search feature PRD defines text search, status/priority/project filtering, and sorting functionality

## Development Commands

### Start Development Environment
```bash
npm start
```
Runs both the json-server API (port 3001) and live-server for the frontend (port 3000)

### Individual Services
```bash
npm run server  # Start json-server API only (port 3001)
npm run dev     # Start live-server frontend only (port 3000)
```

### Testing
No formal test framework is configured. The project uses Claude Code for code analysis and quality checks.

## Architecture

### Application Structure
- **Frontend**: Single-page Vue.js 3 application loaded via CDN
- **API**: json-server providing REST endpoints from `server/db.json`
- **Components**: Three main Vue components (TaskList, TaskCard, TaskForm)
- **State Management**: Vue 3 Composition API with reactive state

### Key Files
- `public/app.js` - Main Vue application with Composition API setup
- `server/db.json` - Database with tasks, users, projects, and related data
- `server/routes.json` - Custom API route mappings for json-server
- `public/components/` - Vue component definitions

### Data Model
The application manages:
- **Tasks**: Core entities with status (todo/in_progress/completed), priority, assignments
- **Users**: Team members with roles and profiles
- **Projects**: Task containers with ownership and metadata
- **Comments**: Task-specific discussions

### Component Architecture
- **TaskFlowApp**: Root component managing global state and API calls
- **TaskList**: Displays and manages task collections with filtering
- **TaskCard**: Individual task representation with actions
- **TaskForm**: Task creation and editing interface

### API Patterns
- RESTful endpoints via json-server
- Custom route mappings for filtered queries (e.g., `/api/tasks/user/:userId`)
- CRUD operations with proper error handling
- Parallel data fetching using Promise.all

## Claude Code Integration

This codebase integrates with Claude Code capabilities:

### Subagent Integration Points
- Component analysis and code review workflows
- API endpoint validation and documentation
- Vue.js pattern recognition and best practices

### Workflow Automation
- Component documentation generation on file changes
- Code quality validation hooks
- Automated testing suggestions based on component complexity

### Parallel Execution
- Simultaneous data fetching (tasks, projects, users)
- Multi-component analysis workflows
- Concurrent development task coordination

## Development Patterns

### Vue.js Conventions
- Uses Composition API exclusively
- Reactive state management with ref/reactive
- Event-driven component communication
- Template-based component definitions (no SFC)

### Error Handling
- Global Vue error handler configured
- API error states with user-friendly messages
- Graceful loading and error UI states

### Code Style
- Functional programming patterns in data transformations
- Descriptive variable and function names
- Console logging for development feedback
- Component prop validation and event emission patterns

## URLs and Endpoints

- **Application**: http://localhost:3000
- **API Base**: http://localhost:3001/api
- **Direct json-server**: http://localhost:3001

### Available API Routes
- `/api/tasks` - Task CRUD operations
- `/api/users` - User management
- `/api/projects` - Project data
- `/api/comments` - Task comments
- Custom filtered endpoints defined in `server/routes.json`
