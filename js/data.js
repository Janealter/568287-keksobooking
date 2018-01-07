'use strict';

(function () {
  // URL для загрузки данных с сервера
  var LOAD_URL = 'https://1510.dump.academy/keksobooking/data';

  // Загружает массив объявлений
  var loadAdsArray = function () {

    var onLoad = function (response) {
      window.data.adsArrayOriginal = response;
      // Подготавливаем основной массив (в начале работы он такой же, как и оригинальный массив)
      window.data.adsArray = window.data.adsArrayOriginal;
      // Добавялем обработчик события mousedown для Map Pin Main
      window.pinMain.setDraggable();
    };

    window.backend.load(LOAD_URL, onLoad, window.util.onBackendError);
  };

  // Загружаем данные с сервера сразу при открытии страницы
  loadAdsArray();

  window.data = {
    // Оригинальный массив с объявлениями, загруженный с сервера, в ходе работы не изменяется
    adsArrayOriginal: null,
    // Основной массив, с которым работает сайт, изменяется в ходе работы
    adsArray: null
  };
})();
