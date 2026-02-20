// Get needed DOM elements

const form = document.getElementById("checkInForm");
const teamSelect = document.getElementById("teamSelect");
const nameInput = document.getElementById("attendeeName");

// Handle Form Submission
form.addEventListener('submit', function(event){
  event.preventDefault(); // prevent from refreshing the page once submission hits
  const name = nameInput.value;
  const team = teamSelect.value; 

  const teamName = teamSelect.selectedOptions[0].text; // Get the text of the selected option
  console.log(name, teamName);
  //Increment count
  count++;
  console.log("Total Check Ins: "+ count);

  // Update Progress Bar
  const percent = Math.round(count * 100/ countMax)  + "%";
  console.log("Progress: "+ percent);

  const teamCounter = document.getElementById(team + 'Count');
  teamCounter.textContent = parseInt(teamCounter.textContent)+1;

  // show welcome message
  const message = 'Welcome ' + name + ' from team ' + teamName;
  console.log(message);
  form.reset();
});
// Track attendence 

let count = 0;
const countMax = 50;
