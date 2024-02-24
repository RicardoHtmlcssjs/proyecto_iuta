from flask import Flask, session

class Acciones():
	# verfificar si un campo esta vacio
	def val_cam_vacio(self, var):
		text = len(var)
		if text == 0:
			return False
		else:
			return True 
	# verificar si la session existe
	def session(self):
		if 'id_usu_log' in session:
			log = True
		else:
			log = False
		return log
	#destruir sessiones creadas para cerrar session
	def cerrar_session(self):
		session.clear()