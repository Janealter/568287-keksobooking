'use strict';

(function () {
  // Лимиты для положения Pin Main
  var Limit = {
    X: {
      MIN: 0,
      MAX: null
    },
    Y: {
      MIN: 100,
      MAX: 500
    }
  };

  var pinMain = window.map.element.querySelector('.map__pin--main');
  // Создаём объект с методами для получения некоторых параметров элемента (X, Y, ширина, высота)
  var pinMainParameters = new window.ElementParameters(pinMain);
  // Добавляем в объект новое свойство
  pinMainParameters.CURSOR_HEIGHT = 22;
  // Добавляем в объект новые методы, для получения X и Y у острого конца курсора
  pinMainParameters.getCursorX = function () {
    return Math.round(pinMainParameters.getX() + pinMainParameters.getWidth() / 2);
  };
  pinMainParameters.getCursorY = function () {
    return Math.round(pinMainParameters.getY() + pinMainParameters.getHeight() + pinMainParameters.CURSOR_HEIGHT);
  };

  // Ставим в поле Адрес координаты острого конца курсора Pin Main
  window.form.setAddressCoords(pinMainParameters.getCursorX(), pinMainParameters.getCursorY());

  window.pinMain = {
    parameters: pinMainParameters,
    // Функция добавления обработчика события mousedown для Map Pin Main
    setDraggable: function () {
      new window.Draggable(pinMainParameters).enableDrag(function () {
        // Коллбэк срабатывающий при событии mousemove
        window.form.setAddressCoords(pinMainParameters.getCursorX(), pinMainParameters.getCursorY());
      }, function () {
        // Коллбэк срабатывающий при событии mouseup
        if (window.map.element.classList.contains('map--faded')) {
          window.map.activateWorkState();
        }
      }, Limit.X.MIN, Limit.X.MAX, Limit.Y.MIN, Limit.Y.MAX);
    },
  };
})();
