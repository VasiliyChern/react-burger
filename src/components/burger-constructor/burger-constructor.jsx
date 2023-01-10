import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {DragIcon, ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = props => {
  const currentBun = props.data[0];
  
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

  return (
  <div className={`${styles.container_layers} mt-25 ml-4`}>

    <div className='pr-4 pl-8'>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={currentBun.name + " (верх)"}
        price={currentBun.price}
        thumbnail={currentBun.image_mobile}
      />
    </div>

    <div className={styles.main_layers}>
      {getOrderItems.map( item => (
            <div key={item._id} className={`${styles.main_layer} pr-2`}>
              <div className='mr-2'>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement text={item.name} price={item.price} thumbnail={item.image_mobile} />
            </div>
        ))}
    </div>

   <div className='pr-4 pl-8 mb-6'>
     <ConstructorElement
        type="bottom"
        isLocked={true}
        text={currentBun.name + " (низ)"}
        price={currentBun.price}
        thumbnail={currentBun.image_mobile}
      />
    </div>

    <div className={`${styles.make_order} ml-8 mb-4`}>
      <span className="text text_type_digits-medium">{getCostOrder()}</span>
      <div className='ml-2 mr-10'>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
    </div>

  </div>
  )
};

BurgerConstructor.propTypes = {
  data: PropTypes.array
};

export default BurgerConstructor;
