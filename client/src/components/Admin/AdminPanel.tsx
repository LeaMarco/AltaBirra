import styles from './AdminPanel.module.css';
import { Link } from "react-router-dom";

function AdminPanel() {
  
  return(
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
    </div>
  )
};

export default AdminPanel
