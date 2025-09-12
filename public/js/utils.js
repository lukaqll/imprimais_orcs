/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/utils.js":
/*!*******************************!*\
  !*** ./resources/js/utils.js ***!
  \*******************************/
/***/ ((module) => {

var utils = {
  status: {
    1: 'Entregue',
    2: 'Concluído',
    3: 'Em Andamento',
    4: 'Aguardando Aprovação',
    5: 'Não Iniciado'
  },
  prior: {
    1: 'Alta',
    2: 'Média',
    3: 'Baixa'
  },
  serializeObject: function serializeObject(form) {
    var obj = {};
    var array = form.serializeArray();
    $.each(array, function () {
      if (obj[this.name]) {
        if (!obj[this.name].push) {
          obj[this.name] = [obj[this.name]];
        }

        obj[this.name].push(this.value || '');
      } else {
        if (this.name.match(']')) {
          obj[this.name] = [];
          obj[this.name].push(this.value || '');
        } else {
          obj[this.name] = this.value || '';
        }
      }
    });
    return obj;
  },
  setError: function setError() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Swal.fire({
      type: 'error',
      title: opt.msg,
      html: opt.body ? opt.body : ''
    });
  },
  load: {
    start: function start() {
      $('.pace').css('z-index', '15000');
      $('.pace').removeClass('pace-inactive');
      $('.pace').addClass('pace-active');
    },
    stop: function stop() {
      $('.pace').removeClass('pace-active');
      $('.pace').addClass('pace-inactive');
    }
  },
  success: function success() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Swal.fire({
      type: 'success',
      title: opt.title,
      html: '<p>' + (opt.msg ? opt.msg : '') + '</p>',
      timer: 1000,
      showConfirmButton: false,
      didOpen: function didOpen() {
        Swal.showLoading();
        timerInterval = setInterval(function () {
          var content = Swal.getContent();

          if (content) {
            var b = content.querySelector('b');

            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: function willClose() {
        clearInterval(timerInterval);
      }
    });
  },
  toMoney: function toMoney(str) {
    if (str == null || str == '') return '0,00';

    if (parseFloat(str) > 0) {
      var val = parseFloat(str).toFixed(2);
      var array = parseFloat(val).toLocaleString("pt-BR", {
        currency: "BRL"
      }).split(',');
      var decimal = array[1] ? array[1].padEnd(2, '0') : '00';
      return array[0] + ',' + decimal;
    } else {
      return '0,00';
    }
  },
  formartDate: function formartDate(str) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (str == null) return '-';
    var dateTimeSplit = str.match('T') ? str.split('T') : str.split(' ');
    var parts = dateTimeSplit[0].split('-');
    var day = parts[2];
    var month = parts[1];
    var year = parts[0];
    return day + '/' + month + '/' + year + (dateTimeSplit[1] && time ? ' ' + dateTimeSplit[1] : '');
  },
  confirm: function confirm() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Swal.fire({
      type: 'warning',
      title: opt.title,
      html: '<p>' + (opt.msg ? opt.msg : '') + '</p>',
      showCancelButton: true,
      confirmButtonText: opt.textBtnConfirm || 'OK',
      cancelButtonText: opt.textBtnCancel || 'Cancelar'
    }).then(function (result) {
      // console.log(result)
      if (result.value) {
        opt.onConfirm && opt.onConfirm();
      } else {
        opt.onCancel && opt.onCancel();
      }
    });
  },
  unMaskMoney: function unMaskMoney(str) {
    str = str.replaceAll('.', '').replaceAll(',', '.').replaceAll(' ', '').replace('R$', '');
    str = parseFloat(str);

    if (isNaN(str)) {
      return false;
    } else {
      return str;
    }
  }
};
module.exports = utils;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/js/utils.js");
/******/ 	
/******/ })()
;