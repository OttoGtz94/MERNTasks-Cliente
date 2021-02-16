import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {
	const proyectosContext = useContext(proyectoContext);
	const { proyectoActual } = proyectosContext;

	// obtener la fn del context de tarea
	const tareasContext = useContext(tareaContext);
	const { obtenerTareas } = tareasContext;

	// fn para agregar el proyecto actual y sus tareas
	const seleccionarProyecto = id => {
		proyectoActual(id); //Fijar el proyecto actual
		obtenerTareas(id); // Filtra las tareas
	};

	return (
		<li>
			<button
				type='button'
				className='btn btn-blank'
				onClick={() => seleccionarProyecto(proyecto.id)}>
				{proyecto.nombre}
			</button>
		</li>
	);
};

export default Proyecto;
