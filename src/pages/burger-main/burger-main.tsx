import React from 'react';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import styles from './burger-main.module.css';

const BurgerMainPage = () => {
  return (
    <main className={styles.content}>
      <DndProvider backend={HTML5Backend} >
        <BurgerIngredients />
        <div className='pr-5 pl-5' />
        <BurgerConstructor />
      </DndProvider>
    </main> 
  );
}

export default React.memo(BurgerMainPage);