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
const fieldReviewOutput = document.querySelector("#field-review-output");
const copyButton = document.querySelector("#copy-button");
const sampleButton = document.querySelector("#sample-button");
const resetButton = document.querySelector("#reset-button");
const copyStatus = document.querySelector("#copy-status");
let generatedInputs = null;
let appliedPreset = null;

const presets = {
  brief: { name: "Project brief", goal: "Draft a project brief.", audience: "Project stakeholders", constraints: "Separate known facts from assumptions. Do not invent missing details.", tone: "Clear and practical", outputFormat: "Markdown brief", reviewFocus: "Check that the goal, scope, risks and next steps are clear." },
  lesson: { name: "Lesson outline", goal: "Plan a short lesson on the topic in the context.", audience: "Beginners", constraints: "Use plain language and include a practice activity.", tone: "Patient and instructional", outputFormat: "Step-by-step plan", reviewFocus: "Check that activities match the learning goal and available time." },
  comparison: { name: "Option comparison", goal: "Compare the options described in the source notes.", audience: "A decision maker", constraints: "Use only supplied facts; flag missing evidence.", tone: "Neutral and analytical", outputFormat: "Comparison table", reviewFocus: "Check tradeoffs, assumptions and open questions." }
};

document.querySelector("#load-preset").addEventListener("click", () => {
  const preset = presets[document.querySelector("#preset-select").value];
  if (!preset) return;
  appliedPreset = preset;
  Object.entries(fields).forEach(([key, field]) => { field.value = preset[key] || ""; });
  invalidateOutput();
  updateStatus("Preset loaded; generate prompt");
});

function outputIsCurrent() {
  return generatedInputs && Object.values(fields).every((field, index) => field.value === generatedInputs[index]);
}

function invalidateOutput() {
  generatedInputs = null;
  promptOutput.textContent = "Inputs changed. Choose Generate prompt to create current output.";
  fieldReviewOutput.textContent = "Inputs changed. Generate prompt again to review current fields.";
  renderChecklist(["Inputs changed; generate again for a current checklist."]);
  updateStatus("Inputs changed; generate again");
}

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

function buildPresetReview(values) {
  if (!appliedPreset || values.goal !== appliedPreset.goal || values.audience !== appliedPreset.audience) return [];
  const comparison = appliedPreset === presets.comparison;
  const key = comparison ? "sourceNotes" : "context";
  const label = comparison ? "source notes" : "context";
  const suggestion = comparison
    ? "consider adding the actual options and supporting facts"
    : appliedPreset === presets.lesson
      ? "consider adding the real lesson topic, learner context or available time"
      : "consider adding real project facts or scope";
  return [values[key]
    ? `- Optional preset input review ("${appliedPreset.name}"): ${label} supplied; review it for relevance. This is not verification.`
    : `- Optional preset input review ("${appliedPreset.name}"): ${label} not supplied; ${suggestion}. Generation is not blocked.`];
}

function buildFieldReview(values) {
  const labels = {
    goal: "Goal", context: "Context", audience: "Audience", constraints: "Constraints",
    tone: "Tone", outputFormat: "Output format", sourceNotes: "Examples or source notes",
    reviewFocus: "Review checklist focus"
  };
  const defaults = {
    goal: "Help me complete the task described by the available context.",
    reviewFocus: "Review for clarity, usefulness, and missing assumptions."
  };
  return [
    "## Field Source Review (app-generated metadata)",
    ...Object.entries(labels).map(([key, label]) => values[key]
      ? appliedPreset && values[key] === appliedPreset[key]
        ? `- ${label}: from preset "${appliedPreset.name}"; review before use.`
        : `- ${label}: supplied by user.`
      : defaults[key]
        ? `- ${label}: not supplied; app default: ${defaults[key]}`
        : `- ${label}: not supplied; section omitted.`),
    "- Shared instructions: introduction, output expectations, base checklist and final instruction are app-authored; checklist wording also uses supplied audience, constraints and format when present.",
    ...buildPresetReview(values),
    "This review describes the generated prompt inputs, not an AI answer or validation of prompt quality."
  ].join("\n");
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
  const fieldReview = buildFieldReview(values);
  promptOutput.textContent = generatedPrompt + "\n\n" + fieldReview;
  fieldReviewOutput.textContent = fieldReview;
  renderChecklist(buildChecklist(values));
  generatedInputs = Object.values(fields).map((field) => field.value);
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

  if (!outputIsCurrent()) {
    invalidateOutput();
    return;
  }
  const copiedInputs = generatedInputs;

  if (!navigator.clipboard) {
    updateStatus("Select text to copy");
    selectPromptText();
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    if (generatedInputs !== copiedInputs || !outputIsCurrent()) return;
    updateStatus("Copied");
  } catch {
    if (generatedInputs !== copiedInputs || !outputIsCurrent()) return;
    updateStatus("Copy blocked; text selected");
    selectPromptText();
  }
});

sampleButton.addEventListener("click", () => {
  appliedPreset = null;
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
  appliedPreset = null;
  generatedInputs = null;
  window.setTimeout(() => {
    promptOutput.textContent = "Complete the form, then choose Generate prompt.";
    fieldReviewOutput.textContent = "No generated field review yet.";
    renderChecklist([
      "Define the task clearly.",
      "Add enough context for a useful answer.",
      "Set constraints and output expectations."
    ]);
    updateStatus("Local only");
  }, 0);
});

Object.values(fields).forEach((field) => {
  const onEdit = () => { if (generatedInputs) invalidateOutput(); };
  field.addEventListener("input", onEdit);
  field.addEventListener("change", onEdit);
});
