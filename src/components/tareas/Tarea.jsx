import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({ tarea }) => {
	const tareasContext = useContext(tareaContext);
	const {
		eliminarTarea,
		obtenerTareas,
		cambiarEstadoTarea,
		guardarTareaActual,
	} = tareasContext;

	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;
	const [proyectoActual] = proyecto;

	// fn para eliminar tarea cuando se presiona el btn
	const tareaEliminar = id => {
		eliminarTarea(id);
		obtenerTareas(proyectoActual.id);
	};

	// fn que modifica el estado de las tareas
	const cambiarEstado = tarea => {
		if (tarea.estado) {
			tarea.estado = false;
		} else {
			tarea.estado = true;
		}
		cambiarEstadoTarea(tarea);
	};

	// fn para editar tarea seleccionada
	const seleccionarTarea = tarea => {
		guardarTareaActual(tarea);
	};

	return (
		<li className='tarea sombra'>
			<p>{tarea.nombre}</p>
			<div className='estado'>
				{tarea.estado ? (
					<button
						type='button'
						className='completo'
						onClick={() => cambiarEstado(tarea)}>
						Completo
					</button>
				) : (
					<button
						type='button'
						className='incompleto'
						onClick={() => cambiarEstado(tarea)}>
						Incompleto
					</button>
				)}
			</div>
			<div className='acciones'>
				<button
					type='button'
					className='btn btn-primario'
					onClick={() => seleccionarTarea(tarea)}>
					Editar
				</button>
				<button
					type='button'
					className='btn btn-secundario'
					onClick={() => tareaEliminar(tarea.id)}>
					Eliminar
				</button>
			</div>
		</li>
	);
};

export default Tarea;
