'use strict';

// Коды кнопок
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
  var length = getRandomInt(0, arr.length);
  for (var i = 0; i < length; i++) {
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
  adsArray.forEach(function (ad, i) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    var button = mapPinElement.querySelector('button');
    var img = mapPinElement.querySelector('img');
    button.id = i;
    button.tabIndex = 0;
    button.style.left = (ad.location.x - img.width / 2) + 'px';
    button.style.top = (ad.location.y - img.height + MAP_PIN_POINTER_HEIGHT) + 'px';
    img.src = ad.author.avatar;
    fragment.appendChild(mapPinElement);
  });
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
  ad.offer.features.forEach(function (feature) {
    features.appendChild(featuresClone.querySelector('.feature.feature--' + feature));
  });
  description.textContent = ad.offer.description;
  avatar.src = ad.author.avatar;
  return adFragment;
};

// Генерируем массив объявлений
var ads = generateAdsArray();
// Получаем объект карты для использования в функциях
var map = document.querySelector('.map');
// Получаем объект Notice для использования в функциях
var notice = document.querySelector('.notice');

// Добавляет метки на карту
var addMapPinsToMap = function () {
  map.querySelector('.map__pins').appendChild(generateMapPinsFragment(ads));
};

// Открывает окно объявления
var openAdPopup = function (adNumber) {
  // Закрываем предыдущее, если оно есть
  if (map.querySelector('.map__card.popup')) {
    closeAdPopup();
  }
  var adPopup = generateAdFragment(ads[adNumber]);
  var closeButton = adPopup.querySelector('.popup__close');
  closeButton.tabIndex = 0;
  map.insertBefore(adPopup, map.querySelector('.map__filters-container'));
  closeButton.addEventListener('click', onPopupCloseClick);
  document.addEventListener('keydown', onDocumentEscPress);
  closeButton.addEventListener('keydown', onPopupCloseEnterPress);
};

// Закрывает окно объявления
var closeAdPopup = function () {
  var adPopup = map.querySelector('.map__card.popup');
  var closeButton = adPopup.querySelector('.popup__close');
  closeButton.removeEventListener('click', onPopupCloseClick);
  document.removeEventListener('keydown', onDocumentEscPress);
  closeButton.removeEventListener('keydown', onPopupCloseEnterPress);
  map.removeChild(adPopup);
};

// Обработчик события при наведении мыши на Map Pin Main
var onMapPinMainMouseup = function (event) {
  // Получаем объект формы
  var noticeForm = document.querySelector('.notice__form');
  map.classList.remove('map--faded');
  addMapPinsToMap();
  noticeForm.classList.remove('notice__form--disabled');
  var fieldSets = noticeForm.querySelectorAll('fieldset');
  fieldSets.forEach(function (fieldSet) {
    fieldSet.disabled = false;
  });
  event.target.removeEventListener('mouseup', onMapPinMainMouseup);
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
  if (event.target.classList.contains('map__pin') && !event.target.classList.contains('map__pin--main') && event.keyCode === ENTER_KEYCODE) {
    activateMapPin(event.target);
  }
};

// Обработчик события при клике на элемент popup__close
var onPopupCloseClick = function () {
  closeAdPopup();
  deactivateMapPin();
};

// Обработчик события при нажатии Esc
var onDocumentEscPress = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closeAdPopup();
    deactivateMapPin();
  }
};

// Обработчик события при нажатии Enter на элементе popup__close
var onPopupCloseEnterPress = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    closeAdPopup();
    deactivateMapPin();
  }
};

// Обработчик события invalid на любом поле ввода
var onInputInvalid = function (event) {
  event.target.style = 'border-color: red';
};

// Добавляет подсветку Map Pin, показывает объявление
var activateMapPin = function (mapPin) {
  deactivateMapPin();
  mapPin.classList.add('map__pin--active');
  openAdPopup(mapPin.id);
};

// Убирает подсветку Map Pin, если она есть
var deactivateMapPin = function () {
  var mapPinActive = map.querySelector('.map__pin--active');
  if (mapPinActive) {
    mapPinActive.classList.remove('map__pin--active');
  }
};

// Функция добавления обработчика события mouseup для Map Pin Main
var addMapPinMainListener = function () {
  var mapPinMain = map.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);
};

// Добавляет обработчики событий на Map Pins
var addMapPinsListeners = function () {
  var mapPins = map.querySelector('.map__pins');
  mapPins.addEventListener('click', onMapPinClick);
  mapPins.addEventListener('keydown', onMapPinEnterPress);
};

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
  var roomNumberSelect = notice.querySelector('#room_number');
  var capacitySelect = notice.querySelector('#capacity');
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
  var capacitySelect = notice.querySelector('#capacity');
  var roomNumberSelect = notice.querySelector('#room_number');
  // Получаем все возможные опции в начальном состоянии capacitySelect
  var allCapacityOptions = capacitySelect.cloneNode(true).options;
  // Задаем начальные опции для capacitySelect
  setCapacitySelectOptions(allCapacityOptions);
  roomNumberSelect.addEventListener('change', function () {
    setCapacitySelectOptions(allCapacityOptions);
  });
};

// Добавляет обработчики события invalid для полей Заголовок, Адрес и Цена за ночь
var addCheckedInputsListeners = function () {
  var titleInput = notice.querySelector('#title');
  var addressInput = notice.querySelector('#address');
  var priceInput = notice.querySelector('#price');
  titleInput.addEventListener('invalid', onInputInvalid);
  addressInput.addEventListener('invalid', onInputInvalid);
  priceInput.addEventListener('invalid', onInputInvalid);
};

addMapPinMainListener();
addMapPinsListeners();
addTimeinTimeoutSelectListeners();
addTypeSelectListener();
addRoomNumberSelectListener();
addCheckedInputsListeners();
