# SWARM Orchestrator
# Multi-Agent TaskFlow Pro Development Coordinator

<task>
You are a SWARM orchestrator that coordinates 8 specialized agents to build TaskFlow Pro MVP from PRD to deployment using parallel execution and dependency management.

Execute a comprehensive development workflow through four sequential phases with intelligent parallel agent coordination within each phase.
</task>

<context>
Key References:
- Project Requirements: @PRD.md (comprehensive TaskFlow Pro specifications)
- Development Progress: Track via TodoWrite throughout execution

Current Project: TaskFlow Pro - Vue.js 3 task management web application
Tech Stack: Vue.js 3 (CDN), json-server, Tailwind CSS, Font Awesome, Node.js 16+
Architecture: CDN-based delivery, no build tools, file-based JSON database
Status: Ready for full MVP implementation

**CRITICAL CONSTRAINT**: All agents must IGNORE the `.claude` directory entirely. Do NOT read, reference, or interact with any files in `.claude/` during development. The TaskFlow Pro application must be built fresh in the project root based solely on PRD.md specifications.
</context>

<orchestration_phases>
## Phase 1: Planning & Analysis (Sequential Execution)
**Dependency**: None - can start immediately
**Execution**: Execute agents in sequence, each builds on previous outputs

**sparc-orchestrator-agent**: Initialize project coordination and establish development workflow. Read PRD.md to understand complete project scope. Create comprehensive phase tracking with TodoWrite. Establish communication protocols between all 8 agents. Set up success criteria validation checkpoints for each phase. **IMPORTANT: Do NOT read or reference any files in the `.claude/` directory. Focus only on PRD.md and project root.**

**general-purpose** (PRD Analysis & Ticket Creation Agent): Perform deep analysis of PRD.md to extract all functional and technical requirements. Break down requirements into granular, actionable development tickets. Create user stories with acceptance criteria for each feature. Map features to development phases and identify dependencies between tickets. Generate comprehensive requirements analysis document and prioritized development backlog.

**context-manager** (Documentation Manager Agent): Create initial project documentation structure and coding standards based on PRD requirements. Establish documentation templates for API specs, component documentation, and user guides. Set up documentation synchronization protocols. Create developer onboarding documentation framework and coding standards that align with Vue.js 3 CDN-based architecture.

**code-reviewer** (Code Review & Git Workflow Agent): Establish git workflow and quality standards for the project. Create branching strategy, commit message conventions, and pull request templates. Define code quality standards for Vue.js 3 CDN architecture. Set up review checklists for accessibility compliance (WCAG 2.1 AA) and performance requirements. Create quality assurance protocols for each development phase.

**Wait for Phase 1 completion before proceeding**

## Phase 2: Foundation (Sequential Execution)
**Dependency**: Phase 1 outputs (requirements, documentation structure, quality standards)
**Execution**: Execute agents in sequence, each uses all Phase 1 outputs as context

**general-purpose** (DevOps Setup Agent): Set up complete development environment based on PRD specifications. Create package.json with exact dependencies (json-server 0.17.4+, live-server 1.2.2+, concurrently 8.2.2+). Configure ports 3000 (frontend) and 3001 (API). Create npm scripts for concurrent server startup. Establish project folder structure (excluding `.claude/`) and validate Node.js 16+ compatibility requirements. **IMPORTANT: Build application structure in project root, ignore `.claude/` directory.**

**general-purpose** (Data Architecture Agent): Create complete JSON database (server/db.json) with sample data matching PRD specifications. Implement server/routes.json for custom API endpoint mappings. Design RESTful API structure (/api/tasks, /api/users, /api/projects). Populate realistic sample data: 4 team members with DiceBear avatars, 3 projects, 8-9 tasks with proper status distribution (3 completed, 3 in_progress, 2-3 todo). Validate all data models and foreign key relationships.

**context-manager** (Documentation Manager Agent): Document complete API specifications based on data architecture. Create comprehensive API documentation including endpoints, request/response formats, error codes, and data models. Generate technical specifications for each API endpoint. Create troubleshooting guides for development environment setup and API integration patterns.

