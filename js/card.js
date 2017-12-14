'use strict';

(function () {
  // Функция генерации фрагмента разметки с объявлением
  var generateAdFragment = function (ad) {
    var HOUSING_TYPES = {
      'flat': {
        'ru': 'Квартира'
      },
      'house': {
        'ru': 'Дом'
      },
      'bungalo': {
        'ru': 'Бунгало'
      }
    };
    // Создаем фрагмент объявления, клонируя шаблон
    var adFragment = document.querySelector('template').content.cloneNode(true);
    // Удаляем из объявления лишний элемент
    adFragment.removeChild(adFragment.querySelector('.map__pin'));
    // Создаем простые ссылки на нужные нам объекты внутри adFragment
    var title = adFragment.querySelector('h3');
    var pBlocks = adFragment.querySelectorAll('p');
    var address = pBlocks[0].firstElementChild;
    var price = pBlocks[1];
    var type = adFragment.querySelector('h4');
    var roomCount = pBlocks[2];
    var checkinCheckout = pBlocks[3];
    var features = adFragment.querySelector('.popup__features');
    var description = pBlocks[4];
    var avatar = adFragment.querySelector('img');
    // Изменяем данные
    title.textContent = ad.offer.title;
    address.textContent = ad.offer.address;
    price.textContent = ad.offer.price + ' ₽/ночь';
    type.textContent = HOUSING_TYPES[ad.offer.type].ru;
    roomCount.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    checkinCheckout.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    // Клонируем и очищаем features, чтобы заполнить его с нуля нужными элементами
    var featuresClone = features.cloneNode(true);
    features.innerHTML = '';
    ad.offer.features.forEach(function (feature) {
      features.appendChild(featuresClone.querySelector('.feature.feature--' + feature));
    });
    description.textContent = ad.offer.description;
    avatar.src = ad.author.avatar;
    return adFragment;
  };
  // Обработчик события при клике на элемент popup__close
  var onPopupCloseClick = function () {
    closeCard();
  };
  // Обработчик события при нажатии Esc
  var onDocumentEscPress = function (event) {
    window.util.isEscPressed(event, closeCard);
  };
  // Обработчик события при нажатии Enter на элементе popup__close
  var onPopupCloseEnterPress = function (event) {
    window.util.isEnterPressed(event, closeCard);
  };
  // Закрывает окно объявления
  var closeCard = function () {
    var adPopup = window.map.mapSection.querySelector('.map__card.popup');
    var closeButton = adPopup.querySelector('.popup__close');
    // Деактивируем Map Pin
    window.map.deactivateMapPin();
    closeButton.removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onDocumentEscPress);
    closeButton.removeEventListener('keydown', onPopupCloseEnterPress);
    window.map.mapSection.removeChild(adPopup);
  };
  window.card = {
    // Открывает окно объявления
    openCard: function (adNumber) {
      // Закрываем предыдущее, если оно есть
      if (window.map.mapSection.querySelector('.map__card.popup')) {
        closeCard();
      }
      var adPopup = generateAdFragment(window.data.adsArray[adNumber]);
      var closeButton = adPopup.querySelector('.popup__close');
      closeButton.tabIndex = 0;
      window.map.mapSection.insertBefore(adPopup, window.map.mapSection.querySelector('.map__filters-container'));
      closeButton.addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onDocumentEscPress);
      closeButton.addEventListener('keydown', onPopupCloseEnterPress);
    }
  };
})();
