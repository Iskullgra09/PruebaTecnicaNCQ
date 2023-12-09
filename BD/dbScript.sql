CREATE DATABASE pruebaTecnica;

CREATE TABLE IF NOT EXISTS colaboradores (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50)
);

INSERT INTO colaboradores (nombre) VALUES ('Luis Benavides Arguedas');
INSERT INTO colaboradores (nombre) VALUES ('Josue Araya Rojas');
INSERT INTO colaboradores (nombre) VALUES ('Sebastian Zumbado Marin');
INSERT INTO colaboradores (nombre) VALUES ('Felipe Quesada Montero');
INSERT INTO colaboradores (nombre) VALUES ('Lorena Granados Chavez');
INSERT INTO colaboradores (nombre) VALUES ('Jessica Alfaro Cascante');
INSERT INTO colaboradores (nombre) VALUES ('Andrea Murillo Arias');

CREATE TABLE IF NOT EXISTS tareas (
	id SERIAL PRIMARY KEY,
	descripcion VARCHAR(255),
	colaborador_id INTEGER,
	estado VARCHAR(15),
	prioridad VARCHAR(15),
	fecha_inicio DATE,
	fecha_fin DATE,
	notas TEXT,
	FOREIGN KEY (colaborador_id)
      REFERENCES colaboradores (id)
);

INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Limpiar',1,'PENDIENTE','MEDIA','2023-01-01','2023-01-02','Limpiar los 2 primeros pisos');
INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Lavar carros',3,'PENDIENTE','BAJA','2023-12-11','2023-12-13','Solamente las busetas y talvez el bus');
INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Recoger reciclaje',7,'PENDIENTE','ALTA','2023-04-17','2023-04-18','Separar bien antes de entregarla');
INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Acomodar escritorios',4,'EN PROCESO','BAJA','2023-06-13','2023-06-15','Solamente los escritorios de contabilidad y TI');
INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Entregar informes de contabilidad',2,'EN PROCESO','MEDIA','2023-05-20','2023-05-20','Es importante, no olvidar');
INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Compras de utilidades',6,'EN PROCESO','ALTA','2023-03-27','2023-03-27','Traer papel higienico, jabones y paños');
INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Acomodar escritorios',5,'FINALIZADA','BAJA','2023-09-13','2023-09-15','Solamente los escritorios de recepcion y los del area de RH');
INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Entregar informes de contabilidad',6,'FINALIZADA','ALTA','2023-02-10','2023-02-10','Es importante, no olvidar');
INSERT INTO tareas (descripcion,colaborador_id,estado,prioridad,fecha_inicio,fecha_fin,notas) 
	VALUES ('Limpiar',1,'FINALIZADA','MEDIA','2023-08-01','2023-08-03','Limpiar el garage y las salas comunes');
