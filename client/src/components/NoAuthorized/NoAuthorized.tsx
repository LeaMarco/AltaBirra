import React from 'react'
import Style from './NoAuthorized.module.css';
import logoNoAuthorized from '../../img/NoAuthorized.jpg';


const NoAuthorized = () => {

	if (window.location.href !== `${process.env.REACT_APP_HOST_FRONTEND}/noAutorizado`) {
		window.location.href = `${process.env.REACT_APP_HOST_FRONTEND}/noAutorizado`
	}

	
	return (
		<div className={Style.containerNoAuthorized}>

			<div className={Style.contenedor}>
				<img className={Style.logo} src={logoNoAuthorized} alt='sin_logo' />
				<span>¡ERROR!<br /><br />
					Debes estar logueado para<br />
					acceder a esta sección!
				</span><br /><br /><br />
				<a href={process.env.REACT_APP_HOST_FRONTEND}>Volver a la página principal</a>

			</div>
		</div>
	);
};

export default NoAuthorized

