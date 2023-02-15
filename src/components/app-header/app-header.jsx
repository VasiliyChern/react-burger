import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
  const locationPath = useLocation();

  const activeNav = useMemo(
    () => {
      if (locationPath.pathname === '/' || locationPath.pathname.toLowerCase().indexOf('/ingredients') === 0) {
        return 'burger';
      }
      else if (locationPath.pathname.toLowerCase().indexOf('/feed') === 0) {
        return 'feed';
      }
      else if (locationPath.pathname.toLowerCase().indexOf('/profile') === 0) {
        return 'person';
      }
      else {
        return '';
      }
    }
    , [locationPath]
  );

  return (
    <header className={styles.header}>

      <nav className={`${styles.navigation} mt-4 mb-4`}>
        <NavLink to='/' className={`${styles.navigationlink} pl-2 pr-5`}>
          <BurgerIcon type={activeNav === 'burger' ? 'primary' : 'secondary'} />
          <span className={`text text_type_main-default ${activeNav === 'burger' ? styles.active : 'text_color_inactive'} ml-2`}>
            Конструктор
          </span>
        </NavLink>

        <NavLink to='/feed' className={`${styles.navigationlink} pl-5 pr-5 ml-2`}>
          <ListIcon type={activeNav === 'feed' ? 'primary' : 'secondary'} />
          <span className={`text text_type_main-default ${activeNav === 'feed' ? styles.active : 'text_color_inactive'} ml-2`}>
            Лента заказов
          </span>
        </NavLink>
      </nav>

      <nav className={`${styles.navigation} mt-4 mb-4`} style={{justifyContent: 'center'}}>
        <NavLink to='/' className={`${styles.navigationlink} mt-4 mb-4`}>
          <Logo className={styles.logo} />
        </NavLink>
      </nav>

      <nav className={`${styles.navigation} mt-4 mb-4`}>
        <div style={{width: '50%'}} />
        <NavLink to='/profile' className={`${styles.navigationlink} mt-4 mb-4`}>
          <ProfileIcon type={activeNav === 'person' ? 'primary' : 'secondary'} />
          <span className={`text text_type_main-default ${activeNav === 'person' ? styles.active : 'text_color_inactive'} ml-2`}>
            Личный кабинет
          </span>
        </NavLink>
      </nav>
 
    </header>
  );
}

export default AppHeader;