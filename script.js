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
