import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import { TAREAS_PROYECTO } from '../../types';

const TareaState = props => {
	const initialState = {
		tareas: [
			{
				nombre: 'Cambiar background',
				estado: true,
				proyectoId: 1,
			},
			{
				nombre: 'Agregar Hover',
				estado: false,
				proyectoId: 2,
			},
			{
				nombre: 'Conectar a Base de Datos',
				estado: true,
				proyectoId: 3,
			},
			{
				nombre: 'Buscar buggs',
				estado: false,
				proyectoId: 4,
			},
			{
				nombre: 'Docker',
				estado: false,
				proyectoId: 2,
			},
			{
				nombre: 'Cambiar fuente',
				estado: true,
				proyectoId: 3,
			},
			{
				nombre: 'Conexion a MongoDB',
				estado: false,
				proyectoId: 4,
			},
			{
				nombre: 'Agregar boton',
				estado: false,
				proyectoId: 1,
			},
			{
				nombre: 'Crear hooks',
				estado: true,
				proyectoId: 2,
			},
			{
				nombre: 'Incorporar webpack',
				estado: false,
				proyectoId: 4,
			},
		],
		tareasproyecto: null,
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

	return (
		<TareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				obtenerTareas,
			}}>
			{props.children}
		</TareaContext.Provider>
	);
};

export default TareaState;
