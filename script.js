(() => {
  'use strict';

  const pageCount = 18;

  const bookEl = document.getElementById('book');
  const currentEl = document.getElementById('page-current');
  const totalEl = document.getElementById('page-total');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const statusEl = document.getElementById('load-status');

  if (!bookEl || !currentEl || !totalEl || !prevBtn || !nextBtn) {
    console.error('Faltan elementos necesarios en index.html.');
    return;
  }

  totalEl.textContent = String(pageCount);

  function showMissingPage(page, imagePath, pageNumber) {
    const placeholder = document.createElement('div');
    placeholder.className = 'page-missing';

    const title = document.createElement('strong');
    title.textContent = `Página ${pageNumber}`;

    const message = document.createElement('span');
    message.textContent = 'No se pudo cargar esta imagen.';

    const path = document.createElement('code');
    path.textContent = imagePath;

    placeholder.append(title, message, path);
    page.replaceChildren(placeholder);

    console.error(`No se encontró la imagen de la página ${pageNumber}: ${imagePath}`);
  }

  function addVideo(page) {
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.setAttribute('aria-label', 'Video complementario');

    const video = document.createElement('video');
    video.src = 'assets/tiktok.mp4';
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.hidden = true;
    video.setAttribute('aria-label', 'Video complementario sobre educación inclusiva');

    const placeholder = document.createElement('div');
    placeholder.className = 'video-placeholder';

    const play = document.createElement('div');
    play.className = 'play';
    play.textContent = '▶';

    const title = document.createElement('strong');
    title.textContent = 'Video complementario';

    const message = document.createElement('span');
    message.textContent = 'Coloca tu video MP4 en:';

    const path = document.createElement('code');
    path.textContent = 'assets/tiktok.mp4';

    placeholder.append(play, title, message, path);

    video.addEventListener('error', () => {
      video.hidden = true;
      placeholder.hidden = false;
    });

    video.addEventListener('loadeddata', () => {
      video.hidden = false;
      placeholder.hidden = true;
    });

    overlay.append(video, placeholder);
    page.appendChild(overlay);
  }

  function addCrossword(page) {
    const answers = [
      {
        word: 'INCLUSION',
        row: 10,
        col: 7,
        direction: 'down',
        clue: 'Transformación del entorno y de los sistemas para garantizar la presencia, participación y aprendizaje de todas las personas.'
      },
      {
        word: 'DIVERSIDAD',
        row: 4,
        col: 3,
        direction: 'across',
        clue: 'Reconoce las diferencias individuales, sociales y culturales presentes en el aula.'
      },
      {
        word: 'EQUIDAD',
        row: 7,
        col: 4,
        direction: 'across',
        clue: 'Dar a cada estudiante lo que necesita para aprender, reconociendo sus ritmos únicos.'
      },
      {
        word: 'SEGREGACION',
        row: 12,
        col: 2,
        direction: 'across',
        clue: 'Separación de las personas en entornos aislados o diferenciados según sus características o condiciones.'
      },
      {
        word: 'INTEGRACION',
        row: 2,
        col: 9,
        direction: 'across',
        clue: 'Admisión de personas con necesidades específicas en entornos regulares, esperando que se adapten al sistema existente.'
      },
      {
        word: 'ACCESIBILIDAD',
        row: 0,
        col: 1,
        direction: 'across',
        clue: 'Permite que espacios, recursos, materiales y medios de comunicación puedan ser utilizados por todas las personas.'
      },
      {
        word: 'PERTENENCIA',
        row: 0,
        col: 10,
        direction: 'down',
        clue: 'Sentido que experimenta el estudiante al sentirse valorado, escuchado y parte del grupo.'
      },
      {
        word: 'DISCAPACIDAD',
        row: 6,
        col: 15,
        direction: 'down',
        clue: 'Una de las expresiones de la diversidad humana que puede requerir apoyos, recursos o ajustes.'
      },
      {
        word: 'BARRERAS',
        row: 14,
        col: 4,
        direction: 'across',
        clue: 'Obstáculos que pueden dificultar que los estudiantes aprendan, participen y se integren plenamente.'
      },
      {
        word: 'PEDAGOGICAS',
        row: 3,
        col: 17,
        direction: 'down',
        clue: 'Barreras relacionadas con las formas de enseñar, evaluar y organizar las actividades escolares.'
      },
      {
        word: 'ACTITUDINALES',
        row: 8,
        col: 6,
        direction: 'across',
        clue: 'Barreras relacionadas con prejuicios, estereotipos, discriminación, rechazo o bajas expectativas.'
      },
      {
        word: 'DUA',
        row: 1,
        col: 16,
        direction: 'down',
        clue: 'Siglas del enfoque que propone múltiples formas de enseñar, expresarse y motivar a los alumnos.'
      },
      {
        word: 'EXCLUSION',
        row: 16,
        col: 5,
        direction: 'across',
        clue: 'Negación del derecho a la educación o a la participación social.'
      },
      {
        word: 'CULTURAL',
        row: 5,
        col: 2,
        direction: 'down',
        clue: 'Dimensión de la diversidad relacionada con saberes, valores, culturas y formas de convivencia.'
      },
      {
        word: 'APRENDIZAJE',
        row: 11,
        col: 13,
        direction: 'down',
        clue: 'Proceso que la educación inclusiva busca garantizar para todas las personas.'
      }
    ];

    const crossword = document.createElement('div');
    crossword.className = 'crossword-page';

    const title = document.createElement('h2');
    title.className = 'crossword-title';
    title.textContent = 'Crucigrama: Educación Inclusiva';

    const subtitle = document.createElement('p');
    subtitle.className = 'crossword-subtitle';
    subtitle.textContent =
      'Completa el crucigrama con los conceptos estudiados en la revista. Escribe las respuestas sin acentos.';

    const layout = document.createElement('div');
    layout.className = 'crossword-layout';

    const boardWrap = document.createElement('div');
    boardWrap.className = 'crossword-board-wrap';

    const board = document.createElement('div');
    board.className = 'crossword-board';

    const cells = {};

    function key(row, col) {
      return `${row}-${col}`;
    }

    answers.forEach((item, index) => {
      for (let i = 0; i < item.word.length; i++) {
        const row =
          item.direction === 'down'
            ? item.row + i
            : item.row;

        const col =
          item.direction === 'across'
            ? item.col + i
            : item.col;

        const cellKey = key(row, col);

        if (!cells[cellKey]) {
          cells[cellKey] = {
            row,
            col,
            letters: [],
            number: null
          };
        }

        cells[cellKey].letters.push(item.word[i]);

        if (i === 0 && cells[cellKey].number === null) {
          cells[cellKey].number = index + 1;
        }
      }
    });

    const maxRow = 18;
    const maxCol = 19;

    for (let row = 0; row <= maxRow; row++) {
      for (let col = 0; col <= maxCol; col++) {
        const cell = document.createElement('div');
        cell.className = 'crossword-cell';

        const cellData = cells[key(row, col)];

        if (!cellData) {
          cell.classList.add('block');
        } else {
          const input = document.createElement('input');

          input.maxLength = 1;
          input.autocomplete = 'off';
          input.dataset.row = row;
          input.dataset.col = col;

          input.addEventListener('input', () => {
            input.value = input.value
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toUpperCase()
              .replace(/[^A-ZÑ]/g, '')
              .slice(0, 1);

            cell.classList.remove('correct', 'wrong');
          });

          cell.appendChild(input);

          if (cellData.number !== null) {
            const number = document.createElement('span');
            number.className = 'crossword-number';
            number.textContent = cellData.number;
            cell.appendChild(number);
          }
        }

        board.appendChild(cell);
      }
    }

    boardWrap.appendChild(board);

    const clues = document.createElement('div');
    clues.className = 'crossword-clues';

    const horizontalTitle = document.createElement('h3');
    horizontalTitle.textContent = 'Horizontales';

    const horizontalList = document.createElement('ol');

    answers
      .filter(item => item.direction === 'across')
      .forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.clue;
        horizontalList.appendChild(li);
      });

    const verticalTitle = document.createElement('h3');
    verticalTitle.textContent = 'Verticales';

    const verticalList = document.createElement('ol');

    answers
      .filter(item => item.direction === 'down')
      .forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.clue;
        verticalList.appendChild(li);
      });

    clues.append(
      horizontalTitle,
      horizontalList,
      verticalTitle,
      verticalList
    );

    layout.append(boardWrap, clues);

    const actions = document.createElement('div');
    actions.className = 'crossword-actions';

    const checkButton = document.createElement('button');
    checkButton.className = 'crossword-button check';
    checkButton.type = 'button';
    checkButton.textContent = 'Comprobar';

    const resetButton = document.createElement('button');
    resetButton.className = 'crossword-button reset';
    resetButton.type = 'button';
    resetButton.textContent = 'Reiniciar';

    actions.append(checkButton, resetButton);

    const result = document.createElement('div');
    result.className = 'crossword-result';

    crossword.append(
      title,
      subtitle,
      layout,
      actions,
      result
    );

    page.appendChild(crossword);

    checkButton.addEventListener('click', () => {
      let total = 0;
      let correct = 0;

      Object.values(cells).forEach(cellData => {
        const input = board.querySelector(
          `input[data-row="${cellData.row}"][data-col="${cellData.col}"]`
        );

        if (!input) return;

        total++;

        const expected = cellData.letters[0];
        const value = input.value.toUpperCase();

        input.parentElement.classList.remove('correct', 'wrong');

        if (value === expected) {
          correct++;
          input.parentElement.classList.add('correct');
        } else if (value !== '') {
          input.parentElement.classList.add('wrong');
        }
      });

      if (correct === total) {
        result.textContent = '🎉 ¡Excelente! ¡Crucigrama completado correctamente!';
      } else {
        result.textContent =
          `${correct} de ${total} casillas correctas. Revisa las casillas marcadas.`;
      }
    });

    resetButton.addEventListener('click', () => {
      board.querySelectorAll('input').forEach(input => {
        input.value = '';
        input.parentElement.classList.remove('correct', 'wrong');
      });

      result.textContent = '';
    });
  }
  
  function addArticleLink(page) {
    const link = document.createElement('a');

    link.href = 'https://dialnet.unirioja.es/servlet/articulo?codigo=10256309';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Consultar artículo de referencia');

    Object.assign(link.style, {
      position: 'absolute',
      left: '0',
      bottom: '0',
      width: '100%',
      height: '20%',
      zIndex: '10',
      display: 'block'
    });

    page.style.position = 'relative';
    page.appendChild(link);
  }

  for (let n = 1; n <= pageCount; n++) {
    const page = document.createElement('div');
    page.className = 'page';

    const imagePath =
      `assets/pages/page-${String(n).padStart(2, '0')}.jpg`;

    const img = document.createElement('img');
    img.className = 'page-art';
    img.alt = `Página ${n} de la revista Educación Inclusiva`;
    img.loading = n <= 4 ? 'eager' : 'lazy';
    img.decoding = 'async';

    img.addEventListener('error', () => {
      showMissingPage(page, imagePath, n);
      statusEl.textContent =
        'Hay imágenes que no se encuentran. Revisa los nombres y la carpeta assets/pages/.';
    });

    img.src = imagePath;
    page.appendChild(img);

    if (n === 7) {
      addArticleLink(page);
    }

    if (n === 12) {
      addVideo(page);
    }

    if (n === 18) {
  addCrossword(page);
}
    
    bookEl.appendChild(page);
  }

  if (!window.St || !window.St.PageFlip) {
    statusEl.textContent =
      'No se pudo cargar el visor de páginas. Comprueba tu conexión a internet e inténtalo de nuevo.';
    console.error('La biblioteca PageFlip no está disponible.');
    return;
  }

  let pageFlip;

  try {
    pageFlip = new St.PageFlip(bookEl, {
      width: 600,
      height: 928,
      size: 'stretch',
      minWidth: 280,
      maxWidth: 1200,
      minHeight: 430,
      maxHeight: 1856,
      maxShadowOpacity: 0.22,
      showCover: false,
      mobileScrollSupport: false,
      usePortrait: true,
      drawShadow: true,
      flippingTime: 650,
      startPage: 0,
      autoSize: true,
      clickEventForward: true,
      useMouseEvents: true,
      swipeDistance: 30,
      showPageCorners: true
    });

    pageFlip.loadFromHTML(bookEl.querySelectorAll('.page'));
  } catch (error) {
    statusEl.textContent =
      'Ocurrió un error al abrir la revista. Revisa la consola del navegador.';
    console.error('Error al inicializar la revista:', error);
    return;
  }

  function updateControls() {
    const index = pageFlip.getCurrentPageIndex();
    const portrait = pageFlip.getOrientation() === 'portrait';

    if (portrait) {
      currentEl.textContent = String(index + 1);
    } else {
      const first = index + 1;
      const second = Math.min(index + 2, pageCount);
      currentEl.textContent = `${first}–${second}`;
    }

    prevBtn.disabled = index <= 0;

    const lastVisibleIndex = portrait
      ? pageCount - 1
      : pageCount - 2;

    nextBtn.disabled = index >= lastVisibleIndex;
  }

  prevBtn.addEventListener('click', () => {
    pageFlip.flipPrev();
  });

  nextBtn.addEventListener('click', () => {
    pageFlip.flipNext();
  });

  pageFlip.on('flip', updateControls);
  pageFlip.on('changeOrientation', updateControls);

  window.addEventListener('resize', updateControls);

  document.addEventListener('keydown', (event) => {
    const tag = event.target && event.target.tagName;

    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT'
    ) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      pageFlip.flipPrev();
    } else if (event.key === 'ArrowRight') {
      pageFlip.flipNext();
    }
  });

  updateControls();
})();
