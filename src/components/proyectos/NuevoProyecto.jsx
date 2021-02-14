import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
	// Obtener el state del formulario
	const proyectosContext = useContext(proyectoContext);
	const {
		formulario,
		errorformulario,
		mostrarFormulario,
		agregarProyecto,
		mostrarError,
	} = proyectosContext;
	// State para proyecto
	const [proyecto, guardarProyecto] = useState({
		nombre: '',
	});

	const { nombre } = proyecto;

	const onChangeProyecto = e => {
		guardarProyecto({
			...proyecto,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmitProyecto = e => {
		e.preventDefault();
		console.log(proyecto);

		// Validar el proyecto
		if (nombre === '') {
			mostrarError();
			return;
		}

		// agregar al state
		agregarProyecto(proyecto);

		// Limpiar formulario
		guardarProyecto({
			nombre: '',
		});
	};

	const onClickFormulario = () => {
		mostrarFormulario();
	};

	return (
		<Fragment>
			<button
				type='button'
				className='btn btn-block btn-primario'
				onClick={onClickFormulario}>
				Nuevo Proyecto
			</button>
			{formulario ? (
				<form
					className='formulario-nuevo-proyecto'
					onSubmit={onSubmitProyecto}>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre del proyecto'
						name='nombre'
						value={nombre}
						onChange={onChangeProyecto}
					/>
					<input
						type='submit'
						className='btn btn-primario btn-block'
						value='Agregar Proyecto'
					/>
				</form>
			) : null}

			{errorformulario ? (
				<p className='mensaje error'>Nombre obligatorio</p>
			) : null}
		</Fragment>
	);
};

export default NuevoProyecto;
