'use strict';

(function () {
  // Лимиты для вертикального положения Map Pin Main
  var Y_LIMIT = {
    MIN: 100,
    MAX: 500
  };

  var pinMain = window.map.element.querySelector('.map__pin--main');
  var bodyWidth = parseInt(window.getComputedStyle(document.body).maxWidth, 10);

  // Параметры Map Pin Main
  var pinMainParameters = {
    CURSOR_HEIGHT: 22,
    width: parseInt(window.getComputedStyle(pinMain).width, 10),
    height: parseInt(window.getComputedStyle(pinMain).height, 10),
    getX: function () {
      return Math.round(parseInt(window.getComputedStyle(pinMain).left, 10));
    },
    getY: function () {
      return Math.round(parseInt(window.getComputedStyle(pinMain).top, 10));
    },
    getCursorX: function () {
      return Math.round(pinMainParameters.getX() + pinMainParameters.width / 2);
    },
    getCursorY: function () {
      return Math.round(pinMainParameters.getY() + pinMainParameters.height + pinMainParameters.CURSOR_HEIGHT);
    }
  };

  // Обработчик события при зажатии кнопки мыши на Map Pin Main
  var onPinMainMousedown = function (evt) {
    evt.preventDefault();
    var bodyMarginLeft = parseInt(window.getComputedStyle(document.body).marginLeft, 10);
    // Стартовые координаты курсора
    var mouseStartCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Смещение курсора относительно Map Pin Main
    var shift = {
      x: mouseStartCoords.x - pinMainParameters.getX() - bodyMarginLeft,
      y: mouseStartCoords.y - pinMainParameters.getY()
    };

    // Обработчик события при перемещении мыши
    var onPinMainMousemove = function (moveEvt) {
      moveEvt.preventDefault();
      // Текущие координаты курсора
      var mouseCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // Текущие координаты Map Pin Main
      var mapPinMainCoords = {
        x: mouseCoords.x - bodyMarginLeft - shift.x,
        y: mouseCoords.y - shift.y
      };
      if (mapPinMainCoords.x - pinMainParameters.width / 2 > 0 && mapPinMainCoords.x + pinMainParameters.width / 2 < bodyWidth) {
        pinMain.style.left = mapPinMainCoords.x + 'px';
      }
      if (mapPinMainCoords.y - pinMainParameters.height / 2 > Y_LIMIT.MIN && mapPinMainCoords.y + pinMainParameters.width / 2 < Y_LIMIT.MAX) {
        pinMain.style.top = mapPinMainCoords.y + 'px';
      }
      window.form.setAddressCoords(pinMainParameters.getCursorX(), pinMainParameters.getCursorY());
    };

    // Обработчик события при отпускании кнопки мыши
    var onPinMainMouseup = function (upEvt) {
      upEvt.preventDefault();
      // Активируем рабочее состояние сайта только в том случае, если карта не затемнена
      if (window.map.element.classList.contains('map--faded')) {
        window.map.activateWorkState();
      }
      document.removeEventListener('mousemove', onPinMainMousemove);
      document.removeEventListener('mouseup', onPinMainMouseup);
    };

    document.addEventListener('mousemove', onPinMainMousemove);
    document.addEventListener('mouseup', onPinMainMouseup);
  };

  // Ставим в поле Адрес координаты указателя Map Pin Main
  window.form.setAddressCoords(pinMainParameters.getCursorX(), pinMainParameters.getCursorY());

  window.pin = {
    // Функция добавления обработчика события mousedown для Map Pin Main
    addListener: function () {
      pinMain.addEventListener('mousedown', onPinMainMousedown);
    },
    // Получаем координаты курсора Map Pin Main
    getCursorX: function () {
      return pinMainParameters.getCursorX();
    },
    getCursorY: function () {
      return pinMainParameters.getCursorY();
    },
  };
})();
