// Delta package: <ai-interaction> — an illustrated exchange with an AI model.
//
//   <ai-interaction model="claude-opus-5-5" effort="medium" date="2026-10-16" max-height="24rem">
//     <prompt role="Aluno">…</prompt>
//     <answer>…</answer>
//   </ai-interaction>
//
// The compiler renames the tags to <delta-ai-interaction>, <delta-prompt> and
// <delta-answer> and has already rendered the prose inside them (math, <code>,
// lists). This script only adds the chrome: a header with the model metadata, a
// label and copy button per turn, and a body that scrolls vertically when long.

(function () {
  // Packs cannot add i18n keys, so the strings this pack owns are localized here.
  var STRINGS = {
    pt: { title: "Interação com IA", prompt: "Prompt", answer: "Resposta", effort: "esforço", tool: "ferramenta" },
    en: { title: "AI interaction", prompt: "Prompt", answer: "Answer", effort: "effort", tool: "tool" },
  };
  var lang = (document.documentElement.lang || "en").slice(0, 2).toLowerCase();
  var S = STRINGS[lang] || STRINGS.en;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function chip(label, value) {
    var c = el("span", "aii-chip");
    if (label) c.appendChild(el("span", "aii-chip-key", label));
    c.appendChild(el("span", "aii-chip-val", value));
    return c;
  }

  function copyButton(source) {
    var btn = el("button", "aii-copy", Delta.t("copy", "Copy"));
    btn.type = "button";
    btn.addEventListener("click", function () {
      var text = (source.innerText || source.textContent || "").trim();
      var done = function () {
        btn.textContent = Delta.t("copied", "Copied");
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.textContent = Delta.t("copy", "Copy");
          btn.classList.remove("is-copied");
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    });
    return btn;
  }

  // Wrap a turn's rendered content and put a label row above it.
  function upgradeTurn(turn, label, withCopy) {
    if (turn.dataset.deltaReady) return;
    turn.dataset.deltaReady = "1";
    var content = el("div", "aii-content");
    while (turn.firstChild) content.appendChild(turn.firstChild);
    var head = el("div", "aii-turn-head");
    head.appendChild(el("span", "aii-turn-label", label));
    if (withCopy) head.appendChild(copyButton(content));
    turn.appendChild(head);
    turn.appendChild(content);
  }

  customElements.define(
    "delta-ai-interaction",
    class extends HTMLElement {
      connectedCallback() {
        if (this.dataset.deltaReady) return;
        this.dataset.deltaReady = "1";

        // `role` (not `by`) names who speaks in a turn: `by` belongs to Delta's
        // collaboration markup and is checked against the <team>.
        var model = this.getAttribute("model");
        var effort = this.getAttribute("effort");
        var tool = this.getAttribute("tool");
        var date = this.getAttribute("date");
        var maxHeight = this.getAttribute("max-height");

        var head = el("div", "aii-head");
        head.appendChild(el("span", "aii-title", this.getAttribute("label") || S.title));
        var meta = el("span", "aii-meta");
        if (tool) meta.appendChild(chip(S.tool, tool));
        if (model) meta.appendChild(chip("", model));
        if (effort) meta.appendChild(chip(S.effort, effort));
        if (date) meta.appendChild(chip("", date));
        head.appendChild(meta);

        var body = el("div", "aii-body");
        body.tabIndex = 0; // scrollable region must be keyboard-reachable
        if (maxHeight) body.style.setProperty("--aii-max-height", maxHeight);
        while (this.firstChild) body.appendChild(this.firstChild);

        var answerLabel = model ? S.answer + " · " + model : S.answer;
        body.querySelectorAll(":scope > delta-prompt").forEach(function (p) {
          upgradeTurn(p, p.getAttribute("role") || S.prompt, true);
        });
        body.querySelectorAll(":scope > delta-answer").forEach(function (a) {
          upgradeTurn(a, a.getAttribute("role") || answerLabel, false);
        });

        this.appendChild(head);
        this.appendChild(body);
      }
    },
  );
})();
