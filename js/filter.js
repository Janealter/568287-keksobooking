'use strict';

(function () {
  // Лимиты для фильтра цен
  var PRICE_LIMITS = {
    MIN: 10000,
    MAX: 50000
  };

  window.filter = {
    // Возвращает отфилтрованный массив объявлений
    getAdsArrayFiltered: function () {
      var selects = {
        type: document.querySelector('#housing-type'),
        price: document.querySelector('#housing-price'),
        rooms: document.querySelector('#housing-rooms'),
        guests: document.querySelector('#housing-guests')
      };

      var checkBoxes = [
        {
          name: 'wifi',
          element: document.querySelector('#filter-wifi')
        },
        {
          name: 'dishwasher',
          element: document.querySelector('#filter-dishwasher')
        },
        {
          name: 'parking',
          element: document.querySelector('#filter-parking')
        },
        {
          name: 'washer',
          element: document.querySelector('#filter-washer')
        },
        {
          name: 'elevator',
          element: document.querySelector('#filter-elevator')
        },
        {
          name: 'conditioner',
          element: document.querySelector('#filter-conditioner')
        }
      ];

      var adsArrayFiltered = window.data.adsArrayOriginal.filter(function (ad) {
        if (selects.type.value !== 'any' && ad.offer.type !== selects.type.value) {
          return false;
        }
        if (selects.price.value !== 'any') {
          switch (selects.price.value) {
            case 'middle':
              if (ad.offer.price < PRICE_LIMITS.MIN || ad.offer.price > PRICE_LIMITS.MAX) {
                return false;
              }
              break;
            case 'low':
              if (ad.offer.price >= PRICE_LIMITS.MIN) {
                return false;
              }
              break;
            case 'high':
              if (ad.offer.price <= PRICE_LIMITS.MAX) {
                return false;
              }
              break;
          }
        }
        if (selects.rooms.value !== 'any' && ad.offer.rooms.toString() !== selects.rooms.value) {
          return false;
        }
        if (selects.guests.value !== 'any' && ad.offer.guests.toString() !== selects.guests.value) {
          return false;
        }
        var checkBoxesFilterSuccess = checkBoxes.every(function (checkBox) {
          if (checkBox.element.checked) {
            return ad.offer.features.indexOf(checkBox.name) !== -1;
          }
          return true;
        });

        return checkBoxesFilterSuccess;
      });

      return adsArrayFiltered;
    }
  };
})();
