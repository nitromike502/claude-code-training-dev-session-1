# Project Status Check
# TaskFlow Pro Development Assessment & Next Steps

<task>
Assess the current state of TaskFlow Pro development, identify completed features and available enhancements from PRD documentation, then guide the user toward their next development objective.
</task>

<context>
**Project**: TaskFlow Pro - Vue.js 3 task management application
**Tech Stack**: Vue.js 3 (CDN), json-server, Tailwind CSS, Font Awesome
**Architecture**: CDN-based delivery, no build tools, file-based JSON database

This command performs a comprehensive project assessment by:
1. Checking for core application files (package.json, server/db.json, public/app.js, components)
2. Scanning docs/ directory for *-prd.md files representing planned features
3. Analyzing git status to identify work in progress
4. Determining MVP completion status (Phases 1-3)
5. Presenting available next steps in a training-friendly manner

**Training Context**: This repository demonstrates Claude Code's subagent orchestration capabilities using the SWARM pattern for coordinated multi-agent development.
</context>

<execution>
## Phase 1: Project State Assessment

**Step 1: Check Core Application Files**
Verify the existence and state of:
- `/home/training/claude-code-subagents/package.json` - Project dependencies and scripts
- `/home/training/claude-code-subagents/server/db.json` - Database with tasks, users, projects
- `/home/training/claude-code-subagents/public/app.js` - Main Vue application
- `/home/training/claude-code-subagents/public/components/` - Vue component files (TaskList, TaskCard, TaskForm)
- `/home/training/claude-code-subagents/public/index.html` - Application entry point

Use Read tool to verify these files exist and contain expected content.

**Step 2: Scan for Available Features**
Search `/home/training/claude-code-subagents/docs/` directory for files matching pattern `*-prd.md`:
- These represent planned features with complete Product Requirements Documents
- Extract feature name and purpose from each PRD
- Build a list of available features to implement

Use Glob tool with pattern `docs/*-prd.md` to find all PRD files.

**Step 3: Analyze Development Status**
Check git status to identify:
- Modified files (work in progress)
- Current branch
- Recent commits to understand development timeline

Use Bash tool to run `git status` and `git log -5 --oneline`.

**Step 4: Determine MVP Status**
Assess whether TaskFlow Pro MVP (Phases 1-3) is complete by checking:
- All three main components exist (TaskList, TaskCard, TaskForm)
- Database has sample data (tasks, users, projects, comments)
- Application successfully loads and renders
- API integration is functional

Based on file existence and content, determine if MVP is complete.

## Phase 2: Present Status Summary

Provide a conversational, training-friendly summary:

```
## TaskFlow Pro - Project Status

### Current State
[Report on MVP completion status - Phases 1-3]
- ✅ Phase 1: [Status - Backend Setup]
- ✅ Phase 2: [Status - Core Components]
- ✅ Phase 3: [Status - Integration & Polish]
- 📋 Phase 4: Available for enhancement

### Available Features to Implement
[List discovered PRDs from docs/ directory]

1. **Search Feature** (docs/search-feature-prd.md)
   - Text-based search across task titles and descriptions
   - Filter by status, priority, and project
   - Sort by title, priority, or due date
   - Clear filters and result counts
   - *Recommended next step for training*

[Additional PRDs if found...]

### Current Work
[If git status shows modified files, mention them here]

---

## What would you like to do next?

I can help you with:

**A) Implement Search Feature** (Recommended)
   - Complete PRD available in docs/search-feature-prd.md
   - Demonstrates full SWARM orchestration workflow
   - Adds valuable functionality to TaskFlow Pro
   - Perfect training example of multi-agent coordination

**B) Run Full SWARM Orchestration**
   - Use `/swarm` command for complete multi-agent development
   - SPARC orchestrator will coordinate specialized agents
   - Handles planning, development, testing, and review

**C) Explore Other Features**
   - [List any other PRDs found in docs/]
   - Custom feature request (provide your requirements)

**D) Review & Documentation**
   - Code review of existing implementation
   - Generate technical documentation
   - Performance analysis and optimization

**E) Custom Task**
   - Tell me what you'd like to work on
   - Can coordinate agents for any development need

Please choose an option (A-E) or describe what you'd like to accomplish.
```

## Phase 3: User Interaction

Wait for user response and:
- If they choose Search Feature (A): Recommend using `/swarm` command with search feature PRD
- If they choose SWARM (B): Invoke `sparc-orchestrator-agent` to coordinate development
- If they choose other PRD (C): Guide them through that feature's requirements
- If they choose review/docs (D): Coordinate appropriate specialized agents
- If custom (E): Clarify requirements and suggest appropriate approach

**Important**: Keep the tone conversational, educational, and training-focused. This is a learning environment demonstrating Claude Code's subagent orchestration capabilities.

## Execution Notes

1. **Use absolute paths**: All file paths must be absolute (e.g., `/home/training/claude-code-subagents/...`)
2. **Parallel tool calls**: When checking multiple files, batch Read calls together for efficiency
3. **Graceful handling**: If expected files are missing, guide user to run `/swarm` to set up MVP
4. **Context awareness**: Recognize this is a training repository demonstrating SWARM patterns
5. **Search feature priority**: If search-feature-prd.md exists, highlight it as the recommended next step

## Success Criteria

- User understands current project state (MVP complete or in-progress)
- Available features are clearly presented with context
- Next steps are actionable and appropriately scoped
- User feels guided, not overwhelmed
- Recommendations align with training objectives
</execution>
