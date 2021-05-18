
$(document).ready(function () {
	
	$('#example-select-all').on('click', function(){
		if($(this).is(':checked')){
			$('.mov').prop('checked', true);
		}else{
			$('.mov').prop('checked', false);
		}
		
		calcular_total();
		/*
		var total = 0;
		$(".mov:checked").each(function (){
			var val_total = $(this).parent().parent().parent().find('.val_total').html();
			total += Number(val_total); 
		});
		$('#total').val(total);
		*/
	});
});


function validarMonAd(){

	var total = $('#total').val();
	var MonAd = $('#MonAd').val();
	
	total = parseFloat(total);
	MonAd = parseFloat(MonAd);
	/*
	if(MonAd > total){
		bootbox.alert("El monto ingresado no puede ser mayor al valor seleccionado");
		$('#MonAd').val(total)
		return false;
	}
	*/
}

function guardarValorizacion(){
    
    var msg = "";
    //var id_establecimiento = $('#id_establecimiento').val();
    //var id_servicio = $('#id_servicio').val();
	
	//if(dni_beneficiario == "")msg += "Debe ingresar el Numero de Documento <br>";
    //if(id_establecimiento=="")msg+="Debe seleccionar un Establecimiento<br>";
    //if(id_servicio=="")msg+="Debe ingresar un Servicio<br>";
	//if($('input[name=horario]').is(':checked')==false)msg+="Debe seleccionar un Turno<br>";
	/*
	if($('input[name=horario]').is(':checked')==true){
		var horario = $('input[name=horario]:checked').val();
		var data = horario.split("#");
		var fecha_cita = data[0];
		var id_medico = data[1];
	}
	*/

	/*
    if(msg!=""){
        bootbox.alert(msg); 
        return false;
    }
    else{
        fn_save();
	}
	*/
	fn_save();
}

function fn_save(){
    
    //var fecha_atencion_original = $('#fecha_atencion').val();
	//var id_user = $('#id_user').val();
    $.ajax({
			url: "/ingreso/send",
            type: "POST",
            //data : $("#frmCita").serialize()+"&id_medico="+id_medico+"&fecha_cita="+fecha_cita,
            data : $("#frmValorizacion").serialize(),
            success: function (result) {  
					cargarValorizacion();
					cargarPagos();
					//cargarDudoso();
                    /*$('#openOverlayOpc').modal('hide');
					$('#calendar').fullCalendar("refetchEvents");
					modalDelegar(fecha_atencion_original);*/
					//modalTurnos();
					//modalHistorial();
					//location.href="ver_cita/"+id_user+"/"+result;
            }
    });
}


function aperturar(accion){
	var id_caja_ingreso = $('#id_caja_ingreso').val();
    var id_caja = $('#id_caja').val();
	var saldo_inicial = $('#saldo_inicial').val();
	var total_recaudado = $('#total_recaudado').val();
	var saldo_total = $('#saldo_total').val();
	var estado = '1';
	var _token = $('#_token').val();
	
	var msg = "";
	
	if(id_caja == "0")msg += "Debe seleccionar una Caja disponible <br>";
	if(saldo_inicial == "")msg += "Debe ingresar el saldo inicial de caja <br>";

	if(msg!=""){
        bootbox.alert(msg);
        return false;
    }
	//alert(id_caja);return false;
    //var fecha_atencion_original = $('#fecha_atencion').val();
	//var id_user = $('#id_user').val();
    $.ajax({
			url: "/ingreso/sendCaja",
            type: "POST",
            //data : $("#frmCita").serialize()+"&id_medico="+id_medico+"&fecha_cita="+fecha_cita,
            data : {accion:accion,id_caja_ingreso:id_caja_ingreso,id_caja:id_caja,saldo_inicial:saldo_inicial,total_recaudado:total_recaudado,saldo_total:saldo_total,estado:estado,_token:_token},
            success: function (result) {  
					//cargarValorizacion();
					//cargarPagos();
					location.reload();
              
            }
    });
}

