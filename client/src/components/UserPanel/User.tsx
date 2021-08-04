import { Route } from "react-router-dom";
import styles from "./User.module.css";
import UserPanel from "./UserPanel";
import ViewsHistory from "../ViewHistory/ViewHistory";
import Selling from "../Selling/Selling";
import Post from "../Post/Post";
import SellHistory from "../SellHistory/SellHistory";
import BuyHistory from "../BuyHistory/BuyHistory";
import NoAuthorized from "../NoAuthorized/NoAuthorized";

function User() {

  function autorizeComponent(Component) {
    return Object.keys(localStorage).join().includes('token') ? Component : NoAuthorized
  }

  return (
    <div className={styles.background}>
      <div className={styles.adminContainer}>
        <div className={styles.menuContainer}>
          <Route path="/panel" component={autorizeComponent(UserPanel)} />
        </div>
        <div className={styles.contentContainer}>
          <Route exact path="/panel" component={autorizeComponent(ViewsHistory)} />
          <Route exact path="/panel/vendiendo" component={autorizeComponent(Selling)} />

          <Route exact path="/panel/historialCompras" component={autorizeComponent(BuyHistory)} />
          <Route exact path="/panel/historialVentas" component={autorizeComponent(SellHistory)} />

        </div>
      </div>
    </div>
  );
}

export default User;
