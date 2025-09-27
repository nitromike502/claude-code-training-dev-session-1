# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TaskFlow Pro** is a task management application currently in early development. The project uses a CDN-based Vue.js 3 frontend with json-server for the backend API.

## Development Commands

Since the project is in early stages, these commands are planned but not yet fully implemented:

- `npm install` - Install dependencies (currently: @playwright/test, @types/node, concurrently, json-server, live-server)
- `npm start` - Start both API server (port 3001) and frontend server (port 3000) concurrently
- `npm run server` - Start only the json-server API backend
- `npm run dev` - Start only the live-server frontend

## Architecture

### Technology Stack
- **Frontend**: Vue.js 3.3+ (CDN-based, no build tools)
- **Backend**: json-server for REST API
- **Styling**: Tailwind CSS 3.3+ (CDN)
- **Icons**: Font Awesome 6.4+ (CDN)
- **Database**: JSON file-based storage via json-server
- **Development**: Concurrently runs both servers, live-server for hot reload

### Project Structure (Planned)
```
/
├── server/
│   ├── db.json          # JSON database file
│   └── routes.json      # Custom route mappings
├── public/              # Static frontend files
├── components/          # Vue.js components
└── package.json         # Dependencies and scripts
```

### Data Models

**Tasks** - Core entity with fields: id, title, description, projectId, assignedTo, status (todo/in_progress/completed), priority (low/medium/high), timestamps

**Users** - Team members with DiceBear avatars: id, name, email, role, avatar URL, active status

**Projects** - Task containers: id, name, description, color, ownerId, status, dates

### API Endpoints (json-server)
- Base URL: `http://localhost:3001/api`
- Standard REST endpoints: GET/POST/PUT/DELETE for /api/tasks, /api/users, /api/projects
- Custom routes in server/routes.json for filtered queries

### Component Architecture (Planned)
```
TaskFlowApp (Root)
├── TaskList (Main task management)
│   ├── TaskCard (Individual task display)
│   └── TaskForm (Create/edit modal)
└── Statistics Dashboard
```

## Key Implementation Notes

- **No Build Tools**: Uses CDN delivery for all dependencies (Vue.js, Tailwind, Font Awesome)
- **Template-based Components**: Uses Vue template syntax, not Single File Components
- **Client-side Filtering**: All search/filter operations happen in browser
- **Responsive Design**: Mobile-first using Tailwind breakpoints
- **Accessibility**: WCAG 2.1 AA compliance requirements
- **Sample Data**: Includes 4 users, 3 projects, 8-9 sample tasks for development

## Current Status

The project is in the initial setup phase with comprehensive PRD documentation but minimal actual implementation. The package.json exists with dependencies defined, but frontend/backend code needs to be created.

## Development Workflow

1. Run `npm install` to install dependencies
2. Create the planned directory structure and implement components according to PRD specifications
3. Set up json-server with sample data in server/db.json
4. Use `npm start` to run both servers during development
5. Test manually across responsive breakpoints and browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## Requirements from PRD

- Node.js 16.0.0+ required
- Ports 3000 and 3001 must be available
- Modern browser with ES6+ support
- Internet connection for CDN resources
