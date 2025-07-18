
        let tasks = [];
        let taskIdCounter = 0;

        const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        const stats = document.getElementById('stats');
        const totalTasks = document.getElementById('totalTasks');
        const completedTasks = document.getElementById('completedTasks');
        const remainingTasks = document.getElementById('remainingTasks');

        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText === '') return;

            const task = {
                id: taskIdCounter++,
                text: taskText,
                completed: false
            };

            tasks.push(task);
            taskInput.value = '';
            renderTasks();
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
            }
        }

        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
        }

        function renderTasks() {
            taskList.innerHTML = '';
            
            if (tasks.length === 0) {
                emptyState.style.display = 'block';
                stats.style.display = 'none';
                return;
            }

            emptyState.style.display = 'none';
            stats.style.display = 'flex';

            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                    <span class="task-text">${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                `;
                
                taskList.appendChild(li);
            });

            updateStats();
        }

        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const remaining = total - completed;

            totalTasks.textContent = total;
            completedTasks.textContent = completed;
            remainingTasks.textContent = remaining;
        }

        // Event listeners
        addBtn.addEventListener('click', addTask);
        
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Initial render
        renderTasks();