function calcular_total(obj){
	/*
	if(id_caja_usuario=="0"){
		bootbox.alert("Debe seleccionar una Caja disponible");
		$(obj).prop("checked",false);
		return false;
	}
	*/
	
	var total = 0;
	var descuento = 0;
	var valor_venta_bruto = 0;
	var valor_venta = 0;
	var igv = 0;
	var cantidad = $(".mov:checked").length;
	/*
	if(cantidad == 0)$('#tipo_factura').val("");
	var tipo_factura = $('#tipo_factura').val();
	var tipo_factura_actual = $(obj).parent().parent().parent().find('.tipo_factura').val();
	if(tipo_factura!="" && tipo_factura!=tipo_factura_actual){
		//bootbox.alert("La seleccion no pertence a los tipos de documento seleccionados");
		alert("La seleccion no pertence a los tipos de documento seleccionados");
		$(obj).prop("checked",false);
		return false;
	}
	*/
	$("#btnBoleta").prop('disabled', true);
    $("#btnFactura").prop('disabled', true);
	$("#btnTicket").prop('disabled', true).hide();
	
	var tipo_factura_actual="TK";
	
	if(tipo_factura_actual=="FT"){
		$("#btnBoleta").prop('disabled', false);
        $("#btnFactura").prop('disabled', false);
		$("#btnBoleta").show();
		$("#btnTicket").hide();
	}
	if(tipo_factura_actual=="TK"){
		$("#btnTicket").prop('disabled', false);
		$("#btnTicket").show();
		$("#btnBoleta").hide();
	}
	
	//alert(tipo_factura_actual);
	$(".mov:checked").each(function (){
		var val_total = $(this).parent().parent().parent().find('.val_total').html();
		var val_descuento = $(this).parent().parent().parent().find('.val_descuento').html();
		tipo_factura = $(this).parent().parent().parent().find('.tipo_factura').val();
		
		/*
		if(val_descuento!=""){
			valor_venta_bruto = val_total/1.18;
			descuento = (val_total*val_descuento/100)/1.18;
			valor_venta = valor_venta_bruto - descuento;
			igv = valor_venta*0.18;
			total += igv + valor_venta_bruto - descuento;	
		}else{
			total += Number(val_total);
		}
		*/
		total += Number(val_total);

	});
	
	$('#tipo_factura').val(tipo_factura);
	//total -= descuento;
	$('#total').val(total.toFixed(2));
	if(cantidad > 1){
		$('#MonAd').attr("readonly",true);
		$('#MonAd').val("0");
	}else{
		$('#MonAd').attr("readonly",false);
		$('#MonAd').val(total.toFixed(2));
	}
	
}

function calcular_dudoso(obj){
	
	if(id_caja_usuario=="0"){
		bootbox.alert("Debe seleccionar una Caja disponible");
		$(obj).prop("checked",false);
		return false;
	}
	
	var total = 0;
	var descuento = 0;
	var valor_venta_bruto = 0;
	var valor_venta = 0;
	var igv = 0;
	
	var cantidad = $(".mov_dudoso:checked").length;
	
	$(".mov_dudoso:checked").each(function (){
		var val_total = $(this).parent().parent().parent().find('.val_total_dudoso').html();
		var val_descuento = $(this).parent().parent().parent().find('.val_descuento_dudoso').html();
		
		if(val_descuento!=""){
			valor_venta_bruto = val_total/1.18;
			descuento = (val_total*val_descuento/100)/1.18;
			valor_venta = valor_venta_bruto - descuento;
			igv = valor_venta*0.18;
			total += igv + valor_venta_bruto - descuento;	
		}else{
			total += Number(val_total);
		}

	});
	
	$('#total_dudoso').val(total.toFixed(2));
	
}

