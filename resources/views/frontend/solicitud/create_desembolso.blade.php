<!--<link rel="stylesheet" href="<?php //echo URL::to('/') ?>/bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">-->
<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" defer></script>

<script src="<?php echo URL::to('/') ?>/dist/js/AjaxUpload.2.0.min.js"></script>

<style type="text/css">
body {
    background-color: #bdc3c7;
}

.table-fixed {
    width: 100%;
    background-color: #f3f3f3;
}

.table-fixed tbody {
    height: 200px;
    overflow-y: auto;
    width: 100%;
}

.table-fixed thead,
.table-fixed tbody,
.table-fixed tr,
.table-fixed td,
.table-fixed th {
    display: block;
}

.table-fixed tbody td {
    float: left;
}

.table-fixed thead tr th {
    float: left;
    background-color: #f39c12;
    border-color: #e67e22;
}

/* Begin - Overriding styles for this page */
.card-body {
    padding: 0 1.25rem !important;
}

.form-control-sm {
    line-height: 1.1 !important;
    margin: 0 !important;
}

.form-group {
    margin-bottom: 0.5rem !important;
}

.breadcrumb {
    padding: 0.2rem 2rem !important;
    margin-bottom: 0 !important;
}

.card-header {
    padding: 0.2rem 1.25rem !important;
}

.pesajeIngreso {
    line-height: 2.8;
}

.fecha_ingreso_salida {
    color: blue;
    font-size: 14px;
    font-style: italic;
	float:left
}

