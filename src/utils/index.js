/**
 * Capitalize the first letter of the string
 * @param {string} string 
 * @returns {string}
 */
export const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

/**
 * Capitalize each word of the string
 * @param {string} string 
 * @returns {string}
 */
export const capitalize = (string) => string.split(' ').map(s => ucFirst(s)).join(' ')