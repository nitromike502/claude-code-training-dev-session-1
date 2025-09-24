# Developer Session 1: Presenter Guide

> **🎯 Session Goal**: Demonstrate advanced Claude Code features through hands-on TaskFlow Pro development in 30 minutes

## Pre-Session Preparation

### Setup Checklist (5 minutes before session)
- [ ] Clone and test TaskFlow Pro locally (`npm install && npm start`)
- [ ] Verify both localhost:3000 and localhost:3001 are accessible
- [ ] Test Claude Code and Task tool
- [ ] Prepare screen sharing with both Claude Code terminal and browser
- [ ] Have backup internet connection ready (CDN dependencies)

### Materials Needed
- **Claude Code** running with access to TaskFlow Pro directory
- **Browser**: Chrome/Firefox with dev tools ready
- **Terminal**: Split view (Claude Code + npm start)
- **Backup**: Offline Vue.js/Tailwind files if internet issues

---

## Session Timeline (30 Minutes)

### **PHASE 1: PROJECT EXPLORATION** (5 minutes)

#### Opening (1 minute)
**Script**: "Today we're building TaskFlow Pro while mastering advanced Claude Code features. This isn't just coding - it's about transforming how you develop with AI assistance."

**Show**: TaskFlow Pro running at localhost:3000

#### Live Claude Code Demonstration (4 minutes)

**Demo 1: Project Understanding** (2 minutes)
```bash
Ask Claude Code: "What is the overall architecture of this TaskFlow Pro project?"
```

**Expected Output**: Claude analyzes Vue.js structure, json-server setup, component architecture

**Presenter Notes**:
- Highlight how Claude Code provides architectural insights instantly
- Point out the relational data model in server/db.json
- Show the progressive component loading strategy

**Demo 2: Data Analysis** (2 minutes)
```bash
Ask Claude Code to analyze server/db.json: "How is this task management data structured and what relationships exist?"
```

**Expected Output**: Detailed analysis of users, tasks, projects relationships

**Teaching Points**:
- Demonstrate Claude Code's ability to understand complex data structures
- Show how Claude identifies foreign key relationships
- Highlight the realistic demo data designed for training

---

### **PHASE 2: COMPONENT DEVELOPMENT** (15 minutes)

#### TaskList Component Build (7 minutes)

**Setup** (1 minute)
**Script**: "Let's build our first component. Instead of starting from scratch, let's ask Claude how to approach this."

```bash
Ask Claude Code: "What would be the best approach for a TaskList component in Vue 3 that can filter tasks by status and priority?"
```

**Live Coding with Claude** (4 minutes)
**Script**: "Now watch how Claude Code can help us build this step by step."

Open `public/components/TaskList.js` and start building:

```javascript
// Ask Claude to help design the component structure
// Live code while explaining Vue 3 Composition API patterns
```

**Key Teaching Moments**:
- Show Claude Code suggesting Vue 3 Composition API patterns
- Demonstrate how Claude Code clarifies reactive refs vs reactive objects
- Live code with Claude Code's guidance on component props and events

**Documentation Demo** (2 minutes)
```bash
Ask Claude Code to help create comprehensive Vue.js component documentation with usage examples for TaskList.js
```

**Show**: Automatic generation of component docs with props, events, and usage examples

#### Custom Subagent Creation (4 minutes)

**Script**: "Now let's create a specialized subagent for reviewing our task management components."

**Live Demo**: Create `.claude/agents/task-component-reviewer.md`

```yaml
---
name: task-component-reviewer
description: Specialized review agent for Vue.js task management components
tools: Read, Grep, Glob
model: sonnet
color: green
---

You are a Vue.js expert specializing in task management application patterns.

When reviewing components, focus on:
1. Vue 3 Composition API best practices
2. Proper prop validation and type checking
3. Event emission patterns and naming
4. Accessibility (ARIA labels, keyboard navigation)
5. Performance (unnecessary re-renders, computed vs methods)
6. Task-specific patterns (status indicators, priority handling)

Provide specific, actionable feedback with code examples.
```

**Test the Subagent**:
```bash
Use the task-component-reviewer subagent to analyze the TaskList component we just built
```

**Teaching Points**:
- Show how subagent specialization provides deeper, more relevant feedback
- Demonstrate tool restrictions for security
- Explain when to create custom vs use built-in subagents

#### Quick Component Demo (4 minutes)

**TaskCard Component** (2 minutes)
**Script**: "Let's rapidly prototype TaskCard with Claude's help."

```bash
Ask Claude Code: "Design a TaskCard component that displays task information with priority indicators and user avatars"
```

**Live code**: Basic TaskCard with props and styling

**TaskForm Component** (2 minutes)
**Script**: "For forms, Claude Code can help with validation patterns."

```bash
Ask Claude Code: "What are Vue.js best practices for task creation forms with validation?"
```

**Show**: Form validation patterns and API integration guidance

---

### **PHASE 3: ADVANCED FEATURES** (10 minutes)

#### Slash Command Creation (3 minutes)

**Script**: "Custom commands streamline repetitive workflows. Let's create a project-specific command."

