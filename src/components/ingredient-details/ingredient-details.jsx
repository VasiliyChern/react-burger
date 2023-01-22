import React from 'react';
import styles from './ingredient-details.module.css';
import { ingredientType } from '../../services/utils/types';

const IngredientDetails = (props) => {

  return (
    <>
      <img src={props.ingredient.image_large} alt='Ингредиент' className={styles.image} />

      <p className={`${styles.title} text text_type_main-medium pt-4 pb-8`}>
        {props.ingredient.name}
      </p>

      <ul className={`${styles.info} pr-15 pl-15`}>
        <li className={styles.description}>
          <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{props.ingredient.calories}</p>
        </li>
        <li className={styles.description}>
          <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.ingredient.proteins}</p>
        </li>
        <li className={styles.description}>
          <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.ingredient.fat}</p>
        </li>
        <li className={styles.description}>
          <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.ingredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired
};

export default IngredientDetails;