br {
    line-height: 30px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

ul.ui-autocomplete {
    z-index: 1100;
}

.btn-xsm {
    font-size: 11px !important;
}

/* End - Overriding styles for this page */
/*********************************************************/
.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 0px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.no {padding-right:3px;padding-left:0px;display:block;width:20px;float:left;font-size:11px;text-align:right;padding-top:5px}
.si {padding-right:0px;padding-left:3px;display:block;width:20px;float:left;font-size:11px;text-align:left;padding-top:5px}

.flotante {
    display:inline;
        position:fixed;
        bottom:0px;
        right:0px;
		z-index:1000
}
.flotanteC {
    display:inline;
        position:fixed;
        bottom:65px;
        right:0px;
}

label.form-control-sm{
	padding-left:0px!important;
	padding-right:0px;
	padding-top:5px!important;
	height:25px!important;
	/*line-height:10px!important*/
}

</style>

@stack('before-scripts')
@stack('after-scripts')

@extends('frontend.layouts.app')

@section('title', app_name() . ' | ' . __('labels.frontend.afiliacion.box_title'))

@section('breadcrumb')
<ol class="breadcrumb" style="padding-left:130px;margin-top:0px;background-color:#283659">
    <li class="breadcrumb-item text-primary">Inicio</li>
    <li class="breadcrumb-item active">Registro de Desembolso</li>
    </li>
</ol>
@endsection

@section('content')
<!--
    <ol class="breadcrumb" style="padding-left:120px;margin-top:0px;background-color:#355C9D">
        <li class="breadcrumb-item text-primary">Inicio</li>
            <li class="breadcrumb-item active">Nueva Asistencia</li>
        </li>
    </ol>
    -->

<div class="justify-content-center">
    <!--<div class="container-fluid">-->

    <div class="card">

        <div class="card-body">

            <form class="form-horizontal" method="post" action="{{ route('frontend.solicitud.create')}}" id="frmSolicitud" autocomplete="off">
				
                <div class="row justify-content-center" style="margin-top:15px">

                    <div class="col col-sm-12 align-self-center">


                        <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}">

                        <input type="hidden" name="id_solicitud" id="id_solicitud" value="0">
                        
					<div class="row">

						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

						<div class="card">
						
						<div class="card-header">
							<strong>Lista de Solicitudes</strong>
						</div>
						
						<div class="row" style="padding:10px 20px 10px 20px;">
					
							<div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
								<input class="form-control form-control-sm" id="numero_documento_buscar" name="numero_documento_buscar" placeholder="Doc. Identidad">
							</div>
							
							<div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
								<input class="form-control form-control-sm" id="nombre_buscar" name="nombre_buscar" placeholder="Nombre">
							</div>
							
							<div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
								<input class="form-control form-control-sm" id="fecha_desde" name="fecha_desde" placeholder="Fecha Desde">
							</div>
							
							<div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
								<input class="form-control form-control-sm" id="fecha_hasta" name="fecha_hasta" placeholder="Fecha Hasta">
							</div>
							
							<div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
								<select name="id_estado" id="id_estado" class="form-control form-control-sm" onchange="">
									<option value="3,5">Todos</option>
									<option value="3">APROBADO</option>
									<option value="5">DESEMBOLSADO</option>
								</select>
							</div>
							
							<div class="col-lg-1 col-md-1 col-sm-12 col-xs-12">
								<input class="btn btn-warning btn-sm pull-rigth" value="Buscar" type="button" id="btnBuscar" />
							</div>
							
						</div>
						
						<div class="card-body">
							
							<div class="table-responsive">
							<table id="tblSolicitud" class="table table-hover table-sm">
							<thead>
							<tr style="font-size:13px">
								<th>Id</th>
								<th>Fecha</th>
								<th>Num Documento</th>
								<th>Nombre</th>
								<!--<th>Origen</th>-->
								<th>Tipo</th>
								<th>Años</th>
								<th>Periodo</th>
								<th>Cuotas</th>
								<th>Monto Solicitado</th>
								<th>Monto Valorizado</th>
								<th>Monto Aprobado</th>
								<th>Estado</th>
							</tr>
							</thead>
							<tbody style="font-size:13px">
							</tbody>
							</table>
							
							</div>
						</div>
						
						
						<!--
                        <div id="" class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">


                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                <br>

                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            </div>

                        </div>
						-->
                    </div>
					
					
					<div class="row" style="padding-top:15px">

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div id="" class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                        <div class="card">
                                            <div class="card-header">
                                                <div id="" class="row">
                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <strong>
                                                            Datos del Desembolso
                                                        </strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="divDesembolso" class="card-body" style="margin-top:15px;margin-bottom:15px">
											
												

                                            </div>
                                            <!--card-body-->
                                        </div>
                                        <!--card-->
                                    </div>
									
									<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                        
                                        <div class="card">
                                            <div class="card-header">
                                                <strong>
                                                    Cronograma
                                                </strong>
                                            </div>

                                            <div class="card-body">
												
                                                <div class="table-responsive overflow-auto" style="max-height: 500px;padding-top:20px">
                                                    <table id="tblCronograma" class="table table-hover table-sm">
                                                        <thead>
                                                            <tr style="font-size:13px">
                                                                <th width="15%">Num Cuota</th>
																<th width="15%">Fecha Pago</th>
                                                                <th width="15%">Cuota Pagar</th>
																<th width="10%">Interes</th>
																<th width="20%" style="margin-left:0px!important;margin-right:0px!important">Capital Amortizado</th>
																<th width="15%">Capital Vivo</th>
																<!--<th width="5%"></th>-->
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                        </tbody>
                                                    </table>
                                                </div>
												
												<!--<a class='flotante' name="guardar" id="guardar" onclick="guardarSolicitud()" href='#' ><img src='/img/btn_save.png' border="0"/></a>-->
												

                                            </div>
                                        </div>
                                    </div>
									
                                </div>

                                <br>



                                <div id="" class="row">
                                    
                                    
                                </div>


                            </div>
                        </div>
						
						

                </div>



        </div>
        <!--col-->

        </form>

        

    </div>
    <!--row-->
    @endsection

	<div id="openOverlayOpc" class="modal fade" role="dialog">
	  <div class="modal-dialog" >
	
		<div id="id_content_OverlayoneOpc" class="modal-content" style="padding: 0px;margin: 0px">
		
		  <div class="modal-body" style="padding: 0px;margin: 0px">
	
				<div id="diveditpregOpc"></div>
	
		  </div>
		
		</div>
	
	  </div>
		
	</div>

    @push('after-scripts')
    {!! script(asset('js/desembolso.js')) !!}
	<script type="text/javascript">
	var url = "<?php echo URL::to('/') ?>";
	var valorizador = false;
	@hasanyrole('valorizador')
	var valorizador = true;
	@endhasanyrole
	
	var aprobador = false;
	@hasanyrole('aprobador')
	var aprobador = true;
	@endhasanyrole
	</script>
    @endpush