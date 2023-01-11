import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../utils/data';

function App() {
  const arrData = getData();
  
  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={styles.content}>
        <BurgerIngredients />
        <div className='pr-5 pl-5' />
        <BurgerConstructor data={arrData} />
      </main>
    </div>
  );
}

export default App;