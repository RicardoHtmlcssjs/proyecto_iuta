from flask import Flask, render_template, send_file, request, session, redirect, session, jsonify
import json
from model.class_usuario import Usuarios
from model.class_acciones import Acciones
from model.config import Db

app = Flask(__name__)
app.secret_key = "abc1234"
@app.route("/")
def index():
    # si la sesion esta creada redirecionara a inicio
    if Acciones().session() == True:
        return redirect('/inicio')
    else:
        return render_template('index.html', login=0)

# cerrar session y destruir
@app.route("/cerrar_session")
def cerrar_session():
    Acciones().cerrar_session()
    return redirect('/')

# enviar formulario de inicio de sesion
@app.route("/ini_sesion_usu", methods=['POST'])
def ini_sesion_usu():
    usuario = request.form['usuario']
    contrasena = request.form['contrasena']
    # si algun campo esta vacio
    if Acciones().val_cam_vacio(usuario) == False or Acciones().val_cam_vacio(contrasena) == False:
        return render_template('index.html', log_error=1, text_error='Algun campo esta vacio', usuario=usuario)
    login = Usuarios().inicio_sesion(usuario, contrasena)
    # si el usuario inicia sesion correctamente redirecionara a inicio
    if login == True:
        return redirect('/inicio')
    else:
        return render_template('index.html', log_error=1, text_error='Usuario o contraseña incorrecto', usuario=usuario)
# personal se accede como administrador
@app.route("/inicio")
def inicio():
    #si la sesion no esta creada redirecionara a index
    if Acciones().session() == False:
        return redirect("/")
    else:
        if session['fk_role'] == 1:
            return redirect('/administrador/personal')
        else:
            return redirect('/cliente')

# personal como cliente
@app.route("/cliente")
def cliente():
    if session['fk_role'] == 1:
            return redirect('/administrador/personal')
    
    return render_template('cliente.html', login=1, titulo_tabla='Mis pagos', administrador = 0, llamar_metodo="ajax.cliente", url="", type="", datos = Usuarios().datos_cliente_sesion())

# clientes tabla pagos realizados
@app.route("/mostrar_pag_cli", methods=["POST"])
def mostrar_pag_cli():
    return Usuarios().cliente_tabla()

# personal como administrador
@app.route("/administrador/personal")
def administrador_personal():
    if session['fk_role'] == 2:
            return redirect('/cliente')
    else:
        return render_template('administrador_personal.html', login=1, administrador=1, llamar_metodo="ajax.tabla_personal" ,url ="/mostrar_personal_adm", type="POST",  titulo_tabla='Listado de Clientes')
# mostrar personal
@app.route("/mostrar_personal_adm", methods=["POST"])
def mostrar_personal_adm():
    return Usuarios().datos_tabla_json()
# mostrar modal
@app.route("/mos_modal1", methods=["POST"])
def mos_modal1():
    return "modal"
# validar formulario de agregar clientes
@app.route("/validar_cam_agre_cliente", methods=["POST"])
def validar_cam_agre_cliente():
    return "hola"
# consultar valores con bbdd y ingresar registros
@app.route("/env_for_agre_cliente", methods=["POST"])
def env_for_agre_cliente():
    nombre = request.form["nombre"]
    apellido = request.form["apellido"]
    cedula = request.form["cedula"]
    telefono = request.form["telefono"]
    correo = request.form["correo"]
    mes_pagar = request.form["mes_pagar"]
    Usuarios().ingresar_cliente(nombre, apellido, cedula, telefono, correo, mes_pagar)
    return "1" 
# pago de mensualidad por qcliente
@app.route("/rep_nue_pag_cli", methods=["POST"])
def rep_nue_pag_cli():
    if request.method == "POST":
        mes_pagar = request.form["mes_pagar"]
        id_cli = request.form["id_cli"]
    return Usuarios().reg_nuevo_pag_cli(mes_pagar, id_cli)
# mostrar valores en el modal a editar usuario
@app.route("/mos_modal_editar", methods=["POST"])
def mos_modal_editar():
    if request.method == 'POST':
        id_cli = request.form["data"]
    return Usuarios().mos_val_cli_edi(id_cli)
# validar campos del modal editar datos del cliente
@app.route("/val_camp_edi_cli", methods=["POST"])
def val_camp_edi_cli():
    if request.method == 'POST':
        nombre = request.form["nombre"]
        apellido = request.form["apellido"]
        cedula = request.form["cedula"]
        telefono = request.form["telefono"]
        correo = request.form["correo"]
        usuario = request.form["usuario"]
        id_cli = request.form["id_cli"]
        
    return str(nombre)
# actualizar datos del cliente
@app.route("/gua_act_dat_cli", methods=["POST"])
def gua_act_dat_cli():
    if request.method == 'POST':
        nombre = request.form["nombre"]
        apellido = request.form["apellido"]
        cedula = request.form["cedula"]
        telefono = request.form["telefono"]
        correo = request.form["correo"]
        usuario = request.form["usuario"]
        id_cli = request.form["id_cli"]
    return Usuarios().gua_act_dat_cli(nombre, apellido, cedula, telefono, correo , usuario, id_cli)
# mostrar modal de cambio de contraseña
@app.route("/mos_modal_cam_contra", methods=["POST"])
def mos_modal_cam_contra():
    return "hola"
# cambiar contraseña y guardarla 
@app.route("/cam_contra_cli", methods=["POST"])
def cam_contra_cli():
    if request.method == 'POST':
        nue_contra = request.form["nue_contra"]
        rep_nue_contra = request.form["rep_nue_contra"]
        id_cli = request.form["id_cli"]
    return Usuarios().cam_contra_cli(nue_contra, rep_nue_contra, id_cli)
# guardar contraseña cambiada por el cliente mismo
@app.route("/cam_contra_cli_mi", methods=["POST"])
def cam_contra_cli_mi():
    if request.method == 'POST':
            nue_contra = request.form["nue_contra"]
            rep_nue_contra = request.form["rep_nue_contra"]
    return Usuarios().cam_contra_cli_mi(nue_contra, rep_nue_contra)
# mostrar valores en formulario modal de editar mi informacioncomo cliente
@app.route("/mos_inf_mod_cli", methods=["POST"])
def mos_inf_mod_cli():
    return Usuarios().mos_inf_mod_cli()
# crear reporte en excel todos los clienets
@app.route("/cre_rep_cli_exc", methods=["POST"])
def cre_rep_cli_exc():
    Acciones().reporte_clientes()
    return redirect('/inicio')
# guardar valores editados como cliente
@app.route("//guardar_cam_val_cli_mi", methods=["POST"])
def guardar_cam_val_cli_mi():
    if request.method == "POST":
        nombre = request.form["nombre"]
        apellido = request.form["apellido"]
        cedula = request.form["cedula"]
        telefono = request.form["telefono"]
        correo = request.form["correo"]
        usuario = request.form["usuario"]
    return Usuarios().guardar_cam_val_cli_mi_r(nombre, apellido, cedula, telefono, correo, usuario)

#ini servidor
if __name__ == '__main__':
    app.run(port=5001, debug=True)