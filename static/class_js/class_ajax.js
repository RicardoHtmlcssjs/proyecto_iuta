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
                        return "<div><button class='btn btn-light btn-sm mr-1' onclick='ajax.mostrar_modal_sn_para(`/mos_modal1`,`POST`,``,1,``)'><i class='fa-solid fa-money-bill-1-wave'></i></button><button class='btn btn-light btn-sm' onclick='alert("+ row.id_cli +")'><i class='fa-solid fa-user-pen'></i></button></div>";
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
	// mostrar modal
	mostrar_modal_sn_para(url, type, data, def, modal){
        $.ajax({
			url: url,
			type: type,
			data: data,
			success: function(result){
				if(def==1){
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
				}
			},
			error: function(error){
				console.log(error);
			}
	
		});
	}
	
}

let ajax = new Ajax();