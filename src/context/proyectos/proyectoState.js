import React, { useReducer } from 'react';
import uuid, { v4 as uuidv4 } from 'uuid';
import proyectoContex from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
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
		proyecto: null,
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

	// Selecciona el proyecto al que se le da click
	const proyectoActual = proyectoId => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoId,
		});
	};

	return (
		<proyectoContex.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				errorformulario: state.errorformulario,
				proyecto: state.proyecto,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
			}}>
			{props.children}
		</proyectoContex.Provider>
	);
};

export default ProyectoState;
