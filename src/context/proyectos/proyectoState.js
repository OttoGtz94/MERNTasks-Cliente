import React, { useReducer } from 'react';
import uuid, { v4 as uuidv4 } from 'uuid';
import proyectoContex from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
} from '../../types/';

const ProyectoState = props => {
	const proyectos = [
		{ id: 1, nombre: 'Tienda virtual' },
		{ id: 2, nombre: 'Fitcon' },
		{ id: 3, nombre: 'Sitio web' },
		{ id: 4, nombre: 'Portafolio' },
	];
	const initialState = {
		proyectos: [],
		formulario: false,
		errorformulario: false,
	};

	// Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(
		proyectoReducer,
		initialState,
	);

	// Serie de funciones para el CRUD
	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO,
		});
	};

	const obtenerProyectos = () => {
		dispatch({
			type: OBTENER_PROYECTOS,
			payload: proyectos,
		});
	};

	// Agregar nuevo proyecto
	const agregarProyecto = proyecto => {
		proyecto.id = uuidv4();

		// Insertar el proyecto en el state
		dispatch({
			type: AGREGAR_PROYECTO,
			payload: proyecto,
		});
	};

	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO,
		});
	};

	return (
		<proyectoContex.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				errorformulario: state.errorformulario,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
			}}>
			{props.children}
		</proyectoContex.Provider>
	);
};

export default ProyectoState;
