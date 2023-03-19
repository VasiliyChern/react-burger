import { useParams } from "react-router-dom";
import { useSelector } from '../../hooks/hooks';
import React, { useMemo } from 'react';
import styles from './ingredient-details.module.css';
import { TIngredientType } from '../../services/types/types-burger';
import { selectors } from '../../services/selectors';

const IngredientDetails = () => {
  const ingredients = useSelector(selectors.ingredients);
  const { id } = useParams();
  const ingredient = useMemo(
    () => ingredients.find((elem: TIngredientType) => elem._id === id),
    [ingredients, id]
  );
  return (
    <>
      {ingredient && (
        <>
          <img src={ingredient.image_large} alt='Ингредиент' className={styles.image} />

          <p className={`${styles.title} text text_type_main-medium pt-4 pb-8`}>
            {ingredient.name}
          </p>

          <ul className={`${styles.info} pr-15 pl-15`}>
            <li className={styles.description}>
              <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
              <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
            </li>
            <li className={styles.description}>
              <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
              <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
            </li>
            <li className={styles.description}>
              <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
              <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
            </li>
            <li className={styles.description}>
              <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
              <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </>
      )}
    </>
  )
}

export default React.memo(IngredientDetails);