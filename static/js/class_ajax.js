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
				{"data": "fecha"},
				// {"data": "status"}
				{
                    "data": null
                    ,
                    orderable: true,
                    className: 'text-center',
                    render: function(data, type, row, meta) {
                        console.log()
                        
                        return "<div  class='d-flex align-items-center'><p class='mr-2'>"+ row.status +"</p><p class='bg-"+row.color_status+"' style='width: 15px; height: 15px;'></p></div>";
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
}

let administrador = new Ajax();