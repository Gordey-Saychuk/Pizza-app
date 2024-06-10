
import { Outlet } from 'react-router-dom';
import styles from './AuthLoyaut.module.css';


export default function Layout() {
  return (
    <div className={styles.layout}>
      
      <div className={styles.logo}>
        Logo
      </div>
      <div  className={styles['content']}>
        <Outlet />
      </div>

    </div>
  );
}
