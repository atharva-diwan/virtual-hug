/* state.js — Central configuration object and defaults */

export const DEFAULT_STATE = {
    ctaText: 'Tap here to receive a virtual hug',
    mainMessage: 'Sending you the softest hug across every mile.',
    subMessage: 'Close your eyes and imagine me holding you tight.',
    senderName: 'From me',
    receiverName: 'For you',
    theme: 'blush',
    hearts: true,
    sparkles: true,
    autoReplay: false,
    mode: 'designer',
};

/**
 * Merges partial config with defaults.
 * @param {Partial<typeof DEFAULT_STATE>} partial
 * @returns {typeof DEFAULT_STATE}
 */
export function mergeState(partial) {
    return { ...DEFAULT_STATE, ...partial };
}

/**
 * Current mutable app state (clone of defaults on init).
 */
export let appState = { ...DEFAULT_STATE };

/**
 * Update specific fields in the app state.
 * @param {Partial<typeof DEFAULT_STATE>} patch
 */
export function patchState(patch) {
    appState = { ...appState, ...patch };
}
