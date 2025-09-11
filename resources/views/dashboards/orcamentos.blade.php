@extends('adminlte::page')

@section('content')
    <style>
        .btn-delete {
            z-index: 9999;
        }

        .box__file {
            display: none;
        }
        .box {
            /* background-color: white; */
            /* outline-offset: -10px; */
            padding: .5rem;
            outline: 2px dashed lightgrey;
            border-radius: .4rem;
            height: 8rem;
            width: 8rem;
            line-height: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .box:hover {
            cursor: pointer;
        }
        /* .box.has-advanced-upload .box__dragndrop {
            display: inline;
        } */
        .box.is-dragover {
            background-color: grey;
        }
        .box__filename {
            word-break: break-word;
        }
    </style>
    <h2 class="page-title">Orçamentos</h2>
    <!-- <form> -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <form id="form-search">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="search-pagamento">Pagamento</label>
                                        <select id="search-pagamento" class="form-control search-reset">
                                            <option value="">Todos</option>
                                            <option value="PG">Pago</option>
                                            <option value="PD" selected>Pendente</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="search-status">Status</label>
                                        <select  id="search-status" class="form-control">
                                            <option value="" selected>Todos</option>
                                            <option value="5">Não Iniciado</option>
                                            <option value="4">Aguardando Aprovação</option>
                                            <option value="3">Em Andamento</option>
                                            <option value="2">Concluído</option>
                                            <option value="1">Entregue</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="search-prioridade">Prioridade</label>
                                        <select  id="search-prioridade" class="form-control">
                                            <option value="" selected>Todos</option>
                                            <option value="1">Alta</option>
                                            <option value="2">Média</option>
                                            <option value="3">Baixa</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="search-inicio">Data de Início</label>
                                        <input  type="date" id="search-inicio" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="search-conteudo">Conteúdo</label>
                                        <input id="search-conteudo" class="form-control">
                                    </div>
                                </div>
                                <div class="col-12"><hr class="sep-dot"></div>
                                <div class="col-md-4">
                                    <button type="submit" form="form-search" id="btn-search" class="btn btn-outline-primary"><i class="fa fa-search"></i> Buscar</button>
                                    <button type="button" id="btn-clean-seach" class="btn btn-outline-danger"><i class="fa fa-times"></i> Limpar</button>
                                </div>
                                <div class="col-md-6">
                                    <div class="badge badge-danger">Pendentes: <span id="pendentes"></span></div>
                                    <div class="badge badge-success">Recebido: <span id="recebido"></span></div>
                                    <div class="badge badge-warning">A Receber: <span id="receber"></span></div>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" id="open-modal-orc" class="btn btn-outline-success float-right"><i class="fa fa-plus"></i> Novo</button>
                                </div>
                                <div class="col-12"><hr class="sep-dot"></div>
                            </div>
                        </form>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table id="table-orc" class="table table-sm  table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nota</th>
                                                <th>Pedido</th>
                                                <th>Solicitante</th>
                                                <th>Área</th>
                                                <th>Início</th>
                                                <th>Status</th>
                                                <th>Valor</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="orcs-wrap"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    <!-- </form> -->


    <div class="modal fade" aria-modal="true" id="modal-orc">
        <div class="modal-dialog modal-dialog-scrollable modal-xxl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="orc-modal-title"></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form-add-item" name="form-add-item"></form>
                    <form id="form-orc">
                        <input type="hidden" name="id">
                        <div class="row">

                            <!-- ROW -->
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="responsavel">Responsável</label>
                                    <input type="text" class="form-control" name="responsavel">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="inicio">Início</label>
                                    <input type="date" class="form-control" name="inicio">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="previsao">Previsão</label>
                                    <input type="text" class="form-control" name="previsao">
                                </div>
                            </div>

                            <!-- ROW -->
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="solicitante">Solicitante</label>
                                    <input type="text" class="form-control" name="solicitante">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="area">Área</label>
                                    <input type="text" class="form-control" name="area">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="prioridade">Prioridade</label>
                                    <select class="form-control" name="prioridade">
                                        <option value="1">Alta</option>
                                        <option value="2" selected>Média</option>
                                        <option value="3">Baixa</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="status">Status</label>
                                    <select class="form-control" name="status">
                                        <option value="5" selected>Não Iniciado</option>
                                        <option value="4">Aguardando Aprovação</option>
                                        <option value="3">Em Andamento</option>
                                        <option value="2">Concluído</option>
                                        <option value="1">Entregue</option>
                                    </select>
                                </div>
                            </div>

                            <!-- ROW -->
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" class="form-control" name="email">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="pedido">Pedido</label>
                                    <input type="text" class="form-control" name="pedido">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nota_fiscal">Nota Fiscal</label>
                                    <input type="text" class="form-control" name="nota_fiscal">
                                </div>
                            </div>

                            <!-- ROW -->
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="telefone">Telefone</label>
                                    <input type="text" class="form-control" name="telefone">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="valor_total">Valor Total</label>
                                    <input type="text" class="form-control money" name="valor_total">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="pagamento">Pagamento</label>
                                    <select class="form-control" name="pagamento">
                                        <option value="PD" selected>Pendente</option>
                                        <option value="PG">Pago</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 bg-light">
                                <div class="row" style="gap: 1rem">
                                    <h3>Itens</h3>
                                    <button type="button" class="btn btn-outline-primary" id="btn-import-items">Importar</button>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Item</th>
                                                <th style="width: 10em;">Qtd.</th>
                                                <th style="width: 10em;">Valor Un.</th>
                                                <th>Total <span id="total-itens"></span></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="itens-wrap">
                                        </tbody>
                                        <tfooter class="bg-light">
                                            <tr>
                                                <td></td>
                                                <td><input form="form-add-item" type="text" id="new-item-item" class="form-control item-reset"></td>
                                                <td><input form="form-add-item" type="number" id="new-item-qtd" class="form-control item-reset"></td>
                                                <td><input form="form-add-item" type="text" id="new-item-valor-un" class="form-control money item-reset"></td>
                                                <td></td>
                                                <td class="p-0"><button type="submit" class="btn" form="form-add-item"><i class="fa fa-plus text-primary"></i></button></td>
                                            </tr>
                                        </tfooter>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <!-- <div class="row mt-2 mb-2">
                            <div class="col-md-12">
                                <label>Imagens</label>
                                <div class="row ml-2 mr-2">
                                    <input class="box__file" type="file" name="file" id="file"/>
                                    <label id="drop-box" class="box" for="file">
                                        <small>
                                            <strong class="box__choose">Escolha um arquivo</strong><br>
                                            <span class="box__dragndrop"> ou solte aqui</span>.
                                        </small>
                                        <small class="box__filename"></small>
                                    </label>
                                </div>
                            </div>
                        </div> -->

                        <div class="row">
                            <div class="col-12">
                                <label for="obs">Observações</label>
                                <textarea name="obs" class="form-control"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="row w-100">
                        <div class="col-md-6 text-left">
                            <form path="/orcamentos/pdf-orcamento" id="form-pdf" class="form-pdf" method="post" target="_blank">
                                <button type="submit" class="btn btn-outline-secondary"><i class="far fa-file-pdf"></i> Gerar PDF</button>
                            </form>
                            <form path="/orcamentos/pdf-ordemservico" id="form-pdf" class="form-pdf" method="post" target="_blank">
                                <button type="submit" class="btn btn-outline-secondary"><i class="far fa-file-pdf"></i> Ordem de Serviço</button>
                            </form>
                            <button type="button" class="btn btn-outline-primary" id="send-mail" style="display: none;"><i class="far fa-envelope"></i> Enviar Email</button>
                        </div>
                        
                        <div class="col-md-6 text-right">
                            <button  type="button" class="btn btn-outline-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" form="form-orc" class="btn btn-outline-success"><i class="far fa-check-circle"></i> Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL MAIL -->
    <div class="modal fade" class="modal-md" aria-modal="true" id="modal-mail">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Enviar Email</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form-mail">
                        <input type="hidden" name="id_orc">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" name="email" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea name="message" class="form-control" placeholder="Mensagem"></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="row w-100">
                        <div class="col-md-12 text-right">
                            <button  type="button" class="btn btn-outline-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" form="form-mail" class="btn btn-outline-primary"><i class="far fa-paper-plane"></i> Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL IMPORT -->
    <div class="modal fade" class="modal-md" aria-modal="true" id="modal-import">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Importar Itens</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="form-import">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="file-import">Selecionar arquivo</label>
                                    <input type="file" id="file-import" name="file-import" class="form-control">
                                </div>
                            </div>
                            <div class="col-12 text-center">
                                <span>Ou</span>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="json-import">Colar JSON</label>
                                    <textarea name="json-import" class="form-control" id="json-import"></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Fechar</button>
                    <button type="submit" form="form-import" class="btn btn-outline-primary">Importar</button>
                </div>
            </div>
        </div>
    </div>
@stop

@section('js')
<script src="{{ @mix('/js/dashboards/orcamentos.js') }}"></script>
@stop
