// Welcome toast alternating random message
const wToast = document.getElementById('welcomeToast');
const wtIcon = document.getElementById('wtIcon') || (wToast ? wToast.querySelector('.wt-ic') : null);
const wtText = document.getElementById('wtText') || (wToast ? wToast.querySelector('p') : null);

const toastMessages = [
  {
    icon: '🌙',
    html: 'لا تنسى ذكر الله<br>قول ما شاء الله تبارك الله'
  },
  {
    icon: '✨',
    html: 'صلّوا على النبي محمد<br>صلى الله عليه وسلم'
  }
];

// Alternating sequentially on each visit/refresh (0, 1, 0, 1...)
let lastToastIdx = localStorage.getItem('last-toast-idx');
let nextToastIdx = (lastToastIdx === '0') ? 1 : 0;
localStorage.setItem('last-toast-idx', String(nextToastIdx));

const pickedToast = toastMessages[nextToastIdx];
if (wtIcon) wtIcon.textContent = pickedToast.icon;
if (wtText) wtText.innerHTML = pickedToast.html;

const wCloseBtn = document.getElementById('welcomeClose');
if (wCloseBtn && wToast) {
  wCloseBtn.addEventListener('click', () => {
    wToast.classList.add('hide');
    setTimeout(() => wToast.remove(), 450);
  });
}

// Scroll reveal
const io = new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Fullscreen Lightbox Gallery with Arrows and Thumbnail Squares (Images & Video)
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbVid = document.getElementById('lbVid');
const lbCounter = document.getElementById('lbCounter');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbClose = document.getElementById('lbClose');
const lbThumbs = document.getElementById('lbThumbs');

// Fast Image Preloader & Memory Cache
const preloadedImages = new Set();
function preloadImage(src) {
  if (!src || typeof src !== 'string' || preloadedImages.has(src)) return;
  preloadedImages.add(src);
  const img = new Image();
  img.src = src;
  if ('decode' in img) {
    img.decode().catch(() => {});
  }
}

function preloadImageList(list) {
  if (!Array.isArray(list)) return;
  list.forEach(item => {
    if (typeof item === 'string') {
      preloadImage(item);
    } else if (item && typeof item === 'object') {
      if (item.src) preloadImage(item.src);
      if (item.thumb) preloadImage(item.thumb);
    }
  });
}

let lbGallery = [];
let lbCurIdx = 0;
let lbSyncCallback = null;

function normalizeMediaItem(item) {
  if (typeof item === 'object' && item !== null) {
    return {
      type: item.type || (item.src && (item.src.endsWith('.mp4') || item.src.endsWith('.webm')) ? 'video' : 'image'),
      src: item.src,
      thumb: item.thumb || item.src,
      alt: item.alt || ''
    };
  }
  const isVid = typeof item === 'string' && (item.endsWith('.mp4') || item.endsWith('.webm'));
  return {
    type: isVid ? 'video' : 'image',
    src: item,
    thumb: item,
    alt: ''
  };
}

