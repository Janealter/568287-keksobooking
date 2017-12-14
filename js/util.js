'use strict';

(function () {
  // Коды кнопок
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setRedBorder = function (object) {
    object.style = 'border-color: red';
  };
  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    // Функция генерации случайного целого числа в определенном диапазоне
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // Функция создания массива случайной длины (в т.ч. и 0) из элементов переданного массива
    getRandomLengthArray: function (arr) {
      var array = [];
      var length = window.util.getRandomInt(0, arr.length);
      for (var i = 0; i < length; i++) {
        array[i] = arr[window.util.getRandomInt(0, arr.length - 1)];
        // Убираем повторения
        for (var j = 0; j < array.length; j++) {
          if (j !== i && array[j] === array[i]) {
            i--;
          }
        }
      }
      return array;
    },
    // Обработчик события invalid на любом поле ввода
    onInputInvalid: function (event) {
      setRedBorder(event.target);
    },
    // Действие при нажатии ESC
    isEscPressed: function (evt, func) {
      if (evt.keyCode === ESC_KEYCODE) {
        func();
      }
    },
    // Действие при нажатии ENTER
    isEnterPressed: function (evt, func) {
      if (evt.keyCode === ENTER_KEYCODE) {
        if (typeof func === 'function') {
          func();
        }
      }
    }
  };
})();
