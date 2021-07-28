import React from 'react'
import { useHistory } from 'react-router-dom';
import Style from './NoAuthorized.module.css';
import { useDispatch } from 'react-redux';
import logoNoAuthorized from '../../img/NoAuthorized.jpg';


const NoAuthorized = () => {
	
	return (
		<div className={Style.containerNoAuthorized}>
			<div className={Style.contenedor}>
				<img className={Style.logo} src={logoNoAuthorized} alt='sin_logo' />
				<span>¡ERROR!<br/><br/>
					Debes estar logueado para<br/>
					acceder a esta sección!</span><br/><br/><br/>
					<a href="https://localhost:3000">Volver a la página principal</a>
				
			</div>
		</div>
	);
};

export default NoAuthorized

