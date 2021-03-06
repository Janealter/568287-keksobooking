'use strict';

(function () {
  // URL для сохранения данных на сервер
  var SAVE_URL = 'https://1510.dump.academy/keksobooking';
  // SAC - Set Address Coords, задержка таймаута для установки координат в поле Адрес
  var SAC_TIMEOUT_DELAY = 1;

  // Цены для каждого типа жилья
  var TYPE_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Вместимость для каждого кол-ва комнат
  var ROOM_CAPACITIES = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  // Объект верхнего уровня
  var notice = document.querySelector('.notice');
  // Переключатель вместимости
  var capacitySelect = notice.querySelector('#capacity');
  // Переключатель кол-ва комнат
  var roomNumberSelect = notice.querySelector('#room_number');
  // Поле ввода адреса
  var addressInput = notice.querySelector('#address');

  // Добавляет двухстороннюю синхронизацию полей Время заезда и выезда
  var addTimeInTimeOutSynchronization = function () {
    var timeInSelect = notice.querySelector('#timein');
    var timeOutSelect = notice.querySelector('#timeout');
    var timeInValues = window.util.getOptionsValuesArray(timeInSelect);
    var timeOutValues = window.util.getOptionsValuesArray(timeOutSelect);
    var syncValues = function (element, value) {
      element.value = value;
    };
    window.syncronizeFields(timeInSelect, timeOutSelect, timeInValues, timeOutValues, syncValues);
    window.syncronizeFields(timeOutSelect, timeInSelect, timeOutValues, timeInValues, syncValues);
  };

  // Добавляет одностороннюю синхронизацию поля Цена за ночь с полем Тип жилья
  var addPriceInputSynchronization = function () {
    var typeSelect = notice.querySelector('#type');
    var priceInput = notice.querySelector('#price');
    var typeValues = Object.keys(TYPE_PRICES);
    var minPrices = Object.values(TYPE_PRICES);
    window.syncronizeFields(typeSelect, priceInput, typeValues, minPrices, function (element, value) {
      element.min = value;
      element.placeholder = value.toString();
    });
  };

  // Добавляет одностороннюю синхронизацию поля Кол-во комнат с полем Кол-во мест
  var addCapacitySelectSynchronization = function () {
    // Клонируем capacitySelect в начальном состоянии
    var capacitySelectOrig = capacitySelect.cloneNode(true);
    // Задаем начальные опции для capacitySelect
    window.util.setSelectOptions(capacitySelect, capacitySelectOrig.options, ROOM_CAPACITIES[roomNumberSelect.value]);
    var roomNumberValues = Object.keys(ROOM_CAPACITIES);
    var capacityArrays = Object.values(ROOM_CAPACITIES);
    window.syncronizeFields(roomNumberSelect, capacitySelect, roomNumberValues, capacityArrays, function (element, valuesArray) {
      window.util.setSelectOptions(element, capacitySelectOrig.options, valuesArray);
    });
  };

  // Добавляет обработчики события invalid для полей Заголовок, Адрес и Цена за ночь
  var addCheckedInputsListeners = function () {
    var titleInput = notice.querySelector('#title');
    var priceInput = notice.querySelector('#price');
    titleInput.addEventListener('invalid', window.util.onInputInvalid);
    addressInput.addEventListener('invalid', window.util.onInputInvalid);
    priceInput.addEventListener('invalid', window.util.onInputInvalid);
  };

  // Добавляет обработчики события для формы
  var addNoticeFormListeners = function () {
    var noticeForm = notice.querySelector('.notice__form');

    noticeForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      var onLoad = function () {
        // Убираем красные рамки у всех элементов
        window.util.unsetInvalidClass();
        // Сбрасываем форму
        noticeForm.reset();
      };

      window.backend.save(SAVE_URL, new FormData(noticeForm), onLoad, window.util.onBackendError);
    });

    noticeForm.addEventListener('reset', function () {
      // Устанавливаем timeout, чтобы координаты установились после события reset, а не во время него
      var timeoutID = setTimeout(function () {
        // Устанавливаем координаты в поле Адрес
        window.form.setAddressCoords(window.pinMain.parameters.getCursorX(), window.pinMain.parameters.getCursorY());
        clearTimeout(timeoutID);
      }, SAC_TIMEOUT_DELAY);
    });
  };

  // Добавляем все обработчики событий и синхронизацию полей для формы
  addTimeInTimeOutSynchronization();
  addPriceInputSynchronization();
  addCapacitySelectSynchronization();
  addCheckedInputsListeners();
  addNoticeFormListeners();

  window.form = {
    // Устанавливает координаты в поле Адрес
    setAddressCoords: function (x, y) {
      addressInput.value = 'x: ' + x + ', y: ' + y;
    }
  };
})();
