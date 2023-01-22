import React, { useState, useContext, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components' 
import IngredientDetails from "../ingredient-details/ingredient-details";
import TabIngredients from '../tab-ingredients/tab-ingredients'; 
import Modal from '../modal/modal';
import { OfferContext } from '../../services/burger-context';

const BurgerIngredients = () => {
  const {offerContext} = useContext(OfferContext);

  const [current, setCurrent] = useState('bun');

  const [showIngredient, setShowIngredient] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  
  const bunTitle = "Булки";
  const sauceTitle = "Соусы";
  const mainTitle = "Начинки";

  const bunIngredients = useMemo(
    () => offerContext.data.filter(elem => elem.type === "bun"),
    [offerContext.data]
  );
  const sauceIngredients = useMemo(
    () => offerContext.data.filter(elem => elem.type === "sauce"),
    [offerContext.data]
  );
  const mainIngredients = useMemo(
    () => offerContext.data.filter(elem => elem.type === "main"),
    [offerContext.data]
  );
  
  const closeModalPopup = () => {
    setSelectedIngredient(null);
    setShowIngredient(false);
  };
  
  const onTabClick = (value) => {
    setCurrent(value);
    const elem = document.getElementById(value + 'tab');
    if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openIngredient = (item) => {
    setSelectedIngredient(item);
    setShowIngredient(true);
  };

  return (
    <>
      <div className={styles.container_ingredients}>
     
        <div className={`${styles.header_ingredients} mt-10 mb-5`}>
           <p className="text text_type_main-large">Соберите бургер</p>
        </div>
     
        <div className={`${styles.tab_ingredients}`}>
          <Tab value="bun" active={current === 'bun'} onClick={onTabClick}>
            {bunTitle}
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={onTabClick}>
            {sauceTitle}
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={onTabClick}>
            {mainTitle}
          </Tab>
        </div>
     
        <div className={`${styles.container_tabs} mt-10 mb-10`}>
          <TabIngredients ingredients={bunIngredients} title={bunTitle} onClick={openIngredient} id={"buntab"} />
          <TabIngredients ingredients={sauceIngredients} title={sauceTitle} onClick={openIngredient} id={"saucetab"} />
          <TabIngredients ingredients={mainIngredients} title={mainTitle} onClick={openIngredient} id={"maintab"} />
        </div>
     
      </div>
      {showIngredient &&
        <Modal onClose={closeModalPopup} title="Детали ингредиента">
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      }
    </>
  );
}

export default BurgerIngredients;