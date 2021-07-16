
import Style from './FootHelp.module.css'

export default function FootHelp() {

    return (
        <div className={Style.foot}>
            <div className={Style.subTitle}>
                <h1>Foot</h1>
            </div>
            <div className={Style.contFoot}>

                <div>
                    <h4>Mi Cuenta</h4>
                    <div>
                        <ul className={Style.ul}>
                            <li>Favoritos</li>
                            <li>Carrito </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h4>Preguntas Frecuentes</h4>
                    <div>
                        <ul className={Style.ul}>
                            <li>Como Hacer Un Post</li>
                            <li>Donde Puedo Ver Mis</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h4>Aboute</h4>
                    <div>
                        <ul className={Style.ul}>
                            <li>Favoritos</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <ul>
                        <li><a href="#">Enlace 2</a>
                            <ul>
                                <li><a href="#">Enlace 2.1</a></li>
                                <li><a href="#">Enlace 2.2</a></li>
                                <li><a href="#">Enlace 2.3</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}