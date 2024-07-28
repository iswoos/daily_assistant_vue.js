export class FormatDateTime {
  static toDateTime(dateTimeStr) {
    if (!dateTimeStr) {
      throw new Error('dateTimeStr 값이 비어있음')
    }
    if (typeof dateTimeStr !== 'string') {
      throw new Error('dateTimeStr가 String 형태가 아님')
    }
    const dateTime = new Date(dateTimeStr)
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`
  }
}
