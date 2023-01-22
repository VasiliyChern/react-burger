import React, { useState, useContext, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {DragIcon, ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";
import { SelectionContext, OrderNumberContext } from '../../services/burger-context';
import { postApiBurgerOrder } from '../../services/utils/data';

const BurgerConstructor = () => {
  const {selectionContext} = useContext(SelectionContext);
  const {orderNum, setOrderNum} = useContext(OrderNumberContext);

  const [showOrder, setShowOrder] = useState(false);

  const currentBun = useMemo(
    () => 
      selectionContext !== '' && selectionContext.find(elem => elem.value.type === "bun").value
  , [selectionContext]);
  
  const filling = useMemo(
    () =>
      selectionContext !== '' && selectionContext.filter(elem => elem.value.type !== "bun")
  , [selectionContext]);

  const totalPrice = useMemo(
    ()=> {
    let total = 0;
    if (currentBun !== '') {
      total += currentBun.price * 2;
    }
    if (filling !== '') {
      for (var i = 0; i < filling.length; i++) {
        total += filling[i].value.price;
      }
    }
    return total;
  }, [currentBun, filling]);

  const doOrder = () => {
    let orderIds = selectionContext.map( item => item.value._id);

    postApiBurgerOrder(orderIds)
      .then(data => setOrderNum(data))
      .catch(error => console.error(error));

    setShowOrder(true);
  };

  const closeModalPopup = () => {
    setShowOrder(false);
  }

  const returnedOrderNumber = useMemo( () => {
    return orderNum ? orderNum.order.number : 0
    }, [orderNum]
  );

  return (
    <section className={`${styles.container_layers} mt-25 ml-4`}>
      {currentBun &&
        <div className='pr-4 pl-8'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={currentBun.name + " (верх)"}
            price={currentBun.price}
            thumbnail={currentBun.image_mobile}
          />
        </div>
      }
    
      <div className={styles.main_layers}>
        {filling && filling.map( (item) => (
              <div key={item.id} className={`${styles.main_layer} pr-2`}>
                <div className='mr-2'>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement text={item.value.name} price={item.value.price} thumbnail={item.value.image_mobile} />
              </div>
          ))}
      </div>
    
      {currentBun &&
        <div className='pr-4 pl-8 mb-6'>
          <ConstructorElement
             type="bottom"
             isLocked={true}
             text={currentBun.name + " (низ)"}
             price={currentBun.price}
             thumbnail={currentBun.image_mobile}
           />
        </div>
      }
    
      <div className={`${styles.make_order} ml-8 mb-4`}>
        {totalPrice && <span className="text text_type_digits-medium">{totalPrice}</span>}
        <div className={`${styles.currency} ml-2 mr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={doOrder}>Оформить заказ</Button>
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
