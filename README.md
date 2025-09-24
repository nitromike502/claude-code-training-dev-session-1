# TaskFlow Pro - Claude Code Developer Training Session

> **🎯 Training Focus**: Master advanced Claude Code features through hands-on development of a team task management system.

## Overview

**TaskFlow Pro** is a comprehensive task management application designed specifically for **Claude Code Developer Session 1**. This project serves as a practical learning environment where developers can explore advanced Claude Code features while building real functionality.

### Learning Objectives

By the end of this 30-minute session, you will master:

- **🤖 Subagent Specialization**: Create and use custom subagents for code review, documentation, and validation
- **⚡ Slash Commands**: Build custom workflow commands for rapid development
- **🔗 Workflow Hooks**: Implement automated triggers for documentation and quality checks
- **🚀 Parallel Execution**: Coordinate multiple Claude Code tasks simultaneously

## Tech Stack

This project intentionally uses a simple, universally accessible stack:

- **Backend**: `json-server` (instant REST API, zero configuration)
- **Frontend**: Vue.js 3 via CDN (no build tools, immediate results)
- **Styling**: Tailwind CSS CDN (rapid prototyping)
- **Data**: JSON file structure (easy to understand and modify)

### Why This Stack?

```
★ Insight ─────────────────────────────────────
Zero setup barriers = Maximum Claude Code learning time
- No Docker, webpack, or complex dependencies
- Works identically on Windows, Mac, and Linux
- Attendees focus on Claude Code, not infrastructure
─────────────────────────────────────────────────
```

## Quick Start

### Prerequisites
- Node.js 16+ installed
- Basic familiarity with Vue.js and REST APIs
- **Claude Code** installed and ready to use

### 2-Minute Setup

```bash
# Clone the training repository
git clone <your-repo-url> taskflow-training
cd taskflow-training

# Install dependencies (only 3 packages!)
npm install

# Start the development environment
npm start
```

**Access URLs:**
- **Application**: http://localhost:3000
- **API Server**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api (auto-generated)

### Verify Setup

You should see:
- ✅ TaskFlow Pro dashboard loads with sample data
- ✅ 8 sample tasks across 3 projects
- ✅ 4 team members with realistic profiles
- ✅ Responsive interface with training objectives sidebar

## Session Structure (30 Minutes)

### Phase 1: Project Understanding (5 minutes)
**Goal**: Explore the codebase structure and understand the foundation

**Claude Code Demonstrations:**
```bash
# Use Claude Code to understand the project architecture
Ask Claude Code: "What is the overall structure of this Vue.js application?"

# Analyze the API design
Ask Claude Code to analyze server/db.json: "How is the data structured and what relationships exist?"

# Understand component patterns
Ask Claude Code to analyze public/app.js: "What Vue.js patterns are used here?"
```

**Key Learning**: See how Claude Code can quickly analyze and explain complex codebases

---

### Phase 2: Component Development (15 minutes)
**Goal**: Build TaskList, TaskForm, and TaskCard components with Claude Code guidance

#### TaskList Component (7 minutes)
```bash
# Start component development with Claude Code guidance
Ask Claude Code: "What would be the best approach for a TaskList component that can filter and sort tasks?"

# Use custom subagent for code review
# (We'll create this during the session)
Use the task-component-reviewer subagent to analyze this TaskList implementation

# Generate documentation
Use Claude Code to help generate comprehensive component documentation for TaskList.js
```

**Build Features:**
- Task filtering by status and priority
- Search functionality
- Responsive grid layout
- Loading and error states

#### TaskCard Component (4 minutes)
**Focus**: Props, events, and visual design

```bash
# Design guidance
Ask Claude Code: "How should TaskCard handle props and emit events to parent components?"

# Styling assistance
Use Claude Code to suggest Tailwind CSS classes for priority indicators and status badges
```

#### TaskForm Component (4 minutes)
**Focus**: Form handling and validation

```bash
# Form validation patterns
Ask Claude Code: "What are Vue.js best practices for form validation and API integration?"

# Create validation subagent
# (Custom subagent creation demonstration)
```

---

### Phase 3: Advanced Claude Code Features (10 minutes)

#### Custom Subagent Creation (4 minutes)
**Create a specialized task validation subagent:**

```yaml
---
name: task-validator
description: Validates task management code for completeness and best practices
tools: Read, Grep, Glob
---
You are a specialist in task management application patterns...
```

**Demonstrate:**
- Subagent configuration
- Tool restrictions for security
- Specialized prompts for domain expertise

#### Slash Command Development (3 minutes)
**Create project-specific commands:**

```yaml
---
description: "Analyze task component architecture and suggest improvements"
---
Ask Claude Code to analyze components/: "Analyze all task components for architecture consistency"

Generate recommendations for:
- Component reusability
- State management patterns
- Performance optimizations
```

#### Workflow Hooks (3 minutes)
**Implement automated documentation:**

