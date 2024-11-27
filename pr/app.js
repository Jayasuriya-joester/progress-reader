// Show the selected section and slide it into view
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active');
}

// Timetable Functionality (Calendar)
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const currentDate = new Date();
    const monthYearDisplay = document.getElementById('month-year');
    
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    monthYearDisplay.innerHTML = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendar.innerHTML = ''; // Clear previous calendar
    
    // Generate day blocks for the current month
    for (let i = 1; i <= lastDate; i++) {
        const dayBlock = document.createElement('div');
        dayBlock.innerHTML = i;
        dayBlock.addEventListener('click', () => showTasksForDay(i));
        calendar.appendChild(dayBlock);
    }
}

// Show tasks for a selected day
function showTasksForDay(day) {
    const tasksForDay = document.getElementById('tasks-for-day');
    tasksForDay.innerHTML = `<h3>Tasks for Day ${day}</h3>`;

    const taskList = document.createElement('ul');
    const tasks = JSON.parse(localStorage.getItem(`tasks-day-${day}`) || '[]');

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });

    tasksForDay.appendChild(taskList);
}

// Add task for the day
function addTaskForDay(day) {
    const taskInput = prompt('Enter task for day ' + day);
    if (taskInput) {
        const tasks = JSON.parse(localStorage.getItem(`tasks-day-${day}`) || '[]');
        tasks.push(taskInput);
        localStorage.setItem(`tasks-day-${day}`, JSON.stringify(tasks));
        showTasksForDay(day); // Refresh task list
    }
}

// Calorie Counter Functionality
let totalCaloriesConsumed = 0;
let totalCaloriesBurned = 0;

function addCalories(type) {
    const caloriesInput = document.getElementById(type === 'consumed' ? 'calories-consumed' : 'calories-burned');
    const calories = parseInt(caloriesInput.value);

    if (calories && !isNaN(calories)) {
        if (type === 'consumed') {
            totalCaloriesConsumed += calories;
            document.getElementById('total-consumed').textContent = totalCaloriesConsumed;
        } else if (type === 'burned') {
            totalCaloriesBurned += calories;
            document.getElementById('total-burned').textContent = totalCaloriesBurned;
        }

        caloriesInput.value = ''; // Clear input field
    }
}

// Checklist Functionality
function createChecklist() {
    const checklistName = document.getElementById('checklist-name').value;
    if (checklistName) {
        const checklistContainer = document.getElementById('checklist-container');
        const checklistList = document.createElement('ul');
        checklistList.classList.add('checklist-list');

        const listTitle = document.createElement('li');
        listTitle.textContent = checklistName;
        checklistList.appendChild(listTitle);

        const addTaskBtn = document.createElement('button');
        addTaskBtn.textContent = 'Add Task to ' + checklistName;
        addTaskBtn.onclick = () => addTaskToChecklist(checklistName);
        checklistContainer.appendChild(addTaskBtn);

        checklistContainer.appendChild(checklistList);
    }
}

// Add task to specific checklist
function addTaskToChecklist(checklistName) {
    const task = prompt(`Enter task for ${checklistName}`);
    if (task) {
        const checklistContainer = document.getElementById('checklist-container');
        const checklistList = checklistContainer.querySelector(`ul:contains('${checklistName}')`);
        const taskItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        taskItem.textContent = task;
        taskItem.appendChild(checkbox);
        checklistList.appendChild(taskItem);
    }
}

// Timer Functionality
let timerInterval;
let timerSeconds = 0;

function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        timerSeconds++;
        document.getElementById('timer-display').textContent = formatTime(timerSeconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerSeconds = 0;
    document.getElementById('timer-display').textContent = formatTime(timerSeconds);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
}

// Initialize calendar on page load
window.onload = function () {
    generateCalendar();
    showSection('timetable'); // Show Timetable by default
};