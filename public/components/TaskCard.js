/**
 * TaskCard Component
 *
 * Displays individual tasks with priority indicators, status badges,
 * user assignments, and action buttons for task management.
 */

const TaskCard = {
    props: {
        task: {
            type: Object,
            required: true
        },
        project: {
            type: Object,
            default: null
        },
        assignedUser: {
            type: Object,
            default: null
        }
    },

    emits: ['task-updated', 'task-deleted', 'status-changed'],

    setup(props, { emit }) {
        const { computed } = Vue;

        // Computed properties for visual indicators
        const priorityColor = computed(() => {
            const colors = {
                low: 'bg-gray-100 text-gray-800 border-gray-200',
                medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                high: 'bg-red-100 text-red-800 border-red-200'
            };
            return colors[props.task.priority] || colors.low;
        });

        const statusColor = computed(() => {
            const colors = {
                todo: 'bg-gray-100 text-gray-800',
                in_progress: 'bg-blue-100 text-blue-800',
                completed: 'bg-green-100 text-green-800'
            };
            return colors[props.task.status] || colors.todo;
        });

        const isOverdue = computed(() => {
            if (!props.task.dueDate || props.task.status === 'completed') return false;
            return new Date(props.task.dueDate) < new Date();
        });

        // Event handlers
        const handleStatusChange = (newStatus) => {
            emit('status-changed', { taskId: props.task.id, status: newStatus });
        };

        const handleEdit = () => {
            emit('task-updated', props.task);
        };

        const handleDelete = () => {
            if (confirm('Are you sure you want to delete this task?')) {
                emit('task-deleted', props.task.id);
            }
        };

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        };

        return {
            priorityColor,
            statusColor,
            isOverdue,
            handleStatusChange,
            handleEdit,
            handleDelete,
            formatDate
        };
    },

    template: `
        <div class="task-card hover-lift">
            <!-- Task Header -->
            <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
                    {{ task.title }}
                </h3>
                <div class="flex flex-col space-y-1 flex-shrink-0">
                    <span :class="priorityColor" class="px-2 py-1 text-xs font-medium rounded-full border">
                        {{ task.priority.toUpperCase() }}
                    </span>
                    <span :class="statusColor" class="px-2 py-1 text-xs font-medium rounded-full">
                        {{ task.status.replace('_', ' ').toUpperCase() }}
                    </span>
                </div>
            </div>

            <!-- Task Description -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ task.description }}
            </p>

            <!-- Task Metadata -->
            <div class="space-y-2 mb-4">
                <!-- Assigned User -->
                <div v-if="assignedUser" class="flex items-center space-x-2">
                    <img
                        :src="assignedUser.avatar"
                        :alt="assignedUser.name"
                        class="avatar avatar-sm"
                    >
                    <div class="flex-1 min-w-0">
                        <span class="text-sm font-medium text-gray-900">{{ assignedUser.name }}</span>
                        <span class="text-xs text-gray-500 block">{{ assignedUser.role }}</span>
                    </div>
                </div>

                <!-- Project -->
                <div v-if="project" class="flex items-center space-x-2">
                    <div
                        class="w-3 h-3 rounded-full flex-shrink-0"
                        :style="{ backgroundColor: project.color }"
                    ></div>
                    <span class="text-sm text-gray-600 truncate">{{ project.name }}</span>
                </div>

                <!-- Due Date -->
                <div v-if="task.dueDate" class="flex items-center space-x-2">
                    <i :class="['fas fa-calendar-alt text-xs', isOverdue ? 'text-red-500' : 'text-gray-400']"></i>
                    <span :class="['text-sm', isOverdue ? 'text-red-600 font-medium' : 'text-gray-600']">
                        Due {{ formatDate(task.dueDate) }}
                        <span v-if="isOverdue" class="text-xs">(Overdue)</span>
                    </span>
                </div>

                <!-- Estimated Hours -->
                <div v-if="task.estimatedHours" class="flex items-center space-x-2">
                    <i class="fas fa-clock text-xs text-gray-400"></i>
                    <span class="text-sm text-gray-600">{{ task.estimatedHours }}h estimated</span>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="flex space-x-2">
                    <!-- Status Change Buttons -->
                    <button
                        v-if="task.status === 'todo'"
                        @click="handleStatusChange('in_progress')"
                        class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                        title="Start Task"
                    >
                        <i class="fas fa-play mr-1"></i>Start
                    </button>

                    <button
                        v-if="task.status !== 'completed'"
                        @click="handleStatusChange('completed')"
                        class="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                        title="Mark Complete"
                    >
                        <i class="fas fa-check mr-1"></i>Complete
                    </button>

                    <button
                        v-if="task.status === 'completed'"
                        @click="handleStatusChange('todo')"
                        class="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors"
                        title="Reopen Task"
                    >
                        <i class="fas fa-undo mr-1"></i>Reopen
                    </button>
                </div>

                <div class="flex space-x-3">
                    <button
                        @click="handleEdit"
                        class="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Edit Task"
                    >
                        <i class="fas fa-edit"></i>
                    </button>
                    <button
                        @click="handleDelete"
                        class="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Task"
                    >
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `
};

// Register component globally for use in templates
if (typeof window !== 'undefined' && window.Vue) {
    // Will be registered when main app initializes
}

console.log('🃏 TaskCard component loaded successfully!');