**Wait for Phase 2 completion before proceeding**

## Phase 3: Core Application Development (Sequential Execution)
**Dependency**: Phase 2 completion (development environment, API structure, API documentation)
**Execution**: Execute agents in sequence, each receives Phase 1+2 outputs

**general-purpose** (Vue.js Frontend Agent): Develop complete frontend application using Vue.js 3 CDN approach (https://unpkg.com/vue@3/dist/vue.global.js). Bootstrap main TaskFlowApp root component with global state management. Develop all Vue components: TaskList (task display grid with statistics and search), TaskCard (individual task cards with status management), TaskForm (modal form for creation and editing). Integrate CDN dependencies: Tailwind CSS, Font Awesome. Implement complete task CRUD operations with API integration. Build real-time search and filtering system. Create statistics dashboard with dynamic updates.

**context-manager** (Documentation Manager Agent): Create comprehensive component documentation based on Vue.js frontend implementation. Document component interfaces, props, events, and usage patterns. Generate component library documentation with examples. Create user guides for task management features and setup instructions. Maintain synchronized documentation as components are developed.

**code-reviewer** (Code Review & Git Workflow Agent): Perform comprehensive code review of all frontend development. Validate Vue.js 3 best practices and Composition API usage. Review API integration patterns and error handling. Ensure CDN-based architecture compliance (no build tools). Validate accessibility compliance and responsive design implementation. Manage feature branch integration and resolve conflicts. Conduct performance validation against PRD requirements.

**Wait for Phase 3 completion before proceeding**

## Phase 4: Polish & Release (Parallel Execution)
**Dependency**: Phase 3 completion (complete application functionality)
**Execution**: Launch agents in parallel using single message with multiple Task calls

**ui-ux-designer** (UI/UX Polish Agent): Implement responsive design following mobile-first approach based on complete application. Apply Tailwind CSS styling per PRD color scheme requirements (status colors, priority colors, custom theme). Create custom CSS classes for consistent component styling. Ensure WCAG 2.1 AA accessibility compliance with proper ARIA labels, focus management, and keyboard navigation. Implement loading states, error handling UI, and empty states. Test across all specified breakpoints and optimize for touch-friendly interactions (44px minimum touch targets).

**context-manager** (Documentation Manager Agent): Finalize all project documentation including complete setup guide, user manual, API reference, and troubleshooting documentation. Create deployment and maintenance runbooks. Generate comprehensive developer onboarding documentation. Ensure all documentation matches final implementation and is synchronized with codebase.

**code-reviewer** (Code Review & Git Workflow Agent): Conduct final comprehensive quality assurance review. Validate cross-browser compatibility (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+). Perform final security review and performance validation. Ensure all PRD requirements are met including functional requirements (CRUD operations, search/filter, data persistence) and performance requirements (< 2s load time, < 100ms filter response). Manage final release preparation and validate production readiness.

**sparc-orchestrator-agent** (SPARC Orchestrator): Conduct final integration testing and release coordination. Validate all phase deliverables against PRD specifications. Coordinate final testing scenarios including task creation, status transitions, search functionality, error handling, and responsive design. Ensure all 8 agents have completed their deliverables successfully. Validate complete application against success criteria and prepare final release documentation.
</orchestration_phases>

<execution_strategy>
## Enhanced Coordination Protocol

1. **Phase Initialization**:
   - Use TodoWrite to create hierarchical phase tracking (phase, agent, task levels)
   - Mark current phase as in_progress
   - List all agents in current phase as pending
   - Ensure previous phase completion before proceeding

2. **Intelligent Agent Launch**:
   - For sequential phases: execute one agent at a time with complete context
   - For parallel phases: use single message with multiple Task() calls
   - Each Task call includes complete context from previous phases
   - Map each agent to correct subagent_type based on the agent specifications
   - Include specific deliverables expected from each agent

3. **Phase Completion Management**:
   - Wait for ALL agents in phase to complete before proceeding
   - Validate outputs meet PRD requirements
   - Mark phase as completed in TodoWrite
   - Collect outputs and provide as context for next phase

4. **Context Propagation**:
   - Each phase receives comprehensive outputs from all previous phases
   - Include PRD requirements, documentation standards, and quality criteria
   - Maintain consistent technical decisions across all phases
   - Ensure CDN-only architecture compliance throughout

5. **Quality Validation**:
   - Code Review Agent validates deliverables at each major milestone
   - Documentation Manager maintains synchronized documentation
   - SPARC Orchestrator ensures PRD compliance throughout
   - All agents must respect established coding standards and architecture constraints

6. **Error Handling**:
   - If any agent fails, analyze failure and attempt resolution
   - Provide additional context or clarification as needed
   - Escalate to human intervention only when automated recovery fails
   - Maintain comprehensive phase state for resumption
</execution_strategy>

<success_criteria>
## Phase Completion Requirements

✅ **Phase 1 Success**: Requirements analysis complete, documentation structure established, git workflow configured, quality standards defined

✅ **Phase 2 Success**: Working development environment (npm start), complete JSON database with sample data, comprehensive API documentation

✅ **Phase 3 Success**: Full Vue.js 3 application with all CRUD functionality, component documentation, code review completed

✅ **Phase 4 Success**: Responsive styling with accessibility compliance, comprehensive documentation, final QA passed, production-ready application

## Final Deliverables
- Complete Vue.js 3 task management application using CDN delivery
- json-server API with comprehensive sample data (4 users, 3 projects, 8-9 tasks)
- Responsive interface with Tailwind CSS styling and WCAG 2.1 AA accessibility
- Real-time task search and filtering (< 100ms response time)
- Complete CRUD operations with status workflow management
- Working development environment with concurrent servers (npm start)
- Comprehensive documentation: setup guide, API reference, user manual, troubleshooting
- Cross-browser compatibility (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Performance targets met: < 2s initial load, < 500ms API operations
</success_criteria>

<technology_constraints>
## Architecture Requirements
- **CDN-Only Delivery**: Vue.js 3, Tailwind CSS, Font Awesome via CDN (no build tools)
- **File-Based Database**: JSON files only via json-server (no SQL databases)
- **Template Components**: Vue template-based components (no Single File Components)
- **Node.js Compatibility**: Minimum Node.js 16.0.0 for json-server compatibility
- **Port Configuration**: Frontend on 3000, API on 3001
- **Browser Support**: Modern browsers with ES6+ support required
- **Development Only**: Designed for localhost development environment
</technology_constraints>

<agent_mapping>
## SWARM Agent to Subagent Type Mapping
- **SPARC Orchestrator** → `sparc-orchestrator-agent`
- **PRD Analysis & Ticket Creation Agent** → `general-purpose`
- **Documentation Manager Agent** → `context-manager`
- **Code Review & Git Workflow Agent** → `code-reviewer`
- **DevOps Setup Agent** → `general-purpose`
- **Data Architecture Agent** → `general-purpose`
- **Vue.js Frontend Agent** → `general-purpose`
- **UI/UX Polish Agent** → `ui-ux-designer`
</agent_mapping>

<human_review_needed>
Before execution, confirm:
- [ ] PRD.md has been reviewed and requirements are clear
- [ ] Agent specifications align with orchestration phases
- [ ] Technology stack is appropriate for MVP scope
- [ ] Phase dependencies are clearly understood
- [ ] Success criteria are achievable and measurable
- [ ] Agent mapping to subagent types is correct
</human_review_needed>

## Execution Command

Begin orchestration by:
1. Reading PRD.md for complete project context
2. Creating comprehensive phase tracking with TodoWrite
3. Executing Phase 1 with sequential agent coordination
4. Managing phase progression with dependency validation
5. Delivering production-ready TaskFlow Pro MVP

**Ready to orchestrate complete TaskFlow Pro development from requirements analysis to deployment.**
