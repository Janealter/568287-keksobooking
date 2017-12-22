'use strict';

(function () {
  // URL для загрузки данных с сервера
  var LOAD_URL = 'https://1510.dump.academy/keksobooking/data';

  // Загружает массив объявлений
  var loadAdsArray = function () {

    var onLoad = function (response) {
      window.data.adsArrayOrig = response;
      // Подготавливаем основной массив (в начале работы он такой же, как и оригинальный массив)
      window.data.adsArray = window.data.adsArrayOrig;
      // Добавялем обработчик события mousedown для Map Pin Main
      window.pin.addMapPinMainListener();
    };

    window.backend.load(LOAD_URL, onLoad, window.util.onBackendError);
  };

  // Загружаем данные с сервера сразу при открытии страницы
  loadAdsArray();

  window.data = {
    // Оригинальный массив с объявлениями, загруженный с сервера, в ходе работы не изменяется
    adsArrayOrig: null,
    // Основной массив, с которым работает сайт, изменяется в ходе работы
    adsArray: null
  };
})();
