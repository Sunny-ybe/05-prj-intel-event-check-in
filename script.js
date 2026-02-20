// Get needed DOM elements
const form = document.getElementById("checkInForm");
const teamSelect = document.getElementById("teamSelect");
const nameInput = document.getElementById("attendeeName");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

// Track attendance
let count = 0;
const countMax = 50;

// Team counts object
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

// Save progress to localStorage
function saveProgress() {
  const data = {
    count: count,
    teamCounts: teamCounts,
  };
  localStorage.setItem("eventCheckInProgress", JSON.stringify(data));
}

// Load progress from localStorage
function loadProgress() {
  const saved = localStorage.getItem("eventCheckInProgress");
  if (saved) {
    const data = JSON.parse(saved);
    count = data.count || 0;
    if (data.teamCounts) {
      teamCounts.water = data.teamCounts.water || 0;
      teamCounts.zero = data.teamCounts.zero || 0;
      teamCounts.power = data.teamCounts.power || 0;
    }
  }
}

// Update team counts on page
function updateTeamCountsOnPage() {
  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;
}

// Update attendance display
function updateAttendanceUI() {
  attendeeCount.textContent = count;
  const percent = Math.min(Math.round((count * 100) / countMax), 100);
  progressBar.style.width = percent + "%";
}

// Show personalized greeting message
function showMessage(messageText) {
  greeting.textContent = messageText;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
}

// Show goal celebration
function showGoalCelebration() {
  greeting.textContent =
    "🎉 Goal reached! 50 attendees checked in. Great job, teams!";
  greeting.classList.add("goal-message");
  greeting.style.display = "block";
  document.body.classList.add("goal-reached");
}

// Check if goal is met
function checkGoal() {
  if (count >= countMax) {
    showGoalCelebration();
  }
}

// Handle Form Submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const team = teamSelect.value;

  if (!name || !team) {
    return;
  }

  const teamName = teamSelect.selectedOptions[0].text;

  // Increment count
  count = count + 1;
  teamCounts[team] = teamCounts[team] + 1;

  // Update attendee count display
  updateAttendanceUI();

  // Update team counts on page
  updateTeamCountsOnPage();

  // Show personalized welcome message
  const message = "Welcome " + name + " from " + teamName + "!";
  showMessage(message);

  // Save progress to localStorage
  saveProgress();

  // Check if goal is met
  checkGoal();

  form.reset();
  nameInput.focus();
});

// Load saved progress on page load
loadProgress();
updateAttendanceUI();
updateTeamCountsOnPage();
checkGoal();
