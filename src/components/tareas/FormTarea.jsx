import React, { useContext, useState } from 'react';
import proyectoContext from './../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;

	const tareasContext = useContext(tareaContext);
	const {
		errortarea,
		agregarTarea,
		validarTarea,
		obtenerTareas,
	} = tareasContext;

	// state del formulario
	const [tarea, guardarTarea] = useState({
		nombre: '',
	});
	// Extraer el nombre del proyecto
	const { nombre } = tarea;

	// Si no hay nigun proyecto seleccionado
	if (!proyecto) return null;

	const [proyectoActual] = proyecto;

	// Leer los valores del formulario
	const handleChange = e => {
		guardarTarea({
			...tarea,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = e => {
		e.preventDefault();

		// validar

		// pasar la validacion
		if (nombre.trim() === '') {
			validarTarea();
			return;
		}

		// agregar la nueva tarea al state de tareas
		tarea.proyectoId = proyectoActual.id;
		tarea.estado = false;
		agregarTarea(tarea);

		// obtener y filtrar las tareas del proyecto actual
		obtenerTareas(proyectoActual.id);

		// reiniciar form
		guardarTarea({
			nombre: '',
		});
	};

	return (
		<div className='formulario'>
			<form onSubmit={onSubmit}>
				<div className='contenedor-input'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre tarea...'
						name='nombre'
						value={nombre}
						onChange={handleChange}
					/>
				</div>
				<div className='contenedor-input'>
					<input
						type='submit'
						className='btn btn-primario btn-submit btn-block'
						value='Agregar tarea'
						onChange={handleChange}
					/>
				</div>
			</form>
			{errortarea ? (
				<p className='mensaje error'>
					Agrega nombre para tarea
				</p>
			) : null}
		</div>
	);
};

export default FormTarea;
