'use strict';

(function () {
  // Объект верхнего уровня
  var notice = document.querySelector('.notice');
  // Переключатель вместимости
  var capacitySelect = notice.querySelector('#capacity');
  // Переключатель кол-ва комнат
  var roomNumberSelect = notice.querySelector('#room_number');
  // Добавляет обработчики событий для полей Время заезда и выезда
  var addTimeinTimeoutSelectListeners = function () {
    var timeinSelect = notice.querySelector('#timein');
    var timeoutSelect = notice.querySelector('#timeout');
    timeinSelect.addEventListener('change', function () {
      timeoutSelect.selectedIndex = timeinSelect.selectedIndex;
    });
    timeoutSelect.addEventListener('change', function () {
      timeinSelect.selectedIndex = timeoutSelect.selectedIndex;
    });
  };
  // Добавляет обработчик событий для поля Тип жилья
  var addTypeSelectListener = function () {
    var TYPE_PRICES = {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    };
    var typeSelect = notice.querySelector('#type');
    var priceInput = notice.querySelector('#price');
    typeSelect.addEventListener('change', function () {
      var newMinPrice = TYPE_PRICES[typeSelect[typeSelect.selectedIndex].value];
      priceInput.min = newMinPrice;
      priceInput.placeholder = newMinPrice.toString();
    });
  };
  // Определяет текущее кол-во комнат и выставляет соответствующие опции кол-ва мест
  var setCapacitySelectOptions = function (allCapacityOptions) {
    var ROOM_CAPACITIES = {
      '1': ['1'],
      '2': ['2', '1'],
      '3': ['3', '2', '1'],
      '100': ['0']
    };
    // Удаляем из capacitySelect все опции
    capacitySelect.innerHTML = '';
    // Добавляем в capacitySelect нужные опции исходя из выбранной опции в roomNumberSelect
    [].forEach.call(allCapacityOptions, function (option) {
      if (ROOM_CAPACITIES[roomNumberSelect.value].indexOf(option.value) !== -1) {
        capacitySelect.options.add(option.cloneNode(true));
      }
    });
  };
  // Добавляет обработчик событий для поля Кол-во комнат
  var addRoomNumberSelectListener = function () {
    // Клонируем capacitySelect в начальном состоянии
    var capacitySelectOrig = capacitySelect.cloneNode(true);
    // Задаем начальные опции для capacitySelect
    setCapacitySelectOptions(capacitySelectOrig.options);
    roomNumberSelect.addEventListener('change', function () {
      setCapacitySelectOptions(capacitySelectOrig.options);
    });
  };
  // Добавляет обработчики события invalid для полей Заголовок, Адрес и Цена за ночь
  var addCheckedInputsListeners = function () {
    var titleInput = notice.querySelector('#title');
    var addressInput = notice.querySelector('#address');
    var priceInput = notice.querySelector('#price');
    titleInput.addEventListener('invalid', window.util.onInputInvalid);
    addressInput.addEventListener('invalid', window.util.onInputInvalid);
    priceInput.addEventListener('invalid', window.util.onInputInvalid);
  };
  // Добавляем все обработчики событий для формы
  addTimeinTimeoutSelectListeners();
  addTypeSelectListener();
  addRoomNumberSelectListener();
  addCheckedInputsListeners();
})();
