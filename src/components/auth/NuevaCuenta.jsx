import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AlertaState from '../../context/alertas/alertaState';

const NuevaCuenta = () => {
	// extraer los valores del context
	const alertaContext = useContext(AlertaContext);

	const { alerta, mostrarAlerta } = alertaContext;

	const [usuario, guardarUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmar: '',
	});

	const { nombre, email, password, confirmar } = usuario;

	const onChange = e => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = e => {
		e.preventDefault();

		// validar que no existan campos vacios
		if (
			nombre.trim() === `` ||
			email.trim() === '' ||
			password.trim() === `` ||
			confirmar.trim() === ``
		) {
			mostrarAlerta(
				'Faltan campos por llenar',
				'alerta-error',
			);
		}
	};

	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>
					{alerta.msg}
				</div>
			) : null}
			<div className='contenedor-form sombra-dark'>
				<h1>Nueva Cuenta</h1>

				<form onSubmit={onSubmit}>
					<div className='campo-form'>
						<label htmlFor='nombre'>Nombre</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							placeholder='Tu Nombre'
							value={nombre}
							onChange={onChange}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Tu Email'
							value={email}
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<label htmlFor='passwconord'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Tu Password'
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='confirmar'>
							Confirmar password
						</label>
						<input
							type='password'
							id='confirmar'
							name='confirmar'
							placeholder='Confirmar Password'
							value={confirmar}
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<input
							type='submit'
							className='btn btn-primario btn-block'
							value='Registrarme'
						/>
					</div>
				</form>
				<Link to={'/'} className='enlace-cuenta'>
					Volver a iniciar Sesión
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
