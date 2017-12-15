'use strict';

(function () {
  // Функция создания массива объектов объявлений
  var generateAdsArray = function () {
    var titles = [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ];
    var TYPES = ['flat', 'house', 'bungalo'];
    var TIMES = ['12:00', '13:00', '14:00'];
    var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    // Случайная сортировка
    titles.sort();
    var array = [];
    for (var i = 0; i < 8; i++) {
      array.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: titles[i],
          address: '',
          price: window.util.getRandomInt(1000, 1000000),
          type: TYPES[window.util.getRandomInt(0, 2)],
          rooms: window.util.getRandomInt(1, 5),
          guests: '',
          checkin: TIMES[window.util.getRandomInt(0, 2)],
          checkout: TIMES[window.util.getRandomInt(0, 2)],
          features: window.util.getRandomLengthArray(FEATURES),
          description: '',
          photos: []
        },
        location: {
          x: window.util.getRandomInt(300, 900),
          y: window.util.getRandomInt(100, 500)
        }
      });
      // Количество размещаемых гостей зависит от кол-ва комнат
      array[i].offer.guests = window.util.getRandomInt(array[i].offer.rooms, array[i].offer.rooms * 2);
      array[i].offer.address = array[i].location.x + ', ' + array[i].location.y;
    }
    return array;
  };
  window.data = {
    // Генерируем массив объявлений
    adsArray: generateAdsArray()
  };
})();