function updateLbSlide(idx, animate = true) {
  if (!lbGallery.length) return;
  if (idx < 0) idx = lbGallery.length - 1;
  if (idx >= lbGallery.length) idx = 0;
  lbCurIdx = idx;

  const currentItem = lbGallery[lbCurIdx];

  // Pause video if active
  if (lbVid) {
    lbVid.pause();
  }

  if (currentItem.type === 'video') {
    if (lbImg) lbImg.style.display = 'none';
    if (lbVid) {
      lbVid.style.display = 'block';
      if (!lbVid.src.endsWith(currentItem.src)) {
        lbVid.src = currentItem.src;
      }
      lbVid.style.opacity = '1';
      lbVid.style.transform = 'scale(1)';
    }
  } else {
    if (lbVid) {
      lbVid.style.display = 'none';
    }
    if (lbImg) {
      lbImg.style.display = 'block';
      lbImg.src = currentItem.src;
      lbImg.alt = currentItem.alt || 'معاينة الصورة';
      lbImg.style.opacity = '1';
      lbImg.style.transform = 'scale(1)';
      
      // Preload next and previous images
      const nextIdx = (lbCurIdx + 1) % lbGallery.length;
      const prevIdx = (lbCurIdx - 1 + lbGallery.length) % lbGallery.length;
      if (lbGallery[nextIdx] && lbGallery[nextIdx].src) preloadImage(lbGallery[nextIdx].src);
      if (lbGallery[prevIdx] && lbGallery[prevIdx].src) preloadImage(lbGallery[prevIdx].src);
    }
  }

  // Update counter badge
  if (lbCounter) {
    const isAr = (document.documentElement.lang === 'ar' || !document.documentElement.lang);
    const typeLabel = currentItem.type === 'video' ? (isAr ? 'فيديو' : 'Video') : (isAr ? 'صورة' : 'Image');
    lbCounter.textContent = `${lbCurIdx + 1} / ${lbGallery.length} • ${typeLabel}`;
  }

  // Update thumbnail squares
  if (lbThumbs) {
    const thumbEls = lbThumbs.querySelectorAll('.lb-thumb');
    thumbEls.forEach((th, i) => {
      if (i === lbCurIdx) {
        th.classList.add('active');
        th.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        th.classList.remove('active');
      }
    });
  }

  // Sync with on-page slider if callback provided
  if (typeof lbSyncCallback === 'function') {
    lbSyncCallback(lbCurIdx);
  }
}

function openLightbox(items, startIndex = 0, onSync = null) {
  if (!items || !items.length) return;
  lbGallery = items.map(normalizeMediaItem);
  lbSyncCallback = onSync;
  lbCurIdx = Math.max(0, Math.min(startIndex, lbGallery.length - 1));

  // Preload all gallery images immediately
  preloadImageList(lbGallery);

  // Build thumbnail squares ("مربعات للصور والفيديو")
  if (lbThumbs) {
    lbThumbs.innerHTML = '';
    if (lbGallery.length > 1) {
      lbThumbs.style.display = 'flex';
      lbGallery.forEach((item, i) => {
        const t = document.createElement('div');
        const isVid = item.type === 'video';
        t.className = 'lb-thumb' + (isVid ? ' lb-thumb-vid' : '') + (i === lbCurIdx ? ' active' : '');
        t.setAttribute('role', 'button');
        t.setAttribute('aria-label', isVid ? `فيديو ${i + 1}` : `صورة ${i + 1}`);

        const im = document.createElement('img');
        im.src = item.thumb;
        im.alt = isVid ? `فيديو مصغر ${i + 1}` : `مصغرة ${i + 1}`;
        im.loading = 'lazy';
        t.appendChild(im);

        if (isVid) {
          const playBadge = document.createElement('span');
          playBadge.className = 'lb-play-badge';
          playBadge.innerHTML = '▶';
          t.appendChild(playBadge);
        }

        t.addEventListener('click', (e) => {
          e.stopPropagation();
          updateLbSlide(i);
        });
        lbThumbs.appendChild(t);
      });
    } else {
      lbThumbs.style.display = 'none';
    }
  }

  // Show or hide navigation arrows
  const showNav = lbGallery.length > 1;
  if (lbPrev) lbPrev.style.display = showNav ? 'flex' : 'none';
  if (lbNext) lbNext.style.display = showNav ? 'flex' : 'none';

  updateLbSlide(lbCurIdx, false);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (lbVid) {
    lbVid.pause();
    lbVid.src = '';
  }
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

if (lbClose) lbClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
if (lbPrev) lbPrev.addEventListener('click', (e) => { e.stopPropagation(); updateLbSlide(lbCurIdx - 1); });
if (lbNext) lbNext.addEventListener('click', (e) => { e.stopPropagation(); updateLbSlide(lbCurIdx + 1); });

// Close on backdrop click (outside image and controls)
lb.addEventListener('click', (e) => {
  if (e.target === lb || e.target.classList.contains('lb-stage') || e.target.classList.contains('lb-img-wrap')) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') updateLbSlide(lbCurIdx - 1);
  if (e.key === 'ArrowRight') updateLbSlide(lbCurIdx + 1);
});

// Mobile touch swipe support
let lbTouchStartX = 0;
lb.addEventListener('touchstart', e => {
  if (e.changedTouches && e.changedTouches[0]) {
    lbTouchStartX = e.changedTouches[0].screenX;
  }
}, { passive: true });
lb.addEventListener('touchend', e => {
  if (e.changedTouches && e.changedTouches[0]) {
    const diff = e.changedTouches[0].screenX - lbTouchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) updateLbSlide(lbCurIdx - 1);
      else updateLbSlide(lbCurIdx + 1);
    }
  }
}, { passive: true });

