/* animation.js
   Hug animation state machine.

   States: idle → approaching → hugging → revealing → complete

   The DOM mutation strategy uses CSS class toggling
   (is-idle, is-approaching, is-hugging, is-complete)
   combined with inline CSS variable injection for intensity.
*/

import { INTENSITY_CONFIG } from './state.js';

// Reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// State machine enum
export const HUG_STATE = {
    IDLE: 'idle',
    APPROACHING: 'approaching',
    HUGGING: 'hugging',
    REVEALING: 'revealing',
    COMPLETE: 'complete',
};

let currentState = HUG_STATE.IDLE;
let autoReplayTimer = null;

/**
 * Set intensity CSS vars on the document root.
 * @param {'gentle'|'cozy'|'squeezy'} intensity
 */
export function applyIntensity(intensity) {
    const cfg = INTENSITY_CONFIG[intensity] ?? INTENSITY_CONFIG.cozy;
    const root = document.documentElement;
    root.style.setProperty('--hug-translate-x', `${prefersReducedMotion ? cfg.translateX * 0.4 : cfg.translateX}px`);
    root.style.setProperty('--hug-scale', String(prefersReducedMotion ? 1.02 : cfg.scale));
    root.style.setProperty('--hug-duration', `${prefersReducedMotion ? 300 : cfg.duration}ms`);
}

/**
 * Set state class on a character element.
 */
function setCharState(el, state) {
    el.classList.remove('is-idle', 'is-approaching', 'is-hugging', 'is-complete');
    if (state) el.classList.add(`is-${state}`);
}

/**
 * Reveal blush circles inside an SVG.
 * Targets all <g class="char-blush"> children.
 */
function showBlush(charEl) {
    charEl.querySelectorAll('.char-blush ellipse').forEach(el => {
        el.style.transition = 'opacity 0.4s ease';
        el.style.opacity = '1';
    });
}

function hideBlush(charEl) {
    charEl.querySelectorAll('.char-blush ellipse').forEach(el => {
        el.style.opacity = '0';
    });
}

/**
 * Spawn floating hearts in hugHearts container.
 * @param {HTMLElement} container
 * @param {number} count
 */
function spawnHugHearts(container, count) {
    container.innerHTML = '';
    const symbols = ['♡', '♥', '♡', '✦', '♡'];
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'hug-heart-item';
        heart.textContent = symbols[i % symbols.length];
        // Spread positions around center
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
 * @param {HTMLElement} container
 * @param {number} count
 */
function spawnSparkles(container, count) {
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
 *   charLeft: HTMLElement,
 *   charRight: HTMLElement,
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
        charLeft, charRight,
        hugHearts, sparkleBurst,
        receiverMessage, receiverCta, replayBtn,
        hearts, sparkles, autoReplay, intensity,
    } = options;

    if (currentState !== HUG_STATE.IDLE) return;

    // Disable CTA
    receiverCta.disabled = true;

    // Apply intensity vars
    applyIntensity(intensity);

    // ── Step 1: Approach ─────────────────────────
    currentState = HUG_STATE.APPROACHING;
    setCharState(charLeft, 'approaching');
    setCharState(charRight, 'approaching');

    const approachDuration = prefersReducedMotion ? 200 :
        (INTENSITY_CONFIG[intensity]?.duration ?? 700);

    // ── Step 2: Hug contact ───────────────────────
    setTimeout(() => {
        currentState = HUG_STATE.HUGGING;
        setCharState(charLeft, 'hugging');
        setCharState(charRight, 'hugging');
        showBlush(charLeft);
        showBlush(charRight);

        if (hearts && !prefersReducedMotion) {
            spawnHugHearts(hugHearts, 7);
        }

        if (sparkles && !prefersReducedMotion) {
            setTimeout(() => spawnSparkles(sparkleBurst, 10), 150);
        }
    }, approachDuration);

    // ── Step 3: Reveal message ────────────────────
    setTimeout(() => {
        currentState = HUG_STATE.REVEALING;
        receiverMessage.classList.add('is-visible');
    }, approachDuration + 400);

    // ── Step 4: Complete ──────────────────────────
    setTimeout(() => {
        currentState = HUG_STATE.COMPLETE;
        setCharState(charLeft, 'complete');
        setCharState(charRight, 'complete');

        // Show replay button
        replayBtn.classList.remove('hidden');

        // Auto replay
        if (autoReplay && !prefersReducedMotion) {
            autoReplayTimer = setTimeout(() => {
                resetHugSequence(options);
                setTimeout(() => runHugSequence(options), 600);
            }, 4000);
        }
    }, approachDuration + 900);
}

/**
 * Reset the hug animation back to idle state.
 */
export function resetHugSequence(options) {
    const {
        charLeft, charRight,
        hugHearts, sparkleBurst,
        receiverMessage, receiverCta, replayBtn,
    } = options;

    if (autoReplayTimer) {
        clearTimeout(autoReplayTimer);
        autoReplayTimer = null;
    }

    currentState = HUG_STATE.IDLE;

    setCharState(charLeft, 'idle');
    setCharState(charRight, 'idle');
    hideBlush(charLeft);
    hideBlush(charRight);

    receiverMessage.classList.remove('is-visible');
    replayBtn.classList.add('hidden');
    receiverCta.disabled = false;

    hugHearts.innerHTML = '';
    sparkleBurst.innerHTML = '';
}

/**
 * Initialize ambient idle state.
 */
export function initIdleState(charLeft, charRight) {
    currentState = HUG_STATE.IDLE;
    setCharState(charLeft, 'idle');
    setCharState(charRight, 'idle');
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
