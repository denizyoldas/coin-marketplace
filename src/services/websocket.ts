import { SymbolModel } from '@/types/index.model'

/**
 * Sets up a WebSocket connection to receive ticker updates for a specific coin.
 *
 * @param {string[]} symbols - The symbols of the coins to receive ticker updates for.
 * @param {(data: SymbolModel) => void} onMessage - The callback function to call when a message is received.
 * @returns {SymbolModel} - The WebSocket object representing the connection.
 */
function setupWebSocket(
  symbols: string[],
  onMessage: (data: SymbolModel) => void
): WebSocket {
  const symbol = symbols
    .map((symbol) => symbol.toLowerCase().concat('@ticker'))
    .join('/')
  const url = `${import.meta.env.VITE_WSS_URL}/ws/${symbol}`

  const ws = new WebSocket(url)

  ws.onmessage = (event) => {
    const trade = JSON.parse(event.data)

    onMessage({
      code: trade.s,
      lastPrice: trade.c,
      priceChangePercent: trade.P,
      eventTime: trade.E
    })
  }

  ws.onclose = () => {
    console.log('ws closed')
  }

  ws.onerror = (error) => {
    console.log('ws error', error)
  }

  return ws
}

export default setupWebSocket
