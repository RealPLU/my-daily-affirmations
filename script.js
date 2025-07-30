/*
 * Behaviour for the My Daily Affirmations app.
 *
 * The main button invokes the browser's SpeechSynthesis API to
 * recite a sequence of four affirmations provided by the user.
 * A press counter is persisted in localStorage so that the total
 * number of presses survives page reloads. The counter text
 * automatically pluralises the word "time".
 */

// Get references to DOM elements
const affirmationBtn = document.getElementById('affirmationBtn');
const resetBtn = document.getElementById('resetBtn');
const counterDisplay = document.getElementById('counterDisplay');

// Retrieve the persisted count from localStorage, defaulting to zero.
let count = parseInt(localStorage.getItem('affirmationCount')) || 0;
updateCounter();

// Grab a handle to the audio element containing your pre‑recorded
// affirmations. This element is defined in index.html. When the
// main button is clicked the audio will rewind to the beginning and
// play. You can swap out the underlying MP3 file without changing
// this script.
const affirmationAudio = document.getElementById('affirmationAudio');

// Handle clicks on the main button.
affirmationBtn.addEventListener('click', () => {
  // Play the prerecorded affirmations. Reset playback in case the
  // audio was already partially through on a previous click.
  if (affirmationAudio) {
    affirmationAudio.currentTime = 0;
    affirmationAudio.play();
  }
  // Increment and persist the press count
  count++;
  localStorage.setItem('affirmationCount', count);
  updateCounter();
  
  // Add a brief visual feedback effect
  affirmationBtn.classList.add('clicked');
  setTimeout(() => {
    affirmationBtn.classList.remove('clicked');
  }, 200);
});

// Handle clicks on the reset button
resetBtn.addEventListener('click', () => {
  count = 0;
  localStorage.removeItem('affirmationCount');
  updateCounter();
});

// Function to update the counter display text
function updateCounter() {
  counterDisplay.textContent = `Pressed ${count} ${count === 1 ? 'time' : 'times'}`;
}

// In this version of the application we no longer use the browser's
// speech synthesis API because a pre‑recorded MP3 is provided by
// the user. The speakAffirmations function has been removed.
