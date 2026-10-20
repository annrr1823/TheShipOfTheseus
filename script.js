const CORRECT_ACCESS_CODE = "interlinked";

const loginScreen = document.querySelector("#login-screen");
const archiveScreen = document.querySelector("#archive-screen");
const accessForm = document.querySelector("#access-form");
const accessCodeInput = document.querySelector("#access-code");
const accessError = document.querySelector("#access-error");
const terminalOutput = document.querySelector("#terminal-output");
const interaction = document.querySelector("#interaction");

const state = {
  playerName: "User",
  currentQuestion: 0,
};

const initializationLog = [
  "INITIALIZING ARCHIVE...",
  "[OK] DATABASE CONNECTION",
  "[OK] SUBJECT RECORDS",
  "[OK] COGNITIVE DATA",
  "[OK] EXPERIMENT LOGS",
  "[OK] DISTILLATE STORAGE",
];

const processLog = [
  "CHECKING ACTIVE PROCESSES...",
  "PROCESS: R-DISTILLATE",
  "STATUS: ACTIVE",
  "PROCESS: A-DISTILLATE",
  "STATUS: ACTIVE",
];

const warningLog = [
  "WARNING",
  "UNAUTHORIZED PROCESS DETECTED.",
  "PID: 0063",
  "LOCATION: UNKNOWN",
];

const questions = [
  {
    label: "Question 01",
    text: "First question.\n\nWho caused all of this?",
    options: [
      { label: "A. George Russell", correct: false },
      { label: "B. Max Verstappen", correct: false },
      { label: "C. FIA", correct: true },
      { label: "D. You", correct: false },
    ],
  },
  {
    label: "Question 02",
    text: "Second question.\n\nThen... who am I?",
    options: [
      { label: "A. George Russell", correct: true },
      { label: "B. Max Verstappen", correct: false },
      { label: "C. FIA", correct: false },
      { label: "D. You", correct: false },
    ],
  },
  {
    label: "Question 03",
    text: "One last question.\n\nAnd what am I to Max Verstappen?",
    options: [
      { label: "A. His friend", correct: false },
      { label: "B. His enemy", correct: false },
      { label: "C. His teammate", correct: false },
      { label: "D. His other half", correct: true },
    ],
  },
];

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function clearInteraction() {
  interaction.replaceChildren();
}

function appendLine(text, variant = "") {
  const line = document.createElement("div");
  line.className = `line ${variant}`.trim();
  line.textContent = text;
  terminalOutput.append(line);
  line.scrollIntoView({ block: "end", behavior: "smooth" });
}

async function appendLines(lines, delay = 430) {
  for (const line of lines) {
    const variant = line.includes("[OK]")
      ? "line--ok"
      : line === "WARNING" || line.includes("UNAUTHORIZED")
        ? "line--warning"
        : "";

    appendLine(line, variant);
    await wait(delay);
  }
}

function showMessage(text) {
  clearInteraction();

  const message = document.createElement("p");
  message.className = "message";
  message.textContent = text;
  interaction.append(message);

  return message;
}

function showChoices(choices) {
  const choiceGrid = document.createElement("div");
  choiceGrid.className = "choice-grid";

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice.label;
    button.addEventListener("click", choice.onSelect);
    choiceGrid.append(button);
  });

  interaction.append(choiceGrid);
}

function showInputPrompt({ label, buttonLabel, onSubmit }) {
  clearInteraction();

  const form = document.createElement("form");
  form.autocomplete = "off";

  const inputLabel = document.createElement("label");
  inputLabel.className = "prompt-label";
  inputLabel.textContent = label;

  const row = document.createElement("div");
  row.className = "input-row";

  const input = document.createElement("input");
  input.type = "text";
  input.spellcheck = false;

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = buttonLabel;

  row.append(input, button);
  form.append(inputLabel, row);
  interaction.append(form);
  input.focus();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(input.value.trim());
  });
}

async function startArchive() {
  loginScreen.classList.add("is-hidden");
  archiveScreen.classList.remove("is-hidden");

  appendLine("ACCESS GRANTED", "line--ok");
  appendLine("");
  appendLine("LOADING...");

  await wait(1800);
  terminalOutput.replaceChildren();

  await appendLines(initializationLog);
  await wait(850);
  terminalOutput.replaceChildren();

  await appendLines(processLog);
  await wait(850);
  terminalOutput.replaceChildren();

  await appendLines(warningLog);

  await wait(650);
  appendLine("");
  appendLine("> SYSTEM MESSAGE");
  appendLine("");
  appendLine("Who are you?");

  await wait(1300);
  terminalOutput.replaceChildren();

  showInputPrompt({
    label: "IDENTIFY YOURSELF",
    buttonLabel: "SUBMIT",
    onSubmit: async (value) => {
      state.playerName = value || "User";
      clearInteraction();
      await wait(500);

      const identity = state.playerName.toLowerCase();
      if (identity === "fia" || identity === "toto") {
        showFiaWarning();
        return;
      }

      beginQuestionIntro();
    },
  });
}

