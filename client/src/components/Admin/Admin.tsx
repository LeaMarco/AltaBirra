import styles from './Admin.module.css';
import { Route } from "react-router-dom";
import EditSpecificTypes from "./EditSpecificTypes";
import EditGenericTypes from "./EditGenericTypes";
import AdminPanel from "./AdminPanel";
import CreateSpecificTypes from './CreateSpecificTypes';
import CreateGenericTypes from './CreateGenericTypes';
import EditUsers from './EditUsers';


 function Admin() {
  
  return(
    <div className={styles.background}>
      <div className={styles.adminContainer}>
        <div className={styles.menuContainer}>
          <Route path="/admin" component={AdminPanel} />
        </div>
        <div className={styles.contentContainer}>
          <Route path="/admin/createSpecific" component={CreateSpecificTypes} />
          <Route path="/admin/editSpecific" component={EditSpecificTypes} />

          <Route path="/admin/createGeneric" component={CreateGenericTypes} />
          <Route path="/admin/editGeneric" component={EditGenericTypes} />

          <Route path="/admin/editUsers" component={EditUsers} />


        </div>
    </div>
    </div>
    
  )
};

export default Admin
