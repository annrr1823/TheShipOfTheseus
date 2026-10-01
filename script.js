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
      askIdentity();
    },
  });
}

async function askIdentity() {
  showMessage(`...\n\n${state.playerName}.\n\nYou're not FIA.\n\nAre you?`);
  showChoices([
    {
      label: "YES",
      onSelect: showFiaWarning,
    },
    {
      label: "NO",
      onSelect: beginQuestionIntro,
    },
  ]);
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

async function showFinalAnswer() {
  showMessage("...\n\nYou got them all right.\n\nSo you finally understand.");
  await wait(2600);

  document.body.classList.add("is-whiteout");
  terminalOutput.replaceChildren();
  clearInteraction();

  const ending = document.createElement("section");
  ending.className = "ending";
  ending.innerHTML = `
    <div class="ending__content">
      <h2>FINAL ENDING</h2>
      <p>
        亲爱的 ${state.playerName}<br />
        真的非常感谢你玩到这里！<br />
        如你所见，现在这只是一个半成品，还有很多没有完成的地方。我一个人确实驾驭不了整个故事，欢迎一起合作产出，一起丰富这个小游戏。<br />
        如果你有想法或者建议，请随时与我交流。当然，更欢迎你私信和我对一下整个故事的答案，直接xhs私信我就好。我后面会把档案、报纸、票根等等都做成实体周边，如果感兴趣可以先进q群:1058350923<br />
        RR
      </p>
    </div>
  `;
  archiveScreen.append(ending);
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
