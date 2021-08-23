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
import Swal from "sweetalert2";

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
	// const user: User = useSelector((state: RootState) => state.welcome);
	const userRole = useSelector((state: RootState) => state.welcome["userRol"]);
	// const [seeAdmin, setSeeAdmin] = useState<boolean>(false);
	function toggleSeeModal() {
		setSeeModal(!seeModal)
	}

	function handleDesactivarCuenta(e) {
		e.preventDefault()
		Swal.fire({
			title: '¿Estas seguro de desactivar tu cuenta?',
			text: "No se puede revertir...",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Borrar Todo'
		}).then(async (result) => {
			if (result.isConfirmed) {
				await axios.patch(`${process.env.REACT_APP_HOST_BACKEND}/desactivateAccount`, null, { headers: validationHeadersGenerator() }).then(res => {
					localStorage.clear()
					history.push("")
					window.location.reload()
				})
			}
		})
	}

	return (
		<div className={styles.mainContainer}>
			<div className={styles.panelTitle}>Panel de usuario</div>
			<Link to="/panel" className={styles.menuButton}>
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
					? <button style={{ cursor: "pointer" }} onClick={toggleSeeModal} className={styles.menuButton} > Cambiar contraseña </button>
					: null
			}
			<ModalChangePassword isOpen={seeModal} handleClose={toggleSeeModal} >
				{
					showYeahNewPassword
						? <img src={"https://www.uala.com.mx/assets/images/gif/security.gif"} />
						: <ChangePassword setYeahNewPassword={setShowYeahNewPassword} toggleSeeModal={toggleSeeModal} />
				}
			</ModalChangePassword>
			<button style={{ cursor: "pointer" }} className={styles.menuButton} onClick={handleDesactivarCuenta}> Desactivar cuenta </button>
			{
				userRole === "ADMIN" ?
					<Link to="/admin" className={styles.menuButton}>
						Panel de administrador
					</Link>
					:
					null
			}
		</div>
	)
};

export default AdminPanel
