/* url.js — Encode/decode app config via URL hash parameters */

import { DEFAULT_STATE, mergeState } from './state.js';

const PARAM_MAP = {
    cta: 'ctaText',
    msg: 'mainMessage',
    sub: 'subMessage',
    from: 'senderName',
    to: 'receiverName',
    char: 'character',
    theme: 'theme',
    intens: 'intensity',
    hearts: 'hearts',
    sparkles: 'sparkles',
    replay: 'autoReplay',
    mode: 'mode',
};

const REVERSE_MAP = Object.fromEntries(
    Object.entries(PARAM_MAP).map(([k, v]) => [v, k])
);

/**
 * Parse the URL hash into a config object.
 * @returns {typeof DEFAULT_STATE}
 */
export function readStateFromURL() {
    const hash = location.hash.slice(1); // strip '#'
    if (!hash) return { ...DEFAULT_STATE };

    const params = new URLSearchParams(hash);
    const partial = {};

    for (const [urlKey, stateKey] of Object.entries(PARAM_MAP)) {
        if (params.has(urlKey)) {
            const raw = params.get(urlKey);
            // Boolean fields
            if (stateKey === 'hearts' || stateKey === 'sparkles' || stateKey === 'autoReplay') {
                partial[stateKey] = raw === '1' || raw === 'true';
            } else {
                partial[stateKey] = decodeURIComponent(raw);
            }
        }
    }

    return mergeState(partial);
}

/**
 * Write a config object to the URL hash.
 * @param {typeof DEFAULT_STATE} state
 */
export function writeStateToURL(state) {
    const params = new URLSearchParams();

    for (const [stateKey, urlKey] of Object.entries(REVERSE_MAP)) {
        const value = state[stateKey];
        if (value === undefined || value === null) continue;

        if (typeof value === 'boolean') {
            params.set(urlKey, value ? '1' : '0');
        } else {
            params.set(urlKey, encodeURIComponent(value));
        }
    }

    history.replaceState(null, '', '#' + params.toString());
}

/**
 * Build a shareable link for the receiver.
 * @param {typeof DEFAULT_STATE} state
 * @returns {string}
 */
export function buildShareableLink(state) {
    const receiverState = { ...state, mode: 'receiver' };
    const params = new URLSearchParams();

    for (const [stateKey, urlKey] of Object.entries(REVERSE_MAP)) {
        const value = receiverState[stateKey];
        if (value === undefined || value === null) continue;

        if (typeof value === 'boolean') {
            params.set(urlKey, value ? '1' : '0');
        } else {
            params.set(urlKey, encodeURIComponent(value));
        }
    }

    return location.origin + location.pathname + '#' + params.toString();
}