```json
{
  "PostToolUse": {
    "Write": {
      "command": "if [[ $FILENAME == components/*.js ]]; then echo 'Component updated, consider regenerating docs'; fi"
    }
  }
}
```

## Project Structure Deep Dive

```
taskflow-pro/
├── 📦 package.json          # Minimal dependencies, fast setup
├── 🖥️  server/
│   ├── db.json             # Rich, realistic task data
│   └── routes.json         # REST API route mappings
├── 🎨 public/
│   ├── index.html          # Vue 3 CDN, training-optimized
│   ├── app.js              # Main Vue application
│   ├── components/         # Session build targets
│   │   ├── TaskList.js     # 📝 Build during session
│   │   ├── TaskForm.js     # 📝 Build during session
│   │   └── TaskCard.js     # 📝 Build during session
│   └── styles/
│       └── app.css         # Tailwind utilities + custom styles
├── 📚 docs/
│   └── session-guide.md    # Presenter instructions
└── 📖 README.md            # This file
```

## Data Model

### Tasks
```javascript
{
  "id": 1,
  "title": "Task title",
  "description": "Detailed description",
  "projectId": 1,
  "assignedTo": 2,
  "status": "in_progress",     // todo, in_progress, completed
  "priority": "high",          // low, medium, high
  "tags": ["frontend", "vue"],
  "dueDate": "2024-01-24T17:00:00Z",
  "estimatedHours": 4,
  "actualHours": 2.5
}
```

### Users & Projects
Rich relational data perfect for demonstrating Claude Code's analysis capabilities.

## Claude Code Integration Points

### Claude Code Capabilities
- **Code Analysis**: Ask Claude Code for architecture analysis and Vue.js pattern explanations
- **Documentation Generation**: Use Claude Code to help create component documentation and API references
- **Dependency Analysis**: Use Claude Code to help track cross-component dependencies

### Custom Subagents (Created During Session)
- **task-validator**: Validates task management code patterns
- **component-reviewer**: Specialized Vue.js component analysis
- **api-documenter**: Generates OpenAPI specs from json-server routes

### Slash Commands (Created During Session)
- `/analyze`: Full project architecture analysis
- `/component`: Component-specific development assistance
- `/validate`: Run all quality checks and validations

### Workflow Hooks (Demonstrated)
- Auto-documentation on component changes
- Code quality checks on save
- API endpoint validation

## Advanced Features

### Claude Code Parallel Execution
```bash
# Demonstrate parallel task execution
Run these simultaneously:
1. Ask Claude Code to analyze the Vue.js architecture
2. Use Claude Code to help generate API documentation
3. Use component-reviewer on TaskList.js
```

### Context Management
- Efficient token usage patterns
- Progressive analysis techniques
- Context-aware tool selection

## Extension Exercises

### Post-Session Practice
1. **Add Authentication**: Implement login/logout with localStorage
2. **Real-time Updates**: Add WebSocket support for collaborative editing
3. **Advanced Filtering**: Date ranges, custom tags, saved filters
4. **Mobile Optimization**: Touch-friendly gestures, offline support

### Claude Code Mastery
1. **Create Team Subagents**: Specialized agents for your development stack
2. **Workflow Automation**: Custom hooks for your deployment pipeline
3. **Documentation Pipeline**: Automated docs from code changes
4. **Quality Gates**: Automated code review and testing triggers

## Troubleshooting

### Common Setup Issues

**Port conflicts**:
```bash
# Check if ports are in use
netstat -an | grep ":3000\|:3001"

# Use different ports if needed
npx json-server --port 3002 server/db.json
npx live-server public --port=8080
```

**API connection errors**:
- Ensure json-server is running on port 3001
- Check browser console for CORS issues
- Verify `server/db.json` exists and is valid JSON

**Vue.js not loading**:
- Check internet connection (CDN dependencies)
- Verify console for JavaScript errors
- Ensure `app.js` is loading after Vue.js CDN

## Training Resources

### Claude Code Documentation
- [Subagent Creation Guide](link-to-docs)
- [Slash Command Reference](link-to-docs)
- [Workflow Hooks Documentation](link-to-docs)

### Vue.js 3 Quick Reference
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html)
- [Component Communication](https://vuejs.org/guide/components/events.html)

## Session Success Metrics

By session end, attendees should demonstrate:

✅ **Claude Code Mastery**
- Created at least one custom subagent
- Used Claude Code for code analysis
- Generated documentation with Claude Code assistance

✅ **Workflow Integration**
- Built at least one slash command
- Implemented a workflow hook
- Demonstrated parallel task execution

✅ **Practical Application**
- Completed TaskList or TaskCard component
- Integrated with json-server API
- Applied Claude Code to real development workflow

---

## Getting Help

### During the Session
- Use the training objectives sidebar (click 🎓 button)
- Check browser console for debugging info
- Ask Claude Code for troubleshooting assistance

### After the Session
- Join Claude Code community discussions
- Experiment with custom subagents in your projects
- Share workflow automation success stories

---

**Ready to master advanced Claude Code features? Let's build something amazing together! 🚀**