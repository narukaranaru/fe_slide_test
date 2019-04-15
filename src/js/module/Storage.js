/*
 * ストレージ
 */

export default class Storage {
  /**
   * ストレージが使えるかどうか判定
   *
   * @param type { String } ストレージの種類
   * @return { boolean } true: 使える, false: 使えない
   *
   */
  isAvailableStorage(type) {
    try {
      const storage = window[type];
      const x = '__storage_test__';

      storage.setItem(x, x);
      storage.removeItem(x);

      return true;
    } catch (e) {
      return false;
    }
  }
}
