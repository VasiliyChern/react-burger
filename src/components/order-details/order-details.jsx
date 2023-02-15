import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import doneImage from '../../images/done.jpg';

const OrderDetails = (props) => {
  return (
    <>
      <p className={`${styles.number} text text_type_digits-large pb-8`}>
        {props.number === 0 ? '...' : props.number}
      </p>
      <p className="text text_type_main-medium">
        идентификатор заказа
      </p>
      <img src={doneImage} alt='Done!' className='pt-15 pb-15' />
      <p className='text text_type_main-default pb-2'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </>  
  );
}

OrderDetails.propTypes = {
  number: PropTypes.number.isRequired
}

export default OrderDetails;