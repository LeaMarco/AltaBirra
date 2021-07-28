import React from 'react'
import Style from './Footer.module.css';
import logo from "./AltaBirra.svg";
import { IoLogoInstagram } from 'react-icons/io';
import { AiOutlineFacebook } from 'react-icons/ai';
import { ImWhatsapp } from 'react-icons/im';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
	

	return (
		<div className={Style.containerFooter}>
			<div className={Style.footer}>
				<div className={Style.containerLogo}>
					<img src={logo} className={Style.logo}></img>
					<span>Centralizamos la oferta y demanda de cervezas artesanales</span>
				</div>

				<div className={Style.descriptionFooter}>
					<div className={Style.quienesSomos}>
						<span>¿QUIÉNES SOMOS?</span>
						<h4>Somos un equipo de desarrolladores que buscamos ayudar a los productores de cerveza artesanal a publicitar sus productos.</h4>
					</div>
					<div className={Style.redes}>
						<span>REDES SOCIALES:</span>
						<div>
							<h4 className={Style.ig}><IoLogoInstagram className={Style.iconIg}/></h4>
							<h4 className={Style.fb}><AiOutlineFacebook className={Style.iconFb}/></h4>
						</div>
					</div>
					<div className={Style.contactanos}>
						<span>CONTACTANOS:</span>
						<div className={Style.contactInfo}>
							<div className={Style.infoWp}>
								<h4 className={Style.wp}><ImWhatsapp className={Style.iconWp}/></h4>
								<span>+548476859838</span>
							</div>
							<div className={Style.infoGm}>
								<h4 className={Style.gm}><SiGmail className={Style.iconGm}/></h4>
								<span>altabirra@gmail.com</span>
							</div>
						</div>
					</div>
				</div>

				<div className={Style.desarrollado}>
					<h3>Desarrollado por el quipo de AltaBirra &copy;</h3>
				</div>
			</div>
		</div>
	);
};

export default Footer

