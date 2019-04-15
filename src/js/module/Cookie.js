/*
 * cookie
 */

export default class Cookie {
  init() {
    this.attachEvent();
  }

  attachEvent() {
    $(document.body)
      // 関連業態ジャンルリンククリック時にcookieを発行
      .on('click', '.js-link-lp', () => {
        this.setCookie('ctlp', '1', { path: '/' });
      })

      // 全てのお店を見るリンククリック時にcookieを発行
      .on('click', '.js-link-search', () => {
        this.setCookie('ctlp', '0', { path: '/' });
      });
  }

  // cookie発行
  setCookie(name, value, cookieInfo) {
    let updatedCookie = `${name}=${value}`;

    Object.keys(cookieInfo).forEach((key) => {
      updatedCookie += `;${key}=${cookieInfo[key]}`;
    });

    document.cookie = updatedCookie;
  }
}
