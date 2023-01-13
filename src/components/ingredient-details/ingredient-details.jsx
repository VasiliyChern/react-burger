import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {

  return (
    <>
      <img src={props.image_large} alt='Ингредиент' className={styles.image} />

      <p className={`${styles.title} text text_type_main-medium pt-4 pb-8`}>
        {props.name}
      </p>

      <ul className={`${styles.info} pr-15 pl-15`}>
        <li className={styles.description}>
          <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">{props.calories}</p>
        </li>
        <li className={styles.description}>
          <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.proteins}</p>
        </li>
        <li className={styles.description}>
          <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.fat}</p>
        </li>
        <li className={styles.description}>
          <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">{props.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  image_large: PropTypes.string
};

export default IngredientDetails;