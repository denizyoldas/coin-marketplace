/**
 * Formats a value as a currency string.
 *
 * @param {string | number} value - The value to format as currency.
 * @param {string} [currency='USD'] - The currency code to use for formatting.
 * @returns {string} The formatted currency string.
 */
const formatCurrency = (value: string | number, currency = 'USD') => {
  if (typeof value === 'string') {
    value = parseFloat(value)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(value)
}

export default formatCurrency
