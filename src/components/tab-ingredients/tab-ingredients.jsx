import { useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './tab-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient'; 
import { ingredientType } from '../../services/utils/types';

const TabIngredients = React.forwardRef((props, ref) => {
  const {burgerBun, filling} = useSelector(state => state.selectionIngredients);
  const burgerBunId = burgerBun !== null ? burgerBun._id : "";
  const ingredients = props.ingredients.filter(elem => elem);

  return (
    <section className={styles.section}>
      <h3 className="text text_type_main-medium mb-6" id={props.id}>{props.title}</h3>
   
      <div ref={ref} className={`${styles.section_tab} ml-4`}>
        {ingredients.map( (item) => {
          const itemCount = 
            (burgerBunId === item._id) ? 2 : filling.filter(elem => elem._id === item._id).length;
          return ( 
            <BurgerIngredient key={item._id} ingredient={item} count={itemCount} onClick={props.onClick} />
          ) } ) }
      </div>
    </section>
  );
});

TabIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}; 

export default TabIngredients;