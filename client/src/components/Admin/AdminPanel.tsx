import styles from './AdminPanel.module.css';
import { Link } from "react-router-dom";

function AdminPanel() {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.panelTitle}>Admin Panel</div>
            <Link to="/admin/createSpecific" className={styles.menuButton}>
                Crear Tipos Específicos
            </Link>
            <Link to="/admin/editSpecific" className={styles.menuButton}>
                Editar Tipos Específicos
            </Link>
            <Link to="/admin/createGeneric" className={styles.menuButton}>
                Crear Tipos Genéricos
            </Link>
            <Link to="/admin/editGeneric" className={styles.menuButton}>
                Editar Tipos Genéricos
            </Link>
            <Link to="/admin/moderatePosts" className={styles.menuButton}>
                Moderar Posts
            </Link>
            <Link to="/admin/editUsers" className={styles.menuButton}>
                Editar Usuarios
            </Link>
            <Link to="/panel" className={styles.menuButtonBack}>
                <img src="https://image.flaticon.com/icons/png/512/93/93634.png" alt="" className={styles.menuButtonBackImg} />
                <span>Volver al menú de Usuario</span>
            </Link>
        </div>
    )
};

export default AdminPanel
