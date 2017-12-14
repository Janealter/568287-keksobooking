'use strict';

(function () {
  // Получаем секцию карты
  var mapSection = document.querySelector('.map');

  // Функция генерации фрагмента разметки с метками на карте
  var generateMapPinsFragment = function (adsArray) {
    var MAP_PIN_CURSOR_HEIGHT = 18;
    var mapPinTemplate = document.querySelector('template').content.cloneNode(true);
    // Удаляем из шаблона лишний блок
    mapPinTemplate.removeChild(mapPinTemplate.querySelector('.map__card.popup'));
    var fragment = document.createDocumentFragment();
    adsArray.forEach(function (ad, i) {
      var mapPinElement = mapPinTemplate.cloneNode(true);
      var button = mapPinElement.querySelector('button');
      var img = mapPinElement.querySelector('img');
      button.id = i;
      button.tabIndex = 0;
      button.style.left = (ad.location.x - img.width / 2) + 'px';
      button.style.top = (ad.location.y - img.height + MAP_PIN_CURSOR_HEIGHT) + 'px';
      img.src = ad.author.avatar;
      fragment.appendChild(mapPinElement);
    });
    return fragment;
  };

  // Добавляет метки на карту
  var addMapPinsToMap = function () {
    mapSection.querySelector('.map__pins').appendChild(generateMapPinsFragment(window.data.adsArray));
  };

  // Обработчик события при клике на любой Map Pin
  var onMapPinClick = function (event) {
    // Выполняется, если произведен клик по любой кнопке Map Pin, кроме Map Pin Main
    if (event.target.parentElement.classList.contains('map__pin') && !event.target.parentElement.classList.contains('map__pin--main')) {
      activateMapPin(event.target.parentElement);
    }
  };

  // Обработчик события при нажатии Enter на элементе popup__close
  var onMapPinEnterPress = function (event) {
    // Выполняется, если произведен клик по любой кнопке Map Pin, кроме Map Pin Main
    if (event.target.classList.contains('map__pin') && !event.target.classList.contains('map__pin--main') && event.keyCode === window.util.ENTER_KEYCODE) {
      activateMapPin(event.target);
    }
  };

  // Добавляет подсветку Map Pin, показывает объявление
  var activateMapPin = function (mapPin) {
    window.card.openCard(mapPin.id);
    mapPin.classList.add('map__pin--active');
  };

  // Добавляет обработчики событий на Map Pins
  var addMapPinsListeners = function () {
    var mapPins = mapSection.querySelector('.map__pins');
    mapPins.addEventListener('click', onMapPinClick);
    mapPins.addEventListener('keydown', onMapPinEnterPress);
  };

  addMapPinsListeners();

  window.map = {
    mapSection: mapSection,
    // Активирует рабочее состояние сайта
    activateWorkState: function () {
      // Получаем объект формы
      var noticeForm = document.querySelector('.notice__form');
      // Удаляем затемнение карты
      mapSection.classList.remove('map--faded');
      // Добавляем пины на карту
      addMapPinsToMap();
      // Включаем форму
      noticeForm.classList.remove('notice__form--disabled');
      // Включаем поля формы
      var fieldSets = noticeForm.querySelectorAll('fieldset');
      fieldSets.forEach(function (fieldSet) {
        fieldSet.disabled = false;
      });
    },
    // Убирает подсветку Map Pin, если она есть
    deactivateMapPin: function () {
      var mapPinActive = mapSection.querySelector('.map__pin--active');
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
    }
  };
})();
