'use strict';

(function () {
  var RESPONSE_TYPE = 'json';
  var CONNECTION_TIMEOUT = 10000;
  var HTTP_OK_STATUS = 200;
  var ERROR_TEXTS = {
    STATUS_NOT_OK: 'Сервер вернул статус: ',
    CONNECTION_ERROR: 'Ошибка соединения с сервером',
    CONNECTION_TIMEOUT: 'Время ожидания ответа сервера (' + CONNECTION_TIMEOUT + ' мс) вышло'
  };

  // Инициализирует объект XMLHttpRequest
  var initializeXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_OK_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(ERROR_TEXTS.STATUS_NOT_OK + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERROR_TEXTS.CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(ERROR_TEXTS.CONNECTION_TIMEOUT);
    });

    xhr.timeout = CONNECTION_TIMEOUT;
    return xhr;
  };

  window.backend = {
    // Скачивает данные с сервера
    load: function (url, onLoad, onError) {
      var xhr = initializeXhr(onLoad, onError);

      xhr.open('GET', url);
      xhr.send();
    },
    // Загружает данные на сервер
    save: function (url, data, onLoad, onError) {
      var xhr = initializeXhr(onLoad, onError);

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
