'use strict';

(function () {
  var Draggable = function (element) {
    if (element instanceof window.ElementParameters) {
      this.parameters = element;
    } else {
      this.parameters = new window.ElementParameters(element);
    }

  };

  Draggable.prototype.enableDrag = function (moveEvtCb, upEvtCb, limitXMin, limitXMax, limitYMin, limitYMax) {
    var BodySize = {
      WIDTH: parseInt(window.getComputedStyle(document.body).width, 10),
      HEIGHT: parseInt(window.getComputedStyle(document.body).height, 10)
    };

    limitXMin = typeof limitXMin === 'number' ? limitXMin : 0;
    limitXMax = typeof limitXMax === 'number' ? limitXMax : BodySize.WIDTH;
    limitYMin = typeof limitYMin === 'number' ? limitYMin : 0;
    limitYMax = typeof limitYMax === 'number' ? limitYMax : BodySize.HEIGHT;

    var draggableElement = this;

    // Обработчик события при зажатии кнопки мыши на Map Pin Main
    this.onElementMousedown = function (evt) {
      evt.preventDefault();

      // Стартовые координаты курсора
      var mouseStartCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      // Смещение курсора относительно Map Pin Main
      var shift = {
        x: mouseStartCoords.x - draggableElement.parameters.getX(),
        y: mouseStartCoords.y - draggableElement.parameters.getY()
      };

      // Обработчик события при перемещении мыши
      var onElementMousemove = function (moveEvt) {
        moveEvt.preventDefault();
        // Текущие координаты курсора
        var mouseCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        // Текущие координаты Map Pin Main
        var elementCoords = {
          x: mouseCoords.x - shift.x,
          y: mouseCoords.y - shift.y
        };

        if (elementCoords.x - draggableElement.parameters.getWidth() / 2 > limitXMin && elementCoords.x + draggableElement.parameters.getWidth() / 2 < limitXMax) {
          draggableElement.parameters.object.style.left = elementCoords.x + 'px';
        }
        if (elementCoords.y - draggableElement.parameters.getHeight() / 2 > limitYMin && elementCoords.y + draggableElement.parameters.getHeight() / 2 < limitYMax) {
          draggableElement.parameters.object.style.top = elementCoords.y + 'px';
        }
        if (typeof moveEvtCb === 'function') {
          moveEvtCb();
        }
      };

      // Обработчик события при отпускании кнопки мыши
      var onElementMouseup = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onElementMousemove);
        document.removeEventListener('mouseup', onElementMouseup);
        if (typeof upEvtCb === 'function') {
          upEvtCb();
        }
      };

      document.addEventListener('mousemove', onElementMousemove);
      document.addEventListener('mouseup', onElementMouseup);
    };

    this.parameters.object.addEventListener('mousedown', this.onElementMousedown);
  };
  Draggable.prototype.disableDrag = function () {
    this.parameters.object.removeEventListener('mousedown', this.onElementMousedown);
  };

  window.Draggable = Draggable;
})();
