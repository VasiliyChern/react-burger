import { useDispatch, useSelector } from '../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {CurrencyIcon, Button, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";
import { addIngredientToSelection } from '../../services/actions/selection';
import { orderBurger, ORDER_RESET } from '../../services/actions/order';
import { haveUserAccess } from '../../services/actions/user';
import { useDrop } from "react-dnd";
import { TIngredientReducerType } from '../../services/types/types-burger';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {burgerBun, filling} = useSelector(state => state.selectionIngredients);
  const {order, orderRequest} = useSelector(state => state.order);

  const [showOrder, setShowOrder] = useState(false);

  const totalPrice = useMemo(
    () => {
    let total = 0;
    if (burgerBun) {
      total += burgerBun.price * 2;
    }
    for (var i = 0; i < filling.length; i++) {
      total += filling[i].price;
    }
    return total;
  }, [burgerBun, filling]);

  const doOrder = () => {
    if (!burgerBun || orderRequest) {
      return;
    }
    else if (!haveUserAccess()) {
      navigate('/login');
    }
    else if (burgerBun !== null && filling.length > 0) {
      let orderIds = [burgerBun._id, ...filling.map(item => item._id)];

      dispatch(orderBurger(orderIds));
      setShowOrder(true);
    }
  };

  const closeModalPopup = () => {
    dispatch({ type: ORDER_RESET });
    setShowOrder(false);
  };

  const returnedOrderNumber = useMemo( () => {
    return order ?? 0
    }, [order]
  );

  const [, dropRefTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredientReducerType) {
      dispatch(addIngredientToSelection(item));
    }
  });
  
  return (
    <section className={`${styles.container_layers} mt-25 ml-4`} ref={dropRefTarget} >
      {!burgerBun ?
        <div className={styles.empty_default_area}>
          <p className="text text_type_main-default">?????????????????????? ?? ?????? ?????????????? ?????????????????? ??????????????.</p>
          <p className="text text_type_main-default">?? ?????????? ?????????????? ?? ??????????.</p>
        </div> 
        : null
      }

      {burgerBun &&
        <>
          <div className='pr-4 pl-8'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerBun.name + " (????????)"}
              price={burgerBun.price}
              thumbnail={burgerBun.image_mobile}
            />
          </div>
       
          <div className={styles.main_layers}>
            {filling.map( (fillingItem, index) => (
              <IngredientConstructor key={fillingItem.id} index={index} item={fillingItem} />
              ))}
          </div>
       
          <div className='pr-4 pl-8 mb-6'>
            <ConstructorElement
               type="bottom"
               isLocked={true}
               text={burgerBun.name + " (??????)"}
               price={burgerBun.price}
               thumbnail={burgerBun.image_mobile}
             />
          </div>
        </>
      }
    
      <div className={`${styles.make_order} ml-8 mb-4`}>
        {totalPrice && <span className="text text_type_digits-medium">{totalPrice}</span>}
        <div className={`${styles.currency} ml-2 mr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" disabled={!burgerBun} onClick={doOrder}>???????????????? ??????????</Button>
      </div>
   
      {showOrder && 
        <Modal onClose={closeModalPopup}>
          <OrderDetails number={returnedOrderNumber} />
        </Modal>
      }
    </section>
  )
};

export default BurgerConstructor;
