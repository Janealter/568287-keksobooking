'use strict';

(function () {
  // Коды кнопок
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Шапка
  var header = document.querySelector('header');

  var setInvalidClass = function (object) {
    object.classList.add('invalid');
  };

  // Создаем элемент разметки ошибки
  var generateErrorElement = function (errorText) {
    var ERROR_TEXT = 'Произошла ошибка!';
    var element = document.createElement('div');
    element.classList.add('error--message');
    element.innerHTML = ERROR_TEXT + '<br/>' + errorText;
    return element;
  };

  // Убирает сообщение об ошибке
  var removeErrorElement = function () {
    var errorElement = document.querySelector('.error--message');
    if (errorElement) {
      // Ставим на место header
      header.style.top = '';
      // Удаляем сообщение об ошибке
      errorElement.parentElement.removeChild(errorElement);
    }
  };

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    // Получаем значения полей value у опций select'а в виде массива
    getOptionsValuesArray: function (select) {
      var valuesArray = [];
      [].forEach.call(select.options, function (option) {
        valuesArray.push(option.value);
      });
      return valuesArray;
    },
    // Устанавливаем определенные опции для select
    setSelectOptions: function (select, allOptions, optionsValuesToAdd) {
      // Удаляем из select все опции
      select.innerHTML = '';
      // Добавляем в select нужные опции исходя из списка значений опций для добавления (optionsValuesToAdd)
      [].forEach.call(allOptions, function (option) {
        if (optionsValuesToAdd.indexOf(option.value) !== -1) {
          select.options.add(option.cloneNode(true));
        }
      });
    },
    // Коллбэк функция, вызываемая при ошибке отправки/получения данных
    onBackendError: function (text) {
      var ERROR_ELEMENT_HEIGHT = 58;
      // Убираем предыдущее сообщение об ошибке
      removeErrorElement();
      var errorElement = generateErrorElement(text);
      // Сдвигаем вниз header
      header.style.top = parseInt(getComputedStyle(header).top, 10) + ERROR_ELEMENT_HEIGHT + 'px';
      // Помещаем уведомление об ошибке первым элементом в блоке main
      document.querySelector('main').insertAdjacentElement('afterbegin', errorElement);
      // Скроллим наверх экрана, чтобы пользователь обратил внимание на сообщение
      window.scrollTo(0, 0);
    },
    // Обработчик события invalid на любом поле ввода
    onInputInvalid: function (event) {
      setInvalidClass(event.target);
    },
    // Убирает класс invalid у всех элементов
    unsetInvalidClass: function () {
      var elementsWithInvalidClass = document.querySelectorAll('.invalid');
      [].forEach.call(elementsWithInvalidClass, function (element) {
        element.classList.remove('invalid');
      });
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
        func();
      }
    }
  };
})();
