import { useSelector } from '../../hooks/hooks';
import React, { LegacyRef } from 'react';
import styles from './tab-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient'; 
import { TIngredientType, TIngredientReducerType } from '../../services/types/types-burger';
import { selectors } from '../../services/selectors';

type TTabIngredientsProps = {
  ingredients: Array<TIngredientType>;
  title: string;
  tabId: string;
}

const TabIngredients = React.forwardRef<HTMLHeadingElement, TTabIngredientsProps>((props: TTabIngredientsProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
  const burgerBun = useSelector(selectors.burgerBun);
  const filling = useSelector(selectors.filling);

  const burgerBunId = burgerBun !== null ? burgerBun._id : "";
  const ingredients = props.ingredients.filter(elem => elem);

  return (
    <section className={styles.section}>
      <h3 className="text text_type_main-medium mb-6" id={props.tabId}>{props.title}</h3>
   
      <div ref={ref} className={`${styles.section_tab} ml-4`}>
        {ingredients.map( (item) => {
          const itemCount = 
            (burgerBunId === item._id) ? 2 : filling.filter((elem: TIngredientReducerType) => elem._id === item._id).length;
          return ( 
            <BurgerIngredient key={item._id} ingredient={item} count={itemCount} />
          ) } ) }
      </div>
    </section>
  );
});

export default React.memo(TabIngredients);