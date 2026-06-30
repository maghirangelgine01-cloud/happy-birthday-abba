// ===== BIRTHDAY MESSAGE =====
// 👇 Replace this with your long message!
const BIRTHDAY_MESSAGE =
`Happy Birthday, Abba! 
Abbong
 Madam
 Baby Dragon
 Dragonnn

 Enjoy you're day!
 I wish you all the best in life and may you be happy always.

 I pray that you win in life,
 achieve all your dreams and get everything you want.
 
 Isang taon naman lumipas sayo
 
 I hope this year will be filled with more blessings and happiness.

 Thank you for being such an amazing person in my life.
 
 I am grateful for your presence in my life and memories
  we have created together.
 
  I will always be your biggest supporter and will 
 be there for you anytime.

 English yarn HAAHHA😁

 Kung feel mo down ka mga pray ka lang 
 yun  sinasabi mo sakin 

 
May bible verse po ako

Psalm 20:4
May he give you the desire of your heart and make all your plans succeed.


                  GINE😊  `;

const HEADING_TEXT = "Happy Birthday! 🎂";
const TYPING_SPEED = 30;   // ms per character
const LINE_PAUSE   = 350;  // ms pause between lines

// ===== ELEMENT REFS =====
const overlay     = document.getElementById('overlay');
const startBtn    = document.getElementById('startBtn');
const main        = document.getElementById('main');
const bgMusic     = document.getElementById('bgMusic');
const muteBtn     = document.getElementById('muteBtn');
const replayBtn   = document.getElementById('replayBtn');
const cake        = document.getElementById('cake');
const wishMsg     = document.getElementById('wishMsg');
const mainText    = document.getElementById('mainText');
const cursor1     = document.getElementById('cursor1');
const cursor2     = document.getElementById('cursor2');
const msgText     = document.getElementById('msgText');
const modalBody   = document.getElementById('modalBody');
const msgModal    = document.getElementById('msgModal');
const modalClose  = document.getElementById('modalClose');
const confettiBox = document.getElementById('confetti-container');
const heartsBox   = document.getElementById('hearts-container');
const sparklesBg  = document.getElementById('sparkles-bg');
const flames      = ['flame1','flame2','flame3'].map(id => document.getElementById(id));

// ===== CONFIG =====
const CONFETTI_COLORS = ['#f48fb1','#ce93d8','#fff176','#80deea','#a5d6a7','#ff8a65','#fff','#f06292'];
const HEART_EMOJIS    = ['❤️','💕','💖','💗','💓','🌸','✨','💝'];
const SPARKLE_EMOJIS  = ['✨','⭐','🌟','💫','🌸','🦋'];

let isMuted    = false;
let candlesOut = false;
let twRunning  = false;

// ===== OVERLAY → START =====
startBtn.addEventListener('click', () => {
  overlay.style.transition = 'opacity 0.6s';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
    main.classList.remove('hidden');
    startExperience();
  }, 600);
});

function startExperience() {
  bgMusic.volume = 0.55;
  bgMusic.play().catch(() => {});
  spawnSparklesBg();
  burstConfetti(100);
  startHearts();
  setTimeout(() => typeHeading(), 600);
}

// ===== HEADING TYPEWRITER =====
function typeHeading() {
  mainText.textContent = '';
  cursor1.classList.remove('hidden');
  typeText(mainText, HEADING_TEXT, TYPING_SPEED, () => {
    cursor1.classList.add('hidden');
  });
}

// ===== MODAL MESSAGE TYPEWRITER =====
function typeMessage() {
  if (twRunning) return;
  twRunning = true;

  msgText.textContent = '';
  cursor2.classList.remove('hidden');

  const lines = BIRTHDAY_MESSAGE.split('\n');
  let lineIndex = 0;

  function nextLine() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        cursor2.classList.add('hidden');
        // Show the "Watch a Memory" button after typing finishes
        document.getElementById('watchBtn').classList.remove('hidden');
      }, 1200);
      twRunning = false;
      return;
    }
    const line = lines[lineIndex];
    lineIndex++;
    if (lineIndex > 1) msgText.textContent += '\n';
    typeText(msgText, line, TYPING_SPEED, () => {
      modalBody.scrollTop = modalBody.scrollHeight;
      setTimeout(nextLine, line.trim() === '' ? 100 : LINE_PAUSE);
    });
  }
  nextLine();
}