function validaTipoDocumento(){
	var tipo_documento = $("#tipo_documento").val();
	$('#nombre_afiliado').val("");
	$('#empresa_afiliado').val("");
	$('#empresa_direccion').val("");
	$('#empresa_representante').val("");
	$('#codigo_afiliado').val("");	
	$('#fecha_afiliado').val("");
	
	$("#btnBoleta").prop('disabled', true);
    $("#btnFactura").prop('disabled', true);
	$("#btnTicket").prop('disabled', true).hide();
	
	if(tipo_documento == "RUC"){
		$('#divNombreApellido').hide();
		$('#divCodigoAfliado').hide();
		$('#divFechaAfliado').hide();
		$('#divDireccionEmpresa').show();
		$('#divRepresentanteEmpresa').show();
	}else{
		$('#divNombreApellido').show();
		$('#divCodigoAfliado').show();
		$('#divFechaAfliado').show();
		$('#divDireccionEmpresa').hide();
		$('#divRepresentanteEmpresa').hide();
	}
	
	obtenerBeneficiario();
}

function obtenerBeneficiario(){
		
	var tipo_documento = $("#tipo_documento").val();
	var numero_documento = $("#numero_documento").val();
	var msg = "";
	
	if (msg != "") {
		bootbox.alert(msg);
		return false;
	}
	
	$('#empresa_id').val("");
	$('#persona_id').val("");

	$.ajax({
		url: '/persona/obtener_persona/' + tipo_documento + '/' + numero_documento,
		dataType: "json",
		success: function(result){
			//alert(result.afiliado.id);
			var persona = result.persona;
			var nombre = persona.apellido_paterno+" "+persona.apellido_materno+", "+persona.nombres;
			
			//$('#nombres').val(nombre);
			//$('#telefono').val(persona.telefono);
			//$('#email').val(persona.email);
			
			if(tipo_documento == "RUC"){
				//$('#empresa_afiliado').val(result.afiliado.razon_social);
				//$('#empresa_direccion').val(result.afiliado.direccion);
				//$('#empresa_representante').val(result.afiliado.representante);
				//$('#empresa_id').val(result.afiliado.id);
				//$('#id_ubicacion').val(result.afiliado.id_ubicacion);
			}else{
				$('#nombre_afiliado').val(nombre);
				$('#codigo_afiliado').val(persona.codigo);	
				//$('#empresa_afiliado').val(persona.ocupacion);
				//$('#fecha_afiliado').val(result.afiliado.fecha_inicio);
				$('#persona_id').val(persona.id);
				//$('#id_ubicacion').val(result.afiliado.id_ubicacion);
			}

			cargarValorizacion();
			cargarPagos();
			//cargarDudoso();
			
		}
		
	});
	
}


function cargarValorizacion(){
    
    
	//var numero_documento = $("#numero_documento").val();
	var tipo_documento = $("#tipo_documento").val();
	var persona_id = 0;
	if(tipo_documento=="RUC")persona_id = $('#empresa_id').val();
	else persona_id = $('#persona_id').val();

    $("#tblValorizacion tbody").html("");
	$.ajax({
			url: "/cronograma/obtener_cronograma/"+tipo_documento+"/"+persona_id,
			type: "GET",
			success: function (result) {  
					$("#tblValorizacion tbody").html(result);
			}
	});

}


function cargarPagos(){
    
    
	//var numero_documento = $("#numero_documento").val();
	var tipo_documento = $("#tipo_documento").val();
	var persona_id = 0;
	if(tipo_documento=="RUC")persona_id = $('#empresa_id').val();
	else persona_id = $('#persona_id').val();
	
	$('#tblPago').dataTable().fnDestroy();
    $("#tblPago tbody").html("");
	$.ajax({
			url: "/cronograma/obtener_pago/"+tipo_documento+"/"+persona_id,
			type: "GET",
			success: function (result) {  
					$("#tblPago").html(result);
					$('[data-toggle="tooltip"]').tooltip();
					
					$('#tblPago').DataTable({
						//"sPaginationType": "full_numbers",
						//"paging":false,
						"searching": false,
						"info": false,
						"bSort" : false,
						"dom": '<"top">rt<"bottom"flpi><"clear">',
						"language": {"url": "/js/Spanish.json"},
					});
							
			}
	});

}

