import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {DragIcon, ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = (props) => {
  const [showOrder, setShowOrder] = useState(false);

  const orderNum = "034536";

  const currentBun = props.data.find(elem => elem.type === "bun");

  const getOrderItems = props.data.filter(elem => elem.type !== "bun");

  const getCostOrder = () => {
    let total = 0;
    if (props.data !== undefined && props.data.length > 0 && props.data[0] !== null) {
      for (var i = 0; i < props.data.length; i++) {
        if (props.data[i].type !== "bun") {
          total += props.data[i].price;
        }
      }
      total += currentBun.price; // цена булки сверху и снизу
    }
    return total;
  };

  const doOrder = () => {
    setShowOrder(true);
  }

  const closeModalPopup = () => {
    setShowOrder(false);
  }
  
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
        {getOrderItems.map( (item) => (
              <div key={item._id} className={`${styles.main_layer} pr-2`}>
                <div className='mr-2'>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} />
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
        <span className="text text_type_digits-medium">{getCostOrder()}</span>
        <div className={`${styles.currency} ml-2 mr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={doOrder}>Оформить заказ</Button>
      </div>

    {showOrder && 
      (<Modal onClose={closeModalPopup}>
        <OrderDetails number={orderNum} />
      </Modal>)
    }

    </section>
  )
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
     _id: PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     type: PropTypes.string.isRequired,
     proteins: PropTypes.number.isRequired,
     fat: PropTypes.number.isRequired,
     carbohydrates: PropTypes.number.isRequired,
     calories: PropTypes.number.isRequired,
     price: PropTypes.number.isRequired,
     image: PropTypes.string.isRequired,
     image_mobile: PropTypes.string.isRequired,
     image_large: PropTypes.string.isRequired,
     __v: PropTypes.number.isRequired
   })).isRequired
};

export default BurgerConstructor;
