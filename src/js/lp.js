/*
 * 実行
 */

import Lazyload from './module/Lazyload';
import Accordion from './module/Accordion';
import Modal from './module/Modal';

(() => {
  const lazyload = new Lazyload('.js-lazy', '.js-slider__inner');
  const accordion = new Accordion('.js-listHeader');

  // 記事モーダルをハッシュ付きのURLで呼び出すときの正規表現
  const modalHashValidation = /^#article_bdg[lms]{1}[0-9]{4}_aream[0-9]{4}_[0-9]{3}$/i;

  // 遅延ロード
  lazyload.init();

  // アコーディオン
  accordion.init();

  // モーダルウィンドウ
  if ($('.js-modal').length !== 0) {
    const modal = new Modal('Android', '4.4', '.js-modal', '.js-modal-open-trigger', '.js-modal-close-trigger', modalHashValidation);
    modal.init();
  }
})();