// Project Card Sliders (Company & Personal)
document.querySelectorAll('.card-slider').forEach(slider => {
  const img = slider.querySelector('.card-slider-img');
  const prevBtn = slider.querySelector('.card-slider-prev');
  const nextBtn = slider.querySelector('.card-slider-next');
  const counter = slider.querySelector('.card-slider-counter');
  if (!img) return;
  let shots = [];
  try { shots = JSON.parse(img.getAttribute('data-shots') || '[]'); } catch(e){}
  if (!shots.length) return;

  // Preload all shots for this card immediately
  preloadImageList(shots);

  let cur = 0;
  function update(idx) {
    if (idx < 0) idx = shots.length - 1;
    if (idx >= shots.length) idx = 0;
    cur = idx;
    img.src = shots[cur];
    img.style.opacity = '1';
    if (counter) counter.textContent = (cur + 1) + ' / ' + shots.length;

    // Preload adjacent images
    const nextIdx = (cur + 1) % shots.length;
    const prevIdx = (cur - 1 + shots.length) % shots.length;
    preloadImage(shots[nextIdx]);
    preloadImage(shots[prevIdx]);
  }
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); update(cur - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); update(cur + 1); });

  // When clicking the card image, open Lightbox with navigation arrows and thumbnail squares
  img.addEventListener('click', () => {
    openLightbox(shots, cur, (newIdx) => update(newIdx));
  });
});

// Cisco Slider
const ciscoImgs = [
  'assets/cisco/1.jpg',
  'assets/cisco/2.jpg',
  'assets/cisco/3.jpg',
  'assets/cisco/4.jpg',
  'assets/cisco/5.jpg',
  'assets/cisco/6.jpg',
  'assets/cisco/7.jpg',
  'assets/cisco/8.jpg',
  'assets/cisco/9.jpg'
];
// Preload all Cisco images immediately
preloadImageList(ciscoImgs);

let ciscoIdx = 0;
const ciscoImgEl = document.getElementById('ciscoImg');
const ciscoCounterEl = document.getElementById('ciscoCounter');
const ciscoPrevBtn = document.getElementById('ciscoPrev');
const ciscoNextBtn = document.getElementById('ciscoNext');

function showCiscoSlide(idx){
  if(idx < 0) idx = ciscoImgs.length - 1;
  if(idx >= ciscoImgs.length) idx = 0;
  ciscoIdx = idx;
  if(ciscoImgEl){
    ciscoImgEl.src = ciscoImgs[ciscoIdx];
    ciscoImgEl.alt = 'سيسكو - صورة ' + (ciscoIdx + 1);
    ciscoImgEl.style.opacity = '1';
  }
  if(ciscoCounterEl){
    ciscoCounterEl.textContent = (ciscoIdx + 1) + ' / ' + ciscoImgs.length;
  }
  // Preload adjacent Cisco images
  preloadImage(ciscoImgs[(ciscoIdx + 1) % ciscoImgs.length]);
  preloadImage(ciscoImgs[(ciscoIdx - 1 + ciscoImgs.length) % ciscoImgs.length]);
}

