import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './tab-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient'; 
import { ingredientType } from '../../services/utils/types';
import { SelectionContext } from '../../services/burger-context';

const TabIngredients = (props) => {
  const {selectionContext} = useContext(SelectionContext);

  const ingredients = props.ingredients.filter(elem => elem);

  return (
    <section className={styles.section}>
      <h3 className="text text_type_main-medium mb-6" id={props.id}>{props.title}</h3>
   
      <div className={`${styles.section_tab} ml-4`}>
        {ingredients.map( (item) => {
          const itemCount = selectionContext !== ''
            ? selectionContext.filter(elem => elem.value._id === item._id).length 
              * (item.type === "bun" ? 2 : 1)
            : 0;
          return ( 
            <BurgerIngredient key={item._id} ingredient={item} count={itemCount} onClick={props.onClick} />
          ) } ) }
      </div>
    </section>
  );
}

TabIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}; 

export default TabIngredients;