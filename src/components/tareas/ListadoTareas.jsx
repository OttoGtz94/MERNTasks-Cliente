import React, { Fragment, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import Tarea from './Tarea';

const ListadoTareas = () => {
	const proyectosContext = useContext(proyectoContext);
	const { proyecto, eliminarProyecto } = proyectosContext;

	const tareasContext = useContext(tareaContext);
	const { tareasproyecto } = tareasContext;

	if (!proyecto) return <h2>Selecciona un proyecto</h2>;
	const [proyectoActual] = proyecto;

	const onClickEliminar = () => {
		eliminarProyecto(proyectoActual.id);
	};

	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className='listado-tareas'>
				{tareasproyecto.length === 0 ? (
					<li className='tarea'>
						<p>No hay tareas</p>
					</li>
				) : (
					tareasproyecto.map(tarea => (
						<Tarea key={tarea.id} tarea={tarea} />
					))
				)}
			</ul>
			<button
				type='button'
				className='btn btn-eliminar'
				onClick={onClickEliminar}>
				Eliminar Proyecto &times;
			</button>
		</Fragment>
	);
};

export default ListadoTareas;
