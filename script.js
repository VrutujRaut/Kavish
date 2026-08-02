/* KAVISH / BIRTHDAY.EXE — vanilla interaction layer */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const birthdayConfig = {
  music: 'assets/music/Sunflower.mp3',
  photos: [
    { src: 'assets/photos/kavish-memory-01.jpg', caption: 'Us, caught in the sunshine' },
    { src: 'assets/photos/kavish-memory-02.jpg', caption: 'Best-friend energy, anime edition' },
    { src: 'assets/photos/kavish-memory-03.jpeg', caption: 'Indoor laughs, same unbeatable duo' }
  ]
};

// Loading, time-aware greeting, progress and smooth nav.
window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('is-done'), 3000));
const hour = new Date().getHours();
$('#greeting').textContent = hour < 12 ? 'GOOD MORNING, PLAYER' : hour < 18 ? 'GOOD AFTERNOON, PLAYER' : 'GOOD EVENING, PLAYER';
const ageNow = new Date(); let age = ageNow.getFullYear() - 2010; const birthdayThisYear = new Date(ageNow.getFullYear(), 7, 7); if (ageNow < birthdayThisYear) age -= 1; $('#age-value').textContent = age;
const progress = $('#scroll-progress');
window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${(scrollY / max) * 100}%`; $('#site-nav').classList.toggle('scrolled', scrollY > 40); $('#back-top').classList.toggle('show', scrollY > 700); }, { passive: true });
$('#back-top').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
$('#enter-button').addEventListener('click', () => document.body.classList.add('entered'));

// Ambient canvas particles: one lightweight RAF loop for the living background.
const canvas = $('#ambient-canvas'), ctx = canvas.getContext('2d'); let particles = [];
const resizeCanvas = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); particles = Array.from({ length: Math.min(90, Math.floor(innerWidth / 15)) }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.5 + .3, vx: (Math.random() - .5) * .15, vy: (Math.random() - .5) * .15, a: Math.random() * .6 + .1 })); };
const drawParticles = () => { ctx.clearRect(0, 0, innerWidth, innerHeight); particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > innerWidth) p.vx *= -1; if (p.y < 0 || p.y > innerHeight) p.vy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(114,233,245,${p.a})`; ctx.fill(); }); requestAnimationFrame(drawParticles); };
resizeCanvas(); addEventListener('resize', resizeCanvas); drawParticles();

// IntersectionObserver reveals every section element as it enters the viewport.
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); const achievement = entry.target.closest('.achievement'); if (achievement) unlockAchievement(achievement.dataset.achievement); observer.unobserve(entry.target); } }), { threshold: .14 });
$$('.reveal').forEach(el => observer.observe(el));

// Custom cursor and pointer parallax.
const dot = $('#cursor-dot'), ring = $('#cursor-ring'); addEventListener('pointermove', e => { dot.style.left = `${e.clientX}px`; dot.style.top = `${e.clientY}px`; ring.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 380, fill: 'forwards' }); });
$$('a,button,.memory-card,.game-card').forEach(el => { el.addEventListener('mouseenter', () => ring.classList.add('hover')); el.addEventListener('mouseleave', () => ring.classList.remove('hover')); });
addEventListener('pointermove', e => { const x = (e.clientX / innerWidth - .5) * 8; const y = (e.clientY / innerHeight - .5) * 8; $$('.hero__content,.hero__meta').forEach(el => el.style.transform = `translate(${x}px,${y}px)`); }, { passive: true });

// Editable photo archive. Add paths to birthdayConfig.photos, or drop files into assets/photos and add them here.
const photoDefaults = [{ caption: 'The beginning of the chaos', label: 'MEMORY_001' }, { caption: 'Certified late-night energy', label: 'MEMORY_002' }, { caption: 'One more game, always', label: 'MEMORY_003' }];
const memoryGrid = $('#memory-grid');
const renderMemories = () => { const items = birthdayConfig.photos.length ? birthdayConfig.photos : photoDefaults; memoryGrid.innerHTML = items.map((item, i) => `<figure class="memory-card reveal" style="--rotate:${i % 2 ? 2 : -2}deg" data-src="${item.src || ''}" data-caption="${item.caption}"><div class="memory-card__image">${item.src ? `<img src="${item.src}" alt="${item.caption}">` : '✦'}</div><figcaption>${item.caption}</figcaption></figure>`).join(''); $$('.memory-card').forEach(card => { observer.observe(card); card.addEventListener('click', () => { if (!card.dataset.src) return; $('#lightbox-image').src = card.dataset.src; $('#lightbox-caption').textContent = card.dataset.caption; $('#lightbox').classList.add('is-open'); }); }); };
renderMemories(); $('#lightbox-close').addEventListener('click', () => $('#lightbox').classList.remove('is-open')); $('#lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox') e.currentTarget.classList.remove('is-open'); });

