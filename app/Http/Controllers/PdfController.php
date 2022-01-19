<?php

namespace App\Http\Controllers;

use App\Models\Orcamento;
use App\Services\ParametrosService;
use Illuminate\Http\Request;
use PDF;

class PdfController extends Controller
{
    public function __construct()
    {
        setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
        date_default_timezone_set('America/Sao_Paulo');
    }
    public function generatePdf(Orcamento $orcamento){
        // return view('archives.pdf-orcamento', ['orc' => $orcamento]);

        $parametrosService = new ParametrosService;
        $parametros = $parametrosService->formatParams();

        $orcamento->itens;
        $pdf = PDF::loadView('archives.pdf-orcamento', ['orc' => $orcamento, 'params' => $parametros]);
        return $pdf->stream( 'Orçamento - ' .$orcamento->responsavel . ' - ' . $orcamento->solicitante . '.pdf');
    }
}
