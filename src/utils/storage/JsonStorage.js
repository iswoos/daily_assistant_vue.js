export class JsonStorage {
  static set(key, value) {
    if (!key || !value) {
      throw new Error('key 혹은 value가 없음')
    }
    if (typeof value !== 'object') {
      throw new Error('value가 object형태가 아님')
    }
    return window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  static get(key) {
    if (!key) {
      throw new Error('key가 없음')
    }
    const storageData = window.sessionStorage.getItem(key)
    if (!storageData) return

    return JSON.parse(storageData)
  }
}