if(ciscoPrevBtn) ciscoPrevBtn.addEventListener('click', (e)=>{ e.stopPropagation(); showCiscoSlide(ciscoIdx - 1); });
if(ciscoNextBtn) ciscoNextBtn.addEventListener('click', (e)=>{ e.stopPropagation(); showCiscoSlide(ciscoIdx + 1); });

// When clicking Cisco image, open Lightbox with all 9 images, arrows and thumbnail squares
if (ciscoImgEl) {
  ciscoImgEl.addEventListener('click', () => {
    openLightbox(ciscoImgs, ciscoIdx, (newIdx) => showCiscoSlide(newIdx));
  });
}

// Boycott Ayah Image Lightbox
document.querySelectorAll('.boycott-ayah-img').forEach(ayahImg => {
  ayahImg.addEventListener('click', () => {
    openLightbox([ayahImg.src], 0);
  });
});

// Microsoft Lightbox Gallery (Image + Video)
const msGallery = [
  {
    type: 'image',
    src: 'assets/microsoft/488909891_1114836733993247_3759470336126385336_n.jpg',
    thumb: 'assets/microsoft/488909891_1114836733993247_3759470336126385336_n.jpg',
    alt: 'ابتهال أبو السعد - مايكروسوفت'
  },
  {
    type: 'video',
    src: 'assets/microsoft/VID_20260905_105344_952.mp4',
    thumb: 'assets/microsoft/488909891_1114836733993247_3759470336126385336_n.jpg',
    alt: 'فيديو ابتهال أبو السعد - مايكروسوفت'
  }
];
// Preload Microsoft gallery immediately
preloadImageList(msGallery);

const msImgEl = document.getElementById('msImg');
if (msImgEl) {
  msImgEl.addEventListener('click', () => {
    openLightbox(msGallery, msIdx, (newIdx) => showMsSlide(newIdx));
  });
}

// Other media images
document.querySelectorAll('.shots img, .media-box img, .boycott-img').forEach(otherImg => {
  if (otherImg === ciscoImgEl || otherImg === msImgEl) return;
  otherImg.addEventListener('click', () => {
    openLightbox([otherImg.src], 0);
  });
});

// Microsoft Slider (Image & Video)
let msIdx = 0;
const msSlideImg = document.getElementById('msSlideImg');
const msSlideVid = document.getElementById('msSlideVid');
const msVideo = document.getElementById('msVideo');
const msCounterEl = document.getElementById('msCounter');
const msPrevBtn = document.getElementById('msPrev');
const msNextBtn = document.getElementById('msNext');

function updateMsCounter(){
  if(!msCounterEl) return;
  const isAr = (document.documentElement.lang === 'ar' || !document.documentElement.lang);
  const typeLabel = msIdx === 0 ? (isAr ? 'صورة' : 'Image') : (isAr ? 'فيديو' : 'Video');
  msCounterEl.textContent = `${msIdx + 1} / 2 • ${typeLabel}`;
  if(msIdx === 1){
    msCounterEl.style.top = '10px';
    msCounterEl.style.bottom = 'auto';
  } else {
    msCounterEl.style.top = 'auto';
    msCounterEl.style.bottom = '10px';
  }
}

function showMsSlide(idx){
  if(idx < 0) idx = 1;
  if(idx > 1) idx = 0;
  msIdx = idx;
  if(msIdx === 0){
    if(msSlideImg) msSlideImg.style.display = 'flex';
    if(msSlideVid) msSlideVid.style.display = 'none';
    if(msVideo) msVideo.pause();
  } else {
    if(msSlideImg) msSlideImg.style.display = 'none';
    if(msSlideVid) msSlideVid.style.display = 'flex';
  }
  updateMsCounter();
}

if(msPrevBtn) msPrevBtn.addEventListener('click', (e)=>{ e.stopPropagation(); showMsSlide(msIdx - 1); });
if(msNextBtn) msNextBtn.addEventListener('click', (e)=>{ e.stopPropagation(); showMsSlide(msIdx + 1); });
updateMsCounter();

