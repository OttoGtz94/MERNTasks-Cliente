import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from './../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;

	const tareasContext = useContext(tareaContext);
	const {
		errortarea,
		tareaseleccionada,
		agregarTarea,
		validarTarea,
		obtenerTareas,
		actualizarTarea,
		limpiarTarea,
	} = tareasContext;

	// Detecta si hay tarea seleccionada
	useEffect(() => {
		if (tareaseleccionada !== null) {
			guardarTarea(tareaseleccionada);
		} else {
			guardarTarea({
				nombre: '',
			});
		}
	}, [tareaseleccionada]);

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

		// Revisar si es editar tarea o agregar nueva tarea
		if (tareaseleccionada === null) {
			// tarea nueva
			// agregar la nueva tarea al state de tareas
			tarea.proyecto = proyectoActual._id;
			// tarea.estado = false;
			agregarTarea(tarea);
		} else {
			// actualizar tarea
			actualizarTarea(tarea);
			// Elimina del state la tarea que se edito
			limpiarTarea();
		}

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
						value={
							tareaseleccionada
								? 'Editar tarea'
								: 'Agregar Tarea'
						}
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
