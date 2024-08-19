import { WebsocketResponse } from '@/types/index.model'

/**
 * Sets up a WebSocket connection to receive ticker updates for a specific coin.
 *
 * @param {string[]} symbols - The symbols of the coins to receive ticker updates for.
 * @param {(data: WebsocketResponse) => void} onMessage - The callback function to call when a message is received.
 * @returns {WebsocketResponse} - The WebSocket object representing the connection.
 */
function setupWebSocket(
  symbols: string[],
  onMessage: (data: WebsocketResponse) => void
): WebSocket {
  const symbol = symbols
    .map((symbol) => symbol.toLowerCase().concat('@ticker'))
    .join('/')
  const url = `${import.meta.env.VITE_WSS_URL}/ws/${symbol}`
  console.log('url', url)

  const ws = new WebSocket(url)

  ws.onmessage = (event) => {
    const trade = JSON.parse(event.data)

    onMessage({
      symbol: trade.s,
      lastPrice: trade.c,
      priceChangePercent: trade.P
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
