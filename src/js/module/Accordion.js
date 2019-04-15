/*
 * アコーディオン
 */

export default class Accordion {
  constructor(listHeader) {
    this.$listHeader = $(listHeader);
  }

  init() {
    this.attachEvent();
  }

  attachEvent() {
    // リストのヘッダーをクリックした時
    this.$listHeader.on('click', (e) => {
      const $target = $(e.currentTarget);
      const classArr = $target.attr('class').toString().split(' ');

      let className = '';
      classArr.forEach((v) => {
        if (v.match(/--close$/)) {
          className = v.slice(0, -7);
        } else if (v.match(/--open$/)) {
          className = v.slice(0, -6);
        }
      });

      $target.siblings('.js-listGroup').slideToggle(); // アコーディオンの中身を表示・非表示

      if ($target.hasClass('js-listHeader-otherIcon')) {
        // ＋と−を切り替える
        $target.find('.js-listIcon').toggleClass('list__plus list__minus');
      } else if (className !== '') {
        // openとclose(矢印)を切り変える
        $target.toggleClass(`${className}--close ${className}--open`);
      }
    });
  }
}
