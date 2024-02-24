import psycopg2


class Db:
    def __init__(self):
        self.connection = connection =  psycopg2.connect(
            host="localhost",
            port="5432",
            database="guerreros_gym",
            user="postgres",
            password="postgres",
        )
        self.cursor = self.connection.cursor()
    def uno(self, sql, parameters=None):
        self.cursor.execute(sql, parameters)
        results = self.cursor.fetchall()
        self.connection.close()
        if len(results) == 0:
            return False
        else:
            return True
    def fetchall(self, sql):
        self.cursor.execute(sql)
        results = self.cursor.fetchall()
        return results
        # #actualizar registro
        # def actualizar(self, sql):
        #     conexion = self.connection
        #     with conexion.cursor() as cursor:
        #         cursor.execute(sql,parameters)
        #     conexion.commit()
        #     conexion.close()
        # return True
