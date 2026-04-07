/* characters.js
   Returns inline SVG strings for each character preset.
   Each character has a `left` and `right` variant.
   SVG groups have stable IDs so animation.js can target them.

   Named groups per character:
     #body-l / #body-r
     #face-l / #face-r
     #blush-l / #blush-r  (hidden by default, shown during hug)
*/

// ── Helper: shared face expressions ────────────────────────
function happyFace(cx, cy, size = 1) {
  const s = size;
  return `
    <!-- eyes -->
    <circle cx="${cx - 7 * s}" cy="${cy}" r="${2.5 * s}" fill="currentColor"/>
    <circle cx="${cx + 7 * s}" cy="${cy}" r="${2.5 * s}" fill="currentColor"/>
    <!-- smile -->
    <path d="M${cx - 7 * s} ${cy + 9 * s} Q${cx} ${cy + 17 * s} ${cx + 7 * s} ${cy + 9 * s}"
          fill="none" stroke="currentColor" stroke-width="${2 * s}" stroke-linecap="round"/>
  `;
}

function blushCircles(cx, cy, size = 1, color = '#FFAAC4') {
  const s = size;
  return `
    <ellipse cx="${cx - 14 * s}" cy="${cy + 4 * s}" rx="${8 * s}" ry="${5 * s}" fill="${color}" opacity="0"/>
    <ellipse cx="${cx + 14 * s}" cy="${cy + 4 * s}" rx="${8 * s}" ry="${5 * s}" fill="${color}" opacity="0"/>
  `;
}

// ── BUNNY ──────────────────────────────────────────────────
function bunnyLeft() {
  return `<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Left ear -->
  <ellipse cx="38" cy="32" rx="10" ry="30" fill="var(--color-char-left)" opacity="0.9"/>
  <ellipse cx="38" cy="32" rx="5" ry="24" fill="var(--color-char-detail)" opacity="0.7"/>
  <!-- Right ear -->
  <ellipse cx="62" cy="28" rx="10" ry="32" fill="var(--color-char-left)" opacity="0.9"/>
  <ellipse cx="62" cy="28" rx="5" ry="25" fill="var(--color-char-detail)" opacity="0.7"/>

  <!-- Body -->
  <g id="body-l">
    <ellipse cx="60" cy="118" rx="34" ry="36" fill="var(--color-char-left)"/>
    <!-- Belly -->
    <ellipse cx="60" cy="122" rx="20" ry="24" fill="var(--color-char-detail)" opacity="0.85"/>
    <!-- Left paw -->
    <ellipse cx="28" cy="138" rx="11" ry="7" fill="var(--color-char-left)" opacity="0.85"/>
    <!-- Right paw -->
    <ellipse cx="92" cy="138" rx="11" ry="7" fill="var(--color-char-left)" opacity="0.85"/>
    <!-- Tail -->
    <circle cx="96" cy="115" r="8" fill="var(--color-char-detail)" opacity="0.9"/>
  </g>

  <!-- Head -->
  <circle cx="60" cy="78" r="32" fill="var(--color-char-left)"/>

  <!-- Face group -->
  <g id="face-l" fill="var(--color-char-face)">
    ${happyFace(60, 76)}
  </g>

  <!-- Blush -->
  <g id="blush-l" class="char-blush">
    ${blushCircles(60, 76)}
  </g>
</svg>`;
}

function bunnyRight() {
  return `<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Left ear -->
  <ellipse cx="58" cy="28" rx="10" ry="32" fill="var(--color-char-right)" opacity="0.9"/>
  <ellipse cx="58" cy="28" rx="5" ry="25" fill="var(--color-char-detail)" opacity="0.7"/>
  <!-- Right ear -->
  <ellipse cx="82" cy="32" rx="10" ry="30" fill="var(--color-char-right)" opacity="0.9"/>
  <ellipse cx="82" cy="32" rx="5" ry="24" fill="var(--color-char-detail)" opacity="0.7"/>

  <!-- Body -->
  <g id="body-r">
    <ellipse cx="60" cy="118" rx="34" ry="36" fill="var(--color-char-right)"/>
    <ellipse cx="60" cy="122" rx="20" ry="24" fill="var(--color-char-detail)" opacity="0.85"/>
    <ellipse cx="28" cy="138" rx="11" ry="7" fill="var(--color-char-right)" opacity="0.85"/>
    <ellipse cx="92" cy="138" rx="11" ry="7" fill="var(--color-char-right)" opacity="0.85"/>
    <circle cx="24" cy="115" r="8" fill="var(--color-char-detail)" opacity="0.9"/>
  </g>

  <!-- Head -->
  <circle cx="60" cy="78" r="32" fill="var(--color-char-right)"/>

  <!-- Face -->
  <g id="face-r" fill="var(--color-char-face)">
    ${happyFace(60, 76)}
  </g>

  <!-- Blush -->
  <g id="blush-r" class="char-blush">
    ${blushCircles(60, 76, 1, '#FFB3CC')}
  </g>
</svg>`;
}

