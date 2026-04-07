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

// ── BEAR ───────────────────────────────────────────────────
function bearLeft() {
    return `<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!-- Ears -->
  <circle cx="36" cy="54" r="16" fill="var(--color-char-left)"/>
  <circle cx="36" cy="54" r="9" fill="var(--color-char-detail)" opacity="0.6"/>
  <circle cx="84" cy="54" r="16" fill="var(--color-char-left)"/>
  <circle cx="84" cy="54" r="9" fill="var(--color-char-detail)" opacity="0.6"/>

  <!-- Body -->
  <g id="body-l">
    <ellipse cx="60" cy="120" rx="36" ry="34" fill="var(--color-char-left)"/>
    <ellipse cx="60" cy="124" rx="22" ry="22" fill="var(--color-char-detail)" opacity="0.6"/>
    <!-- Paws -->
    <ellipse cx="25" cy="140" rx="14" ry="9" fill="var(--color-char-left)" opacity="0.85"/>
    <ellipse cx="95" cy="140" rx="14" ry="9" fill="var(--color-char-left)" opacity="0.85"/>
  </g>

  <!-- Head -->
  <circle cx="60" cy="78" r="34" fill="var(--color-char-left)"/>
  <!-- Snout -->
  <ellipse cx="60" cy="92" rx="14" ry="10" fill="var(--color-char-detail)" opacity="0.85"/>

  <!-- Face -->
  <g id="face-l" fill="var(--color-char-face)">
    <circle cx="50" cy="74" r="3"/>
    <circle cx="70" cy="74" r="3"/>
    <!-- Nose -->
    <ellipse cx="60" cy="88" rx="4" ry="3" fill="var(--color-char-face)"/>
    <path d="M53 94 Q60 100 67 94" fill="none" stroke="var(--color-char-face)" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- Blush -->
  <g id="blush-l" class="char-blush">
    ${blushCircles(60, 80, 1, '#FFAABB')}
  </g>
</svg>`;
}

function bearRight() {
    return `<svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="36" cy="54" r="16" fill="var(--color-char-right)"/>
  <circle cx="36" cy="54" r="9" fill="var(--color-char-detail)" opacity="0.6"/>
  <circle cx="84" cy="54" r="16" fill="var(--color-char-right)"/>
  <circle cx="84" cy="54" r="9" fill="var(--color-char-detail)" opacity="0.6"/>

  <g id="body-r">
    <ellipse cx="60" cy="120" rx="36" ry="34" fill="var(--color-char-right)"/>
    <ellipse cx="60" cy="124" rx="22" ry="22" fill="var(--color-char-detail)" opacity="0.6"/>
    <ellipse cx="25" cy="140" rx="14" ry="9" fill="var(--color-char-right)" opacity="0.85"/>
    <ellipse cx="95" cy="140" rx="14" ry="9" fill="var(--color-char-right)" opacity="0.85"/>
  </g>

  <circle cx="60" cy="78" r="34" fill="var(--color-char-right)"/>
  <ellipse cx="60" cy="92" rx="14" ry="10" fill="var(--color-char-detail)" opacity="0.85"/>

  <g id="face-r" fill="var(--color-char-face)">
    <circle cx="50" cy="74" r="3"/>
    <circle cx="70" cy="74" r="3"/>
    <ellipse cx="60" cy="88" rx="4" ry="3" fill="var(--color-char-face)"/>
    <path d="M53 94 Q60 100 67 94" fill="none" stroke="var(--color-char-face)" stroke-width="2" stroke-linecap="round"/>
  </g>

  <g id="blush-r" class="char-blush">
    ${blushCircles(60, 80, 1, '#FFB3CC')}
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
