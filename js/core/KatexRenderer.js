// KatexRenderer — renderuje LaTeX w elementach DOM przez KaTeX
const KatexRenderer = (() => {

  const OPTIONS = {
    throwOnError: false,
    displayMode: false,
    strict: false,
    trust: false,
    macros: {
      '\\R': '\\mathbb{R}',
      '\\N': '\\mathbb{N}',
      '\\Z': '\\mathbb{Z}',
      '\\Q': '\\mathbb{Q}',
      '\\tg': '\\operatorname{tg}',
      '\\ctg': '\\operatorname{ctg}',
      '\\arctg': '\\operatorname{arctg}',
      '\\arcctg': '\\operatorname{arcctg}',
      '\\sgn': '\\operatorname{sgn}'
    }
  };

  // Renderuj string zawierający $...$ (inline), $$...$$ (block) i **bold** do elementu DOM
  function render(text, container) {
    if (!container) return;
    if (container !== container) return; // guard
    container.innerHTML = '';
    if (!text) return;

    // Unified tokenizer: $$block$$, $inline$, **bold** — w jednym przebiegu
    const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\*\*[\s\S]+?\*\*)/g;
    const parts = [];
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push({ type: 'text', content: text.slice(lastIdx, match.index) });
      }
      const raw = match[0];
      if (raw.startsWith('$$')) {
        parts.push({ type: 'block', content: raw.slice(2, -2) });
      } else if (raw.startsWith('$')) {
        parts.push({ type: 'inline', content: raw.slice(1, -1) });
      } else {
        parts.push({ type: 'bold', content: raw.slice(2, -2) });
      }
      lastIdx = match.index + raw.length;
    }
    if (lastIdx < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIdx) });
    }

    parts.forEach(part => {
      if (part.type === 'text') {
        // Zachowaj nowe linie jako <br>
        const lines = part.content.split('\n');
        lines.forEach((line, i) => {
          container.appendChild(document.createTextNode(line));
          if (i < lines.length - 1) container.appendChild(document.createElement('br'));
        });
      } else if (part.type === 'bold') {
        // Bold może zawierać KaTeX — renderuj rekurencyjnie
        const strong = document.createElement('strong');
        render(part.content, strong);
        container.appendChild(strong);
      } else if (part.type === 'block') {
        const span = document.createElement('span');
        span.className = 'katex-block-wrapper';
        try {
          katex.render(part.content, span, { ...OPTIONS, displayMode: true });
        } catch (e) {
          span.textContent = part.content;
          span.style.color = 'var(--accent-red)';
        }
        container.appendChild(span);
      } else {
        const span = document.createElement('span');
        try {
          katex.render(part.content, span, OPTIONS);
        } catch (e) {
          span.textContent = `$${part.content}$`;
          span.style.color = 'var(--accent-red)';
        }
        container.appendChild(span);
      }
    });
  }

  // Renderuj do innerHTML (zwraca HTML string)
  function renderToString(text) {
    const div = document.createElement('div');
    render(text, div);
    return div.innerHTML;
  }

  // Renderuj jeden blok LaTeX (bez delimitatorów)
  function renderLatex(latex, container, displayMode = false) {
    if (!container) return;
    try {
      katex.render(latex, container, { ...OPTIONS, displayMode });
    } catch (e) {
      container.textContent = latex;
    }
  }

  // Renderuj kroki rozwiązania do elementu
  function renderSolution(steps, container) {
    if (!container || !steps) return;
    container.innerHTML = '';

    steps.forEach((step, i) => {
      const stepEl = document.createElement('div');
      stepEl.className = 'solution-step';

      const numEl = document.createElement('div');
      numEl.className = 'step-number';
      numEl.textContent = step.step || (i + 1);
      stepEl.appendChild(numEl);

      const contentEl = document.createElement('div');
      contentEl.className = 'step-content';

      const titleEl = document.createElement('div');
      titleEl.className = 'step-title';
      titleEl.textContent = step.title || '';
      contentEl.appendChild(titleEl);

      const mathEl = document.createElement('div');
      mathEl.className = 'step-math';
      render(step.content || '', mathEl);
      contentEl.appendChild(mathEl);

      if (step.explanation) {
        const explEl = document.createElement('div');
        explEl.className = 'step-explanation';
        render(step.explanation, explEl);
        contentEl.appendChild(explEl);
      }

      stepEl.appendChild(contentEl);
      container.appendChild(stepEl);
    });
  }

  // Renderuj wskazówkę do elementu
  function renderHint(hint, container) {
    if (!container) return;
    const hintEl = document.createElement('div');
    hintEl.className = 'hint-item';

    const levelEl = document.createElement('div');
    levelEl.className = 'hint-level';
    levelEl.textContent = `Wskazówka ${hint.level}`;
    hintEl.appendChild(levelEl);

    const textEl = document.createElement('div');
    render(hint.text, textEl);
    hintEl.appendChild(textEl);

    container.appendChild(hintEl);
  }

  return { render, renderToString, renderLatex, renderSolution, renderHint };
})();

window.KatexRenderer = KatexRenderer;
