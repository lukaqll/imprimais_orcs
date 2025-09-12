const utils = require('../utils.js')

const page = {
    bindEvents: ()=>{

        $('#btn-import-items').on('click', function(){
            $('#modal-import').modal('show')
        })

        $('#form-import').on('submit', function(e){
            e.preventDefault()
            const fileInput = $('#file-import')
            const jsonInput = $('#json-import')

            const file = fileInput.val()
            const json = jsonInput.val()

            if (file) {
                const content = fileInput[0]?.files[0]
                const reader = new FileReader()
                reader.onload = function(e){
                    page.importItems(e.target.result)
                    fileInput.val('')
                    $('#modal-import').modal('hide')
                }
                reader.readAsText(content)
            }
            if (json) {
                page.importItems(json)
                jsonInput.val('')
                $('#modal-import').modal('hide')
            }
        })

        $('#modal-import').on('hidden.bs.modal', function(e){
            $('#json-import').css('height', 'auto');
            page.clearImport()
        })

        $('#open-modal-orc').on('click', function(){
            page.resetForm()
            $('#modal-orc').modal('show')
        })

        // $('#btn-add-item').on('click', function(){
        $('#form-add-item').on('submit', function(e) {
            e.preventDefault()

            const data = {
                titulo: $('#new-item-item').val(),
                qtd: $('#new-item-qtd').val(),
                valor_un: $('#new-item-valor-un').val(),
            }

            if (data.titulo != '' && data.titulo != null ) {
                page.addItem(data)
            }
        })

        $('#itens-wrap').on('click', '.btn-remove-item', page.removeItem)
        $('#form-orc').on('submit', function(evt){
            evt.preventDefault()
            const id = $(this).find('[name=id]').val()
            if( id == null || id == '' ){
                page.create()
            } else {
                page.update(id)
            }
        })
        $('#orcs-wrap').on('click', '.btn-edit', function(){page.get($(this).data('id'))})
        $('#orcs-wrap').on('click', '.btn-delete', function(e){
            e.stopPropagation()
            const id = $(this).data('id')
            utils.confirm({
                title: 'Deseja deletar este registro?',
                confirmButtonText: 'Sim, deletar',
                onConfirm: ()=>{page.delete(id)}
            })
        })
        $('#form-search').on('submit', e => {
            e.preventDefault()
            page.list()
        })
        $('#btn-clean-seach').on('click', function(){
            $('#search-conteudo').val('')
            $('#search-inicio').val('')
            $('#search-status').val('')
            $('#search-pagamento').val('PD')
            $('#search-prioridade').val('')
        })

        /**
         * email sand
         */
        $('#send-mail').on('click', page.setValuesMail)
        $('#form-mail').on('submit', page.sendMail)
        // $('.modal').on('hidden.bs.modal', function(){
        //     $('.modal').css('overflow', 'auto')
        // })

        $('#itens-wrap').on('change', '.update-item', function() {
            const el = $(this)
            const sibling = el.parent().siblings().find('.update-item')

            let quantity = 0
            let value = 0

            if (el.is('.item-quantity')) {
                quantity = parseFloat(el.val())
                value = utils.unMaskMoney(sibling.val())
            } else {
                quantity = parseFloat(sibling.val())
                value = utils.unMaskMoney(el.val())
            }

            const total = !isNaN(value * parseFloat(quantity)) ? value * parseFloat(quantity) : 0
            el.parent().siblings('.total-item').html(utils.toMoney(total)).data('valor', total)
            page.atualizeTotalItens()
        })

    },

    importItems: function(json){
        const parsedJson = page.parseJson(json)

        parsedJson.forEach(item => {
            page.addItem({
                titulo: item.desc,
                qtd: item.qty,
                valor_limpo: parseFloat(item.unit_price)
            })
        })
    },

    parseJson: function(json){
        try {
            // Tenta fazer parse direto primeiro
            const parsedJson = JSON.parse(json);
            return parsedJson;
        } catch (error) {
            try {
                // Se falhar, limpa o JSON (remove quebras de linha e espaços extras)
                const cleanedJson = json
                    .replace(/\s*\n\s*/g, '')  // Remove quebras de linha
                    .replace(/\s*\r\s*/g, '')  // Remove carriage returns
                    .replace(/\s*\t\s*/g, '')  // Remove tabs
                    .replace(/\s+/g, ' ')      // Substitui múltiplos espaços por um só
                    .trim();                   // Remove espaços do início e fim

                const parsedJson = JSON.parse(cleanedJson);
                return parsedJson;
            } catch (secondError) {
                console.error('Erro ao fazer parse do JSON:', secondError);
                alert('Erro ao processar JSON. Verifique se o formato está correto.');
            }
        }
    },

    clearImport: function(){
        $('#file-import').val('')
        $('#json-import').val('')
    },

    resetForm: function(){
        $('#orc-modal-title').html(`Novo orçamento`)
        $('#form-orc').trigger('reset')
        $('#form-orc').find('[name=id]').val('')
        $('#itens-wrap').html('')
        $('.form-pdf').css('display', 'none')
        $('#send-mail').css('display', 'none')
    },
    addItem: function(data){
        const index = page.geraIndex()

        const valor_un = data.valor_limpo !== undefined ? data.valor_limpo : (data.id == null || data.id == '' ? utils.unMaskMoney(data.valor_un) : data.valor_un)

        const total = !isNaN(valor_un * parseFloat(data.qtd)) ? valor_un * parseFloat(data.qtd) : 0
        const content = `
            <tr class="item item-added" id="item-${index}">
                <input type="hidden" name='item_id[]' value='${data.id || ''}'>
                <td class="p-0 index-item">#</td>
                <td class="p-0"><input type="text" class="form-control border-0" name='item_titulo[]' value='${data.titulo}'></td>
                <td class="p-0"><input type="number" min='0' class="update-item item-quantity form-control border-0" name='item_qtd[]' value='${data.qtd || 0}'></td>
                <td class="p-0"><input type="text" class="update-item item-value form-control border-0 money" name='item_valor_un[]' value='${utils.toMoney(valor_un)}'></td>
                <td class="p-0 total-item" data-valor="${total}">${utils.toMoney(total)}</td>
                <td class="p-0"><button type="button" class="btn"><i class="fa fa-times text-danger btn-remove-item" data-id="${data.id || ''}" data-index="${index}"></i></button></td>
            </tr>`

        $('#itens-wrap').append(content)
        page.atualizaIndexItem()
        page.atualizeTotalItens()
        $('.item-reset').val('')
        $('.money').maskMoney({decimal: ',', thousands: '.'})
    },
    atualizeTotalItens: function(){
        let total = 0
        $('.total-item').each((i, el)=>{
            total += parseFloat($(el).data('valor'))
        })
        $('#total-itens').html(utils.toMoney(total))
        $('#form-orc').find('[name=valor_total]').val(utils.toMoney(total))
    },
    atualizaIndexItem: function(){
        $('.index-item').each((i, el)=>{
            $(el).html(i + 1)
        })
    },
    geraIndex: function(index=1){
        index += $('.item').length
        if( $(`#item-${index}`).length > 0 ){
            return page.geraIndex(index)
        } else {
            return index;
        }
    },
    create: function(){
        utils.load.start()
        $.ajax({
            url: '/orcamentos/ajax/save',
            type: 'post',
            dataType: 'json',
            data: utils.serializeObject($('#form-orc')),
            success: (resp)=>{
                utils.load.stop()
                if(resp.status){
                    page.get(resp.data.id)
                    page.list()
                    utils.success({title: 'Salvo!'})
                }
            },
            error: (e)=>{
                utils.load.stop()
                console.error(e)
            }
        })
    },
    update: function(id){
        utils.load.start()
        $.ajax({
            url: '/orcamentos/ajax/update/'+id,
            type: 'post',
            dataType: 'json',
            data: utils.serializeObject($('#form-orc')),
            success: (resp)=>{
                utils.load.stop()
                if(resp.status){
                    page.get(id)
                    page.list()
                    utils.success({title: 'Salvo!'})
                }
            },
            error: (e)=>{
                utils.load.stop()
                console.error(e)
            }
        })
    },
    list: function(){
        utils.load.start()
        $.ajax({
            url: '/orcamentos/ajax/list',
            type: 'post',
            dataType: 'json',
            data: {
                conteudo: $('#search-conteudo').val(),
                inicio: $('#search-inicio').val(),
                status: $('#search-status').val(),
                pagamento: $('#search-pagamento').val(),
                prioridade: $('#search-prioridade').val(),
            },
            success: (resp)=>{
                utils.load.stop()
                let currentPage = $('.page-item.active a').data('dt-idx') ? $('.page-item.active a').data('dt-idx') : 1

                let infos = {
                    receber: 0,
                    recebido: 0,
                    pendentes: 0,
                }

                let content = ''
                for(const orc of resp.data){

                    //tr color
                    let trClass = ''
                    if(orc.pagamento == 'PG'){
                        trClass = 'success'
                    } else if (orc.prioridade == 1 && orc.status > 2 ){
                        trClass = 'warning'
                    } else if (orc.status == 1 && orc.pagamento == 'PD') {
                        trClass = 'danger'
                    }

                    //infos
                    if(orc.pagamento == 'PG'){
                        infos.recebido += parseFloat(orc.valor_total)
                    }
                    if( orc.status > 2 ){
                        infos.pendentes++
                    }
                    if( orc.status == 1 && orc.pagamento == 'PD' ){
                        infos.receber += parseFloat(orc.valor_total)
                    }

                    content += `
                            <tr class="hover btn-edit ${trClass}" data-id="${orc.id}">
                                <td>${orc.id}</td>
                                <td>${orc.nota_fiscal || '-'}</td>
                                <td>${orc.pedido || '-'}</td>
                                <td>${orc.solicitante || '-'}</td>
                                <td>${orc.area || '-'}</td>
                                <td>${utils.formartDate(orc.inicio) || '-'}</td>
                                <td>${utils.status[orc.status] || '-'}</td>
                                <td>${utils.toMoney(orc.valor_total) || '-'}</td>
                                <td>
                                    <button type="button" class="btn btn-sm btn-outline-danger flot-right btn-delete" data-id="${orc.id}"><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>`
                }
                $('#table-orc').DataTable().destroy()
                $('#orcs-wrap').html(content)
                const tableData = $('#table-orc').DataTable({
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
                    },
                    "pageLength": 50,
                    "order": [[0, 'desc']]
                })

                // console.log('currentPage ', currentPage)
                setTimeout(()=>{$(`.page-item a[data-dt-idx=${currentPage}]`).click()}, 100)
                //infos
                $('#receber').html(utils.toMoney(infos.receber))
                $('#recebido').html(utils.toMoney(infos.recebido))
                $('#pendentes').html(infos.pendentes)
            },
            error: (e)=>{
                utils.load.stop()
                console.error(e)
            }
        })
    },
    get: function(id){
        utils.load.start()
        $.ajax({
            url: '/orcamentos/ajax/get/'+id,
            type: 'post',
            dataType: 'json',
            success: (resp)=>{
                utils.load.stop()
                $('#itens-wrap').html('')
                page.setValueOrc(resp.data)
            },
            error: (e)=>{
                utils.load.stop()
                console.error(e)
            }
        })
    },
    setValueOrc: function(data){
        // console.log(data)
        const form = $('#form-orc')
        for(let i in data){
            const element = form.find(`[name=${i}]`)
            if((element).is('.money')){
                element.val(utils.toMoney(data[i]))
            } else {
                element.val(data[i] || '')
            }
        }

        for(const item of data.itens){
            const dataItem = {
                id: item.id,
                titulo: item.titulo,
                qtd: item.qtd,
                valor_un: item.valor_un
            }
            page.addItem(dataItem)
        }

        $('.form-pdf').each(function() {
            const formBtn = $(this)
            formBtn.attr('action', formBtn.attr('path')+'/'+data.id)
        }).css('display', 'initial')

        $('#orc-modal-title').html(`Orçamento ${data.id}`)
        $('#send-mail').css('display', 'initial')
        $('#modal-orc').modal('show')
    },
    delete: function(id){
        utils.load.start()
        $.ajax({
            url: '/orcamentos/ajax/delete/'+id,
            type: 'post',
            dataType: 'json',
            success: (resp)=>{
                utils.load.stop()
                page.resetForm()
                page.list()
                $('#modal-orc').modal('hide')
                utils.success({msg: 'Deletado'})
            },
            error: (e)=>{
                utils.load.stop()
                console.error(e)
            }
        })
    },
    removeItem: function(){
        const index = $(this).data('index')
        const id = $(this).data('id')

        if(id != null && id != ''){
            utils.load.start()
            $.ajax({
                url: '/orcamentos/ajax/delete-item/'+id,
                type: 'post',
                dataType: 'json',
                success: (resp)=>{
                    utils.load.stop()
                    $(`tr#item-${index}`).remove()
                    page.atualizaIndexItem()
                    page.atualizeTotalItens()

                },
                error: (e)=>{
                    utils.load.stop()
                    console.error(e)
                }
            })
        } else {
            $(`tr#item-${index}`).remove()
            page.atualizaIndexItem()
            page.atualizeTotalItens()
        }
    },
    setValuesMail: function(){
        const formOrc = $('#form-orc')
        const formMail = $('#form-mail')
        const id = formOrc.find('[name=id]').val()
        const email = formOrc.find('[name=email]').val().toLowerCase()
        formMail.find('[name=email]').val(email)
        formMail.find('[name=id_orc]').val(id)
        $('#modal-mail').modal('show')
    },
    sendMail: function(evt){
        evt.preventDefault()
        const formMail = $('#form-mail')
        const id_orc = formMail.find('[name=id_orc]').val()

        utils.load.start()
        $.ajax({
            url: '/orcamentos/ajax/send-mail/'+id_orc,
            type: 'post',
            dataType: 'json',
            data: {
                email: formMail.find('[name=email]').val(),
                message: formMail.find('[name=message]').val()
            },
            success: (resp)=>{
                utils.load.stop()
                if(resp.status){
                    formMail.find('[name=email]').val('')
                    formMail.find('[name=message]').val('')
                    formMail.find('[name=id_orc]').val('')
                    $('#modal-mail').modal('hide')
                    utils.success({title: 'Email enviado com sucesso!'})
                } else {
                    utils.setError({msg: resp.msg || 'Falha ao enviar email'})
                }
            },
            error: (e)=>{
                utils.load.stop()
                utils.setError({msg: e.responseText})
                console.error(e)
            }
        })
    },

    ddImgForm: () => {
        const box = $('#drop-box')
        // if (isAdvancedUpload) {
        //     form.addClass('has-advanced-upload');
        // }
        let isAdvancedUpload = function() {
            var div = document.createElement('div');
            return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
        }(),

            input = $('#file'),
            label = $('.box__filename'),
            showFiles = function(fileName = '') {
                let name = fileName
                let nameArr = fileName.split('.')
                fistName = nameArr.slice(0, nameArr.length-1).join('.')
                if (fistName.length > 19) {
                    name = fistName.replace(/(?<=^.{8}).*(?=.{8}?)/, '...') + '.' + nameArr.slice(nameArr.length-1)
                }
                label.text(name);
            };

        if (isAdvancedUpload) {
            var droppedFiles = false;

            box.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
            })
            .on('dragover dragenter', function() {
                box.addClass('is-dragover');
            })
            .on('dragleave dragend drop', function() {
                box.removeClass('is-dragover');
            })
            .on('drop', function(e) {
                droppedFiles = e.originalEvent.dataTransfer.files;
                showFiles( droppedFiles[0].name );
            });

            input.on('change', function(e) {
                showFiles(e.target.files[0].name);
            });
        }
    }
}


$(function(){
    page.bindEvents()
    page.list()
    // page.ddImgForm()
    $('.money').maskMoney({decimal: ',', thousands: '.'})
    $('.modal').css('orverflow', 'auto')
})
