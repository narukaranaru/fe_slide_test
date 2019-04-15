/*
 * アンカーリンク
 */

export default class Scroll {
  constructor(button, anchorLink, anchorTarget, endEl, startPosition, isbackAndShow, scrollDelay) {
    this.$window = $(window);
    this.$button = $(button);
    this.$anchorLink = $(anchorLink);
    this.$anchorTarget = $(anchorTarget);
    this.$endEl = $(endEl);
    this.startPosition = startPosition;
    this.isbackAndShow = isbackAndShow;
    this.scrollDelay = scrollDelay;
  }

  init() {
    if (this.$button.length) {
      // buttonの表示・非表示を切り替える位置やanchorTargetの位置を計算
      this.calcSwitchPosition();

      // buttonの表示・非表示を切り替え
      this.switchButton(this.measureScrollTop());

      // イベント追加
      this.attachEvent();
    }
  }

  attachEvent() {
    let timer = false;

    // 画面スクロール時
    this.$window.on('scroll', () => {
      if (timer !== false) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        this.$window.trigger('swicthButton');
      }, this.scrollDelay);
    });

    // ボタンの表示・非表示を切り替えるカスタムイベント
    this.$window.on('swicthButton', () => {
      this.switchButton(this.measureScrollTop());
    });

    // 画面の向きが変わった時
    this.$window.on('resize', () => {
      this.calcSwitchPosition();
    });

    // anchorTargetへのanchorLinkクリック時
    this.$anchorLink.on('click', (e) => {
      e.preventDefault();

      // swicthButtonイベントを一旦取り除く
      this.$window.off('swicthButton');

      this.fadeOutElement(this.$button);
      this.scrollToAnchorTarget();
    });
  }

  // buttonの表示・非表示を切り替える位置やanchorTargetの位置を計算
  calcSwitchPosition() {
    if (this.$anchorTarget.length !== 0) {
      // anchorTargetの位置
      this.anchorTargetTop = this.getElementTop(this.$anchorTarget);
    }

    // windowの高さ
    const windowHeight = this.getWindowHeight();

    // buttonの表示・非表示を切り替える位置
    this.endPosition = this.getElementTop(this.$endEl) - windowHeight;
  }

  // elementの位置を取得
  getElementTop($el) {
    return $el.offset().top;
  }

  // 要素を表示
  fadeInElement($el) {
    $el.removeClass('is-fade--hidden');
  }

  // 要素を非表示
  fadeOutElement($el) {
    $el.addClass('is-fade--hidden');
  }

  // windowの高さを取得
  getWindowHeight() {
    return this.$window.innerHeight();
  }

  // スクロール位置を取得
  measureScrollTop() {
    return this.$window.scrollTop();
  }

  // ボタンの表示・非表示切り替え
  switchButton(scrollTop) {
    if (scrollTop >= this.startPosition && scrollTop < this.endPosition) {
      this.fadeInElement(this.$button);
    } else if (scrollTop >= this.endPosition ||
      (scrollTop < this.startPosition && this.isbackAndShow === true)) {
      this.fadeOutElement(this.$button);
    }
  }

  // anchorTargetの位置までスクロール
  scrollToAnchorTarget() {
    $('html, body').animate({
      scrollTop: this.anchorTargetTop,
    }, 'slow', 'swing', () => {
      // アニメーションが終わったらswicthButtonイベントを再びonに
      this.$window.on('swicthButton', () => {
        this.switchButton(this.measureScrollTop());
      });
    });
  }
}