Create `.claude/commands/analyze-components.md`:
```yaml
---
description: "Analyze all TaskFlow Pro components for architecture consistency"
---

Ask Claude Code to review components/: "Review all Vue.js components in this directory for:"

1. **Architecture Consistency**: Do all components follow the same patterns?
2. **Code Quality**: Are there any anti-patterns or improvements needed?
3. **Integration**: How well do components communicate with each other?
4. **Performance**: Any optimization opportunities?

Focus on: $1
```

**Test Command**:
```bash
/analyze-components "component communication patterns"
```

**Teaching Points**:
- Show how commands save time on repetitive analysis
- Demonstrate argument passing with $1, $2
- Explain when to create commands vs use subagents

#### Workflow Hooks Demo (3 minutes)

**Script**: "Hooks automate your development workflow. Let's set up automatic documentation."

**Show Hook Configuration** (theoretical - don't actually implement):
```json
{
  "PostToolUse": {
    "Write": {
      "command": "echo 'Component updated: $FILENAME - Consider regenerating docs'",
      "description": "Remind to update docs when components change"
    }
  }
}
```

**Explain**:
- How hooks integrate with existing tools (Git, CI/CD, IDEs)
- Security considerations (hooks run with your permissions)
- Common patterns: auto-formatting, testing, documentation

#### Parallel Workflow Demo (4 minutes)

**Script**: "The real power comes from coordinating multiple Claude Code tasks simultaneously."

**Live Demo**: Execute these in parallel (use Task tool multiple times in one message):
1. `Ask Claude Code to analyze public/app.js: "How does the main Vue application initialize and manage state?"`
2. Ask Claude Code to help create API documentation from the server/db.json data structure
3. `Use task-component-reviewer to analyze components/ directory for overall architecture`

**Teaching Points**:
- Show multiple Task windows opening simultaneously
- Explain context isolation between subagents
- Demonstrate how results complement each other

---

## **WRAP-UP & Q&A** (5 minutes)

### Key Takeaways Summary
1. **Subagents provide specialized expertise** - deeper than general Claude Code
2. **Custom commands streamline workflows** - eliminate repetitive prompting
3. **Hooks automate development processes** - integrate with your existing tools
4. **Parallel execution multiplies productivity** - coordinate multiple AI assistants

### Interactive Q&A Session
**Common Questions & Prepared Answers**:

**Q**: "How do I know when to create a custom subagent vs using built-in ones?"
**A**: Create custom when you have:
- Domain-specific requirements (like our task management patterns)
- Repetitive specialized analysis needs
- Team-specific coding standards to enforce
- Security requirements needing tool restrictions

**Q**: "Can subagents access my entire codebase?"
**A**: You control tool access. Our task-component-reviewer only has Read/Grep/Glob - no file modification or command execution. Always follow principle of least privilege.

**Q**: "How do I share subagents with my team?"
**A**: Store in `.claude/agents/` in your repository. Team gets access when they clone. Use `.claude/agents/*.local.md` for personal variations.

### Extension Challenge
**For Attendees**: "Take 5 minutes after this session to create your own subagent for a technology you work with daily. Share it with the team!"

---

## Troubleshooting Guide

### Technical Issues

**"npm start fails"**:
- Check Node.js version (16+ required)
- Delete node_modules, run `npm install` again
- Check port conflicts (3000, 3001)

**"Claude Code not responding"**:
- Verify Claude Code is in the correct directory
- Check internet connection for API calls
- Restart Claude Code session

**"Vue.js components not loading"**:
- Check browser console for JavaScript errors
- Verify CDN access (internet connection)
- Check file paths in index.html script tags

**"API calls failing"**:
- Ensure json-server is running on port 3001
- Check CORS issues in browser dev tools
- Verify db.json file is valid JSON

### Presentation Issues

**"Screen sharing lag"**:
- Close unnecessary applications
- Use local examples instead of live coding if needed
- Have backup screenshots ready

**"Attendees can't follow along"**:
- Slow down, repeat commands
- Use chat to share exact commands
- Encourage questions throughout

### Backup Plans

**Internet connectivity issues**:
- Pre-download Vue.js and Tailwind CSS files
- Use local json files instead of CDN
- Focus more on subagent creation (offline)

**Claude Code API issues**:
- Show pre-recorded examples
- Focus on theory and configuration
- Demonstrate with local file analysis

---

## Post-Session Actions

### For Presenter
- [ ] Collect feedback on session timing and content
- [ ] Share session recording (if applicable)
- [ ] Update training materials based on questions
- [ ] Schedule follow-up advanced sessions

### For Attendees
- [ ] Experiment with custom subagent creation
- [ ] Try the extension exercises
- [ ] Share successful workflow integrations
- [ ] Join Claude Code community discussions

### Success Metrics
- Attendees can create a basic custom subagent
- Understanding of when to use subagents vs commands vs hooks
- Practical application in their current projects
- Questions about advanced integration scenarios

---

**Remember**: The goal isn't perfect code - it's demonstrating how Claude Code transforms the development experience. Keep the energy high and focus on the "wow moments" when Claude provides unexpectedly good insights!