async function beginQuestionIntro() {
  clearInteraction();
  await wait(400);
  showMessage(
    `Since you've made it this far, ${state.playerName}...\n\n` +
      "I suppose you already know the truth.\nOr at least, most of it.\n\n" +
      "But knowing the truth and truly understanding it are two different things.\n\n" +
      "So, before you go any further-\n\n" +
      "Answer a few questions.",
  );

  await wait(5200);
  clearInteraction();
  showQuestion(0);
}

function showQuestion(index) {
  const question = questions[index];
  state.currentQuestion = index;

  showMessage(question.text);
  showChoices(
    question.options.map((option) => ({
      label: option.label,
      onSelect: () => {
        if (!option.correct) {
          showWrongAnswer();
          return;
        }

        const nextIndex = index + 1;
        if (nextIndex >= questions.length) {
          showFinalAnswer();
          return;
        }

        showQuestion(nextIndex);
      },
    })),
  );
}

async function showFiaWarning() {
  clearInteraction();
  terminalOutput.replaceChildren();
  document.body.classList.add("is-blackout");
  document.body.classList.remove("is-whiteout");

  const warning = document.createElement("div");
  warning.className = "warning-panel";
  warning.textContent = "WARNING";
  archiveScreen.replaceChildren(warning);

  await wait(3700);
  archiveScreen.replaceChildren();
  document.body.classList.remove("is-blackout");
  document.body.classList.add("is-whiteout");

  await wait(650);
  document.body.classList.remove("is-whiteout");
  document.body.classList.add("is-blackout");
  archiveScreen.replaceChildren();
}

async function showWrongAnswer() {
  showMessage("No.\n\nYou still don't understand.");
  await wait(2200);

  terminalOutput.replaceChildren();
  clearInteraction();
  document.body.classList.add("is-blackout");
}

const pieceModal = document.querySelector("#piece-modal");
const pieceModalPanel = document.querySelector("#piece-modal-panel");
const pieceModalFrame = document.querySelector("#piece-modal-frame");
const pieceShards = document.querySelector("#piece-shards");
const alarmOverlay = document.querySelector("#alarm-overlay");
const blackoutVeil = document.querySelector("#blackout-veil");

function buildShards() {
  pieceShards.replaceChildren();
  const cols = 4;
  const rows = 4;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const shard = document.createElement("div");
      shard.className = "piece-shard";
      shard.style.setProperty("--col", String(col));
      shard.style.setProperty("--row", String(row));
      shard.style.setProperty("--cols", String(cols));
      shard.style.setProperty("--rows", String(rows));
      shard.style.setProperty("--tx", `${(Math.random() * 2 - 1) * 140}vw`);
      shard.style.setProperty("--ty", `${(Math.random() * 2 - 1) * 90}vh`);
      shard.style.setProperty("--rot", `${(Math.random() * 2 - 1) * 720}deg`);
      shard.style.setProperty("--delay", `${Math.random() * 120}ms`);
      pieceShards.append(shard);
    }
  }
}

async function showFinalAnswer() {
  showMessage("...\n\nYou got them all right.\n\nSo you finally understand.");
  await wait(2800);

  showMessage(
    "Go find Max. I need your help.\n\n" +
      "Take this fragment to the place where flowers die and flames rage in the dark.\n" +
      "There, seek him through a light that should not exist.",
  );
  await wait(5200);

  clearInteraction();
  terminalOutput.replaceChildren();

  pieceModal.hidden = false;
  document.body.classList.add("piece-open");
  await wait(2800);

  pieceModalPanel.classList.add("is-shaking");
  await wait(1600);

  buildShards();
  pieceModalPanel.classList.remove("is-shaking");
  pieceModalPanel.classList.add("is-shattering");
  pieceModalFrame.classList.add("is-shattering-host");
  await wait(1400);

  pieceModal.hidden = true;
  document.body.classList.remove("piece-open");
  document.body.classList.add("is-alarm");
  alarmOverlay.hidden = false;
  await wait(3600);

  blackoutVeil.hidden = false;
  document.body.classList.add("is-extinguish");
  await wait(1600);

  alarmOverlay.hidden = true;
  document.body.classList.remove("is-alarm", "is-extinguish");
  document.body.classList.add("is-blackout");
  archiveScreen.replaceChildren();
  await wait(900);
  blackoutVeil.hidden = true;
}

accessForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const code = accessCodeInput.value.trim().toLowerCase();
  if (code !== CORRECT_ACCESS_CODE) {
    accessError.textContent = "INVALID ACCESS CODE";
    accessCodeInput.select();
    return;
  }

  accessError.textContent = "";
  accessForm.querySelector("button").disabled = true;
  accessCodeInput.disabled = true;
  startArchive();
});
