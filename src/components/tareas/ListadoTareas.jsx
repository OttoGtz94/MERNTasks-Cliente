import React, { Fragment } from 'react';
import Tarea from './Tarea';

const ListadoTareas = () => {
	const tareasProyecto = [
		{ nombre: 'Cambiar background', estado: true },
		{ nombre: 'Agregar Hover', estado: false },
		{ nombre: 'Conectar a Base de Datos', estado: true },
		{ nombre: 'Buscar buggs', estado: false },
	];

	return (
		<Fragment>
			<h2>Proyecto: Fitcon</h2>
			<ul className='listado-tareas'>
				{tareasProyecto.length === 0 ? (
					<li className='tarea'>
						<p>No hay tareas</p>
					</li>
				) : (
					tareasProyecto.map(tarea => <Tarea tarea={tarea} />)
				)}
			</ul>
			<button type='button' className='btn btn-eliminar'>
				Eliminar Proyecto &times;
			</button>
		</Fragment>
	);
};

export default ListadoTareas;
