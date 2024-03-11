class Acciones{
    // modal de agregar cliente
    modal_agregar_cliente(){
       let modal="";
       modal+="<div class='modal-dialog modal1' id='mod1'>";
        modal+="<div class='modal-content' id='mod_cuer'>";
        modal+="<div class'modal-header'>";
       modal+="<button type='button' class='btn btn-close bg-danger btn_cerrar_mod1 text-white'"; 
       modal+="data-bs-dismiss='modal' aria-label='Close'>x</button>";
       modal+="</div>";
       modal+="<div class='modal-body'>";
       modal+="<h2 class='text-center' id='id_tit_mod1'>Agregar cliente</h2>";
       modal+="<form action=''>";
       modal+="<div class='mb-3'>";
        modal+="<label for='nombre' class='form-label'>Nombre:</label>";
        modal+="<input type='text'class='form-control'  id='nombre' name='nombre' autocomplete='off' maxlength='30'>";
        modal+="</div>";
        modal+="<div class='' id='error_nombre' name='error_nombre'></div>";
        modal+="<div class='mb-3'>";
        modal+="<label for='apellido' class='form-label'>Apellido:</label>";
        modal+="<input type='text'class='form-control'  id='apellido' name='apellido' autocomplete='off' maxlength='30'>";
        modal+="</div>";
        modal+="<div class='' id='error_apellido' name='error_apellido'></div>";
        modal+="<div class='mb-3'>";
        modal+="<label for='cedula' class='form-label'>Cedula:</label>";
        modal+="<input type='number'class='form-control'  id='cedula' name='cedula' autocomplete='off' maxlength='10'>";
        modal+="</div>";
        modal+="<div class='' id='error_cedula' name='error_cedula'></div>";
        modal+="<div class='mb-3'>";
        modal+="<label for='telefono' class='form-label'>Telefono:</label>";
        modal+="<input type='number'class='form-control'  id='telefono' name='telefono' autocomplete='off' maxlength='11'>";
        modal+="</div>";
        modal+="<div class='' id='error_telefono' name='error_telefono'></div>";
        modal+="<div class='mb-3'>";
        modal+=`<label for="correo" class="form-label">Correo:</label>`;
        modal+=`<input type="email" class="form-control"  id="correo" name="correo" autocomplete='off' maxlength='40'>`;
        modal+="</div>";
        modal+="<div class='' id='error_correo' name='error_correo'></div>";
        modal+="<div class='mb-3'>";
        modal+=`<label for="usuario" class="form-label" id="lb_usuario" name="lb_usuario" style="display: none;">Usuario:</label>`;
        modal+=`<input type="text" class="form-control"  id="usuario" name="usuario" autocomplete='off' maxlength='40' style="display: none;">`;
        modal+=`<input type="text" class="form-control"  id="id_cli" name="id_cli" autocomplete='off' maxlength='40' style="display: none;">`;
        modal+="</div>";
        modal+="<div class='' id='error_usuario' name='error_usuario'></div>";
        modal+=`<div class="mb-3">`;
        modal+=`<label for="mes_pagar" class="form-label" id="lb_mes_pagar" name="lb_mes_pagar">Meses a pagar:</label>`;
        modal+=`<select class="form-control" id='mes_pagar' name='mes_pagar' aria-label="Default select example">`;
        modal+=`<option value="1">1</option>`;
        modal+=`<option value="2">2</option>`;
        modal+=`<option value="3">3</option>`;
        modal+=`<option value="4">4</option>`;
        modal+=`<option value="5">5</option>`;
        modal+=`<option value="6">6</option>`;
        modal+=`<option value="7">7</option>`;
        modal+=`<option value="8">8</option>`;
        modal+=`<option value="9">9</option>`;
        modal+=`<option value="10">10</option>`;
        modal+=`<option value="11">11</option>`;
        modal+=`<option value="12">12</option>`;
        modal+=`</select>`;
        modal+="</div>";
        modal+=`<div class="modal-footer justify-content-center">`;
        modal+=`<button type="button" class="btn btn-danger"  id="agre_solicitar_exp" name="agre_solicitar_exp" onclick="ajax.val_for_agre_cli('/validar_cam_agre_cliente', 'POST', '')">Guardar</button>`;
        modal+=`<button type="button" class="btn btn-danger"  id="mod_cli_usu" name="mod_cli_usu" onclick="acciones.obt_val_edi_cli()" style="display: none;">Guardar</button>`;
        modal+="</div>";
        modal+=`<div class="mb-2" id="error_soli_exp1"></div>`;
        modal+="</form>";
        modal+="</div>";
        modal+="</div>";
        modal+="</div>";
        return modal;
    }
    // modal agregar pago cliente
    agr_pag_cli(id_usu_cli){
        let modal="";
       modal+="<div class='modal-dialog modal1' id='mod1'>";
        modal+="<div class='modal-content' id='mod_cuer'>";
        modal+="<div class'modal-header'>";
       modal+="<button type='button' class='btn btn-close bg-danger btn_cerrar_mod1 text-white'"; 
       modal+="data-bs-dismiss='modal' aria-label='Close'>x</button>";
       modal+="</div>";
       modal+="<div class='modal-body'>";
       modal+="<h2 class='text-center' id='id_tit_mod1'>Reportar pago</h2>";
       modal+="<form action=''>";
        modal+=`<div class="mb-3">`;
        modal+=`<label for="mes_pagar" class="form-label">Meses a pagar:</label>`;
        modal+=`<select class="form-control" id='mes_pagar' name='mes_pagar' aria-label="Default select example">`;
        modal+=`<option value="1">1</option>`;
        modal+=`<option value="2">2</option>`;
        modal+=`<option value="3">3</option>`;
        modal+=`<option value="4">4</option>`;
        modal+=`<option value="5">5</option>`;
        modal+=`<option value="6">6</option>`;
        modal+=`<option value="7">7</option>`;
        modal+=`<option value="8">8</option>`;
        modal+=`<option value="9">9</option>`;
        modal+=`<option value="10">10</option>`;
        modal+=`<option value="11">11</option>`;
        modal+=`<option value="12">12</option>`;
        modal+=`</select>`;
        modal+=`<select class="form-control" id='id_cli' name='id_cli' aria-label="Default select example" style="display: none;">`;
        modal+=`<option value="${id_usu_cli}">${id_usu_cli}</option>`;
        modal+=`</select>`;
        modal+="</div>";
        modal+=`<div class="modal-footer justify-content-center">`;
        modal+=`<button type="button" class="btn btn-danger"  id="agre_solicitar_exp" name="agre_solicitar_exp" onclick="acciones.acc_nue_pag_cli()">Guardar</button>`;
        modal+="</div>";
        modal+=`<div class="mb-2" id="error_soli_exp1"></div>`;
        modal+="</form>";
        modal+="</div>";
        modal+="</div>";
        modal+="</div>";
        return modal;
    }
    // mostrar mensaje 
    mos_men(color, mensaje){
        let alerta=`<div class="alert alert-${color} text-center mb-3" role="alert"><b>${mensaje}</b></div>`;
        return alerta;
    }
    // expresion regular para permitir solo texto
    exp_tex(valor){
        const regex = /[^a-zA-Záéíóúñü ]/g;
        let res ="";
        if (regex.test(valor)) {
            res = true;
        }else{
            res = false;
        }
        return res;
    }
    // expresion regular validar correos eletronicos
    exp_correo(valor){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let res =""
        if(regex.test(valor)){
            res = false;
        }else{
            res = true;
        }
        return res;
    }
    // envio de formulario agregar nuevo pago del cliente
    acc_nue_pag_cli(){
        ajax.rep_nue_pag_cli('/rep_nue_pag_cli', 'POST', $("#mes_pagar").val(), $("#id_cli").val());
    }
    // obtener valores al actualizarlos en el modal de actualizar datos de el cliente
    obt_val_edi_cli(){
        let nombre =$("#nombre").val();
        let apellido =$("#apellido").val();
        let cedula = $("#cedula").val();
        let telefono =$("#telefono").val();
        let correo =$("#correo").val();
        let usuario = $("#usuario").val();
        let id_cli =$("#id_cli").val();
        ajax.editar_usuario_cliente("/val_camp_edi_cli", "POST", nombre, apellido, cedula, telefono, correo, usuario, id_cli);
    }
}
let acciones = new Acciones();