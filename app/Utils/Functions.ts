export default function dateFormat(value: Date) {
  if (value === null) {
    return null
  }

  const date: Date = value
  const now: Date = new Date()
  const time: number = Number(now) - Number(date)

  const oneYear = 1000 * 60 * 60 * 24 * 365
  const oneMonth = 1000 * 60 * 60 * 24 * 30
  const oneDay = 1000 * 60 * 60 * 24
  const oneHour = 1000 * 60 * 60
  const oneMinute = 1000 * 60

  function newFormat(time: number, scale: number, string: string) {
    const i = String(time / scale).split('.')[0]
    const tag = 'il y a ' + i + string

    if (i === '1' || string === ' mois') {
      return tag
    } else {
      return tag + 's'
    }
  }

  if (time >= oneYear) {
    return newFormat(time, oneYear, ' an')
  }
  if (time >= oneMonth) {
    return newFormat(time, oneMonth, ' mois')
  }
  if (time >= oneDay) {
    return newFormat(time, oneDay, ' jour')
  }
  if (time >= oneHour) {
    return newFormat(time, oneHour, ' heure')
  }
  if (time >= oneMinute) {
    return newFormat(time, oneMinute, ' minute')
  }
  if (time < oneMinute) {
    return "moins d'une minute"
  }
}
