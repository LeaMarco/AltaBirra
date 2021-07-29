import { Route } from "react-router-dom";
import styles from "./User.module.css";
import UserPanel from "./UserPanel";
import ViewsHistory from "../ViewHistory/ViewHistory";
import Selling from "../Selling/Selling";
import Post from "../Post/Post";
import SellHistory from "../SellHistory/SellHistory";
import BuyHistory from "../BuyHistory/BuyHistory";


function Admin() {

  return (
    <div className={styles.background}>
    <div className={styles.adminContainer}>
      <div className={styles.menuContainer}>
        <Route path="/panel" component={UserPanel} />
      </div>
      <div className={styles.contentContainer}>
        <Route path="/panel/historialVistos" component={ViewsHistory} />
        <Route path="/panel/vendiendo" component={Selling} />

        <Route path="/panel/historialCompras" component={BuyHistory} />
        <Route path="/panel/historialVentas" component={SellHistory} />

      </div>
    </div>
    //</div>
  );
}

export default Admin;
