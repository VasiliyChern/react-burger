import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components' 
import BurgerIngredient from '../burger-ingredient/burger-ingredient'; 
import { getElementsForType } from '../utils/data'; 
import { ingredientType } from "../utils/types";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('bun')
  
  const getSectionName = (currentTab) => {
    let result = "";
    switch (currentTab) {
       case "bun":
         result = "Булки";
         break;
       case "sauce":
         result = "Соусы";
         break;
       case "main":
         result = "Начинки";
         break;
       default:
         result = "Не найдено";
         break;
    }
   return result;
  };
  
  const getValueCounter = (id) => {
    return (id !== "60666c42cc7b410027a1a9b2") ? 1 : 0;
  };

  return (
    <div className={styles.container_ingredients}>

      <div className={`${styles.header_ingredients} mt-10 mb-5`}>
         <p className="text text_type_main-large">Соберите бургер</p>
      </div>

      <div className={`${styles.tab_ingredients}`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          {getSectionName('bun')}
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          {getSectionName('sauce')}
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          {getSectionName('main')}
        </Tab>
      </div>

      <div className={`${styles.container_tabs} mt-10 mb-10`}>

        <section className={styles.section}>
          <p className="text text_type_main-medium mb-6">{getSectionName(current)}</p>
       
          <div className={`${styles.section_tab} ml-4`}>
            {getElementsForType(current).map( (item: ingredientType) => { 
              return ( 
                <BurgerIngredient key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} count={getValueCounter(item._id)} />
              ) } ) }
          </div>
        </section>


      </div>

    </div>
  );
}

export default BurgerIngredients;