// Idle background preloader for all card images
function preloadAllSiteImages() {
  document.querySelectorAll('.card-slider-img').forEach(el => {
    try {
      const shots = JSON.parse(el.getAttribute('data-shots') || '[]');
      preloadImageList(shots);
    } catch(e){}
  });
}
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadAllSiteImages);
  } else {
    setTimeout(preloadAllSiteImages, 500);
  }
}

// ===== i18n =====
const AR = {};
document.querySelectorAll('[data-i18n]').forEach(el=>{ AR[el.dataset.i18n] = el.innerHTML; });

const T = (typeof window !== 'undefined' && window.T) ? window.T : {};

// RTL languages defined in LLM.txt
const rtlLangs = ['ar', 'ur', 'fa', 'ps', 'sd', 'ku'];

function setLang(l){
  const isAr = (l === 'ar');
  const isRtl = rtlLangs.includes(l);
  const langDict = (window.T && window.T[l]) ? window.T[l] : (T[l] || null);
  const d = isAr ? AR : langDict;
  if(!d) return;
  document.documentElement.lang = l;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.dataset.i18n;
    if(d[k] !== undefined) el.innerHTML = d[k];
  });
  if(typeof updateMsCounter === 'function') updateMsCounter();
  localStorage.setItem('cv-lang', l);
  if(typeof updateCustomSelectUI === 'function') updateCustomSelectUI(l);
}

// ===== Custom Select Dropdown Controller =====
const langWrap = document.getElementById('langSelectWrap');
const langBtn = document.getElementById('langSelectBtn');
const langVal = document.getElementById('langSelectVal');
const langDropdown = document.getElementById('langSelectDropdown');
const nativeSel = document.getElementById('langSel');

function updateCustomSelectUI(val) {
  if (!nativeSel || !langVal) return;
  const opt = Array.from(nativeSel.options).find(o => o.value === val);
  if (opt) {
    langVal.textContent = opt.textContent;
  }
  if (langDropdown) {
    langDropdown.querySelectorAll('.custom-select-opt').forEach(el => {
      const isSel = (el.dataset.value === val);
      el.classList.toggle('selected', isSel);
      el.setAttribute('aria-selected', isSel ? 'true' : 'false');
    });
  }
}

function openDropdown() {
  if (!langWrap) return;
  langWrap.classList.add('open');
  if (langBtn) langBtn.setAttribute('aria-expanded', 'true');
  const selectedItem = langDropdown ? langDropdown.querySelector('.custom-select-opt.selected') : null;
  if (selectedItem) {
    selectedItem.scrollIntoView({ block: 'nearest' });
  }
}

function closeDropdown() {
  if (!langWrap) return;
  langWrap.classList.remove('open');
  if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
}

if (langWrap && langBtn && langDropdown && nativeSel) {
  Array.from(nativeSel.options).forEach(opt => {
    const item = document.createElement('div');
    item.className = 'custom-select-opt' + (opt.value === nativeSel.value ? ' selected' : '');
    item.dataset.value = opt.value;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', opt.value === nativeSel.value ? 'true' : 'false');
    item.textContent = opt.textContent;

    item.addEventListener('click', (e) => {
      e.stopPropagation();
      nativeSel.value = opt.value;
      setLang(opt.value);
      closeDropdown();
    });

    langDropdown.appendChild(item);
  });

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (langWrap.classList.contains('open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  document.addEventListener('click', (e) => {
    if (!langWrap.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
    }
  });
}

if(nativeSel){
  nativeSel.addEventListener('change', e=>setLang(e.target.value));
}

const saved = localStorage.getItem('cv-lang');
const availableLangs = (window.T ? Object.keys(window.T) : Object.keys(T));
if(saved && saved !== 'ar' && (availableLangs.includes(saved))){
  if(nativeSel) nativeSel.value = saved;
  setLang(saved);
} else {
  updateCustomSelectUI('ar');
}
