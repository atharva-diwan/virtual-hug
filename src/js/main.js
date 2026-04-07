/* main.js — Entry point.
   Reads URL state, applies theme, boots the correct mode.
*/

import { appState, patchState } from './state.js';
import { readStateFromURL, writeStateToURL } from './url.js';
import { applyTheme } from './themes.js';
import {
    populateForm,
    updatePreview,
    bindDesignerControls,
} from './designer.js';
import { initReceiver } from './receiver.js';
import { startAmbientHearts } from './animation.js';

/* ── Boot ──────────────────────────────────────────────── */
function boot() {
    // 1. Parse URL state
    const urlState = readStateFromURL();
    patchState(urlState);

    // 2. Apply theme
    applyTheme(appState.theme);

    // 3. Start ambient hearts in background (always on regardless of mode)
    const ambientContainer = document.getElementById('ambientHearts');
    if (ambientContainer && appState.hearts) {
        startAmbientHearts(ambientContainer, true);
    }

    // 4. Route to correct mode
    if (appState.mode === 'receiver') {
        showReceiver();
    } else {
        showDesigner();
    }
}

/* ── Mode Switchers ─────────────────────────────────────── */
function showDesigner() {
    document.documentElement.setAttribute('data-mode', 'designer');
    populateForm();
    updatePreview();
    bindDesignerControls(switchToReceiver);
}

function showReceiver() {
    document.documentElement.setAttribute('data-mode', 'receiver');
    initReceiver(switchToDesigner);
}

function switchToReceiver() {
    patchState({ mode: 'receiver' });
    writeStateToURL(appState);
    document.documentElement.setAttribute('data-mode', 'receiver');
    // Re-init receiver in case content changed
    initReceiver(switchToDesigner);
}

function switchToDesigner() {
    patchState({ mode: 'designer' });
    writeStateToURL(appState);
    document.documentElement.setAttribute('data-mode', 'designer');
    populateForm();
    updatePreview();
    // Re-bind so new listeners are fresh (buttons are in DOM, just hidden)
    bindDesignerControls(switchToReceiver);
}

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', boot);
