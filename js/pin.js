'use strict';

(function () {
  // Лимиты для вертикального положения Map Pin Main
  var Y_LIMIT = {
    MIN: 100,
    MAX: 500
  };

  var mapPinMain = window.map.mapSection.querySelector('.map__pin--main');
  var bodyWidth = parseInt(window.getComputedStyle(document.body).maxWidth, 10);

  // Параметры Map Pin Main
  var mapPinMainParams = {
    CURSOR_HEIGHT: 22,
    width: parseInt(window.getComputedStyle(mapPinMain).width, 10),
    height: parseInt(window.getComputedStyle(mapPinMain).height, 10),
    // В изначальном состоянии параметры left и top не указаны и равны NaN, поэтому получаем координаты альтернативными способами
    getX: function () {
      var x = parseInt(mapPinMain.style.left, 10);
      if (isNaN(x)) {
        // Параметр left у Map Pin Main равен 50%, поэтому вместо него используем ширину body деленную пополам
        x = bodyWidth / 2;
      }
      return Math.round(x);
    },
    getY: function () {
      var y = parseInt(mapPinMain.style.top, 10);
      if (isNaN(y)) {
        y = parseInt(window.getComputedStyle(mapPinMain).top, 10);
      }
      return Math.round(y);
    },
    getCursorX: function () {
      return Math.round(mapPinMainParams.getX() + mapPinMainParams.width / 2);
    },
    getCursorY: function () {
      return Math.round(mapPinMainParams.getY() + mapPinMainParams.height + mapPinMainParams.CURSOR_HEIGHT);
    }
  };

  // Обработчик события при зажатии кнопки мыши на Map Pin Main
  var onMapPinMainMousedown = function (event) {
    event.preventDefault();
    var bodyMarginLeft = parseInt(window.getComputedStyle(document.body).marginLeft, 10);
    // Стартовые координаты курсора
    var mouseStartCoords = {
      x: event.clientX,
      y: event.clientY
    };

    // Смещение курсора относительно Map Pin Main
    var shift = {
      x: mouseStartCoords.x - mapPinMainParams.getX() - bodyMarginLeft,
      y: mouseStartCoords.y - mapPinMainParams.getY()
    };

    // Обработчик события при перемещении мыши
    var onMapPinMainMousemove = function (moveEvent) {
      moveEvent.preventDefault();
      // Текущие координаты курсора
      var mouseCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };
      // Текущие координаты Map Pin Main
      var mapPinMainCoords = {
        x: mouseCoords.x - bodyMarginLeft - shift.x,
        y: mouseCoords.y - shift.y
      };
      if (mapPinMainCoords.x - mapPinMainParams.width / 2 > 0 && mapPinMainCoords.x + mapPinMainParams.width / 2 < bodyWidth) {
        mapPinMain.style.left = mapPinMainCoords.x + 'px';
      }
      if (mapPinMainCoords.y - mapPinMainParams.height / 2 > Y_LIMIT.MIN && mapPinMainCoords.y + mapPinMainParams.width / 2 < Y_LIMIT.MAX) {
        mapPinMain.style.top = mapPinMainCoords.y + 'px';
      }
      window.form.setAddressCoords(mapPinMainParams.getCursorX(), mapPinMainParams.getCursorY());
    };

    // Обработчик события при отпускании кнопки мыши
    var onMapPinMainMouseup = function (upEvent) {
      upEvent.preventDefault();
      // Активируем рабочее состояние сайта только в том случае, если карта не затемнена
      if (window.map.mapSection.classList.contains('map--faded')) {
        window.map.activateWorkState();
      }
      document.removeEventListener('mousemove', onMapPinMainMousemove);
      document.removeEventListener('mouseup', onMapPinMainMouseup);
    };

    document.addEventListener('mousemove', onMapPinMainMousemove);
    document.addEventListener('mouseup', onMapPinMainMouseup);
  };

  // Ставим в поле Адрес координаты указателя Map Pin Main
  window.form.setAddressCoords(mapPinMainParams.getCursorX(), mapPinMainParams.getCursorY());

  window.pin = {
    // Функция добавления обработчика события mousedown для Map Pin Main
    addMapPinMainListener: function () {
      mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
    },
    // Получаем координаты курсора Map Pin Main
    getCursorX: function () {
      return mapPinMainParams.getCursorX();
    },
    getCursorY: function () {
      return mapPinMainParams.getCursorY();
    },
  };
})();