// Live countdown to the next 07 August in the visitor's local timezone.
const countdownTick = () => { const now = new Date(); const isBirthday = now.getMonth() === 7 && now.getDate() === 7; const message = document.querySelector('#countdown-message'); if (isBirthday) { if (message) message.textContent = 'HAPPY BIRTHDAY 🎉'; ['count-days','count-hours','count-minutes','count-seconds'].forEach(id => { const node = document.getElementById(id); if (node) node.textContent = '00'; }); return; } let target = new Date(now.getFullYear(), 7, 7, 0, 0, 0); if (target <= now) target = new Date(now.getFullYear() + 1, 7, 7, 0, 0, 0); const delta = target - now; const values = [Math.floor(delta / 86400000), Math.floor(delta / 3600000) % 24, Math.floor(delta / 60000) % 60, Math.floor(delta / 1000) % 60]; ['count-days','count-hours','count-minutes','count-seconds'].forEach((id, i) => { const node = document.getElementById(id); if (node) node.textContent = String(values[i]).padStart(2, '0'); }); }; countdownTick(); setInterval(countdownTick, 1000);

// Flip cards, ripple buttons and random friend quote toast.
$$('[data-flip]').forEach(card => card.addEventListener('click', () => { card.classList.toggle('flipped'); celebrate(card.classList.contains('flipped') ? 'Classified lore recovered.' : 'Card reset.'); }));
$$('[data-ripple]').forEach(button => button.addEventListener('click', e => { const ripple = document.createElement('i'); ripple.className = 'ripple'; ripple.style.cssText = `position:absolute;left:${e.offsetX}px;top:${e.offsetY}px;width:10px;height:10px;border-radius:50%;background:rgba(114,233,245,.5);transform:translate(-50%,-50%);animation:ripple .6s ease-out`; button.append(ripple); setTimeout(() => ripple.remove(), 700); }));
const quotes = ['Elite teammate energy.', 'Another year, still undefeated.', 'Main character behaviour detected.', 'Friendship XP increased.']; const celebrate = message => { $('#toast-text').textContent = message || quotes[Math.floor(Math.random() * quotes.length)]; $('#toast').classList.add('show'); setTimeout(() => $('#toast').classList.remove('show'), 2800); };

// Birthday wish typewriter and confetti.
const wish = `Kashu — some people are friends, and some people become part of the operating system. Thanks for every laugh, every late-night adventure, and every “one last game” that absolutely was not the last game. Here’s to another legendary year. Keep being exactly you.`; let typed = 0;
const typeWish = () => { if (typed < wish.length) { $('#wish-text').textContent += wish[typed++]; setTimeout(typeWish, 24); } }; new IntersectionObserver(entries => entries[0].isIntersecting && !typed && typeWish(), { threshold: .4 }).observe($('#wish-text'));
$('#wish-button').addEventListener('click', () => { $('#wish-text').textContent = wish; $('#wish-button').setAttribute('aria-expanded', 'true'); $('#wish-button').innerHTML = 'Message opened <span>✓</span>'; confetti(); celebrate('Birthday transmission delivered.'); });
function confetti() { for (let i = 0; i < 45; i++) { const piece = document.createElement('i'); piece.style.cssText = `position:fixed;z-index:130;left:${50 + (Math.random() - .5) * 20}vw;top:50vh;width:6px;height:12px;background:${['#a676ff','#72e9f5','#ffc875','#7ce6b0'][i % 4]};transform:rotate(${Math.random() * 360}deg);animation:confetti-fall ${1 + Math.random() * 1.5}s ease-out forwards`; document.body.append(piece); setTimeout(() => piece.remove(), 2600); } }

