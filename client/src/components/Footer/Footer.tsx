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
							<a href="https://www.instagram.com/altabirra.2021/" target="_blank" > <h4 style={{ color: "white" }} className={Style.ig}><IoLogoInstagram className={Style.iconIg} /></h4> </a>
							<a href="https://www.facebook.com/Altabirra-107684411594718" target="_blank" > <h4 style={{ color: "white" }} className={Style.fb}><AiOutlineFacebook className={Style.iconFb} /></h4></a>
						</div>
					</div>
					<div className={Style.contactanos}>
						<span>CONTACTANOS:</span>
						<div className={Style.contactInfo}>
							<div className={Style.infoWp}>
								<h4 className={Style.wp}><ImWhatsapp className={Style.iconWp} /></h4>
								<span>+541176859838</span>
							</div>
							<div className={Style.infoGm}>
								<a href="mailto:altabirra.2021gmail.com" ><h4 className={Style.gm}><SiGmail style={{ color: "white" }} className={Style.iconGm} /></h4></a>
								<span>altabirra.2021@gmail.com</span>
							</div>
						</div>
					</div>
				</div>
				<div className={Style.desarrollado}>
					<h3>Desarrollado por el equipo de AltaBirra &copy;</h3>
				</div>
			</div>
		</div>
	);
};

export default Footer

