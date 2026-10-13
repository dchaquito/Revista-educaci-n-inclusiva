(() => {
  const pageCount = 18;
  const bookEl = document.getElementById('book');
  const currentEl = document.getElementById('page-current');
  const totalEl = document.getElementById('page-total');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  totalEl.textContent = String(pageCount);

  for (let n = 1; n <= pageCount; n++) {
    const page = document.createElement('div');
    page.className = 'page';

    const img = document.createElement('img');
    img.className = 'page-art';
    img.src = `assets/pages/page-${String(n).padStart(2, '0')}.jpg`;
   
img.alt = `Página ${n} de la revista Educación Inclusiva`;
img.loading = n <= 4 ? 'eager' : 'lazy';

if (n === 7) {
  const link = document.createElement('a');
  link.href = 'https://dialnet.unirioja.es/servlet/articulo?codigo=10256309&utm_';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', 'Consultar el artículo de Ciencia Latina');

  link.style.display = 'block';
  link.style.width = '100%';
  link.style.height = '100%';
  link.style.cursor = 'pointer';

  link.appendChild(img);
  page.appendChild(link);
} else {
  page.appendChild(img);
}


    // La página 12 corresponde a la mitad derecha de la página 6 del PDF,
    // donde Canva dejó el espacio destinado al TikTok.
    if (n === 12) {
      const overlay = document.createElement('div');
      overlay.className = 'video-overlay';
      overlay.setAttribute('aria-label', 'Video de TikTok');

      const video = document.createElement('video');
      video.src = 'assets/tiktok.mp4';
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', 'Video complementario sobre estrategias para alumnos con BAP');

      const placeholder = document.createElement('div');
      placeholder.className = 'video-placeholder';
      placeholder.innerHTML = '<div class="play">▶</div><strong>Video TikTok</strong><span>Agrega tu MP4 a:</span><br><code>assets/tiktok.mp4</code>';

      video.addEventListener('error', () => {
        video.hidden = true;
        placeholder.hidden = false;
      });
      video.addEventListener('loadeddata', () => {
        video.hidden = false;
        placeholder.hidden = true;
      });

      // Si el MP4 no se ha agregado todavía, se muestra una indicación en su lugar.
      video.hidden = true;
      overlay.append(video, placeholder);
      page.appendChild(overlay);
    }

    bookEl.appendChild(page);
  }

  const pageFlip = new St.PageFlip(bookEl, {
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

  pageFlip.loadFromHTML(document.querySelectorAll('.page'));

  function updateControls() {
    const index = pageFlip.getCurrentPageIndex(); // zero-based
    const portrait = window.matchMedia('(max-width: 700px)').matches || pageFlip.getOrientation() === 'portrait';
    if (portrait) {
      currentEl.textContent = `${index + 1}`;
    } else {
      const first = index + 1;
      const second = Math.min(index + 2, pageCount);
      currentEl.textContent = `${first}–${second}`;
    }
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= pageCount - (pageFlip.getOrientation() === 'portrait' ? 1 : 2);
  }

  prevBtn.addEventListener('click', () => pageFlip.flipPrev());
  nextBtn.addEventListener('click', () => pageFlip.flipNext());
  pageFlip.on('flip', updateControls);
  pageFlip.on('changeOrientation', updateControls);
  window.addEventListener('resize', updateControls);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') pageFlip.flipPrev();
    if (event.key === 'ArrowRight') pageFlip.flipNext();
  });
  updateControls();
})();
