import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components' 
import { useInView } from 'react-intersection-observer';
import IngredientDetails from "../ingredient-details/ingredient-details";
import TabIngredients from '../tab-ingredients/tab-ingredients'; 
import Modal from '../modal/modal';
import { INGREDIENT_CHARACTERISTIC_SET, INGREDIENT_CHARACTERISTIC_RESET } from "../../services/actions/ingredient-characteristic";
import { getIngredients } from '../../services/actions/offer';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.offerIngredients);
  const showIngredient = useSelector(state => state.characteristicIngredient.ingredient);

  const [current, setCurrent] = useState('bun');

  const bunTitle = "Булки";
  const sauceTitle = "Соусы";
  const mainTitle = "Начинки";

  const bunIngredients = useMemo(
    () => ingredients.filter(elem => elem.type === "bun"),
    [ingredients]
  );
  const sauceIngredients = useMemo(
    () => ingredients.filter(elem => elem.type === "sauce"),
    [ingredients]
  );
  const mainIngredients = useMemo(
    () => ingredients.filter(elem => elem.type === "main"),
    [ingredients]
  );

  const closeModalPopup = () => {
    dispatch({ type: INGREDIENT_CHARACTERISTIC_RESET })
  };

  const onTabClick = (value) => {
    setCurrent(value);
    const elem = document.getElementById(value + 'tab');
    if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openIngredient = (item) => {
    dispatch({ type: INGREDIENT_CHARACTERISTIC_SET, payload: item })
  }

  const [headerRefBun, inViewHeaderBun] = useInView({ threshold: 0.6 });
  const [headerRefSause, inViewHeaderSause] = useInView({ threshold: 0.4 });
  const [headerRefMain, inViewHeaderMain] = useInView({ threshold: 0 });
  
  useEffect(() => {
    if (inViewHeaderBun) {
      setCurrent('bun');
    } else if (inViewHeaderSause) {
      setCurrent('sauce');
    } else if (inViewHeaderMain) {
      setCurrent('main');
    }
  }, [inViewHeaderBun, inViewHeaderSause, inViewHeaderMain]);
    
  useEffect(() => {
    dispatch(getIngredients())
  }, []);

  if (ingredientsFailed) {
    return (
      <section>
        Внимание. Выполение запроса данных завершилось ошибкой.
      </section>
    )
  } else if (ingredientsRequest) {
    return (
      <section>
        Ждите. Идет загрузка...
      </section>
    )
  } else if (ingredients) {
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
            <TabIngredients ingredients={bunIngredients}   title={bunTitle}   onClick={openIngredient} id={"buntab"}   ref={headerRefBun} />
            <TabIngredients ingredients={sauceIngredients} title={sauceTitle} onClick={openIngredient} id={"saucetab"} ref={headerRefSause} />
            <TabIngredients ingredients={mainIngredients}  title={mainTitle}  onClick={openIngredient} id={"maintab"}  ref={headerRefMain} />
          </div>
       
        </div>
        {showIngredient &&
          <Modal onClose={closeModalPopup} title="Детали ингредиента">
            <IngredientDetails ingredient={showIngredient} />
          </Modal>
        }
      </>
    );
  }
}

export default BurgerIngredients;