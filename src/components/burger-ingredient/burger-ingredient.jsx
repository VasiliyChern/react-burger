import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../services/utils/types';
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

const BurgerIngredient = (props) => {
  const location = useLocation();

  const [{ opacity }, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: { ...props.ingredient },
    collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
    })
  }));

  return (
    <Link className={styles.container_ingredients} style={{ opacity }} ref={dragRef}
      to={`/ingredients/${props.ingredient._id}`}
      state={{ background: location }}
    >
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
   
    </Link>
  )
};

BurgerIngredient.propTypes = {
  ingredient: ingredientType.isRequired,
  count: PropTypes.number,
};

export default BurgerIngredient;
