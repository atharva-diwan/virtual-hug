/* receiver.js
   Receiver mode — CTA click handler, message population, replay.
   Uses AbortController to cleanly remove old listeners on each init.
*/

import { appState, patchState } from './state.js';
import { writeStateToURL } from './url.js';
import {
    runHugSequence,
    resetHugSequence,
    initIdleState,
    startAmbientHearts
} from './animation.js';

// Cleanup handles from previous init call
let stopAmbientHearts = null;
let receiverAbortCtrl = null;

/**
 * Boot the receiver experience.
 * @param {() => void} onBack — callback to switch back to designer
 */
export function initReceiver(onBack) {
    // Cancel previous listeners before re-adding
    if (receiverAbortCtrl) receiverAbortCtrl.abort();
    receiverAbortCtrl = new AbortController();
    const signal = receiverAbortCtrl.signal;

    const s = appState;
    const el = id => document.getElementById(id);

    // ── Populate text content ───────────────────────
    const ctaTextEl = el('receiverCtaText');
    if (ctaTextEl) ctaTextEl.textContent = s.ctaText;

    const mainMsgEl = el('receiverMainMsg');
    if (mainMsgEl) mainMsgEl.textContent = s.mainMessage;

    const subMsgEl = el('receiverSubMsg');
    if (subMsgEl) subMsgEl.textContent = s.subMessage;

    const fromEl = el('receiverFrom');
    if (fromEl) {
        fromEl.textContent = s.senderName
            ? `${s.senderName} → ${s.receiverName || 'you'}`
            : '';
    }

    // ── Setup Hero Image ───────────────────────────
    const stageImage = el('stageImage');


    // ── Idle animation ─────────────────────────────
    initIdleState(stageImage);

    // ── Ambient hearts ─────────────────────────────
    if (stopAmbientHearts) {
        stopAmbientHearts();
        stopAmbientHearts = null;
    }
    const ambientContainer = el('ambientHearts');
    if (ambientContainer) {
        stopAmbientHearts = startAmbientHearts(ambientContainer, s.hearts);
    }

    // ── Ensure replay button is hidden ────────────
    const replayBtn = el('replayBtn');
    if (replayBtn) replayBtn.classList.add('hidden');

    // ── Reset message area ─────────────────────────
    const msgArea = el('receiverMessage');
    if (msgArea) msgArea.classList.remove('is-visible');

    // ── Enable CTA ─────────────────────────────────
    const ctaBtn = el('receiverCta');
    if (ctaBtn) ctaBtn.disabled = false;

    const hugHearts = el('hugHearts');
    const sparkleBurst = el('sparkleBurst');

    const hugOptions = {
        heroImage: stageImage,
        hugHearts,
        sparkleBurst,
        receiverMessage: msgArea,
        receiverCta: ctaBtn,
        replayBtn,
        hearts: s.hearts,
        sparkles: s.sparkles,
        autoReplay: s.autoReplay,
        intensity: s.intensity,
    };

    // ── CTA click ──────────────────────────────────
    ctaBtn?.addEventListener('click', () => {
        runHugSequence(hugOptions);
    }, { signal });

    // ── Replay click ───────────────────────────────
    replayBtn?.addEventListener('click', () => {
        resetHugSequence(hugOptions);
        setTimeout(() => runHugSequence(hugOptions), 550);
    }, { signal });

    // ── Back button ────────────────────────────────
    const backBtn = el('receiverBackBtn');
    backBtn?.addEventListener('click', () => {
        if (stopAmbientHearts) {
            stopAmbientHearts();
            stopAmbientHearts = null;
        }
        resetHugSequence(hugOptions);
        patchState({ mode: 'designer' });
        writeStateToURL(appState);
        onBack();
    }, { signal });
}
