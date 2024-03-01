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
        modal+="<input type='text'class='form-control'  id='nombre' name='nombre' autocomplete='off'>";
        modal+="</div>";
        modal+="<div class='' id='error_nombre' name='error_nombre'></div>";
        modal+="<div class='mb-3'>";
        modal+="<label for='apellido' class='form-label'>Apellido:</label>";
        modal+="<input type='text'class='form-control'  id='apellido' name='apellido' autocomplete='off'>";
        modal+="</div>";
        modal+="<div class='' id='error_apellido' name='error_apellido'></div>";
        modal+="<div class='mb-3'>";
        modal+="<label for='cedula' class='form-label'>Cedula:</label>";
        modal+="<input type='number'class='form-control'  id='cedula' name='cedula' autocomplete='off'>";
        modal+="</div>";
        modal+="<div class='' id='error_cedula' name='error_cedula'></div>";
        modal+="<div class='mb-3'>";
        modal+="<label for='telefono' class='form-label'>Telefono:</label>";
        modal+="<input type='number'class='form-control'  id='telefono' name='telefono' autocomplete='off'>";
        modal+="</div>";
        modal+="<div class='' id='error_telefono' name='error_telefono'></div>";
        modal+="<div class='mb-3'>";
        modal+=`<label for="correo" class="form-label">Correo:</label>`;
        modal+=`<input type="email" class="form-control"  id="correo" name="correo" autocomplete='off'>`;
        modal+="</div>";
        modal+="<div class='' id='error_correo' name='error_correo'></div>";
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
        modal+="</div>";
        modal+=`<div class="modal-footer justify-content-center">`;
        modal+=`<button type="button" class="btn btn-danger"  id="agre_solicitar_exp" name="agre_solicitar_exp" onclick="ajax.val_for_agre_cli('/validar_cam_agre_cliente', 'POST', '')">Guardar</button>`;
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
}
let acciones = new Acciones();