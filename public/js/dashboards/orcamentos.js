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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************!*\
  !*** ./resources/js/dashboards/orcamentos.js ***!
  \***********************************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var utils = __webpack_require__(/*! ../utils.js */ "./resources/js/utils.js");

var page = {
  bindEvents: function bindEvents() {
    $('#btn-import-items').on('click', function () {
      $('#modal-import').modal('show');
    });
    $('#form-import').on('submit', function (e) {
      e.preventDefault();
      var fileInput = $('#file-import');
      var jsonInput = $('#json-import');
      var file = fileInput.val();
      var json = jsonInput.val();

      if (file) {
        var _fileInput$;

        var content = (_fileInput$ = fileInput[0]) === null || _fileInput$ === void 0 ? void 0 : _fileInput$.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
          page.importItems(e.target.result);
          fileInput.val('');
          $('#modal-import').modal('hide');
        };

        reader.readAsText(content);
      }

      if (json) {
        page.importItems(json);
        jsonInput.val('');
        $('#modal-import').modal('hide');
      }
    });
    $('#modal-import').on('hidden.bs.modal', function (e) {
      $('#json-import').css('height', 'auto');
      page.clearImport();
    });
    $('#open-modal-orc').on('click', function () {
      page.resetForm();
      $('#modal-orc').modal('show');
    }); // $('#btn-add-item').on('click', function(){

    $('#form-add-item').on('submit', function (e) {
      e.preventDefault();
      var data = {
        titulo: $('#new-item-item').val(),
        qtd: $('#new-item-qtd').val(),
        valor_un: $('#new-item-valor-un').val()
      };

      if (data.titulo != '' && data.titulo != null) {
        page.addItem(data);
      }
    });
    $('#itens-wrap').on('click', '.btn-remove-item', page.removeItem);
    $('#form-orc').on('submit', function (evt) {
      evt.preventDefault();
      var id = $(this).find('[name=id]').val();

      if (id == null || id == '') {
        page.create();
      } else {
        page.update(id);
      }
    });
    $('#orcs-wrap').on('click', '.btn-edit', function () {
      page.get($(this).data('id'));
    });
    $('#orcs-wrap').on('click', '.btn-delete', function (e) {
      e.stopPropagation();
      var id = $(this).data('id');
      utils.confirm({
        title: 'Deseja deletar este registro?',
        confirmButtonText: 'Sim, deletar',
        onConfirm: function onConfirm() {
          page["delete"](id);
        }
      });
    });
    $('#form-search').on('submit', function (e) {
      e.preventDefault();
      page.list();
    });
    $('#btn-clean-seach').on('click', function () {
      $('#search-conteudo').val('');
      $('#search-inicio').val('');
      $('#search-status').val('');
      $('#search-pagamento').val('PD');
      $('#search-prioridade').val('');
    });
    /**
     * email sand
     */

    $('#send-mail').on('click', page.setValuesMail);
    $('#form-mail').on('submit', page.sendMail); // $('.modal').on('hidden.bs.modal', function(){
    //     $('.modal').css('overflow', 'auto')
    // })

    $('#itens-wrap').on('change', '.update-item', function () {
      var el = $(this);
      var sibling = el.parent().siblings().find('.update-item');
      var quantity = 0;
      var value = 0;

      if (el.is('.item-quantity')) {
        quantity = parseFloat(el.val());
        value = utils.unMaskMoney(sibling.val());
      } else {
        quantity = parseFloat(sibling.val());
        value = utils.unMaskMoney(el.val());
      }

      var total = !isNaN(value * parseFloat(quantity)) ? value * parseFloat(quantity) : 0;
      el.parent().siblings('.total-item').html(utils.toMoney(total)).data('valor', total);
      page.atualizeTotalItens();
    });
  },
  importItems: function importItems(json) {
    var parsedJson = page.parseJson(json);
    parsedJson.forEach(function (item) {
      page.addItem({
        titulo: item.desc,
        qtd: item.qty,
        valor_limpo: parseFloat(item.unit_price)
      });
    });
  },
  parseJson: function parseJson(json) {
    try {
      // Tenta fazer parse direto primeiro
      var parsedJson = JSON.parse(json);
      return parsedJson;
    } catch (error) {
      try {
        // Se falhar, limpa o JSON (remove quebras de linha e espaços extras)
        var cleanedJson = json.replace(/\s*\n\s*/g, '') // Remove quebras de linha
        .replace(/\s*\r\s*/g, '') // Remove carriage returns
        .replace(/\s*\t\s*/g, '') // Remove tabs
        .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um só
        .trim(); // Remove espaços do início e fim

        var _parsedJson = JSON.parse(cleanedJson);

        return _parsedJson;
      } catch (secondError) {
        console.error('Erro ao fazer parse do JSON:', secondError);
        alert('Erro ao processar JSON. Verifique se o formato está correto.');
      }
    }
  },
  clearImport: function clearImport() {
    $('#file-import').val('');
    $('#json-import').val('');
  },
  resetForm: function resetForm() {
    $('#orc-modal-title').html("Novo or\xE7amento");
    $('#form-orc').trigger('reset');
    $('#form-orc').find('[name=id]').val('');
    $('#itens-wrap').html('');
    $('.form-pdf').css('display', 'none');
    $('#send-mail').css('display', 'none');
  },
  addItem: function addItem(data) {
    var index = page.geraIndex();
    var valor_un = data.valor_limpo !== undefined ? data.valor_limpo : data.id == null || data.id == '' ? utils.unMaskMoney(data.valor_un) : data.valor_un;
    var total = !isNaN(valor_un * parseFloat(data.qtd)) ? valor_un * parseFloat(data.qtd) : 0;
    var content = "\n            <tr class=\"item item-added\" id=\"item-".concat(index, "\">\n                <input type=\"hidden\" name='item_id[]' value='").concat(data.id || '', "'>\n                <td class=\"p-0 index-item\">#</td>\n                <td class=\"p-0\"><input type=\"text\" class=\"form-control border-0\" name='item_titulo[]' value='").concat(data.titulo, "'></td>\n                <td class=\"p-0\"><input type=\"number\" min='0' class=\"update-item item-quantity form-control border-0\" name='item_qtd[]' value='").concat(data.qtd || 0, "'></td>\n                <td class=\"p-0\"><input type=\"text\" class=\"update-item item-value form-control border-0 money\" name='item_valor_un[]' value='").concat(utils.toMoney(valor_un), "'></td>\n                <td class=\"p-0 total-item\" data-valor=\"").concat(total, "\">").concat(utils.toMoney(total), "</td>\n                <td class=\"p-0\"><button type=\"button\" class=\"btn\"><i class=\"fa fa-times text-danger btn-remove-item\" data-id=\"").concat(data.id || '', "\" data-index=\"").concat(index, "\"></i></button></td>\n            </tr>");
    $('#itens-wrap').append(content);
    page.atualizaIndexItem();
    page.atualizeTotalItens();
    $('.item-reset').val('');
    $('.money').maskMoney({
      decimal: ',',
      thousands: '.'
    });
  },
  atualizeTotalItens: function atualizeTotalItens() {
    var total = 0;
    $('.total-item').each(function (i, el) {
      total += parseFloat($(el).data('valor'));
    });
    $('#total-itens').html(utils.toMoney(total));
    $('#form-orc').find('[name=valor_total]').val(utils.toMoney(total));
  },
  atualizaIndexItem: function atualizaIndexItem() {
    $('.index-item').each(function (i, el) {
      $(el).html(i + 1);
    });
  },
  geraIndex: function geraIndex() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    index += $('.item').length;

    if ($("#item-".concat(index)).length > 0) {
      return page.geraIndex(index);
    } else {
      return index;
    }
  },
  create: function create() {
    utils.load.start();
    $.ajax({
      url: '/orcamentos/ajax/save',
      type: 'post',
      dataType: 'json',
      data: utils.serializeObject($('#form-orc')),
      success: function success(resp) {
        utils.load.stop();

        if (resp.status) {
          page.get(resp.data.id);
          page.list();
          utils.success({
            title: 'Salvo!'
          });
        }
      },
      error: function error(e) {
        utils.load.stop();
        console.error(e);
      }
    });
  },
  update: function update(id) {
    utils.load.start();
    $.ajax({
      url: '/orcamentos/ajax/update/' + id,
      type: 'post',
      dataType: 'json',
      data: utils.serializeObject($('#form-orc')),
      success: function success(resp) {
        utils.load.stop();

        if (resp.status) {
          page.get(id);
          page.list();
          utils.success({
            title: 'Salvo!'
          });
        }
      },
      error: function error(e) {
        utils.load.stop();
        console.error(e);
      }
    });
  },
  list: function list() {
    utils.load.start();
    $.ajax({
      url: '/orcamentos/ajax/list',
      type: 'post',
      dataType: 'json',
      data: {
        conteudo: $('#search-conteudo').val(),
        inicio: $('#search-inicio').val(),
        status: $('#search-status').val(),
        pagamento: $('#search-pagamento').val(),
        prioridade: $('#search-prioridade').val()
      },
      success: function success(resp) {
        utils.load.stop();
        var currentPage = $('.page-item.active a').data('dt-idx') ? $('.page-item.active a').data('dt-idx') : 1;
        var infos = {
          receber: 0,
          recebido: 0,
          pendentes: 0
        };
        var content = '';

        var _iterator = _createForOfIteratorHelper(resp.data),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var orc = _step.value;
            //tr color
            var trClass = '';

            if (orc.pagamento == 'PG') {
              trClass = 'success';
            } else if (orc.prioridade == 1 && orc.status > 2) {
              trClass = 'warning';
            } else if (orc.status == 1 && orc.pagamento == 'PD') {
              trClass = 'danger';
            } //infos


            if (orc.pagamento == 'PG') {
              infos.recebido += parseFloat(orc.valor_total);
            }

            if (orc.status > 2) {
              infos.pendentes++;
            }

            if (orc.status == 1 && orc.pagamento == 'PD') {
              infos.receber += parseFloat(orc.valor_total);
            }

            content += "\n                            <tr class=\"hover btn-edit ".concat(trClass, "\" data-id=\"").concat(orc.id, "\">\n                                <td>").concat(orc.id, "</td>\n                                <td>").concat(orc.nota_fiscal || '-', "</td>\n                                <td>").concat(orc.pedido || '-', "</td>\n                                <td>").concat(orc.solicitante || '-', "</td>\n                                <td>").concat(orc.area || '-', "</td>\n                                <td>").concat(utils.formartDate(orc.inicio) || '-', "</td>\n                                <td>").concat(utils.status[orc.status] || '-', "</td>\n                                <td>").concat(utils.toMoney(orc.valor_total) || '-', "</td>\n                                <td>\n                                    <button type=\"button\" class=\"btn btn-sm btn-outline-danger flot-right btn-delete\" data-id=\"").concat(orc.id, "\"><i class=\"fa fa-trash\"></i></button>\n                                </td>\n                            </tr>");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        $('#table-orc').DataTable().destroy();
        $('#orcs-wrap').html(content);
        var tableData = $('#table-orc').DataTable({
          "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
          },
          "pageLength": 50,
          "order": [[0, 'desc']]
        }); // console.log('currentPage ', currentPage)

        setTimeout(function () {
          $(".page-item a[data-dt-idx=".concat(currentPage, "]")).click();
        }, 100); //infos

        $('#receber').html(utils.toMoney(infos.receber));
        $('#recebido').html(utils.toMoney(infos.recebido));
        $('#pendentes').html(infos.pendentes);
      },
      error: function error(e) {
        utils.load.stop();
        console.error(e);
      }
    });
  },
  get: function get(id) {
    utils.load.start();
    $.ajax({
      url: '/orcamentos/ajax/get/' + id,
      type: 'post',
      dataType: 'json',
      success: function success(resp) {
        utils.load.stop();
        $('#itens-wrap').html('');
        page.setValueOrc(resp.data);
      },
      error: function error(e) {
        utils.load.stop();
        console.error(e);
      }
    });
  },
  setValueOrc: function setValueOrc(data) {
    // console.log(data)
    var form = $('#form-orc');

    for (var i in data) {
      var element = form.find("[name=".concat(i, "]"));

      if (element.is('.money')) {
        element.val(utils.toMoney(data[i]));
      } else {
        element.val(data[i] || '');
      }
    }

    var _iterator2 = _createForOfIteratorHelper(data.itens),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var item = _step2.value;
        var dataItem = {
          id: item.id,
          titulo: item.titulo,
          qtd: item.qtd,
          valor_un: item.valor_un
        };
        page.addItem(dataItem);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    $('.form-pdf').each(function () {
      var formBtn = $(this);
      formBtn.attr('action', formBtn.attr('path') + '/' + data.id);
    }).css('display', 'initial');
    $('#orc-modal-title').html("Or\xE7amento ".concat(data.id));
    $('#send-mail').css('display', 'initial');
    $('#modal-orc').modal('show');
  },
  "delete": function _delete(id) {
    utils.load.start();
    $.ajax({
      url: '/orcamentos/ajax/delete/' + id,
      type: 'post',
      dataType: 'json',
      success: function success(resp) {
        utils.load.stop();
        page.resetForm();
        page.list();
        $('#modal-orc').modal('hide');
        utils.success({
          msg: 'Deletado'
        });
      },
      error: function error(e) {
        utils.load.stop();
        console.error(e);
      }
    });
  },
  removeItem: function removeItem() {
    var index = $(this).data('index');
    var id = $(this).data('id');

    if (id != null && id != '') {
      utils.load.start();
      $.ajax({
        url: '/orcamentos/ajax/delete-item/' + id,
        type: 'post',
        dataType: 'json',
        success: function success(resp) {
          utils.load.stop();
          $("tr#item-".concat(index)).remove();
          page.atualizaIndexItem();
          page.atualizeTotalItens();
        },
        error: function error(e) {
          utils.load.stop();
          console.error(e);
        }
      });
    } else {
      $("tr#item-".concat(index)).remove();
      page.atualizaIndexItem();
      page.atualizeTotalItens();
    }
  },
  setValuesMail: function setValuesMail() {
    var formOrc = $('#form-orc');
    var formMail = $('#form-mail');
    var id = formOrc.find('[name=id]').val();
    var email = formOrc.find('[name=email]').val().toLowerCase();
    formMail.find('[name=email]').val(email);
    formMail.find('[name=id_orc]').val(id);
    $('#modal-mail').modal('show');
  },
  sendMail: function sendMail(evt) {
    evt.preventDefault();
    var formMail = $('#form-mail');
    var id_orc = formMail.find('[name=id_orc]').val();
    utils.load.start();
    $.ajax({
      url: '/orcamentos/ajax/send-mail/' + id_orc,
      type: 'post',
      dataType: 'json',
      data: {
        email: formMail.find('[name=email]').val(),
        message: formMail.find('[name=message]').val()
      },
      success: function success(resp) {
        utils.load.stop();

        if (resp.status) {
          formMail.find('[name=email]').val('');
          formMail.find('[name=message]').val('');
          formMail.find('[name=id_orc]').val('');
          $('#modal-mail').modal('hide');
          utils.success({
            title: 'Email enviado com sucesso!'
          });
        } else {
          utils.setError({
            msg: resp.msg || 'Falha ao enviar email'
          });
        }
      },
      error: function error(e) {
        utils.load.stop();
        utils.setError({
          msg: e.responseText
        });
        console.error(e);
      }
    });
  },
  ddImgForm: function ddImgForm() {
    var box = $('#drop-box'); // if (isAdvancedUpload) {
    //     form.addClass('has-advanced-upload');
    // }

    var isAdvancedUpload = function () {
      var div = document.createElement('div');
      return ('draggable' in div || 'ondragstart' in div && 'ondrop' in div) && 'FormData' in window && 'FileReader' in window;
    }(),
        input = $('#file'),
        label = $('.box__filename'),
        showFiles = function showFiles() {
      var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var name = fileName;
      var nameArr = fileName.split('.');
      fistName = nameArr.slice(0, nameArr.length - 1).join('.');

      if (fistName.length > 19) {
        name = fistName.replace(/(?<=^.{8}).*(?=.{8}?)/, '...') + '.' + nameArr.slice(nameArr.length - 1);
      }

      label.text(name);
    };

    if (isAdvancedUpload) {
      var droppedFiles = false;
      box.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
      }).on('dragover dragenter', function () {
        box.addClass('is-dragover');
      }).on('dragleave dragend drop', function () {
        box.removeClass('is-dragover');
      }).on('drop', function (e) {
        droppedFiles = e.originalEvent.dataTransfer.files;
        showFiles(droppedFiles[0].name);
      });
      input.on('change', function (e) {
        showFiles(e.target.files[0].name);
      });
    }
  }
};
$(function () {
  page.bindEvents();
  page.list(); // page.ddImgForm()

  $('.money').maskMoney({
    decimal: ',',
    thousands: '.'
  });
  $('.modal').css('orverflow', 'auto');
});
})();

/******/ })()
;