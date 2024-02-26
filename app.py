from flask import Flask, render_template, request, session, redirect, session, jsonify
from model.class_usuario import Usuarios
from model.class_acciones import Acciones

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
            return 'Usuario cliente'

# personal como administrador
@app.route("/administrador/personal")
def administrador_personal():
    return render_template('administrador_personal.html', login=1, administrador=1, llamar_metodo='ajax.tabla_personal()', titulo_tabla='Listado de Clientes')
# mostrar personal
@app.route("/mostrar_personal_adm", methods=["POST"])
def mostrar_personal_adm():
    # print(jsonify(Usuarios().datos_tabla_json()))
    print(Usuarios().datos_tabla_json())
    return Usuarios().datos_tabla_json()
# mostrar modal
@app.route("/mos_modal1", methods=["POST"])
def mos_modal1():
    return "modal"
#ini servidor
if __name__ == '__main__':
    app.run(port=5000, debug=True)