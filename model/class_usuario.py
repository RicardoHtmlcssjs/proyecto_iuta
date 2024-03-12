from flask import Flask, session
from datetime import datetime
import json
from model.config import Db

class Usuarios():
	# inicio de sesion en el formulario
    def inicio_sesion(self, usu_log, contrasena):
        datos_usu = Db().fetchall("SELECT id_usuario, usuario, contrasena, fk_role FROM usuarios WHERE usuario = '"+usu_log+"'")
        contra = ""
        for row in datos_usu:
            contra = row[2]
        if contrasena == contra:
            session['id_usu_log'] = row[0]
            session['usu_log'] = row[1]
            session['fk_role'] = row[3]
            return True
        else:
            return False
    # mostrar tabla de clientes
    def datos_tabla_json(self):
        json_data = []
        datos_db = Db().fetchall("SELECT usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.cedula, usuarios.telefono, usuarios.correo, clientes.fecha_reg, clientes.hora_reg, clientes.fec_venci, clientes.id_cliente  FROM usuarios INNER JOIN  clientes ON clientes.fk_usuario = usuarios.id_usuario  WHERE fk_role = 2")
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
                "id_cli": row[9]
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

        if ano_up >= ano:
            if int(mes_up) > int(mes):
                print("solvente1")
                status = "Solvente"
            elif ano_up > ano and int(mes_up) >= int(mes):
                status = "Solvente"
                print("solvente5")
            elif int(mes_up) == int(mes):  
                if dia_up >= dia:
                    if int(dia_up) - int(dia) < 4 and int(dia_up) - int(dia) >=0:
                        status = "Advertencia"
                        print("advertencia1")
                    else:
                        status = "Solvente"
                        print("solvente2")
                else:
                    status = "Moroso"
                    print("moroso1")
            elif int(mes_up) < int(mes) and ano_up > ano:
                print("solvente4")
                status="Solvente"
            else:
                print("moroso22")
                status="Moroso"
        elif ano_up > ano and int(mes_up) < int(mes):
            status= "Solvente"
            print("solvente3")
        else:
            status = "Moroso"
            print("moroso3")
        return  status
    # ingresar cliente en la bbdd
    def ingresar_cliente(self, nombre, apellido, cedula, telefono, correo, mes_pagar):
        exi_ced = Db().fetchall("SELECT cedula FROM usuarios WHERE cedula = "+cedula+"")
        exi_cor = Db().fetchall("SELECT correo FROM usuarios WHERE correo = '"+correo+"'")
        cont_exi_ced = ""
        cont_exi_cor = ""
        for row in exi_ced:
            cont_exi_ced = row[0]
        for row2 in exi_cor:
            cont_exi_cor = row2[0]
        if str(cont_exi_ced) == str(cedula):
            res =  "la cedula ya existe"
        elif str(cont_exi_cor) == str(correo):
            res = "El correo ya existe"
        else:
            Db().ins("INSERT INTO usuarios (nombre, apellido, cedula, telefono, fk_role, usuario, correo, hora_reg, fecha_reg, contrasena) VALUES ('"+nombre+"', '"+apellido+"', "+cedula+", "+telefono+", 2, '"+nombre+"', '"+correo+"', now(), now(), '"+nombre+"')")
            tr = Db().fetchall("SELECT id_usuario FROM usuarios")
            for row3 in tr:
                id = row3[0] 
            ult_dia_por_mes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            dia = datetime.now().strftime("%d")
            mes = datetime.now().strftime("%m")
            ano = datetime.now().strftime("%y")
            mes_vec = int(mes) + int(mes_pagar)
            if mes_vec > 12:
                mes_vec = mes_vec - 12
                ano = int(ano) + 1
            
            if str(mes_vec) == 2 and dia > 28:
                dia = 28
            elif (int(mes_vec) == 4 and int(dia) > 30) or (int(mes_vec) == 6 and int(dia) > 30) or (int(mes_vec) == 9 and int(dia) > 30) or (int(mes_vec) == 11 and int(dia) > 30):
                dia = 30
            if len(str(mes_vec)) == 1:
                mes_vec = "0"+str(mes_vec)
            fec_vec = "20"+str(ano)+"-"+str(mes_vec)+"-"+str(dia)
            Db().ins("INSERT INTO clientes (fecha_reg, hora_reg, fk_usuario, fec_ultimo_pago, fec_venci) values (now(), now(), "+str(id)+", now(), '"+str(fec_vec)+"')")
            con_id_cli = Db().fetchall("SELECT id_cliente FROM clientes")
            for row4 in con_id_cli:
                id_cli = row4[0]
            id_adm = session['id_usu_log']
            Db().ins("INSERT INTO pagos (fk_usu_adm, fk_cliente, fec_pago, cant_mes_pag) VALUES ("+str(id_adm)+", "+str(id_cli)+", now(), "+str(mes_pagar)+")")
            res = "1"
        return res
    # registrar en la base de datos el pago del cliente
    def reg_nuevo_pag_cli(self, mes_pag, id_cli):
        dia = datetime.now().strftime("%d")
        mes = datetime.now().strftime("%m")
        ano = datetime.now().strftime("%y")
        bus_fec_vec = Db().fetchall("SELECT fec_venci FROM clientes WHERE id_cliente = "+str(id_cli)+"")
        for row in bus_fec_vec:
            ult_fec_reg_ven = row[0]

        # formatear fecha
        fu = str(ult_fec_reg_ven)
        # año, mes y dia de la ultima feha de pago del cliente
        ano_up = fu[2:4]
        mes_up = fu[5:7]
        dia_up = fu[8:10]

        mes_vec = int(mes_up) + int(mes_pag)
        if mes_vec > 12:
            mes_vec = mes_vec - 12
            ano_up = int(ano_up) + 1

        if str(mes_vec) == 2 and str(dia_up) > 28:
            dia_up = 28
        elif (int(mes_vec) == 4 and int(dia_up) > 30) or (int(mes_vec) == 6 and int(dia_up) > 30) or (int(mes_vec) == 9 and int(dia_up) > 30) or (int(mes_vec) == 11 and int(dia_up) > 30):
            dia = 30
        if len(str(mes_vec)) == 1:
            mes_vec = "0"+str(mes_vec)
        fec_vec = "20"+str(ano_up)+"-"+str(mes_vec)+"-"+str(dia_up)
        fec_vwc_lis = datetime.strptime(fec_vec, "%Y-%m-%d")
        # fec_vwc_lis = fec_vwc_lis[0:10]
        Db().ins("UPDATE clientes SET fec_ultimo_pago = now(), fec_venci = '"+str(fec_vwc_lis)+"' WHERE id_cliente = "+str(id_cli)+"")
        id_adm = session['id_usu_log']
        Db().ins("INSERT INTO pagos (fk_usu_adm, fk_cliente, fec_pago, cant_mes_pag) VALUES ("+str(id_adm)+", "+str(id_cli)+", now(), "+str(mes_pag)+")")
        return str(fec_vwc_lis)
    # mostrar datos en un modal al actualizar valores de un cliente
    def mos_val_cli_edi(self, id_cli): 
        res = Db().fetchall("SELECT  usuarios.nombre, usuarios.apellido, usuarios.cedula, usuarios.telefono, usuarios.correo, usuarios.usuario, usuarios.contrasena, clientes.id_cliente  FROM usuarios INNER JOIN clientes ON clientes.fk_usuario = usuarios.id_usuario  WHERE id_cliente = "+str(id_cli)+"")
        return res
    # verificar si existe yguardar datos a actualizar
    def gua_act_dat_cli(self, nombre, apellido, cedula, telefono, correo, usuario, id_cli):
        dat_actuales_cli = Db().fetchall("SELECT  usuarios.nombre, usuarios.apellido, usuarios.cedula, usuarios.telefono, usuarios.correo, usuarios.usuario, usuarios.contrasena, clientes.id_cliente  FROM usuarios INNER JOIN clientes ON clientes.fk_usuario = usuarios.id_usuario  WHERE id_cliente = "+str(id_cli)+"")
        for row in dat_actuales_cli:
            cedula_actual = row[2]
            telefono_actual = row[3]
            correo_actual = row[4]
            usuario_actual = row[5]
        if int(cedula) == int(cedula_actual) and int(telefono) == int(telefono_actual) and str(correo) == str(correo_actual) and str(usuario) == str(usuario_actual):
            res = "si"
        else:
            res = "si"
            existe_dato = Db().fetchall("SELECT cedula, telefono, correo, usuario FROM usuarios")
            for row2 in existe_dato:
                if int(row2[0]) == int(cedula):
                    if int(row2[0]) == int(cedula_actual):
                        res = "si"
                    else:
                        return "La cedula existe"
                if int(row2[1]) == int(telefono):
                    if int(row2[1]) == int(telefono_actual):
                        res = "si"
                    else:
                        return "El telefono existe"
                if str(row2[2]) == str(correo):
                    if str(row2[2]) == str(correo_actual):
                        res = "si"
                    else:
                        return "El correo existe"
                if str(row2[3]) == str(usuario):
                    if str(row2[3]) == str(usuario_actual):
                        res = "si"
                    else:
                        return "El usuario ya existe"
        if res == "si":
            id_usu_editar = Db().fetchall("SELECT usuarios.id_usuario FROM usuarios INNER JOIN clientes ON clientes.fk_usuario = usuarios.id_usuario  WHERE id_cliente = "+str(id_cli)+"")
            for row3 in id_usu_editar:
                id_usuario = row3[0]
            consulta = Db().ins("UPDATE usuarios SET nombre = '"+str(nombre)+"', apellido = '"+str(apellido)+"', cedula = "+str(cedula)+", telefono = "+str(telefono)+", correo = '"+str(correo)+"', usuario = '"+str(usuario)+"' WHERE id_usuario = "+str(id_usuario)+"")
            if consulta:
                res = "si"
            else:
                res = "Ha ocurrido un error"
                
        return res
    # cambiar contraseña del usuario como administrador
    def cam_contra_cli(self, nue_contra, rep_nue_contra, id_cli):
        dat_actuales_cli = Db().fetchall("SELECT usuarios.contrasena FROM usuarios INNER JOIN clientes ON clientes.fk_usuario = usuarios.id_usuario  WHERE id_cliente = "+str(id_cli)+"")
        for row in dat_actuales_cli:
            contra_actual = row[0]
        res = "si"
        if str(contra_actual) == str(nue_contra):
            res = "si"
        todas_contra = Db().fetchall("SELECT contrasena FROM usuarios")
        for row2 in todas_contra:
            if str(row2[0]) == str(nue_contra):
                if str(row2[0]) == str(contra_actual):
                    res = "si"
                else:
                    return "La contraseña ya existe"
        
        if res == "si":
            id_usu_editar = Db().fetchall("SELECT usuarios.id_usuario FROM usuarios INNER JOIN clientes ON clientes.fk_usuario = usuarios.id_usuario  WHERE id_cliente = "+str(id_cli)+"")
            for row3 in id_usu_editar:
                id_usuario = row3[0]
            consulta = Db().ins("UPDATE usuarios SET contrasena = '"+str(nue_contra)+"' WHERE id_usuario = "+str(id_usuario)+"")
        if consulta:
            res = "si"
        else:
            res = "Ha ocurrido un error"
        return res