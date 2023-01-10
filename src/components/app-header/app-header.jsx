import React from 'react';
import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={styles.header}>
 
      <nav className={`${styles.navigation} mt-4 mb-4`}>
 
        <div className={`${styles.navigationlink} pl-2 pr-5`}>
          <BurgerIcon type="primary" />
          <span className="text text_type_main-default ml-2">Конструктор</span>
        </div>
 
        <div className={`${styles.navigationlink} pl-5 pr-5 ml-2`}>
          <ListIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
        </div>
 
      </nav>
 
      <nav className={`${styles.navigation} mt-4 mb-4`} style={{justifyContent: 'center'}}>
        <Logo className="{headerStyles.logo}" />
      </nav>
 
      <nav className={`${styles.navigation} mt-4 mb-4`}>
 
        <div style={{width: '50%'}}>
        </div>

        <div className={`${styles.navigationlink} pl-5 ml-2 mt-4 mb-4`}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
        </div>
 
      </nav>
 
    </header>
  );
}

export default AppHeader;