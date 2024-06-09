import { Link, NavLink, Outlet } from "react-router-dom";
import styles from './Layout.module.css';
import Button from "../../components/Button/Button";
import cn from "classnames";

export default function Layout() {
  return (
    <div className={styles.layout}>
      
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles['avatar-icon']} src="/avatar-svgrepo-com.svg" alt="Аватар пользователя" />
          <div className={styles.name}>Гордей Сайчук</div>
          <div className={styles.email}>alex@gmail.com</div>
        </div>
        
        <div className={styles.menu}>
          <NavLink
            to='/'
            className={({ isActive }) => cn(styles.link, 
              { [styles.active]: isActive })}
          >
            <img className={styles['menu-icon']} src="/menu-svgrepo-com.svg" alt="Иконка меню" />
            Меню
          </NavLink>
          <NavLink
            to='/cart'
            className={({ isActive }) => cn(styles.link, 
              { [styles.active]: isActive })}
          >
            <img className={styles['cart-icon']} src="/cart.svg" alt="Иконка корзины" />
            Корзина
          </NavLink>
        </div>
        
        <Button className={styles.exit}>
          <img className={styles['exit-icon']} src="/exit.svg" alt="Иконка выход" />
          Выход
        </Button>
      </div> 
      
      <div  className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
}
