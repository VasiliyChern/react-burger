import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components' 
import BurgerIngredient from '../burger-ingredient/burger-ingredient'; 
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from '../modal/modal';

const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState('bun');
  const [showIngredient, setShowIngredient] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);

  const bunIngredients = props.data.filter(elem => elem.type === "bun");
  const sauceIngredients = props.data.filter(elem => elem.type === "sauce");
  const mainIngredients = props.data.filter(elem => elem.type === "main");

  const ingredientsForType = (elementType) => {
    let result = [];
    switch (elementType) {
       case "bun":
         result = bunIngredients;
         break;
       case "sauce":
         result = sauceIngredients;
         break;
       case "main":
         result = mainIngredients;
         break;
       default:
         result = [];
         break;
    }
    return result;
  };

  const getIngredientForId = (id) => {
    if (props !== null && props.data !== undefined && props.data.length > 0 && props.data[0] !== null) {
      return props.data.find(elem => elem._id === id);
    }
    return null;
  };
  

  const openIngredient = (id) => {
    let item = getIngredientForId(id);
    if (item !== null && item !== undefined) {
      setSelectedIngredient(item);
      setShowIngredient(true);
    }
  }

  const closeModalPopup = () => {
    setSelectedIngredient(null);
    setShowIngredient(false);
  }
  
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
  
  const currentBun = props.data.find(elem => elem.type === "bun");

  const getValueCounter = (id, type) => {
    return (id === currentBun._id || type !== "bun") ? 1 : 0;
  };

  return (
    <>
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
              {ingredientsForType(current).map( (item) => { 
                return ( 
                  <div key={item._id} onClick={() => openIngredient(item._id)}>
                    <BurgerIngredient id={item._id} name={item.name} price={item.price} image={item.image} count={getValueCounter(item._id, item.type)} />
                  </div>
                ) } ) }
            </div>
          </section>
     
        </div>
     
      </div>
      {showIngredient &&
        (<Modal onClose={closeModalPopup} title="Детали ингредиента">
          <IngredientDetails
            name={selectedIngredient.name}
            proteins={selectedIngredient.proteins}
            fat={selectedIngredient.fat}
            carbohydrates={selectedIngredient.carbohydrates}
            calories={selectedIngredient.calories}
            image_large={selectedIngredient.image_large}
          />
        </Modal>)
      }
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
     _id: PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     type: PropTypes.string.isRequired,
     proteins: PropTypes.number.isRequired,
     fat: PropTypes.number.isRequired,
     carbohydrates: PropTypes.number.isRequired,
     calories: PropTypes.number.isRequired,
     price: PropTypes.number.isRequired,
     image: PropTypes.string.isRequired,
     image_mobile: PropTypes.string.isRequired,
     image_large: PropTypes.string.isRequired,
     __v: PropTypes.number.isRequired
   })).isRequired
};

export default BurgerIngredients;