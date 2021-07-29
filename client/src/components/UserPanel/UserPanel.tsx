import styles from './UserPanel.module.css';
import { Link } from "react-router-dom";
import { ModalChangePassword } from "./ChangePassword/ChangePasswordModal/Modal.component";
import { ChangePassword } from "./ChangePassword/ChangePasswordComponent/ChangePassword";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useState } from "react";
import axios from 'axios';
import { validationHeadersGenerator } from "../../validationHeadersGenerator";


interface User {
	nombre: string;
	id: number;
	premium: boolean;
	favoritos: number;
}

function AdminPanel() {
    
	const [seeModal, setSeeModal] = useState<boolean>(false)
	const [showYeahNewPassword, setShowYeahNewPassword] = useState<boolean>(false)
	const history = useHistory();
	const user: User = useSelector((state: RootState) => state.welcome);
	const [seeAdmin, setSeeAdmin] = useState<boolean>(false);
	function toggleSeeModal() {
		setSeeModal(!seeModal)
	}

	function handleDesactivarCuenta(e) {
		e.preventDefault()
		axios.patch(`${process.env.REACT_APP_HOST_BACKEND}/desactivateAccount`, null, { headers: validationHeadersGenerator() }).then(res => {
			localStorage.clear()
			console.log(res)
			history.push("")
		})
	}

  
  return(
    <div className={styles.mainContainer}>
        <div className={styles.panelTitle}>Panel de usuario</div>
        <Link to="/panel/historialVistos" className={styles.menuButton}>
					Vistos recientemente
			</Link>
			<Link to="/panel/vendiendo" className={styles.menuButton}>
					Posts en venta
			</Link>
			<Link to="/panel/historialCompras" className={styles.menuButton}>
					Historial de compras
			</Link>
			<Link to="/panel/historialVentas" className={styles.menuButton}>
					Historial de ventas
			</Link>
			<Link to="/post" className={styles.menuButton}>
					Crear nuevo post
			</Link>
			{
				localStorage.tokenLocal
					? <button onClick={toggleSeeModal} className={styles.menuButton} > Cambiar contraseña </button>
					: null
			}
			<ModalChangePassword isOpen={seeModal} handleClose={toggleSeeModal} >
				{
					showYeahNewPassword
						? <img src={"https://www.uala.com.mx/assets/images/gif/security.gif"} />
						: <ChangePassword setYeahNewPassword={setShowYeahNewPassword} toggleSeeModal={toggleSeeModal} />
				}
			</ModalChangePassword>
			<button className={styles.menuButton} onClick={handleDesactivarCuenta}> Desactivar cuenta </button>
			<Link to="/admin" className={styles.menuButton}>
					Panel de administrador
			</Link>
    </div>
  )
};

export default AdminPanel
