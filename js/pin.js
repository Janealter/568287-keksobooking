'use strict';

(function () {
  // Обработчик события при наведении мыши на Map Pin Main
  var onMapPinMainMouseup = function (event) {
    // Получаем объект формы
    var noticeForm = document.querySelector('.notice__form');
    window.map.mapSection.classList.remove('map--faded');
    window.map.addMapPinsToMap();
    noticeForm.classList.remove('notice__form--disabled');
    var fieldSets = noticeForm.querySelectorAll('fieldset');
    fieldSets.forEach(function (fieldSet) {
      fieldSet.disabled = false;
    });
    event.target.removeEventListener('mouseup', onMapPinMainMouseup);
  };
  // Функция добавления обработчика события mouseup для Map Pin Main
  var addMapPinMainListener = function () {
    var mapPinMain = window.map.mapSection.querySelector('.map__pin--main');
    mapPinMain.addEventListener('mouseup', onMapPinMainMouseup);
  };
  // Добавялем обработчик событий для Map Pin Main
  addMapPinMainListener();
})();
