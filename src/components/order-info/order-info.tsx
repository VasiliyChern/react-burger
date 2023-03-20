import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { TIngredientType } from '../../services/types/types-burger';
import { orderInfoBurger } from '../../services/actions/order';
import { ORDER_INFO_RESET } from '../../services/constants/order';
import { selectors } from '../../services/selectors';

const OrderInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderInfoBurger(id));

    return () => {
      dispatch({type: ORDER_INFO_RESET})
    }
  }, [dispatch, id]);

  const orderInformation = useSelector(selectors.orderInformation);
  const ingredients = useSelector(selectors.ingredients);

  const noDoubleIds = useMemo(
    () => {
      if (orderInformation === null) {
        return null;
      }
      return orderInformation!.ingredients.filter(
        (item, index) => orderInformation!.ingredients.indexOf(item) === index
      )
    }, [orderInformation]
  );

  const orderIngredients = useMemo(
    () => {
      if (noDoubleIds === null) {
        return null;
      }
      return noDoubleIds.map((elemId: string) => {
        return ingredients.find((elem: TIngredientType) => elem._id === elemId)
      })
    }, [ingredients, noDoubleIds]
  );

  const orderAmount = useMemo(
    () => {
      if (orderIngredients === null) {
        return null;
      }
      return orderIngredients.reduce( (amount: number, elem: TIngredientType | undefined) => 
        amount + elem!.price * (orderInformation!.ingredients.filter((elemId: string) => elemId === elem!._id).length)
      , 0)
    }, [orderIngredients, orderInformation]
  );

  const orderStatus = useMemo(
    () => {
      if (orderInformation === null) {
        return null;
      }
      return orderInformation!.status === 'done'
        ? 'Выполнен' 
        : orderInformation!.status === 'created' 
          ? 'Создан'
          : 'Готовится'
    }, [orderInformation]
  );

  return (
    <main className={styles.main_container}>
      {orderInformation &&
        <>
          <p className={`text text_type_digits-default mb-10 ${styles.number_order}`}>
            #{orderInformation!.number}
          </p>
          <p className={`text text_type_main-medium mb-3`}>
            {orderInformation!.name}
          </p>
          <p className={`text text_type_main-default mb-10 ${styles.status_order}`}>
            {orderStatus}
          </p>
          <p className="text text_type_main-medium mb-2">
            {'Состав:'}
          </p>
          <section className={styles.fill_order}>
            {orderIngredients && orderIngredients.map((item: TIngredientType | undefined, i: number) => {
              const itemCount = orderInformation!.ingredients.filter((elemId: string) => elemId === item!._id).length;
              return (
                <li key={i} className="mt-4 mr-6">
                  <div className={styles.row_fill}>
                    <div className={styles.image_name}>
                      <div className={styles.image_fill}>
                         <img src={item!.image_mobile} alt={item!.name} />
                      </div>
                      <p className={`text text_type_main-default ml-4 ${styles.pname}`}>{item!.name}</p>
                    </div>
                    <div className={styles.count_price}>
                      <span className="text text_type_digits-default mr-2">{`${itemCount} x ${item!.price}`}</span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
              )
            })}
          </section>
          <section className={`text text_type_main-default mt-10 ${styles.food_order}`}>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(orderInformation!.createdAt)} className='text text_type_main-default text_color_inactive' />
            </p>
       
            <div className={styles.count_price}>
              <span className={`text text_type_digits-default mr-2`}>{orderAmount}</span>
              <CurrencyIcon type="primary" />
            </div>
          </section>
        </>
      }
    </main>
  );
}

export default React.memo(OrderInfo);