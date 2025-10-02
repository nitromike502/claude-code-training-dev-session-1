# SWARM Orchestrator
# Multi-Agent TaskFlow Pro Development Coordinator

<task>
Launch the SPARC orchestrator agent to coordinate TaskFlow Pro MVP development through a structured 4-phase workflow.
</task>

<context>
**Project**: TaskFlow Pro - Vue.js 3 task management application
**Requirements**: See PRD.md for complete specifications
**Tech Stack**: Vue.js 3 (CDN), json-server, Tailwind CSS, Font Awesome
**Architecture**: CDN-based delivery, no build tools, file-based JSON database
**Current Status**: Orchestrator will assess project state and resume or start development

**CRITICAL CONSTRAINT**: All development must occur in project root. Do NOT read or reference `.claude/` directory during development.
</context>

<execution>
Invoke the `sparc-orchestrator-agent` to:
1. Assess current project state and determine active phase
2. Read PRD.md for complete project requirements
3. Create comprehensive phase tracking with TodoWrite
4. Execute appropriate phase with specialized agent coordination
5. Manage phase progression through Phase 1 → Phase 2 → Phase 3 → Phase 4
6. Deliver production-ready TaskFlow Pro MVP

The orchestrator has full authority to coordinate all specialized agents and manage the complete development lifecycle.
</execution>
