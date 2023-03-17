import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { TIngredientType } from '../../services/types/types-burger';
import { orderInfoBurger } from '../../services/actions/order';

const OrderInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderInfoBurger(id));
  }, [dispatch, id]);

  const { orderInformation } = useSelector(state => state.order);
  const { ingredients } = useSelector(state => state.offerIngredients);

  const orderIngredients = useMemo(
    () => {
      if (orderInformation === null) {
        return null;
      }
      return orderInformation!.ingredients.map((elemId: string) => {
        return ingredients.find((elem: TIngredientType) => elem._id === elemId)
      })
    }, [ingredients, orderInformation]
  );

  const orderAmount = useMemo(
    () => {
      if (orderIngredients === null) {
        return null;
      }
      return orderIngredients!.reduce( (amount: number, elem: TIngredientType | undefined) => elem!.price + amount, 0)
    }, [orderIngredients]
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
                      <span className="text text_type_digits-default mr-2">{`1 x ${item!.price}`}</span>
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

export default OrderInfo;