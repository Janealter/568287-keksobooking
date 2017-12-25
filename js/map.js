'use strict';

(function () {
  var PINS_LIMIT = 5;
  var PIN_CURSOR_HEIGHT = 18;
  var BUTTON_TAB_INDEX = 0;

  // Получаем секцию карты
  var mapElement = document.querySelector('.map');

  // Функция генерации элемента разметки с метками на карте
  var generatePinsElement = function (adsArray) {
    var mapPinTemplate = document.querySelector('template').content.cloneNode(true);
    // Удаляем из шаблона лишний блок
    mapPinTemplate.removeChild(mapPinTemplate.querySelector('.map__card.popup'));
    var element = document.createDocumentFragment();
    adsArray.every(function (ad, i) {
      var mapPinElement = mapPinTemplate.cloneNode(true);
      var button = mapPinElement.querySelector('button');
      var img = mapPinElement.querySelector('img');
      button.id = i;
      button.tabIndex = BUTTON_TAB_INDEX;
      button.style.left = (ad.location.x - img.width / 2) + 'px';
      button.style.top = (ad.location.y - img.height + PIN_CURSOR_HEIGHT) + 'px';
      img.src = ad.author.avatar;
      element.appendChild(mapPinElement);
      return ++i < PINS_LIMIT;
    });
    return element;
  };

  // Добавляет метки на карту
  var addPins = function () {
    // Удаляем старые, если они есть
    removePins();
    mapElement.querySelector('.map__pins').appendChild(generatePinsElement(window.data.adsArray));
  };

  // Удаляем метки
  var removePins = function () {
    // Закрываем карточку объявления
    window.showCard.close();
    var mapPins = mapElement.querySelectorAll('.map__pin');
    [].forEach.call(mapPins, function (mapPin) {
      if (!mapPin.classList.contains('map__pin--main')) {
        mapElement.children[0].removeChild(mapPin);
      }
    });
  };

  // Обработчик события при клике на любой Map Pin
  var onPinClick = function (evt) {
    // Выполняется, если произведен клик по любой кнопке Map Pin, кроме Map Pin Main
    if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
      activatePin(evt.target.parentElement);
    }
  };

  // Обработчик события при нажатии Enter на элементе popup__close
  var onPinEnterPress = function (evt) {
    // Выполняется, если произведен клик по любой кнопке Map Pin, кроме Map Pin Main
    if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main') && evt.keyCode === window.util.ENTER_KEYCODE) {
      activatePin(evt.target);
    }
  };

  // Обработчик собития при изменении фильтра
  var onFilterChange = function () {
    window.debounce(function () {
      window.data.adsArray = window.filter.getAdsArrayFiltered();
      addPins();
    });
  };

  // Добавляет подсветку Map Pin, показывает объявление
  var activatePin = function (mapPin) {
    window.showCard.open(mapPin.id);
    mapPin.classList.add('map__pin--active');
  };

  // Добавляет обработчики событий на Map Pins
  var addPinsListeners = function () {
    var mapPins = mapElement.querySelector('.map__pins');
    mapPins.addEventListener('click', onPinClick);
    mapPins.addEventListener('keydown', onPinEnterPress);
  };

  // Добавляет обработчик события на фильтр
  var addFiltersListener = function () {
    var mapFiltersForm = mapElement.querySelector('.map__filters');
    mapFiltersForm.addEventListener('change', onFilterChange, true);
  };

  addPinsListeners();
  addFiltersListener();

  window.map = {
    element: mapElement,
    // Активирует рабочее состояние сайта
    activateWorkState: function () {
      // Получаем объект формы
      var noticeForm = document.querySelector('.notice__form');
      // Удаляем затемнение карты
      mapElement.classList.remove('map--faded');
      // Добавляем пины на карту
      addPins();
      // Включаем форму
      noticeForm.classList.remove('notice__form--disabled');
      // Включаем поля формы
      var fieldSets = noticeForm.querySelectorAll('fieldset');
      fieldSets.forEach(function (fieldSet) {
        fieldSet.disabled = false;
      });
    },
    // Убирает подсветку Map Pin, если она есть
    deactivatePin: function () {
      var mapPinActive = mapElement.querySelector('.map__pin--active');
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
    }
  };
})();
