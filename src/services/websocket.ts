import { Exchange } from '@/types/exchange.model'

/**
 * Sets up a WebSocket connection to receive ticker updates for a specific coin.
 *
 * @param {Exchange} coin - The coin for which to set up the WebSocket connection.
 * @param {(coin: Exchange) => void} updateCoin - The callback function to update the coin data when a new ticker update is received.
 * @returns {WebSocket} - The WebSocket object representing the connection.
 */
function setupWebSocket(
  coin: Exchange,
  updateCoin: (coin: Exchange) => void
): WebSocket {
  const symbol = `${coin.baseAsset.toLowerCase()}${coin.quoteAsset.toLowerCase()}`
  const url = `${import.meta.env.VITE_WSS_URL}/ws/${symbol}@ticker`

  const ws = new WebSocket(url)

  ws.onmessage = (event) => {
    const trade = JSON.parse(event.data)

    updateCoin({
      ...coin,
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
