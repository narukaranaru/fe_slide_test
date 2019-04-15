/*
 * 遅延ロード
 */

export default class Lazyload {
  constructor(lazy, sliderInner) {
    this.$lazy = $(lazy);
    this.$sliderInner = $(sliderInner);
    this.$modal = $('.js-modal');
    this.$lazyX = this.$sliderInner.find('.js-lazy-x');
    this.$lazyModal = this.$modal.find('.js-lazy-modal');
  }

  init() {
    this.attachEvent();
  }

  attachEvent() {
    // 縦スクロールのlazyload
    this.$lazy.lazyload({
      threshold: 500,
      failure_limit: 10,
      // effect: 'fadeIn',
      // load: function(){
      //     $(this).children('.js-overlay').addClass('js-card__overlay');
      // }
    });

    // 横スクロールのlazyload
    this.$lazyX.lazyload({
      event: 'scrollx',
    });

    // 横スクロール時
    this.$sliderInner.on('scroll', () => {
      this.$lazyX.trigger('scrollx');
    });

    // モーダル
    this.$lazyModal.lazyload({
      container: this.$modal,
    });
  }
}
