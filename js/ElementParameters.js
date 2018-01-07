'use strict';

(function () {
  var ElementParameters = function (element) {
    this.object = element;
  };

  ElementParameters.prototype.getX = function () {
    return Math.round(parseInt(window.getComputedStyle(this.object).left, 10));
  };

  ElementParameters.prototype.getY = function () {
    return Math.round(parseInt(window.getComputedStyle(this.object).top, 10));
  };

  ElementParameters.prototype.getWidth = function () {
    return Math.round(parseInt(window.getComputedStyle(this.object).width, 10));
  };

  ElementParameters.prototype.getHeight = function () {
    return Math.round(parseInt(window.getComputedStyle(this.object).height, 10));
  };

  window.ElementParameters = ElementParameters;
})();
