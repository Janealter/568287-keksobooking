'use strict';

(function () {
  // Обработчик события при клике на элемент popup__close
  var onPopupCloseClick = function () {
    window.showCard.close();
  };
  // Обработчик события при нажатии Esc
  var onDocumentEscPress = function (evt) {
    window.util.isEscPressed(evt, window.showCard.close);
  };
  // Обработчик события при нажатии Enter на элементе popup__close
  var onPopupCloseEnterPress = function (evt) {
    window.util.isEnterPressed(evt, window.showCard.close);
  };

  window.showCard = {
    // Открывает окно объявления
    open: function (adNumber) {
      // Закрываем предыдущее, если оно есть
      window.showCard.close();
      var adPopup = window.card.generateAdElement(window.data.adsArray[adNumber]);
      var closeButton = adPopup.querySelector('.popup__close');
      closeButton.tabIndex = 0;
      window.map.element.insertBefore(adPopup, window.map.element.querySelector('.map__filters-container'));
      closeButton.addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onDocumentEscPress);
      closeButton.addEventListener('keydown', onPopupCloseEnterPress);
    },
    // Закрывает окно объявления
    close: function () {
      var adPopup = window.map.element.querySelector('.map__card.popup');
      if (adPopup) {
        var closeButton = adPopup.querySelector('.popup__close');
        // Деактивируем Map Pin
        window.map.deactivatePin();
        closeButton.removeEventListener('click', onPopupCloseClick);
        document.removeEventListener('keydown', onDocumentEscPress);
        closeButton.removeEventListener('keydown', onPopupCloseEnterPress);
        window.map.element.removeChild(adPopup);
      }
    }
  };
})();
