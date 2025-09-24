/**
 * TaskForm Component
 *
 * A modal form for creating and editing tasks with comprehensive
 * validation and user-friendly interface.
 */

const TaskForm = {
    props: {
        task: {
            type: Object,
            default: null
        },
        projects: {
            type: Array,
            default: () => []
        },
        users: {
            type: Array,
            default: () => []
        },
        isVisible: {
            type: Boolean,
            default: false
        }
    },

    emits: ['task-saved', 'form-cancelled'],

    setup(props, { emit }) {
        const { ref, reactive, computed, watch } = Vue;

        // Form state
        const form = reactive({
            title: '',
            description: '',
            projectId: '',
            assignedTo: '',
            priority: 'medium',
            status: 'todo',
            dueDate: '',
            estimatedHours: ''
        });

        const errors = ref({});
        const isSubmitting = ref(false);

        // Helper function - declare before use
        const resetForm = () => {
            Object.assign(form, {
                title: '',
                description: '',
                projectId: '',
                assignedTo: '',
                priority: 'medium',
                status: 'todo',
                dueDate: '',
                estimatedHours: ''
            });
            errors.value = {};
        };

        // Watch for task prop changes (edit mode)
        watch(() => props.task, (newTask) => {
            if (newTask) {
                Object.assign(form, {
                    title: newTask.title || '',
                    description: newTask.description || '',
                    projectId: newTask.projectId ? newTask.projectId.toString() : '',
                    assignedTo: newTask.assignedTo ? newTask.assignedTo.toString() : '',
                    priority: newTask.priority || 'medium',
                    status: newTask.status || 'todo',
                    dueDate: newTask.dueDate ? newTask.dueDate.split('T')[0] : '',
                    estimatedHours: newTask.estimatedHours ? newTask.estimatedHours.toString() : ''
                });
            } else {
                resetForm();
            }
        }, { immediate: true });

        // Computed properties
        const isEditMode = computed(() => !!props.task);
        const formTitle = computed(() => isEditMode.value ? 'Edit Task' : 'Create New Task');

        // Get today's date for minimum date validation
        const today = computed(() => {
            const date = new Date();
            return date.toISOString().split('T')[0];
        });

        // Validation
        const validateForm = () => {
            errors.value = {};

            if (!form.title.trim()) {
                errors.value.title = 'Title is required';
            } else if (form.title.trim().length < 3) {
                errors.value.title = 'Title must be at least 3 characters';
            }

            if (!form.description.trim()) {
                errors.value.description = 'Description is required';
            } else if (form.description.trim().length < 10) {
                errors.value.description = 'Description must be at least 10 characters';
            }

            if (!form.projectId) {
                errors.value.projectId = 'Project is required';
            }

            if (!form.assignedTo) {
                errors.value.assignedTo = 'Assignee is required';
            }

            if (form.dueDate && new Date(form.dueDate) < new Date(today.value)) {
                errors.value.dueDate = 'Due date cannot be in the past';
            }

            if (form.estimatedHours) {
                const hours = parseFloat(form.estimatedHours);
                if (isNaN(hours) || hours <= 0) {
                    errors.value.estimatedHours = 'Estimated hours must be a positive number';
                } else if (hours > 100) {
                    errors.value.estimatedHours = 'Estimated hours cannot exceed 100';
                }
            }

            return Object.keys(errors.value).length === 0;
        };

        // Form handlers
        const handleSubmit = async () => {
            if (!validateForm()) {
                // Focus on first error field
                const firstErrorField = Object.keys(errors.value)[0];
                const element = document.querySelector(`[name="${firstErrorField}"]`);
                if (element) element.focus();
                return;
            }

            isSubmitting.value = true;

            try {
                const taskData = {
                    title: form.title.trim(),
                    description: form.description.trim(),
                    projectId: parseInt(form.projectId),
                    assignedTo: parseInt(form.assignedTo),
                    priority: form.priority,
                    status: form.status,
                    dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
                    estimatedHours: form.estimatedHours ? parseFloat(form.estimatedHours) : null,
                    updatedAt: new Date().toISOString()
                };

                if (isEditMode.value) {
                    taskData.id = props.task.id;
                    taskData.createdAt = props.task.createdAt;
                    taskData.createdBy = props.task.createdBy;
                } else {
                    taskData.createdAt = new Date().toISOString();
                    taskData.createdBy = 1; // Default to first user for demo
                    taskData.tags = [];
                }

                emit('task-saved', taskData);
                resetForm();

            } catch (error) {
                console.error('Error saving task:', error);
            } finally {
                isSubmitting.value = false;
            }
        };

        const handleCancel = () => {
            resetForm();
            emit('form-cancelled');
        };

        // Handle escape key to close modal
        const handleKeydown = (event) => {
            if (event.key === 'Escape' && props.isVisible) {
                handleCancel();
            }
        };

        // Add/remove event listener for escape key
        watch(() => props.isVisible, (visible) => {
            if (visible) {
                document.addEventListener('keydown', handleKeydown);
                // Focus on first input when modal opens
                setTimeout(() => {
                    const firstInput = document.querySelector('.task-form input[name="title"]');
                    if (firstInput) firstInput.focus();
                }, 100);
            } else {
                document.removeEventListener('keydown', handleKeydown);
            }
        });

        return {
            form,
            errors,
            isSubmitting,
            formTitle,
            isEditMode,
            today,
            handleSubmit,
            handleCancel,
            resetForm
        };
    },

    template: `
        <div v-if="isVisible" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto task-form">
                <!-- Form Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 class="text-xl font-semibold text-gray-900">{{ formTitle }}</h2>
                    <button @click="handleCancel" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <!-- Form Content -->
                <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
                    <!-- Title -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Task Title *
                        </label>
                        <input
                            v-model="form.title"
                            name="title"
                            type="text"
                            :class="['form-input', errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']"
                            placeholder="Enter a clear, descriptive task title"
                            maxlength="100"
                        >
                        <div class="flex justify-between mt-1">
                            <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
                            <p class="text-gray-400 text-xs">{{ form.title.length }}/100</p>
                        </div>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            v-model="form.description"
                            name="description"
                            rows="4"
                            :class="['form-input', errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']"
                            placeholder="Provide details about what needs to be done, requirements, and any relevant context"
                            maxlength="500"
                        ></textarea>
                        <div class="flex justify-between mt-1">
                            <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
                            <p class="text-gray-400 text-xs">{{ form.description.length }}/500</p>
                        </div>
                    </div>

                    <!-- Project and Assignee Row -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Project -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Project *
                            </label>
                            <select
                                v-model="form.projectId"
                                name="projectId"
                                :class="['form-input', errors.projectId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']"
                            >
                                <option value="">Select a project</option>
                                <option v-for="project in projects" :key="project.id" :value="project.id.toString()">
                                    {{ project.name }}
                                </option>
                            </select>
                            <p v-if="errors.projectId" class="text-red-500 text-sm mt-1">{{ errors.projectId }}</p>
                        </div>

                        <!-- Assignee -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Assign To *
                            </label>
                            <select
                                v-model="form.assignedTo"
                                name="assignedTo"
                                :class="['form-input', errors.assignedTo ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']"
                            >
                                <option value="">Select a team member</option>
                                <option v-for="user in users" :key="user.id" :value="user.id.toString()">
                                    {{ user.name }} - {{ user.role }}
                                </option>
                            </select>
                            <p v-if="errors.assignedTo" class="text-red-500 text-sm mt-1">{{ errors.assignedTo }}</p>
                        </div>
                    </div>

                    <!-- Priority and Status Row -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Priority -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Priority
                            </label>
                            <select v-model="form.priority" class="form-input">
                                <option value="low">🟢 Low Priority</option>
                                <option value="medium">🟡 Medium Priority</option>
                                <option value="high">🔴 High Priority</option>
                            </select>
                        </div>

                        <!-- Status -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select v-model="form.status" class="form-input">
                                <option value="todo">📝 To Do</option>
                                <option value="in_progress">⏳ In Progress</option>
                                <option value="completed">✅ Completed</option>
                            </select>
                        </div>
                    </div>

                    <!-- Due Date and Estimated Hours Row -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Due Date -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Due Date
                            </label>
                            <input
                                v-model="form.dueDate"
                                name="dueDate"
                                type="date"
                                :min="today"
                                :class="['form-input', errors.dueDate ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']"
                            >
                            <p v-if="errors.dueDate" class="text-red-500 text-sm mt-1">{{ errors.dueDate }}</p>
                        </div>

                        <!-- Estimated Hours -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Estimated Hours
                            </label>
                            <input
                                v-model="form.estimatedHours"
                                name="estimatedHours"
                                type="number"
                                step="0.25"
                                min="0"
                                max="100"
                                :class="['form-input', errors.estimatedHours ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '']"
                                placeholder="e.g. 2.5"
                            >
                            <p v-if="errors.estimatedHours" class="text-red-500 text-sm mt-1">{{ errors.estimatedHours }}</p>
                        </div>
                    </div>
                </form>

                <!-- Form Actions -->
                <div class="flex items-center justify-end space-x-4 px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                    <button
                        type="button"
                        @click="handleCancel"
                        class="btn-secondary"
                        :disabled="isSubmitting"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        @click="handleSubmit"
                        :disabled="isSubmitting"
                        class="btn-primary"
                    >
                        <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
                        {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Task' : 'Create Task') }}
                    </button>
                </div>
            </div>
        </div>
    `
};

console.log('📝 TaskForm component loaded successfully!');