// ── BEAR (Milk & Mocha) ───────────────────────────────────────────────────
function bearLeft() {
  return `<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="overflow:visible;">
  <defs>
    <style>
      .is-hugging .pose-idle, .is-complete .pose-idle { opacity: 0; transition: opacity 0.2s; }
      .is-hugging .pose-hug, .is-complete .pose-hug { opacity: 1; transition: opacity 0.2s 0.1s; }
      .pose-hug { opacity: 0; }
    </style>
  </defs>

  <!-- IDLE POSE: Milk sitting, angry/puffed -->
  <g class="pose-idle" transform="translate(10, 20)">
    <!-- Body -->
    <ellipse cx="50" cy="110" rx="36" ry="30" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    <!-- Left Leg -->
    <ellipse cx="25" cy="130" rx="14" ry="10" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    <circle cx="20" cy="130" r="4" fill="#ffccdd" opacity="0.8"/> <!-- paw pad -->
    
    <!-- Ears -->
    <circle cx="24" cy="40" r="14" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    <circle cx="24" cy="40" r="6" fill="#ffccdd"/>
    <circle cx="86" cy="40" r="14" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    <circle cx="86" cy="40" r="6" fill="#ffccdd"/>
    
    <!-- Head -->
    <ellipse cx="55" cy="65" rx="42" ry="34" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    
    <!-- Face (angry/puffed) -->
    <!-- Closed eyes -->
    <path d="M 35 62 Q 42 66 48 62" fill="none" stroke="#3e281a" stroke-width="3" stroke-linecap="round"/>
    <path d="M 62 62 Q 68 66 75 62" fill="none" stroke="#3e281a" stroke-width="3" stroke-linecap="round"/>
    <!-- Nose & squiggly mouth -->
    <ellipse cx="55" cy="72" rx="4" ry="3" fill="#3e281a"/>
    <path d="M 48 80 Q 52 75 55 80 T 62 80" fill="none" stroke="#3e281a" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Blush -->
    <ellipse cx="30" cy="78" rx="8" ry="6" fill="#ffaac4" opacity="0.8"/>
    <ellipse cx="80" cy="78" rx="10" ry="8" fill="#ffaac4" opacity="0.9"/> <!-- Puffed cheek poked by Mocha -->
    
    <!-- Crossed Arms -->
    <path d="M 25 95 C 40 105, 50 110, 65 100" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
    <path d="M 25 95 C 40 105, 50 110, 65 100" fill="none" stroke="#3e281a" stroke-width="4" stroke-linecap="round"/>
    <path d="M 80 95 C 65 105, 55 110, 40 100" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
    <path d="M 80 95 C 65 105, 55 110, 40 100" fill="none" stroke="#3e281a" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- HUG POSE: Mocha back-hugging Milk (Image 3) -->
  <!-- Shifted slightly right to visually center them both when overlapping -->
  <g class="pose-hug" transform="translate(45, 10)"> 
    
    <!-- MOCHA (Brown bear) Background body/head -->
    <!-- Right Ear -->
    <circle cx="80" cy="40" r="14" fill="#C68A5B" stroke="#3e281a" stroke-width="4"/>
    <circle cx="80" cy="40" r="6" fill="#a46d43"/>
    
    <!-- Head/Body of Mocha leaning in -->
    <path d="M 40 40 C 90 20, 100 80, 80 130 C 60 140, 40 140, 20 130" fill="#C68A5B" stroke="#3e281a" stroke-width="4"/>
    
    <!-- MILK (White bear) in front -->
    <!-- Ears -->
    <circle cx="10" cy="65" r="12" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    <circle cx="10" cy="65" r="5" fill="#ffccdd"/>
    <circle cx="65" cy="50" r="12" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    
    <!-- Milk Body -->
    <ellipse cx="40" cy="120" rx="30" ry="26" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    
    <!-- Milk Head -->
    <ellipse cx="40" cy="80" rx="36" ry="28" fill="#ffffff" stroke="#3e281a" stroke-width="4"/>
    <!-- Face (content/shy) -->
    <path d="M 23 80 Q 29 83 33 80" fill="none" stroke="#3e281a" stroke-width="3" stroke-linecap="round"/>
    <path d="M 47 80 Q 53 83 57 80" fill="none" stroke="#3e281a" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="40" cy="87" rx="5" ry="3" fill="#3e281a"/>
    <path d="M 35 94 Q 40 98 45 94" fill="none" stroke="#3e281a" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Blush -->
    <ellipse cx="20" cy="89" rx="8" ry="6" fill="#ffaac4" opacity="0.9"/>
    <ellipse cx="60" cy="89" rx="8" ry="6" fill="#ffaac4" opacity="0.9"/>
    
    <!-- Mocha's Arm wrapped around Milk -->
    <path d="M 80 115 C 60 115, 30 115, 10 100" fill="none" stroke="#C68A5B" stroke-width="16" stroke-linecap="round"/>
    <path d="M 80 115 C 60 115, 30 115, 10 100" fill="none" stroke="#3e281a" stroke-width="4" stroke-linecap="round"/>
    
    <!-- Milk's Arm resting on Mocha's arm -->
    <path d="M 30 120 C 50 115, 70 115, 80 120" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
    <path d="M 30 120 C 50 115, 70 115, 80 120" fill="none" stroke="#3e281a" stroke-width="4" stroke-linecap="round"/>
  </g>
</svg>`;
}

