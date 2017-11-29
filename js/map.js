'use strict';

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
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': titles[i],
        'address': '',
        'price': getRandomInt(1000, 1000000),
        'type': TYPES[getRandomInt(0, 2)],
        'rooms': getRandomInt(1, 5),
        'guests': '',
        'checkin': TIMES[getRandomInt(0, 2)],
        'checkout': TIMES[getRandomInt(0, 2)],
        'features': getRandomLengthArray(FEATURES),
        'description': '',
        'photos': []
      },
      'location': {
        'x': getRandomInt(300, 900),
        'y': getRandomInt(100, 500)
      }
    });
    // Количество размещаемых гостей зависит от кол-ва комнат
    array[i].offer.guests = getRandomInt(array[i].offer.rooms, array[i].offer.rooms * 2);
    array[i].offer.address = array[i].location.x + ', ' + array[i].location.y;
  }
  return array;
};

// Функция создания массива случайной длины (в т.ч. и 0) из элементов переданного массива
var getRandomLengthArray = function (arr) {
  var array = [];
  var LENGTH = getRandomInt(0, arr.length);
  for (var i = 0; i < LENGTH; i++) {
    array[i] = arr[getRandomInt(0, arr.length - 1)];
    // Убираем повторения
    for (var j = 0; j < array.length; j++) {
      if (j !== i && array[j] === array[i]) {
        i--;
      }
    }
  }
  return array;
};

// Функция генерации случайного целого числа в определенном диапазоне
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция генерации фрагмента разметки с метками на карте
var generateMapPinsFragment = function (adsArray) {
  var MAP_PIN_POINTER_HEIGHT = 18;
  var mapPinTemplate = document.querySelector('template').content.cloneNode(true);
  // Удаляем из шаблона лишний блок
  mapPinTemplate.removeChild(mapPinTemplate.firstElementChild);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray.length; i++) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    var button = mapPinElement.querySelector('button');
    var img = mapPinElement.querySelector('img');
    button.style.left = (adsArray[i].location.x - img.width / 2) + 'px';
    button.style.top = (adsArray[i].location.y - img.height + MAP_PIN_POINTER_HEIGHT) + 'px';
    img.src = adsArray[i].author.avatar;
    fragment.appendChild(mapPinElement);
  }
  return fragment;
};

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
  adFragment.removeChild(adFragment.lastElementChild);
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
  for (var i = 0; i < ad.offer.features.length; i++) {
    features.appendChild(featuresClone.querySelector('.feature.feature--' + ad.offer.features[i]));
  }
  description.textContent = ad.offer.description;
  avatar.src = ad.author.avatar;
  return adFragment;
};

// Функция добавления в разметку меток и объявления
var addMapPinsAndAd = function () {
  // Получаем родительский элемент, в который затем добавим новые элементы
  var map = document.querySelector('.map');
  var ADS = generateAdsArray();
  // Добавляем метки
  map.querySelector('.map__pins').appendChild(generateMapPinsFragment(ADS));
  // Добавляем объявление
  map.insertBefore(generateAdFragment(ADS[0]), map.querySelector('.map__filters-container'));
};

addMapPinsAndAd();
