export default class Modal {
  constructor(os, osVer, modal, open, close, modalHashValidation) {
    this.os = os;
    this.osVer = osVer;
    this.modalCl = modal;
    this.$modal = $(modal);
    this.$overlay = $('#js-modal-overlay');
    this.$window = $(window);
    this.scroll = this.$window.scrollTop();
    this.$page = $('#page');
    this.$header = $('#gnHeaderContainer');
    this.$open = $(open);
    this.$close = $(close);
    this.isLoading = false;
    this.modalHashValidation = modalHashValidation;
  }

  init() {
    this.currentUrl = this.getCurrentUrl();
    this.autoModal();
    this.attachEvent();
  }

  getCurrentUrl() {
    return location.href;
  }

  getHash() {
    return location.hash;
  }

  setHash(hash) {
    // Android4.3未満だったら
    if (this.os === 'Android' && this.osVer < 4.3) {
      // replaceStateが使えないので回避
      location.hash = hash.replace('#', '');
    } else {
      history.replaceState('', '', `${this.currentUrl.split('#')[0]}${hash}`);
    }
  }

  autoModal() {
    const hash = this.getHash();

    if (this.modalHashValidation.test(hash)) {
      const $modalItem = $(hash);

      if ($modalItem.length !== 0) {
        this.showModal(hash);
      }
    }
  }

  showModal(target) {
    const $t = $(target);

    this.isLoading = true;
    this.setHash(target);
    this.scroll = this.$window.scrollTop();
    this.$page.css({
      position: 'fixed',
      top: -1 * this.scroll,
      left: 0,
      right: 0,
      overflow: 'hidden',
    });
    this.$overlay.removeClass('js-displayNone');
    $t.removeClass('js-displayNone');
    setTimeout(() => {
      $t.removeClass('is-fade--hidden');
      this.$overlay.removeClass('is-fade--hidden');
      this.isLoading = false;
    }, 100);

    // モーダル内画像の遅延ロード
    $t.trigger('scroll');
  }

  hideModal(target) {
    const $t = $(target);

    this.setHash('');
    // 親画面の表示位置をモーダルウィンドウを開いた座標に移動する
    this.$page.attr({ style: '' });
    this.$window.scrollTop(this.scroll);
    $t.closest(this.modalCl).addClass('is-fade--hidden');
    this.$overlay.addClass('is-fade--hidden');
    setTimeout(() => {
      $t.closest(this.modalCl).scrollTop(0).addClass('js-displayNone');
      this.$overlay.addClass('js-displayNone');
      this.isLoading = false;
    }, 600);
  }

  attachEvent() {
    let timer = false;

    // 閉じるボタンの表示切り替え
    this.$modal.on('scroll', (e) => {
      const $btn = $(e.currentTarget).find('.js-modal-close-btn');

      if (timer !== false) {
        clearTimeout(timer);
      }
      $btn.addClass('js-displayNone').addClass('is-fade--hidden');

      timer = setTimeout(() => {
        $btn.removeClass('js-displayNone');
        setTimeout(() => {
          $btn.removeClass('is-fade--hidden');
        }, 0);
      }, 100);
    });

    this.$open.on('click', (e) => {
      e.preventDefault();
      if (this.isLoading !== true) {
        this.showModal($(e.currentTarget).attr('href'));
      }
    });

    this.$close.on('click', (e) => {
      e.preventDefault();
      if (this.isLoading !== true) {
        this.hideModal($(e.currentTarget));
      }
    });

    this.$modal.on('touchstart', () => {
      this.startY = event.changedTouches[0].pageY;
      this.diffY = 0;
    });

    this.$modal.on('touchmove', (e) => {
      this.endY = event.changedTouches[0].pageY;
      this.diffY = Math.round(this.startY - this.endY);

      // 領域外スワイプでのスクロールを止める
      const $t = $(e.currentTarget);
      const h = $t.scrollTop() + $t.get(0).offsetHeight;

      if (this.diffY > 0 && h >= $t.get(0).scrollHeight) {
        e.preventDefault();
      } else if (this.diffY < 0 && $t.scrollTop() === 0) {
        e.preventDefault();
      }
    });
  }
}