// Two small games.
function miniGame(start, target, zone, score, emoji) { let points = 0, timer; start.addEventListener('click', () => { points = 0; score.textContent = '00'; target.style.display = 'block'; clearInterval(timer); timer = setInterval(() => { target.style.left = `${Math.random() * 85}%`; target.style.top = `${Math.random() * 75}%`; }, 650); setTimeout(() => { clearInterval(timer); target.style.display = 'none'; celebrate(`${emoji} Round complete: ${String(points).padStart(2, '0')} points.`); }, 8000); }); target.addEventListener('click', e => { e.stopPropagation(); points++; score.textContent = String(points).padStart(2, '0'); target.style.left = `${Math.random() * 85}%`; target.style.top = `${Math.random() * 75}%`; }); }
miniGame($('#cake-start'), $('#cake-target'), $('#cake-game'), $('#cake-score'), '🎂'); miniGame($('#emerald-start'), $('#emerald-target'), $('#emerald-game'), $('#emerald-score'), '◆');

// Achievement popup system and hidden collectibles.
const unlocked = new Set(); function unlockAchievement(name) { if (unlocked.has(name)) return; unlocked.add(name); setTimeout(() => celebrate({ year: 'Survived Another Year', fire: 'Free Fire Veteran', block: 'BlockHeaven Explorer', night: 'Certified Night Owl' }[name]), 500); }
let emeraldClicks = 0; addEventListener('keydown', e => { if (e.key.toLowerCase() === 'e') { emeraldClicks++; if (emeraldClicks === 3) { unlockAchievement('block'); celebrate('Hidden emerald collected.'); } } });

// Local music is optional: browsers wait for the Enter button / music button before playback.
const audio = $('#birthday-audio'); audio.volume = 0; let playing = false; let musicReady = false; const fadeMusic = (fromGesture = false) => { if (!audio.src) return; audio.muted = !fromGesture; audio.play().then(() => { musicReady = true; if (fromGesture) { audio.muted = false; playing = true; let volume = 0; const fade = setInterval(() => { volume = Math.min(volume + .04, .32); audio.volume = volume; if (volume >= .32) clearInterval(fade); }, 100); } }).catch(() => { if (fromGesture) celebrate('Add your MP3 to assets/music, then try again.'); }); }; const startMusic = () => { if (!playing) fadeMusic(true); }; addEventListener('load', () => fadeMusic(false)); addEventListener('pointerdown', startMusic, { once: true }); $('#music-toggle').addEventListener('click', () => { if (playing) { audio.pause(); playing = false; } else startMusic(); }); $('#enter-button').addEventListener('click', startMusic, { once: true });

// Lightweight SFX generated with Web Audio; no extra sound files or libraries are required.
let sfxContext; const getSfxContext = () => { sfxContext ||= new (window.AudioContext || window.webkitAudioContext)(); return sfxContext; }; const sfx = (type = 'click') => { try { const context = getSfxContext(); const oscillator = context.createOscillator(); const gain = context.createGain(); const now = context.currentTime; const settings = { click: [440, .055], hover: [720, .035], collect: [880, .12], launch: [180, .22] }[type] || [440, .055]; oscillator.type = type === 'launch' ? 'sawtooth' : 'sine'; oscillator.frequency.setValueAtTime(settings[0], now); oscillator.frequency.exponentialRampToValueAtTime(settings[0] * (type === 'launch' ? 3 : 1.15), now + settings[1]); gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.08, now + .008); gain.gain.exponentialRampToValueAtTime(.0001, now + settings[1]); oscillator.connect(gain).connect(context.destination); oscillator.start(now); oscillator.stop(now + settings[1] + .02); } catch {} }; $$('button').forEach(button => button.addEventListener('click', () => sfx(button.id.includes('fireworks') ? 'launch' : 'click'))); $$('.game-card,.achievement,.memory-card').forEach(item => item.addEventListener('mouseenter', () => sfx('hover')));

// Secret button + Konami Code easter eggs.
const broMode = $('#bro-mode'); const openBro = () => { broMode.classList.add('is-open'); document.body.classList.add('bro-active'); celebrate('Secret mode unlocked.'); }; $('#secret-button').addEventListener('click', openBro); $('#bro-close').addEventListener('click', () => { broMode.classList.remove('is-open'); document.body.classList.remove('bro-active'); });
addEventListener('keydown', e => { if (e.key === 'Escape') { broMode.classList.remove('is-open'); document.body.classList.remove('bro-active'); $('#lightbox').classList.remove('is-open'); } });
let konami = []; const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']; addEventListener('keydown', e => { konami.push(e.key); konami = konami.slice(-code.length); if (konami.join() === code.join()) openBro(); });

// Animated favicon.
const favicon = document.createElement('link'); favicon.rel = 'icon'; favicon.href = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="%2308090e"/><text x="32" y="44" text-anchor="middle" font-size="38" fill="%23a676ff">K</text></svg>`; document.head.append(favicon);