function bearRight() {
  return `<svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="overflow:visible;">
  <defs>
    <style>
      .is-hugging .pose-idle, .is-complete .pose-idle { opacity: 0; transition: opacity 0.2s; }
      .pose-idle { opacity: 1; transition: opacity 0.2s 0.1s; }
    </style>
  </defs>

  <!-- IDLE POSE: Mocha standing, poking left -->
  <g class="pose-idle" transform="translate(20, 20)">
    <!-- Ears -->
    <circle cx="44" cy="30" r="14" fill="#C68A5B" stroke="#3e281a" stroke-width="4"/>
    <circle cx="44" cy="30" r="6" fill="#a46d43"/>
    <circle cx="106" cy="30" r="14" fill="#C68A5B" stroke="#3e281a" stroke-width="4"/>
    <circle cx="106" cy="30" r="6" fill="#a46d43"/>
    
    <!-- Body -->
    <ellipse cx="75" cy="100" rx="34" ry="40" fill="#C68A5B" stroke="#3e281a" stroke-width="4"/>
    <!-- Feet -->
    <ellipse cx="55" cy="135" rx="12" ry="8" fill="#C68A5B" stroke="#3e281a" stroke-width="4"/>
    <ellipse cx="95" cy="135" rx="12" ry="8" fill="#C68A5B" stroke="#3e281a" stroke-width="4"/>
    
    <!-- Head -->
    <ellipse cx="75" cy="55" rx="42" ry="34" fill="#C68A5B" stroke="#3e281a" stroke-width="4"/>
    
    <!-- Face (deadpan/poking) -->
    <circle cx="62" cy="55" r="4" fill="#3e281a"/>
    <circle cx="88" cy="55" r="4" fill="#3e281a"/>
    <ellipse cx="75" cy="65" rx="12" ry="8" fill="#d9ad8c"/>
    <path d="M 75 60 L 75 65" fill="none" stroke="#3e281a" stroke-width="2"/>
    <path d="M 70 70 L 80 70" fill="none" stroke="#3e281a" stroke-width="2.5" stroke-linecap="round"/>
    
    <!-- Right Arm (resting) -->
    <path d="M 100 80 C 110 90, 110 110, 95 105" fill="none" stroke="#C68A5B" stroke-width="14" stroke-linecap="round"/>
    <path d="M 100 80 C 110 90, 110 110, 95 105" fill="none" stroke="#3e281a" stroke-width="4" stroke-linecap="round"/>
    
    <!-- Left Arm (poking out bounds to the left) -->
    <!-- Extends to x: -10 to poke Milk's cheek -->
    <path d="M 45 85 L -25 85" fill="none" stroke="#C68A5B" stroke-width="14" stroke-linecap="round"/>
    <path d="M 45 85 L -25 85" fill="none" stroke="#3e281a" stroke-width="4" stroke-linecap="round"/>
    <circle cx="-25" cy="85" r="7" fill="#C68A5B"/> <!-- paw fill over line -->
  </g>
</svg>`;
}