function cargarDudoso(){
    
	var tipo_documento = $("#tipo_documento").val();
	var persona_id = 0;
	if(tipo_documento=="RUC")persona_id = $('#empresa_id').val();
	else persona_id = $('#persona_id').val();

    $("#tblDudoso tbody").html("");
	$.ajax({
			url: "/ingreso/obtener_dudoso/"+tipo_documento+"/"+persona_id,
			type: "GET",
			success: function (result) {  
					$("#tblDudoso tbody").html(result);
			}
	});


}



function enviarTipo(tipo){
	if(tipo == 1)$('#TipoF').val("FTFT");
	if(tipo == 2)$('#TipoF').val("BVBV");
	if(tipo == 3)$('#TipoF').val("TKTK");
	validar();
}

function validar() {
	
	var msg = "";
	var sw = true;
	
	var MonAd = $('#MonAd').val();
	var total = $('#total').val();
	
	var tipo_documento = $('#tipo_documento').val();
    var persona_id = $('#persona_id').val();
	var empresa_id = $('#empresa_id').val();
	var mov = $('.mov:checked').length;
	
	if(tipo_documento != "RUC" && persona_id == "")msg += "Debe ingresar el Numero de Documento <br>";
	if(tipo_documento == "RUC" && empresa_id == "")msg += "Debe ingresar el Numero de Documento <br>";
	if(mov=="0")msg+="Debe seleccionar minimo un Concepto del Estado de Cuenta <br>";
	
	if(msg!=""){
		bootbox.alert(msg);
		//return false;
	} else {
		//submitFrm();
		document.frmValorizacion.submit();
	}
	return false;
}


function modalLiquidacion(id){
	
	$(".modal-dialog").css("width","80%");
	$('#openOverlayOpc').modal('show');
	$('#openOverlayOpc .modal-body').css('height', 'auto');

	$.ajax({
			url: "/ingreso/modal_liquidacion/"+id,
			type: "GET",
			success: function (result) {  
					$("#diveditpregOpc").html(result);
			}
	});

}


function modalValorizacionFactura(id){
	
	$(".modal-dialog").css("width","80%");
	$('#openOverlayOpc').modal('show');
	$('#openOverlayOpc .modal-body').css('height', 'auto');

	$.ajax({
			url: "/cronograma/modal_cronograma_factura/"+id,
			type: "GET",
			success: function (result) {  
					$("#diveditpregOpc").html(result);
			}
	});

}



function guardarEstado(estado){
    
    var msg = "";
    //var id_establecimiento = $('#id_establecimiento').val();
    //var id_servicio = $('#id_servicio').val();
	
	//if(dni_beneficiario == "")msg += "Debe ingresar el Numero de Documento <br>";
    //if(id_establecimiento=="")msg+="Debe seleccionar un Establecimiento<br>";
    //if(id_servicio=="")msg+="Debe ingresar un Servicio<br>";
	//if($('input[name=horario]').is(':checked')==false)msg+="Debe seleccionar un Turno<br>";
	/*
	if($('input[name=horario]').is(':checked')==true){
		var horario = $('input[name=horario]:checked').val();
		var data = horario.split("#");
		var fecha_cita = data[0];
		var id_medico = data[1];
	}
	*/

	/*
    if(msg!=""){
        bootbox.alert(msg); 
        return false;
    }
    else{
        fn_save();
	}
	*/
	fn_save_estado(estado);
}

function fn_save_estado(estado){
    
    $.ajax({
			url: "/ingreso/send_estado",
            type: "POST",
            data : $("#frmValorizacion").serialize()+"&estado="+estado,
            success: function (result) {  
					cargarValorizacion();
					cargarPagos();
					//cargarDudoso();
            }
    });
}


