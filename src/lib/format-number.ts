/**
 * Formats a value as a number string.
 *
 * @param {string | number} value - The value to format as number.
 * @returns {string} The formatted number string.
 */
const formatNumber = (value: string | number): string => {
  if (typeof value === 'string') {
    value = parseFloat(value)
  }
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value)
}

export default formatNumber
