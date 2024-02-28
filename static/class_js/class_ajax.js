class Ajax{
	tabla_personal(){
		$('#datatable_users').DataTable({
			"ajax":{
				"url": "/mostrar_personal_adm",
				"type": "POST",
				"dataSrc":""
			},
			"columns":[
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
                        return "<div><button class='btn btn-light btn-sm mr-1' onclick='ajax.mostrar_modal()'><i class='fa-solid fa-money-bill-1-wave'></i></button><button class='btn btn-light btn-sm' onclick='alert("+ row.id_cli +")'><i class='fa-solid fa-user-pen'></i></button></div>";
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
	mostrar_modal(){
        $.ajax({
			url: "/mos_modal1",
			type: "POST",
			success: function(result){
				// alert($("#exampleModal1").val());

				$("#exampleModal1").modal('show');
				// $('#empModal').modal('show');
			},
			error: function(error){
				console.log(error);
			}
	
		});
	}
	
}

let ajax = new Ajax();