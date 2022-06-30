export const getCardImage = (card: string) => {
  const cards = {
    visa: '/visa.png',
    mastercard: '/mastercard.png',
    amex: '/amex.png',
    diners: '/diners.png',
    discover: '/discover.png',
    jcb: '/jcb.png',
    unionpay: '/unionpay.png',
    maestro: '/maestro.png',
    elo: '/elo.png',
    hiper: '/hiper.png',
    hipercard: '/hipercard.png',
    aura: '/aura.png',
    default: '/default.png',
  }

  return cards[card] || card['default']
}