// ===== CORE TYPETEXT =====
function typeText(el, text, speed, onDone) {
  let i = 0;
  if (text.length === 0) { if (onDone) onDone(); return; }
  const iv = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) { clearInterval(iv); if (onDone) onDone(); }
  }, speed);
}

// ===== CONFETTI =====
function burstConfetti(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(spawnConfetti, Math.random() * 1800);
  }
}
function spawnConfetti() {
  const el    = document.createElement('div');
  el.classList.add('confetti-piece');
  const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const size  = 6 + Math.random() * 8;
  const dur   = 2.2 + Math.random() * 2;
  el.style.cssText = `
    left:${Math.random() * 100}vw;
    width:${size}px; height:${size}px;
    background:${color};
    border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
    animation-duration:${dur}s;
  `;
  confettiBox.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

// ===== FLOATING HEARTS =====
function startHearts() {
  spawnHeart();
  setInterval(spawnHeart, 900);
}
function spawnHeart() {
  const el    = document.createElement('div');
  el.classList.add('heart');
  const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
  const dur   = 5 + Math.random() * 5;
  el.textContent = emoji;
  el.style.cssText = `
    left:${3 + Math.random() * 94}vw;
    font-size:${1 + Math.random() * 0.8}rem;
    animation-duration:${dur}s;
  `;
  heartsBox.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

// ===== SPARKLES BG =====
function spawnSparklesBg() {
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.classList.add('sparkle');
    el.textContent = SPARKLE_EMOJIS[Math.floor(Math.random() * SPARKLE_EMOJIS.length)];
    el.style.cssText = `
      top:${Math.random() * 100}vh;
      left:${Math.random() * 100}vw;
      animation-duration:${2.5 + Math.random() * 3}s;
      animation-delay:${Math.random() * 3}s;
    `;
    sparklesBg.appendChild(el);
  }
}

// ===== CAKE CLICK → MODAL =====
cake.addEventListener('click', () => {
  if (candlesOut) return;
  candlesOut = true;

  flames.forEach((flame, i) => {
    setTimeout(() => {
      if (!flame) return;
      flame.style.transition = 'opacity 0.3s';
      flame.style.opacity = '0';
      setTimeout(() => flame.remove(), 300);
    }, i * 150);
  });

  setTimeout(() => {
    document.querySelector('.cake-hint').classList.add('hidden');
    wishMsg.classList.remove('hidden');
    burstConfetti(60);
    setTimeout(() => openModal(), 500);
  }, 550);
});

// ===== MODAL =====
function openModal() {
  twRunning = false;
  msgText.textContent = '';
  cursor2.classList.remove('hidden');
  document.getElementById('watchBtn').classList.add('hidden');
  msgModal.classList.remove('hidden');
  setTimeout(() => typeMessage(), 300);
}
function closeModal() {
  msgModal.classList.add('hidden');
}

modalClose.addEventListener('click', closeModal);
msgModal.addEventListener('click', (e) => {
  if (e.target === msgModal) closeModal();
});

// ===== VIDEO MODAL =====
const videoModal  = document.getElementById('videoModal');
const videoClose  = document.getElementById('videoClose');
const memoryVideo = document.getElementById('memoryVideo');
const watchBtn    = document.getElementById('watchBtn');

watchBtn.addEventListener('click', () => {
  closeModal();
  setTimeout(() => {
    // Stop background music
    bgMusic.pause();
    bgMusic.currentTime = 0;
    muteBtn.textContent = '🔇';
    // Open video modal and play
    videoModal.classList.remove('hidden');
    memoryVideo.play().catch(() => {});
  }, 300);
});

function closeVideoModal() {
  videoModal.classList.add('hidden');
  memoryVideo.pause();
  memoryVideo.currentTime = 0;
  // Resume background music
  bgMusic.play().catch(() => {});
  muteBtn.textContent = '🔊';
}

videoClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) closeVideoModal();
});

// ===== MUTE =====
muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  muteBtn.textContent = isMuted ? '🔇' : '🔊';
});
