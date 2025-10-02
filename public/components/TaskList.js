/**
 * TaskList Component
 *
 * Main component for displaying and managing tasks with advanced
 * filtering, searching, and sorting capabilities.
 */

const TaskList = {
    props: {
        tasks: {
            type: Array,
            default: () => []
        },
        projects: {
            type: Array,
            default: () => []
        },
        users: {
            type: Array,
            default: () => []
        }
    },

    emits: ['task-created', 'task-updated', 'task-deleted'],

    setup(props, { emit }) {
        const { ref, computed } = Vue;

        // State
        const searchQuery = ref('');
        const statusFilter = ref('all');
        const priorityFilter = ref('all');
        const projectFilter = ref('all');
        const sortBy = ref('dueDate');
        const sortOrder = ref('asc');
        const showForm = ref(false);
        const editingTask = ref(null);
        const viewMode = ref('grid'); // 'grid' or 'list'

        // Computed properties
        const filteredAndSortedTasks = computed(() => {
            let filtered = props.tasks.filter(task => {
                // Search filter
                const searchLower = searchQuery.value.toLowerCase();
                const matchesSearch = !searchQuery.value ||
                    task.title.toLowerCase().includes(searchLower) ||
                    task.description.toLowerCase().includes(searchLower);

                // Status filter
                const matchesStatus = statusFilter.value === 'all' || task.status === statusFilter.value;

                // Priority filter
                const matchesPriority = priorityFilter.value === 'all' || task.priority === priorityFilter.value;

                // Project filter
                const matchesProject = projectFilter.value === 'all' || task.projectId === parseInt(projectFilter.value);

                return matchesSearch && matchesStatus && matchesPriority && matchesProject;
            });

            // Sort
            filtered.sort((a, b) => {
                let aVal = a[sortBy.value];
                let bVal = b[sortBy.value];

                // Handle different data types
                if (sortBy.value === 'dueDate') {
                    aVal = aVal ? new Date(aVal) : new Date('9999-12-31');
                    bVal = bVal ? new Date(bVal) : new Date('9999-12-31');
                } else if (sortBy.value === 'priority') {
                    const priorityOrder = { low: 1, medium: 2, high: 3 };
                    aVal = priorityOrder[aVal] || 0;
                    bVal = priorityOrder[bVal] || 0;
                } else if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }

                const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
                return sortOrder.value === 'asc' ? comparison : -comparison;
            });

            return filtered;
        });

        const taskStats = computed(() => {
            const filtered = filteredAndSortedTasks.value;
            return {
                total: filtered.length,
                todo: filtered.filter(t => t.status === 'todo').length,
                inProgress: filtered.filter(t => t.status === 'in_progress').length,
                completed: filtered.filter(t => t.status === 'completed').length
            };
        });

        const hasActiveFilters = computed(() => {
            return searchQuery.value ||
                statusFilter.value !== 'all' ||
                priorityFilter.value !== 'all' ||
                projectFilter.value !== 'all';
        });

        // Helper functions
        const getProjectById = (projectId) => {
            return props.projects.find(p => p.id === projectId);
        };

        const getUserById = (userId) => {
            return props.users.find(u => u.id === userId);
        };

        // Event handlers
        const handleNewTask = () => {
            editingTask.value = null;
            showForm.value = true;
        };

        const handleEditTask = (task) => {
            editingTask.value = task;
            showForm.value = true;
        };

        const handleTaskSaved = (taskData) => {
            if (editingTask.value) {
                emit('task-updated', taskData);
            } else {
                emit('task-created', taskData);
            }
            showForm.value = false;
            editingTask.value = null;
        };

        const handleTaskDeleted = (taskId) => {
            emit('task-deleted', taskId);
        };

        const handleStatusChanged = ({ taskId, status }) => {
            const task = props.tasks.find(t => t.id === taskId);
            if (task) {
                const updatedTask = {
                    ...task,
                    status,
                    updatedAt: new Date().toISOString()
                };
                if (status === 'completed' && !task.completedAt) {
                    updatedTask.completedAt = new Date().toISOString();
                }
                emit('task-updated', updatedTask);
            }
        };

        const handleFormCancelled = () => {
            showForm.value = false;
            editingTask.value = null;
        };

        const clearFilters = () => {
            searchQuery.value = '';
            statusFilter.value = 'all';
            priorityFilter.value = 'all';
            projectFilter.value = 'all';
        };

        const handleSort = (field) => {
            if (sortBy.value === field) {
                sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
            } else {
                sortBy.value = field;
                sortOrder.value = 'asc';
            }
        };

        const getSortIcon = (field) => {
            if (sortBy.value !== field) return 'fas fa-sort';
            return sortOrder.value === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
        };

        return {
            searchQuery,
            statusFilter,
            priorityFilter,
            projectFilter,
            sortBy,
            sortOrder,
            showForm,
            editingTask,
            viewMode,
            filteredAndSortedTasks,
            taskStats,
            hasActiveFilters,
            getProjectById,
            getUserById,
            handleNewTask,
            handleEditTask,
            handleTaskSaved,
            handleTaskDeleted,
            handleStatusChanged,
            handleFormCancelled,
            clearFilters,
            handleSort,
            getSortIcon
        };
    },

    template: `
        <div class="space-y-6">
            <!-- Task List Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Tasks</h2>
                    <p class="text-gray-600 mt-1">
                        <span class="font-medium">{{ taskStats.total }}</span> task{{ taskStats.total !== 1 ? 's' : '' }} found
                        <span v-if="hasActiveFilters" class="text-sm">(filtered)</span>
                    </p>
                </div>
                <div class="flex items-center space-x-3">
                    <!-- View Mode Toggle -->
                    <div class="flex bg-gray-100 rounded-lg p-1">
                        <button
                            @click="viewMode = 'grid'"
                            :class="['px-3 py-1 text-sm font-medium rounded-md transition-colors',
                                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500']"
                            title="Grid View"
                        >
                            <i class="fas fa-th"></i>
                        </button>
                        <button
                            @click="viewMode = 'list'"
                            :class="['px-3 py-1 text-sm font-medium rounded-md transition-colors',
                                    viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500']"
                            title="List View"
                        >
                            <i class="fas fa-list"></i>
                        </button>
                    </div>

                    <!-- New Task Button -->
                    <button
                        @click="handleNewTask"
                        class="btn-primary"
                    >
                        <i class="fas fa-plus mr-2"></i>New Task
                    </button>
                </div>
            </div>

            <!-- Task Stats Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-tasks text-gray-400"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-500">Total</p>
                            <p class="text-2xl font-semibold text-gray-900">{{ taskStats.total }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-circle text-gray-400"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-500">To Do</p>
                            <p class="text-2xl font-semibold text-gray-900">{{ taskStats.todo }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-play text-blue-400"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-500">In Progress</p>
                            <p class="text-2xl font-semibold text-blue-600">{{ taskStats.inProgress }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-check-circle text-green-400"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-500">Completed</p>
                            <p class="text-2xl font-semibold text-green-600">{{ taskStats.completed }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters and Search -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <!-- Search -->
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Search tasks..."
                                class="form-input pl-10"
                            >
                            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                    </div>

                    <!-- Status Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select v-model="statusFilter" class="form-input">
                            <option value="all">All Status</option>
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <!-- Priority Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <select v-model="priorityFilter" class="form-input">
                            <option value="all">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <!-- Project Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Project</label>
                        <select v-model="projectFilter" class="form-input">
                            <option value="all">All Projects</option>
                            <option v-for="project in projects" :key="project.id" :value="project.id">
                                {{ project.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Filter Actions -->
                <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <button
                        v-if="hasActiveFilters"
                        @click="clearFilters"
                        class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                    >
                        <i class="fas fa-times mr-1"></i>Clear Filters
                    </button>
                    <div v-else></div>

                    <!-- Sort Options -->
                    <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-600">Sort by:</span>
                        <button
                            @click="handleSort('title')"
                            :class="['text-sm font-medium transition-colors flex items-center',
                                    sortBy === 'title' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800']"
                        >
                            Title
                            <i :class="getSortIcon('title')" class="ml-1 text-xs"></i>
                        </button>
                        <button
                            @click="handleSort('priority')"
                            :class="['text-sm font-medium transition-colors flex items-center',
                                    sortBy === 'priority' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800']"
                        >
                            Priority
                            <i :class="getSortIcon('priority')" class="ml-1 text-xs"></i>
                        </button>
                        <button
                            @click="handleSort('dueDate')"
                            :class="['text-sm font-medium transition-colors flex items-center',
                                    sortBy === 'dueDate' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800']"
                        >
                            Due Date
                            <i :class="getSortIcon('dueDate')" class="ml-1 text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredAndSortedTasks.length === 0" class="text-center py-12">
                <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fas fa-search text-2xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p class="text-gray-600 mb-4">
                    {{ hasActiveFilters ? 'Try adjusting your filters or' : 'Get started by creating your first task.' }}
                </p>
                <button
                    @click="hasActiveFilters ? clearFilters() : handleNewTask()"
                    class="btn-primary"
                >
                    <i :class="hasActiveFilters ? 'fas fa-filter mr-2' : 'fas fa-plus mr-2'"></i>
                    {{ hasActiveFilters ? 'Clear Filters' : 'Create Task' }}
                </button>
            </div>

            <!-- Task Grid/List -->
            <div v-else>
                <div :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'">
                    <task-card
                        v-for="task in filteredAndSortedTasks"
                        :key="task.id"
                        :task="task"
                        :project="getProjectById(task.projectId)"
                        :assigned-user="getUserById(task.assignedTo)"
                        @task-updated="handleEditTask"
                        @task-deleted="handleTaskDeleted"
                        @status-changed="handleStatusChanged"
                    />
                </div>
            </div>

            <!-- Task Form Modal -->
            <task-form
                :is-visible="showForm"
                :task="editingTask"
                :projects="projects"
                :users="users"
                @task-saved="handleTaskSaved"
                @form-cancelled="handleFormCancelled"
            />
        </div>
    `
};

console.log('📄 TaskList component loaded successfully!');
