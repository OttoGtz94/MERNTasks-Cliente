import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
} from '../../types';

const TareaState = props => {
	const initialState = {
		tareas: [
			{
				id: 1,
				nombre: 'Cambiar background',
				estado: true,
				proyectoId: 1,
			},
			{
				id: 2,
				nombre: 'Agregar Hover',
				estado: false,
				proyectoId: 2,
			},
			{
				id: 3,
				nombre: 'Conectar a Base de Datos',
				estado: true,
				proyectoId: 3,
			},
			{
				id: 4,
				nombre: 'Buscar buggs',
				estado: false,
				proyectoId: 4,
			},
			{
				id: 5,
				nombre: 'Docker',
				estado: false,
				proyectoId: 2,
			},
			{
				id: 6,
				nombre: 'Cambiar fuente',
				estado: true,
				proyectoId: 3,
			},
			{
				id: 7,
				nombre: 'Conexion a MongoDB',
				estado: false,
				proyectoId: 4,
			},
			{
				id: 8,
				nombre: 'Agregar boton',
				estado: false,
				proyectoId: 1,
			},
			{
				id: 9,
				nombre: 'Crear hooks',
				estado: true,
				proyectoId: 2,
			},
			{
				id: 10,
				nombre: 'Incorporar webpack',
				estado: false,
				proyectoId: 4,
			},
		],
		tareasproyecto: null,
		errortarea: false,
	};

	// Crear dispatch y state
	const [state, dispatch] = useReducer(
		TareaReducer,
		initialState,
	);

	// CREAR FUNCIONES

	// fn obtener las tareas de un proyecto
	const obtenerTareas = proyectoId => {
		dispatch({
			type: TAREAS_PROYECTO,
			payload: proyectoId,
		});
	};

	// fn para agregar tarea a proyecto
	const agregarTarea = tarea => {
		dispatch({
			type: AGREGAR_TAREA,
			payload: tarea,
		});
	};

	// fn para validar y/o mostrar error al agregar tarea
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	// fn para eliminar tarea
	const eliminarTarea = id => {
		dispatch({
			type: ELIMINAR_TAREA,
			payload: id,
		});
	};

	return (
		<TareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
			}}>
			{props.children}
		</TareaContext.Provider>
	);
};

export default TareaState;
