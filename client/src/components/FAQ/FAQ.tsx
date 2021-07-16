import Style from './FAQ.module.css'


export default function FAQ() {
    return (
        <div>
            <div>
                <h1>Preguntas Frecuentes</h1>
                <ul className={Style.ul} >
                    <li>  ¿Que es AltaBirra? </li>
                    <li>  ¿Que Beneficios Tiene Prime? </li>
                    <li>  ¿Donde Puedo Logearme? </li>
                    <li>  ¿Como Puedo Hacer Un Post? </li>
                    <li>  ¿Cuales Son los Tipos De Cerveza? </li>
                    <li>  ¿Tengo Limites De Post? </li>
                    <li>  ¿Son obligatorios Los Descuentos? </li>
                    <li>  ¿En Que Otra Cosa Podemos Ayudarte? </li>
                </ul>
            </div>
        </div>
    )
}
