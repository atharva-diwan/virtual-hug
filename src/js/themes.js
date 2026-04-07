/* themes.js — Apply theme preset to document root */

const THEME_SHADOWS = {
    blush: {
        ambient: '0 2px 12px rgba(232,121,154,0.10), 0 8px 40px rgba(232,121,154,0.07)',
        lifted: '0 4px 24px rgba(232,121,154,0.15), 0 16px 64px rgba(232,121,154,0.10)',
        float: '0 8px 32px rgba(232,121,154,0.18), 0 24px 80px rgba(232,121,154,0.12)',
    },
    peach: {
        ambient: '0 2px 12px rgba(224,122,82,0.10), 0 8px 40px rgba(224,122,82,0.07)',
        lifted: '0 4px 24px rgba(224,122,82,0.15), 0 16px 64px rgba(224,122,82,0.10)',
        float: '0 8px 32px rgba(224,122,82,0.18), 0 24px 80px rgba(224,122,82,0.12)',
    },
    lavender: {
        ambient: '0 2px 12px rgba(142,109,196,0.10), 0 8px 40px rgba(142,109,196,0.07)',
        lifted: '0 4px 24px rgba(142,109,196,0.15), 0 16px 64px rgba(142,109,196,0.10)',
        float: '0 8px 32px rgba(142,109,196,0.18), 0 24px 80px rgba(142,109,196,0.12)',
    },
    moonlight: {
        ambient: '0 2px 12px rgba(0,0,0,0.30), 0 8px 40px rgba(0,0,0,0.20)',
        lifted: '0 4px 24px rgba(0,0,0,0.35), 0 16px 64px rgba(0,0,0,0.25)',
        float: '0 8px 32px rgba(0,0,0,0.40), 0 24px 80px rgba(0,0,0,0.30)',
    },
};

/**
 * Apply a theme by setting the data-theme attribute on <html>.
 * The CSS themes.css handles the full custom property overrides.
 * @param {string} themeName
 */
export function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
}

/**
 * Get CSS custom property value from root.
 * @param {string} prop — e.g. '--color-accent'
 * @returns {string}
 */
export function getCSSVar(prop) {
    return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
}