// ── BLOB ───────────────────────────────────────────────────
function blobLeft() {
  return `<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Body (squishy rounded shape) -->
  <g id="body-l">
    <path d="M60 20
      C90 20 110 45 110 80
      C110 120 88 148 60 148
      C32 148 10 120 10 80
      C10 45 30 20 60 20Z"
      fill="var(--color-char-left)"/>
    <!-- Little arms -->
    <ellipse cx="14" cy="95" rx="10" ry="6" fill="var(--color-char-left)" transform="rotate(-30 14 95)"/>
    <ellipse cx="106" cy="95" rx="10" ry="6" fill="var(--color-char-left)" transform="rotate(30 106 95)"/>
    <!-- Feet nubs -->
    <ellipse cx="42" cy="147" rx="14" ry="8" fill="var(--color-char-left)" opacity="0.7"/>
    <ellipse cx="78" cy="147" rx="14" ry="8" fill="var(--color-char-left)" opacity="0.7"/>
  </g>

  <!-- Face region -->
  <g id="face-l" fill="var(--color-char-face)">
    <!-- Eyes: cute arcs (happy squint) -->
    <path d="M43 74 Q47 70 51 74" fill="none" stroke="var(--color-char-face)" stroke-width="3" stroke-linecap="round"/>
    <path d="M69 74 Q73 70 77 74" fill="none" stroke="var(--color-char-face)" stroke-width="3" stroke-linecap="round"/>
    <!-- Smile -->
    <path d="M50 90 Q60 100 70 90" fill="none" stroke="var(--color-char-face)" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <!-- Blush -->
  <g id="blush-l" class="char-blush">
    <ellipse cx="40" cy="84" rx="9" ry="6" fill="#FFAAC4" opacity="0"/>
    <ellipse cx="80" cy="84" rx="9" ry="6" fill="#FFAAC4" opacity="0"/>
  </g>
</svg>`;
}

function blobRight() {
  return `<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g id="body-r">
    <path d="M60 20
      C90 20 110 45 110 80
      C110 120 88 148 60 148
      C32 148 10 120 10 80
      C10 45 30 20 60 20Z"
      fill="var(--color-char-right)"/>
    <ellipse cx="14" cy="95" rx="10" ry="6" fill="var(--color-char-right)" transform="rotate(-30 14 95)"/>
    <ellipse cx="106" cy="95" rx="10" ry="6" fill="var(--color-char-right)" transform="rotate(30 106 95)"/>
    <ellipse cx="42" cy="147" rx="14" ry="8" fill="var(--color-char-right)" opacity="0.7"/>
    <ellipse cx="78" cy="147" rx="14" ry="8" fill="var(--color-char-right)" opacity="0.7"/>
  </g>

  <g id="face-r" fill="var(--color-char-face)">
    <path d="M43 74 Q47 70 51 74" fill="none" stroke="var(--color-char-face)" stroke-width="3" stroke-linecap="round"/>
    <path d="M69 74 Q73 70 77 74" fill="none" stroke="var(--color-char-face)" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 90 Q60 100 70 90" fill="none" stroke="var(--color-char-face)" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <g id="blush-r" class="char-blush">
    <ellipse cx="40" cy="84" rx="9" ry="6" fill="#FFB3CC" opacity="0"/>
    <ellipse cx="80" cy="84" rx="9" ry="6" fill="#FFB3CC" opacity="0"/>
  </g>
</svg>`;
}

// ── Public API ──────────────────────────────────────────────
const CHARACTERS = {
  bunny: { left: bunnyLeft, right: bunnyRight },
  bear: { left: bearLeft, right: bearRight },
  blob: { left: blobLeft, right: blobRight },
};

/**
 * Get SVG string for a character + side.
 * @param {'bunny'|'bear'|'blob'} name
 * @param {'left'|'right'} side
 * @returns {string} SVG markup
 */
export function getCharacterSVG(name, side) {
  const char = CHARACTERS[name] ?? CHARACTERS.bunny;
  return char[side]();
}
