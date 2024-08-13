/**
 * Formats a value as a currency string.
 *
 * @param {string | number} value - The value to format as currency.
 * @returns {string} The formatted currency string.
 */
const formatCurrency = (value: string | number): string => {
  if (typeof value === 'string') {
    value = parseFloat(value)
  }
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value)
}

export default formatCurrency
