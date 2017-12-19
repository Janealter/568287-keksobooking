'use strict';

(function () {
  var adsArray = [];

  // Загружает массив объявлений
  var loadAdsArray = function () {
    var URL = 'https://1510.dump.academy/keksobooking/data';

    var onLoad = function (response) {
      adsArray = response;
      // Добавялем обработчик события mousedown для Map Pin Main
      window.pin.addMapPinMainListener();
    };

    window.backend.load(URL, onLoad, window.util.onBackendError);
  };

  // Загружаем данные с сервера сразу при открытии страницы
  loadAdsArray();

  window.data = {
    getAdsArray: function () {
      return adsArray;
    }
  };
})();
