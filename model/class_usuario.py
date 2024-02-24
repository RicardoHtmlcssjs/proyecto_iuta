from flask import Flask, session
from model.config import Db
import bcrypt

class Usuarios():
	# inicio de sesion en el formulario
    def inicio_sesion(self, usu_log, contrasena):
        datos_usu = Db().fetchall("SELECT id_usuario, usuario, contrasena, fk_role FROM usuarios WHERE usuario = '"+usu_log+"'")
        for row in datos_usu:
            id_usu = row[0]
            usu = row[1]
            contra = row[2]
            role = row[3]
        if contrasena == contra:
            session['id_usu_log'] = id_usu
            session['usu_log'] = usu
            session['fk_role'] = role
            return True
        else:
            return False
    # mostrar tabla de clientes
    def datos_tabla_json(self):
        json_data = []
        datos_db = Db().fetchall("SELECT usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.cedula, usuarios.telefono, usuarios.correo, clientes.fecha_reg, clientes.hora_reg, status.descripcion, status.pk_status FROM usuarios INNER JOIN  clientes ON clientes.fk_usuario = usuarios.id_usuario INNER JOIN status ON status.pk_status = clientes.fk_status WHERE fk_role = 2")
        for row in datos_db:
            # establecer color a el status
            if row[9] == 1:
                color = "success"
            else:
                color = "danger"

            json_data.append({
                "cedula": row[3], 
                "nombre": row[1] + " " + row[2],
                "telefono": row[4],
                "correo": row[5],
                "fecha": row[6],
                "status": row[8],
                "color_status": color
                })
        return json_data
        # return datos_db