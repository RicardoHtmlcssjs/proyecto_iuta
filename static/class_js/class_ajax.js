class Ajax{
	tabla_personal(url, type){
		$('#datatable_users').DataTable({
			"ajax":{
				"url": url,
				"type": type,
				"dataSrc":""
			},
			"columns":
			[
				{"data": "cedula"},
				{"data": "nombre"},
				{"data": "telefono"},
				{"data": "correo"},
				{"data": "fec_venci"},
				{
                    "data": null
                    ,
                    orderable: true,
                    className: 'text-center',
                    render: function(data, type, row, meta) {
                        return "<div  class='d-flex align-items-center'><p class='mr-2'>"+ row.status +"</p><p class='bg-"+row.color_status+"' style='width: 15px; height: 15px;'></p></div>";
                    }
                },
				{
                    "data": null
                    ,
                    orderable: true,
                    className: 'text-center',
                    render: function(data, type, row, meta) {
                        return "<div><button class='btn btn-light btn-sm mr-1' onclick='ajax.mostrar_modal_sn_para(`/mos_modal1`,`POST`,``, 0, acciones.agr_pag_cli("+row.id_cli+"))'><i class='fa-solid fa-money-bill-1-wave'></i></button><button class='btn btn-light btn-sm' onclick='ajax.mostrar_modal_sn_para(`/mos_modal_editar`,`POST`,``,1, acciones.modal_agregar_cliente())'><i class='fa-solid fa-user-pen'></i></button></div>";
                    }
                }
			],
			ordering: true,
			language: {
				lengthMenu: "Mostrar _MENU_ registros por pagina",
				zeroRecords: "Ningun usuario encontrado",
				info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
				infoEmpty: "Ningun usuario encontrado",
				infoFiltered: "(filtrados desde _MAX_ registros totales)",
				search: "Buscar...",
				loadingRecords: "Cargando...",
				paginate: {
					first: "Primero",
					last: "Ultimo",
					next: "Siguiente",
					previous: "Anterior"
				}
			}
		});
	}
	// llamar cual quier modal a mostrar
	mostrar_modal_sn_para(url, type, data, def, modal){
        $.ajax({
			url: url,
			type: type,
			data: data,
			success: function(result){
				if(def==1){
					$("#exampleModal1").html(modal);
					$('#mod_cuer').css('padding', '1rem');
					$("#id_tit_mod1").html("Editar usuario");
					$("#mes_pagar").css("display","none");
					$("#lb_mes_pagar").css("display","none");
					$("#mod_cli_usu").css("display","block");
					$("#agre_solicitar_exp").css("display", "none");
					// rep_nue_pag_cli(url, type, mes_pagar, id_cli)
					$("#exampleModal1").modal('show');
				}else{
					$("#exampleModal1").html(modal);
					$('#mod_cuer').css('padding', '1rem');
					$("#exampleModal1").modal('show');
				}
			},
			error: function(error){
				console.log(error);
			}
	
		});
	}
	// validar formulario del modal agregar cliente
	val_for_agre_cli(url, type, data){
        $.ajax({
			url: url,
			type: type,
			data: data,
			success: function(result){
				let array = ["error_nombre", "error_apellido", "error_cedula", "error_telefono", "error_correo"];
				let nv_array = [];

				if($("#nombre").val() === ""){
					$("#error_nombre").html(acciones.mos_men('danger', 'El campo nombre esta vacio'));
					nv_array = array.filter(arr => arr !== 'error_nombre');
					nv_array.forEach(element => {
						$(`#${element}`).html("");
					});
				}else if(acciones.exp_tex($("#nombre").val()) == true){
					$("#error_nombre").html(acciones.mos_men('danger', 'El campo nombre solo permite letras'));
					nv_array = array.filter(arr => arr !== 'error_nombre');
					nv_array.forEach(element => {
						$(`#${element}`).html("");
					});
				}else if($("#apellido").val() === ""){
					$("#error_apellido").html(acciones.mos_men('danger', 'El campo apellido esta vacio'));
					nv_array = array.filter(arr => arr !== 'error_apellido');
					nv_array.forEach(element => {
						$(`#${element}`).html("");
					});
				}else if(acciones.exp_tex($("#apellido").val()) == true){
					$("#error_nombre").html(acciones.mos_men('danger', 'El campo apellido solo permite letras'));
					nv_array = array.filter(arr => arr !== 'error_apellido');
					nv_array.forEach(element => {
						$(`#${element}`).html("");
					});
				}else if($("#cedula").val() === ""){
					$("#error_cedula").html(acciones.mos_men('danger', 'El campo cedula esta vacio'));
					nv_array = array.filter(arr => arr !== 'error_cedula');
					nv_array.forEach(element => {
						$(`#${element}`).html("");
					});
				}else if($("#telefono").val() === ""){
					$("#error_telefono").html(acciones.mos_men('danger', 'El campo telefono esta vacio'));
					nv_array = array.filter(arr => arr !== 'error_telefono');
					nv_array.forEach(element => {
						$(`#${element}`).html("");
					});
				}else if($("#correo").val() === ""){
					$("#error_correo").html(acciones.mos_men('danger', 'El campo correo esta vacio'));
					nv_array = array.filter(arr => arr !== 'error_correo');
					nv_array.forEach(element => {
						$(`#${element}`).html("");
					});
				}else if(acciones.exp_correo($("#correo").val()) == true){
					$("#error_correo").html(acciones.mos_men('danger', 'Correo invalido'));
					nv_array = array.filter(arr => arr !== 'error_correo');
					nv_array.forEach(element => {
						$(`#${element}`).html("");
					});
				}else{
					array.forEach(element => {
						$(`#${element}`).html("");
					});
					let nombre = $("#nombre").val();
					let apellido = $("#apellido").val();
					let cedula = $("#cedula").val();
					let telefono = $("#telefono").val();
					let correo = $("#correo").val();
					let mes_pagar = $("#mes_pagar").val();
					ajax.env_for_agre_cliente('/env_for_agre_cliente', 'POST', nombre, apellido, cedula, telefono,correo, mes_pagar);
				}
			},
			error: function(error){
				console.log(error);
			}
	
		});
	}
	// verificar y enviar datos ingresados al agregar clientes
	env_for_agre_cliente(url, type, nombre, apellido, cedula, telefono, correo, mes_pagar){
        $.ajax({
			url: url,
			type: type,
			data: {
				nombre, apellido, cedula, telefono, correo, mes_pagar
			},
			success: function(result){
				window.location.href = '/inicio';
			},
			error: function(error){
				console.log(error);
			}
		});
	}
	// reportar pago de inscripcio, al inscribirun cliente
	rep_nue_pag_cli(url, type, mes_pagar, id_cli){
		$.ajax({
			url: url,
			type: type,
			data: {
				mes_pagar, id_cli
			},
			success: function(result){
				window.location='/inicio';
				console.log("cliente agregado")
			},
			error: function(error){
				console.log(error);
			}
	
		});
	}
	// editar datos del usuario o cliente
	editar_usuario_cliente(url, type, id_cli){
		$.ajax({
			url: url,
			type: type,
			data: {
				id_cli
			},
			success: function(result){
				alert(result);
				// window.location='/inicio';
				// console.log("cliente agregado")
			},
			error: function(error){
				console.log(error);
			}
	
		});
	}
}

let ajax = new Ajax();