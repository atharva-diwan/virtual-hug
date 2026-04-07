/* designer.js
   Designer mode UI — form bindings, live preview rendering, link copy.
   Uses AbortController to cleanly remove old listeners on re-bind.
*/

import { appState, patchState, DEFAULT_STATE } from './state.js';
import { writeStateToURL, buildShareableLink } from './url.js';
import { applyTheme } from './themes.js';

// Cleanup handle for previous bindDesignerControls call
let designerAbortCtrl = null;

// ── DOM references ────────────────────────────────────────
const FIELD_IDS = {
    ctaText: 'ctaText',
    mainMessage: 'mainMessage',
    subMessage: 'subMessage',
    senderName: 'senderName',
    receiverName: 'receiverName',
};

/** Populate form fields from current appState */
export function populateForm() {
    const s = appState;
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
    };
    setVal('ctaText', s.ctaText);
    setVal('mainMessage', s.mainMessage);
    setVal('subMessage', s.subMessage);
    setVal('senderName', s.senderName);
    setVal('receiverName', s.receiverName);

    setSegmented('character', s.character);

    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.themeBtn === s.theme);
    });

    setToggle('hearts', s.hearts);
    setToggle('sparkles', s.sparkles);
    setToggle('autoReplay', s.autoReplay);
}

/** Update preview panel with current appState */
export function updatePreview() {
    const s = appState;

    const set = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    set('previewCta', s.ctaText);
    set('previewMainMsg', s.mainMessage);
    set('previewSubMsg', s.subMessage);
    set('previewFrom', s.senderName);
}

/** Mark a segmented control button as active */
function setSegmented(controlName, value) {
    document.querySelectorAll(`[data-control="${controlName}"]`).forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === value);
    });
}

/** Set toggle active state + aria */
function setToggle(name, value) {
    const btn = document.querySelector(`[data-toggle="${name}"]`);
    if (!btn) return;
    btn.classList.toggle('active', !!value);
    btn.setAttribute('aria-checked', String(!!value));
}

/**
 * Bind all interactive controls.
 * @param {() => void} onOpen — callback when "Open Receiver Mode" is clicked
 */
export function bindDesignerControls(onOpen) {
    // Abort previous listeners
    if (designerAbortCtrl) designerAbortCtrl.abort();
    designerAbortCtrl = new AbortController();
    const signal = designerAbortCtrl.signal;

    // Text fields — live update
    Object.entries(FIELD_IDS).forEach(([stateKey, elId]) => {
        const el = document.getElementById(elId);
        if (!el) return;
        el.addEventListener('input', () => {
            patchState({ [stateKey]: el.value });
            writeStateToURL(appState);
            updatePreview();
        }, { signal });
    });

    // Segmented controls
    document.querySelectorAll('[data-control]').forEach(btn => {
        btn.addEventListener('click', () => {
            const ctrl = btn.dataset.control;
            const val = btn.dataset.value;
            patchState({ [ctrl]: val });
            setSegmented(ctrl, val);
            writeStateToURL(appState);
            if (ctrl === 'character') updatePreview();
        }, { signal });
    });

    // Theme swatches
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.themeBtn;
            patchState({ theme });
            applyTheme(theme);
            document.querySelectorAll('[data-theme-btn]').forEach(b =>
                b.classList.toggle('active', b.dataset.themeBtn === theme)
            );
            writeStateToURL(appState);
        }, { signal });
    });

    // Toggles
    document.querySelectorAll('[data-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.toggle;
            const newVal = !appState[name];
            patchState({ [name]: newVal });
            setToggle(name, newVal);
            writeStateToURL(appState);
        }, { signal });
    });

    // Open Receiver Mode
    document.getElementById('openReceiverBtn')?.addEventListener('click', () => {
        patchState({ mode: 'receiver' });
        writeStateToURL(appState);
        onOpen();
    }, { signal });

    // Copy shareable link
    document.getElementById('copyLinkBtn')?.addEventListener('click', async () => {
        const url = buildShareableLink(appState);
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = url;
            Object.assign(ta.style, { position: 'fixed', opacity: '0' });
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        showToast();
    }, { signal });

    // Reset to defaults
    document.getElementById('resetBtn')?.addEventListener('click', () => {
        patchState({ ...DEFAULT_STATE });
        applyTheme(DEFAULT_STATE.theme);
        populateForm();
        updatePreview();
        writeStateToURL(appState);
    }, { signal });
}

/** Show the copy toast notification */
function showToast() {
    const toast = document.getElementById('copyToast');
    if (!toast) return;
    toast.classList.add('is-visible');
    setTimeout(() => toast.classList.remove('is-visible'), 2800);
}
