import { getPath } from './getPath'

export const getCardImage = (card: string) => {
  const cards = {
    visa: '/visa.png',
    mastercard: '/mastercard.png',
    amex: '/americanexpress.png',
    dinersclub: '/diners.jpeg',
    discover: '/discover.jpeg',
    jcb: '/jcb.png',
    unionpay: '/unionpay.png',
    maestro: '/maestro.png',
    elo: '/elo.png',
    hiper: '/hiper.png',
    hipercard: '/hipercard.png',
    aura: '/aura.png',
    default: '/visa.png',
  }

  return getPath(cards[card] || card['default'])
}
