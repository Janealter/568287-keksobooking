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
          node: document.querySelector('#filter-wifi')
        },
        {
          name: 'dishwasher',
          node: document.querySelector('#filter-dishwasher')
        },
        {
          name: 'parking',
          node: document.querySelector('#filter-parking')
        },
        {
          name: 'washer',
          node: document.querySelector('#filter-washer')
        },
        {
          name: 'elevator',
          node: document.querySelector('#filter-elevator')
        },
        {
          name: 'conditioner',
          node: document.querySelector('#filter-conditioner')
        }
      ];

      var adsArrayFiltered = window.data.adsArrayOrig.filter(function (ad) {
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
        var checkBoxesFilterSuccess = true;
        checkBoxes.every(function (checkBox) {
          if (checkBox.node.checked && ad.offer.features.indexOf(checkBox.name) === -1) {
            checkBoxesFilterSuccess = false;
            return false;
          }
          return true;
        });
        return checkBoxesFilterSuccess;
      });

      return adsArrayFiltered;
    }
  };
})();
