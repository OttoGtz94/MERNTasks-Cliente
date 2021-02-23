import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from '../../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		autenticado: null,
		usuario: null,
		mensaje: null,
	};

	const [state, dispatch] = useReducer(
		AuthReducer,
		initialState,
	);

	// fn para registrar usuario
	const registrarUsuario = async datos => {
		try {
			const respuesta = await clienteAxios.post(
				'/api/usuarios',
				datos,
			);
			console.log(respuesta.data);
			dispatch({
				type: REGISTRO_EXITOSO,
				payload: respuesta.data,
			});

			// obtener usuario
			usuarioAutenticado();
		} catch (error) {
			// console.log(error.response);
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error',
			};
			dispatch({
				type: REGISTRO_ERROR,
				payload: alerta,
			});
		}
	};

	// fn para regresar el usuario autenticado
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			// fn para enviar el token por header
			tokenAuth(token);
		}

		try {
			const respuesta = await clienteAxios.get('/api/auth');
			// console.log(respuesta);
			dispatch({
				type: OBTENER_USUARIO,
				payload: respuesta.data.usuario,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: LOGIN_ERROR,
			});
		}
	};

	// fn cuando el usuario inicia sesion
	const iniciarSesion = async datos => {
		try {
			const respuesta = await clienteAxios.post(
				'/api/auth',
				datos,
			);
			console.log(respuesta);
			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data,
			});

			// obtener el usuario
			usuarioAutenticado();
		} catch (error) {
			console.log(error.response.data.msg);
			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error',
			};
			dispatch({
				type: LOGIN_ERROR,
				payload: alerta,
			});
		}
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				registrarUsuario,
				iniciarSesion,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
