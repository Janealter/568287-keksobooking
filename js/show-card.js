'use strict';

(function () {
  // Обработчик события при клике на элемент popup__close
  var onPopupCloseClick = function () {
    window.showCard.closeCard();
  };
  // Обработчик события при нажатии Esc
  var onDocumentEscPress = function (event) {
    window.util.isEscPressed(event, window.showCard.closeCard);
  };
  // Обработчик события при нажатии Enter на элементе popup__close
  var onPopupCloseEnterPress = function (event) {
    window.util.isEnterPressed(event, window.showCard.closeCard);
  };

  window.showCard = {
    // Открывает окно объявления
    openCard: function (adNumber) {
      // Закрываем предыдущее, если оно есть
      window.showCard.closeCard();
      var adPopup = window.card.generateAdFragment(window.data.adsArray[adNumber]);
      var closeButton = adPopup.querySelector('.popup__close');
      closeButton.tabIndex = 0;
      window.map.mapSection.insertBefore(adPopup, window.map.mapSection.querySelector('.map__filters-container'));
      closeButton.addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onDocumentEscPress);
      closeButton.addEventListener('keydown', onPopupCloseEnterPress);
    },
    // Закрывает окно объявления
    closeCard: function () {
      var adPopup = window.map.mapSection.querySelector('.map__card.popup');
      if (adPopup) {
        var closeButton = adPopup.querySelector('.popup__close');
        // Деактивируем Map Pin
        window.map.deactivateMapPin();
        closeButton.removeEventListener('click', onPopupCloseClick);
        document.removeEventListener('keydown', onDocumentEscPress);
        closeButton.removeEventListener('keydown', onPopupCloseEnterPress);
        window.map.mapSection.removeChild(adPopup);
      }
    }
  };
})();
