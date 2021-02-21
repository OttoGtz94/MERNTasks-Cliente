import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from '../../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTRO_EXITOSO:
			localStorage.setItem('token', action.payload.token);
			console.log('authReducer registro exitoso');
			return {
				...state,
				autenticado: true,
				mensaje: null,
			};
		case REGISTRO_ERROR:
			return {
				...state,
				token: false,
				mensaje: action.payload,
			};
		default:
			return state;
	}
};
