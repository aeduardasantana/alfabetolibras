document.addEventListener('DOMContentLoaded', () => {
  const videos = {
    A: '8FCmW4pT_jY', B: 'hzCwZHmyvLI', C: 'z_eN1lcd4vM', D: 'bvFx1BPawRA',
    E: 'JO0F2YbEY-k', F: 'L5D0cUYw12c', G: 'HqTOn4y0aNA', H: 'CD6hVWFXe10',
    I: 'UmPe7Flbw1k', J: 'rzMsdjXHUrU', K: 'ygB8YVJ0vAs', L: 'GWSXhIRoCyM',
    M: 'vyK9ZZ6z5zc', N: 'APtvghRZFvk', O: 'NQf1dzd8kao', P: 'Udj-vnynVTA',
    Q: 'VQDMEqeG6s8', R: 'YZjXFjvHFy8', S: 'jF5072Tu8ZE', T: 'oNfxMboxE_0',
    U: 'tcCmEE8Fk70', V: '3WunOAOU224', W: 'mra6cH0b3No', X: 'MfLI0-7OdnU',
    Y: 'd2pNDDYtSMc', Z: 'LyEP7kaVEoM'
  };

  const alphabet = Object.keys(videos);
  const alphabetGrid = document.getElementById('alphabet-grid');
  const iframe = document.getElementById('libras-video');
  const placeholder = document.getElementById('video-placeholder');
  const currentLetter = document.getElementById('current-letter');
  const guidance = document.getElementById('letter-guidance');
  const prevButton = document.getElementById('prev-letter');
  const nextButton = document.getElementById('next-letter');
  const randomButton = document.getElementById('random-letter');
  const practiceInput = document.getElementById('practice-input');
  const practiceOutput = document.getElementById('practice-output');
  const clearPractice = document.getElementById('clear-practice');

  let selectedLetter = 'A';

  function guidanceFor(letter) {
    if (letter === 'J' || letter === 'Z') {
      return `Na letra ${letter}, observe também o movimento apresentado no vídeo — ele faz parte da realização.`;
    }
    return 'Observe a configuração de mão e repita com calma antes de avançar.';
  }

  function selectLetter(letter, { autoplay = true, scroll = false } = {}) {
    if (!videos[letter]) return;

    selectedLetter = letter;
    const videoId = videos[letter];
    const autoplayParam = autoplay ? '&autoplay=1&mute=1' : '';

    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1${autoplayParam}`;
    iframe.title = `Vídeo da letra ${letter} no alfabeto manual em Libras`;
    placeholder.hidden = true;
    placeholder.style.display = 'none';
    currentLetter.textContent = `Letra ${letter}`;
    guidance.textContent = guidanceFor(letter);

    document.querySelectorAll('.letter-button').forEach((button) => {
      const isActive = button.dataset.letter === letter;
      button.setAttribute('aria-pressed', String(isActive));
    });

    if (scroll) {
      document.querySelector('.player-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  alphabet.forEach((letter) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'letter-button';
    button.dataset.letter = letter;
    button.textContent = letter;
    button.setAttribute('aria-label', `Ver letra ${letter}`);
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => selectLetter(letter));
    alphabetGrid.appendChild(button);
  });

  function moveSelection(direction) {
    const index = alphabet.indexOf(selectedLetter);
    const nextIndex = (index + direction + alphabet.length) % alphabet.length;
    selectLetter(alphabet[nextIndex]);
  }

  prevButton.addEventListener('click', () => moveSelection(-1));
  nextButton.addEventListener('click', () => moveSelection(1));
  randomButton.addEventListener('click', () => {
    const alternatives = alphabet.filter((letter) => letter !== selectedLetter);
    const letter = alternatives[Math.floor(Math.random() * alternatives.length)];
    selectLetter(letter);
  });

  document.addEventListener('keydown', (event) => {
    const activeTag = document.activeElement?.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;
    if (event.key === 'ArrowLeft') moveSelection(-1);
    if (event.key === 'ArrowRight') moveSelection(1);
  });

  function normalizePracticeText(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[^A-Z ]/g, '')
      .replace(/\s+/g, ' ')
      .trimStart();
  }

  function renderPractice() {
    const normalized = normalizePracticeText(practiceInput.value);
    practiceOutput.replaceChildren();

    if (!normalized.trim()) {
      const empty = document.createElement('p');
      empty.className = 'empty-state';
      empty.textContent = 'As letras aparecerão aqui.';
      practiceOutput.appendChild(empty);
      return;
    }

    [...normalized].forEach((char, index) => {
      if (char === ' ') {
        const spacer = document.createElement('span');
        spacer.className = 'practice-space';
        spacer.setAttribute('aria-hidden', 'true');
        practiceOutput.appendChild(spacer);
        return;
      }

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'practice-letter';
      const glyph = document.createElement('span');
      glyph.className = 'manual-glyph';
      glyph.textContent = char;
      glyph.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.className = 'manual-label';
      label.textContent = char;
      button.append(glyph, label);
      button.setAttribute('aria-label', `Praticar letra ${char}, posição ${index + 1}`);
      button.addEventListener('click', () => selectLetter(char, { autoplay: true, scroll: true }));
      practiceOutput.appendChild(button);
    });
  }

  practiceInput.addEventListener('input', renderPractice);
  clearPractice.addEventListener('click', () => {
    practiceInput.value = '';
    renderPractice();
    practiceInput.focus();
  });

  selectLetter('A', { autoplay: false });
});
