/**
 * TaskList Component
 *
 * Main component for displaying and managing tasks.
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
        const showForm = ref(false);
        const editingTask = ref(null);
        const viewMode = ref('grid'); // 'grid' or 'list'

        // Computed properties
        const taskStats = computed(() => {
            return {
                total: props.tasks.length,
                todo: props.tasks.filter(t => t.status === 'todo').length,
                inProgress: props.tasks.filter(t => t.status === 'in_progress').length,
                completed: props.tasks.filter(t => t.status === 'completed').length
            };
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

        return {
            showForm,
            editingTask,
            viewMode,
            taskStats,
            getProjectById,
            getUserById,
            handleNewTask,
            handleEditTask,
            handleTaskSaved,
            handleTaskDeleted,
            handleStatusChanged,
            handleFormCancelled
        };
    },

    template: `
        <div class="space-y-6">
            <!-- Task List Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900">Tasks</h2>
                    <p class="text-gray-600 mt-1">
                        <span class="font-medium">{{ taskStats.total }}</span> task{{ taskStats.total !== 1 ? 's' : '' }}
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

            <!-- Empty State -->
            <div v-if="tasks.length === 0" class="text-center py-12">
                <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fas fa-tasks text-2xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                <p class="text-gray-600 mb-4">
                    Get started by creating your first task.
                </p>
                <button
                    @click="handleNewTask"
                    class="btn-primary"
                >
                    <i class="fas fa-plus mr-2"></i>Create Task
                </button>
            </div>

            <!-- Task Grid/List -->
            <div v-else>
                <div :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'">
                    <task-card
                        v-for="task in tasks"
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
