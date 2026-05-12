// Audio Soundboard JavaScript

// Array containing all audio samples
const samples = [
  { name: "Ah-Ha", file: "Audio/aha.mp3" },
  { name: "Dan", file: "Audio/dan.mp3" },
  { name: "Back of the net", file: "Audio/back.mp3" },
  { name: "Bang out of order", file: "Audio/bang.mp3" },
  { name: "Email of the evening", file: "Audio/email.mp3" },
  { name: "Hello Partridge", file: "Audio/hello.mp3" },
  { name: "I'm confused", file: "Audio/im confused.mp3" },
  { name: "La", file: "Audio/la.mp3" }
];

/**
 * Loads and displays all audio samples
 */
function loadSamples() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  // Create audio card for each sample
  samples.forEach((sample, index) => {
    const sampleCard = createSampleCard(sample, index);
    grid.appendChild(sampleCard);
  });
}

/**
 * Creates an individual audio sample card
 */
function createSampleCard(sample, index) {
  const card = document.createElement("div");
  card.className = "sample";

  // Create audio element
  const audio = new Audio(sample.file);

  // Create card content
  card.innerHTML = `
    <h3>${sample.name}</h3>
    <p class="duration">Loading...</p>
  `;

  // Load audio metadata to get duration
  audio.addEventListener("loadedmetadata", () => {
    const duration = audio.duration.toFixed(2);
    const durationElement = card.querySelector(".duration");
    durationElement.textContent = `${duration}s`;
  });

  // Handle audio playback on click
  card.addEventListener("click", () => {
    playAudioSample(audio);
  });

  return card;
}

/**
 * Plays an audio sample
 */
function playAudioSample(audio) {
  // Reset audio to start
  audio.currentTime = 0;

  // Play the audio
  audio.play().catch(error => {
    console.error("Error playing audio:", error);
    alert("Error playing audio: " + error.message);
  });
}

/**
 * Converts text to speech
 */
function speakText() {
  const textInput = document.getElementById("text");
  const text = textInput.value.trim();

  if (!text) {
    alert("Please enter some text to speak");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Create speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Start speech synthesis
  window.speechSynthesis.speak(utterance);
}

/**
 * Initialize the application
 */
function initializeApp() {
  loadSamples();
  console.log(`Audio Soundboard initialized with ${samples.length} samples`);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeApp);