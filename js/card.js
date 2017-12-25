'use strict';

(function () {
  window.card = {
    // Функция генерации элемента разметки с объявлением
    generateAdElement: function (ad) {
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
      var adElement = document.querySelector('template').content.cloneNode(true);
      // Удаляем из объявления лишний элемент
      adElement.removeChild(adElement.querySelector('.map__pin'));
      // Создаем ссылки на нужные нам объекты внутри adElement
      var title = adElement.querySelector('h3');
      var pBlocks = adElement.querySelectorAll('p');
      var address = pBlocks[0].firstElementChild;
      var price = pBlocks[1];
      var type = adElement.querySelector('h4');
      var roomCount = pBlocks[2];
      var checkinCheckout = pBlocks[3];
      var features = adElement.querySelector('.popup__features');
      var description = pBlocks[4];
      var avatar = adElement.querySelector('img');
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
      return adElement;
    }
  };
})();
