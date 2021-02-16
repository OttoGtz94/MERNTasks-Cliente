import React, { useReducer } from 'react';
import uuid, { v4 as uuidv4 } from 'uuid';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	ESTADO_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
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
		tareaseleccionada: null,
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
		tarea.id = uuidv4;
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

	// fn para cambiar el estado de cada tarea
	const cambiarEstadoTarea = tarea => {
		dispatch({
			type: ESTADO_TAREA,
			payload: tarea,
		});
	};

	// fn para extraer la tarea para editar
	const guardarTareaActual = tarea => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};

	// fn para editar tarea
	const actualizarTarea = tarea => {
		dispatch({
			type: ACTUALIZAR_TAREA,
			payload: tarea,
		});
	};

	// fn para limpiar la tarea después que se edita
	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA,
		});
	};

	return (
		<TareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				tareaseleccionada: state.tareaseleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				cambiarEstadoTarea,
				guardarTareaActual,
				actualizarTarea,
				limpiarTarea,
			}}>
			{props.children}
		</TareaContext.Provider>
	);
};

export default TareaState;
