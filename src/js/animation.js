/* animation.js
   Static Image Hug Animation sequence.
   States: idle → complete
*/

// Reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// State machine enum
export const HUG_STATE = {
    IDLE: 'idle',
    COMPLETE: 'complete',
};

let currentState = HUG_STATE.IDLE;
let autoReplayTimer = null;

/**
 * Spawn floating hearts in hugHearts container.
 */
function spawnHugHearts(container, count) {
    if (!container) return;
    container.innerHTML = '';
    const symbols = ['♡', '♥', '♡', '✦', '♡'];
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'hug-heart-item';
        heart.textContent = symbols[i % symbols.length];
        const offsetX = (Math.random() - 0.5) * 80;
        heart.style.setProperty('--rot', `${(Math.random() - 0.5) * 30}deg`);
        heart.style.left = `calc(50% + ${offsetX}px)`;
        heart.style.animationDelay = `${i * 120}ms`;
        heart.style.fontSize = `${14 + Math.random() * 10}px`;
        container.appendChild(heart);
    }
}

/**
 * Spawn sparkle dots.
 */
function spawnSparkles(container, count) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.className = 'sparkle-item';
        const angle = (i / count) * 360;
        const distance = 40 + Math.random() * 40;
        const rad = (angle * Math.PI) / 180;
        const sx = Math.cos(rad) * distance;
        const sy = Math.sin(rad) * distance - 20;
        dot.style.setProperty('--sx', `${sx}px`);
        dot.style.setProperty('--sy', `${sy}px`);
        dot.style.left = `${44 + Math.random() * 30}%`;
        dot.style.animationDelay = `${i * 40}ms`;
        dot.style.width = dot.style.height = `${4 + Math.random() * 5}px`;
        container.appendChild(dot);
    }
}

/**
 * Main hug animation sequence.
 *
 * @param {{
 *   heroImage: HTMLImageElement,
 *   hugHearts: HTMLElement,
 *   sparkleBurst: HTMLElement,
 *   receiverMessage: HTMLElement,
 *   receiverCta: HTMLButtonElement,
 *   replayBtn: HTMLButtonElement,
 *   hearts: boolean,
 *   sparkles: boolean,
 *   autoReplay: boolean,
 *   intensity: string,
 * }} options
 */
export function runHugSequence(options) {
    const {
        heroImage,
        hugHearts, sparkleBurst,
        receiverMessage, receiverCta, replayBtn,
        hearts, sparkles, autoReplay
    } = options;

    if (currentState !== HUG_STATE.IDLE) return;

    // Disable CTA
    receiverCta.disabled = true;

    currentState = HUG_STATE.COMPLETE;

    // Instantly swap static images
    if (heroImage) {
        heroImage.src = "/hug.png";
    }

    if (hearts && !prefersReducedMotion) {
        spawnHugHearts(hugHearts, 7);
    }

    if (sparkles && !prefersReducedMotion) {
        setTimeout(() => spawnSparkles(sparkleBurst, 10), 100);
    }

    // Reveal message immediately
    receiverMessage.classList.add('is-visible');
    replayBtn.classList.remove('hidden');

    // Auto replay
    if (autoReplay && !prefersReducedMotion) {
        autoReplayTimer = setTimeout(() => {
            resetHugSequence(options);
            setTimeout(() => runHugSequence(options), 600);
        }, 4000);
    }
}

/**
 * Reset the hug animation back to idle state.
 */
export function resetHugSequence(options) {
    const {
        heroImage,
        hugHearts, sparkleBurst,
        receiverMessage, receiverCta, replayBtn,
    } = options;

    if (autoReplayTimer) {
        clearTimeout(autoReplayTimer);
        autoReplayTimer = null;
    }

    currentState = HUG_STATE.IDLE;

    if (heroImage) {
        heroImage.src = "/idle.png";
    }

    receiverMessage.classList.remove('is-visible');
    replayBtn.classList.add('hidden');
    receiverCta.disabled = false;

    hugHearts.innerHTML = '';
    sparkleBurst.innerHTML = '';
}

/**
 * Initialize ambient idle state.
 */
export function initIdleState(heroImage) {
    currentState = HUG_STATE.IDLE;
    if (heroImage) {
        heroImage.src = "/idle.png";
    }
}

/**
 * Spawn ambient background hearts.
 * @param {HTMLElement} container
 * @param {boolean} enabled
 */
export function startAmbientHearts(container, enabled) {
    if (!enabled || prefersReducedMotion) return;

    function spawnOne() {
        const heart = document.createElement('span');
        heart.className = 'ambient-heart';
        heart.textContent = '♡';
        heart.style.left = `${10 + Math.random() * 80}%`;
        heart.style.fontSize = `${10 + Math.random() * 8}px`;
        const dur = 4000 + Math.random() * 4000;
        heart.style.animationDuration = `${dur}ms`;
        heart.style.animationDelay = '0ms';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), dur + 200);
    }

    spawnOne();
    const interval = setInterval(spawnOne, 2200);
    return () => clearInterval(interval);
}
