const fields = {
  goal: document.querySelector("#goal"),
  context: document.querySelector("#context"),
  audience: document.querySelector("#audience"),
  constraints: document.querySelector("#constraints"),
  tone: document.querySelector("#tone"),
  outputFormat: document.querySelector("#output-format"),
  sourceNotes: document.querySelector("#source-notes"),
  reviewFocus: document.querySelector("#review-focus")
};

const form = document.querySelector("#prompt-form");
const promptOutput = document.querySelector("#prompt-output");
const checklistOutput = document.querySelector("#checklist-output");
const copyButton = document.querySelector("#copy-button");
const sampleButton = document.querySelector("#sample-button");
const resetButton = document.querySelector("#reset-button");
const copyStatus = document.querySelector("#copy-status");

const sampleScenario = {
  goal: "Draft a client update that explains a project delay and keeps confidence high.",
  context: "The design review took two extra days because the team found accessibility issues. The fix is underway and the launch date may move from Friday to Monday.",
  audience: "A small business client who wants concise, practical updates",
  constraints: "Be honest, avoid blame, include the revised next step, and keep it under 180 words.",
  tone: "Warm and reassuring",
  outputFormat: "Draft email",
  sourceNotes: "Mention that accessibility fixes improve the final customer experience.",
  reviewFocus: "Check that the message is clear, accountable, calm, and action-oriented."
};

function clean(value) {
  return value.trim();
}

function line(label, value) {
  return value ? `## ${label}\n${value}\n` : "";
}

function bulletList(items) {
  return items.filter(Boolean).map((item) => `- ${item}`).join("\n");
}

function getValues() {
  return {
    goal: clean(fields.goal.value),
    context: clean(fields.context.value),
    audience: clean(fields.audience.value),
    constraints: clean(fields.constraints.value),
    tone: clean(fields.tone.value),
    outputFormat: clean(fields.outputFormat.value),
    sourceNotes: clean(fields.sourceNotes.value),
    reviewFocus: clean(fields.reviewFocus.value)
  };
}

function buildChecklist(values) {
  const checklist = [
    "Confirm the answer directly addresses the stated goal.",
    values.audience ? `Check that the response fits this audience: ${values.audience}.` : "Check that the audience is clear.",
    values.constraints ? "Verify that all constraints are followed." : "Add constraints if the first draft is too broad.",
    values.outputFormat ? `Confirm the output uses this format: ${values.outputFormat}.` : "Confirm the output format is easy to use.",
    values.reviewFocus || "Review for clarity, usefulness, and missing assumptions."
  ];

  return checklist;
}

function buildPrompt(values) {
  const checklist = buildChecklist(values);
  const sections = [
    "You are helping me produce a useful, polished response. Follow the instructions below and ask a clarifying question only if the missing information would materially change the answer.\n",
    line("Task / Goal", values.goal || "Help me complete the task described by the available context."),
    line("Context", values.context),
    line("Audience", values.audience),
    line("Constraints", values.constraints),
    line("Tone", values.tone),
    line("Source Material Notes", values.sourceNotes),
    line("Desired Output Format", values.outputFormat),
    "## Output Expectations\n" + bulletList([
      "Start with the most useful answer, not a long preamble.",
      "Use the requested format when one is provided.",
      "Make assumptions explicit when information is missing.",
      "Keep the response practical and ready to use."
    ]) + "\n",
    "## Review Criteria\n" + bulletList(checklist) + "\n",
    "## Final Instruction\nBefore finalizing, quickly check the response against the review criteria and revise anything that does not satisfy them."
  ];

  return sections.filter(Boolean).join("\n");
}

function renderChecklist(items) {
  checklistOutput.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    checklistOutput.appendChild(li);
  });
}

function updateStatus(message) {
  copyStatus.textContent = message;
}

function selectPromptText() {
  promptOutput.focus();

  if (!document.createRange || !window.getSelection) {
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(promptOutput);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

function generatePrompt() {
  const values = getValues();
  const generatedPrompt = buildPrompt(values);
  promptOutput.textContent = generatedPrompt;
  renderChecklist(buildChecklist(values));
  updateStatus("Prompt ready");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generatePrompt();
});

copyButton.addEventListener("click", async () => {
  const text = promptOutput.textContent.trim();
  if (!text || text === "Complete the form, then choose Generate prompt.") {
    updateStatus("Nothing to copy");
    return;
  }

  if (!navigator.clipboard) {
    updateStatus("Select text to copy");
    selectPromptText();
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    updateStatus("Copied");
  } catch {
    updateStatus("Copy blocked; text selected");
    selectPromptText();
  }
});

sampleButton.addEventListener("click", () => {
  fields.goal.value = sampleScenario.goal;
  fields.context.value = sampleScenario.context;
  fields.audience.value = sampleScenario.audience;
  fields.constraints.value = sampleScenario.constraints;
  fields.tone.value = sampleScenario.tone;
  fields.outputFormat.value = sampleScenario.outputFormat;
  fields.sourceNotes.value = sampleScenario.sourceNotes;
  fields.reviewFocus.value = sampleScenario.reviewFocus;
  generatePrompt();
});

resetButton.addEventListener("click", () => {
  window.setTimeout(() => {
    promptOutput.textContent = "Complete the form, then choose Generate prompt.";
    renderChecklist([
      "Define the task clearly.",
      "Add enough context for a useful answer.",
      "Set constraints and output expectations."
    ]);
    updateStatus("Local only");
  }, 0);
});
