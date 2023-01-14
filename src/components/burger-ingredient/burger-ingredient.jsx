import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../utils/types';

const BurgerIngredient = (props) => {

  return (
    <div className={styles.container_ingredients}>
   
      <div className={styles.image_counter} >
        <img src={props.ingredient.image} alt={props.ingredient.name} className={styles.image} />
        {(props.count > 0) && <Counter count={props.count} size="default" />}
      </div>
   
      <div className={`${styles.price} mt-2 mb-2`}>
        <p className="text text_type_digits-default pr-2">{props.ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
   
      <div className={styles.name}>
        <p className="text text_type_main-default">{props.ingredient.name}</p>
      </div>
   
    </div>
  )
};

BurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  count: PropTypes.number
};

export default BurgerIngredient;
