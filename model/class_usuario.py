from flask import Flask, session
from datetime import datetime
from model.config import Db

class Usuarios():
	# inicio de sesion en el formulario
    def inicio_sesion(self, usu_log, contrasena):
        datos_usu = Db().fetchall("SELECT id_usuario, usuario, contrasena, fk_role FROM usuarios WHERE usuario = '"+usu_log+"'")
        contra = ""
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
        datos_db = Db().fetchall("SELECT usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.cedula, usuarios.telefono, usuarios.correo, clientes.fecha_reg, clientes.hora_reg, clientes.fec_venci  FROM usuarios INNER JOIN  clientes ON clientes.fk_usuario = usuarios.id_usuario  WHERE fk_role = 2")
        for row in datos_db:
            fecha = str(row[8])
            ult_fec_pag = fecha[0:10]
            # moroso o solvente o adventencia
            if Usuarios().calculo_estatus(row[8]) == "Solvente":
                color = "success"
            elif Usuarios().calculo_estatus(row[8]) == "Advertencia":
                color = "warning"
            else:
                color = "danger"
            json_data.append({                
                "cedula": row[3], 
                "nombre": row[1] + " " + row[2],
                "telefono": row[4],
                "correo": row[5],
                "fec_venci": ult_fec_pag,
                "status": Usuarios().calculo_estatus(row[8]),
                "color_status": color,
                "id_cli": row[0]
                })
        return json_data
    # calcular estatus del cliente moroso, advertencia, solvente
    def calculo_estatus(self, fu):
        # dia mes  y año actual
        dia = datetime.now().strftime("%d")
        mes = datetime.now().strftime("%m")
        ano = datetime.now().strftime("%y")
        # formatear fecha
        fu = str(fu)
        fu = fu[0:10]
        # año, mes y dia de la ultima feha de pago del cliente
        ano_up = fu[2:4]
        mes_up = fu[5:7]
        dia_up = fu[8:10]

        # Lista con los días de cada mes (considerando años no bisiestos)
        ult_dia_por_mes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if ano_up >= ano:
            if int(mes_up) > int(mes):
                return "Solvente"
            elif int(mes_up) == int(mes): 
                if dia_up >= dia:
                    if int(dia_up) - int(dia) < 4 and int(dia_up) - int(dia) >=0:
                        status = "Advertencia"
                    else:
                        status = "Solvente"
                else:
                    status = "Moroso"
            else:
                status = "Moroso"
        else:
            status = "Moroso"
        
        return  status