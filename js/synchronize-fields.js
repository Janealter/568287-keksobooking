'use strict';

(function () {
  window.syncronizeFields = function (elementMaster, elementSlave, valuesMaster, valuesSlave, callbackFunc) {
    elementMaster.addEventListener('change', function () {
      var valueIndex = valuesMaster.indexOf(elementMaster.value);
      callbackFunc(elementSlave, valuesSlave[valueIndex]);
    });
  };
})();
