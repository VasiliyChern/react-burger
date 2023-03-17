import { useDispatch, useSelector } from '../../hooks/hooks';
import { useMemo, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from './feed.module.css';
import StructureOrder from '../../components/structure-order/structure-order'; 
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws';
import { WS_ORDERS_FEED_URL } from '../../services/utils/data';
import { TwsOrderType } from '../../services/types/types-burger';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation(); 

  useEffect(() => {
    dispatch(wsConnectionStart(WS_ORDERS_FEED_URL));

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch]);

  const { orders, total, totalToday } = useSelector(state => state.ws);

  const countRowInColumn = 10;
  
  const doneOrders = useMemo(
    () => orders.filter((elem: TwsOrderType) => elem.status === 'done')
      .map((elem: TwsOrderType) => elem.number),
    [orders]
  );
  const pendingOrders = useMemo(
    () => orders.filter((elem: TwsOrderType) => elem.status === 'pending')
      .map((elem: TwsOrderType) => elem.number),
    [orders]
  );

  const doneOrdersFirstColumn = useMemo(
    () => doneOrders.slice(0, countRowInColumn),
    [doneOrders]
  );
  const doneOrdersSecondColumn = useMemo(
    () => doneOrders.slice(countRowInColumn, 2 * countRowInColumn),
    [doneOrders]
  );

  const pendingOrdersFirstColumn = useMemo(
    () => pendingOrders.slice(0, countRowInColumn),
    [pendingOrders]
  );
  const pendingOrdersSecondColumn = useMemo(
    () => pendingOrders.slice(countRowInColumn, 2 * countRowInColumn),
    [pendingOrders]
  );

  return (
    <main className={styles.content}>
      <section className={styles.left_section}>
        <p className="text text_type_main-large mt-6">Лента заказов</p>
        <div className={`${styles.feed_orders} mt-4 mb-10`}>
          {orders && orders.map((elem: TwsOrderType, index: number) => 
            <StructureOrder key={index} order={elem} isPerson={false} />
          )}
        </div>
      </section>
      <section className={styles.right_section}>
        <div className={styles.list_orders}>
          <section>
            <p className="text text_type_main-medium">Готовы:</p>
            <div className={`${styles.list_number_orders} ${styles.ready_orders}`}>
              <ul className={styles.ul_orders}>
                {doneOrdersFirstColumn.map( (item, index) => 
                  <li key={index} className="mt-2 mr-8">
                    <Link to={`${item}`} state={{ background: location }} className={styles.ready_order}>
                      <span className="text text_type_digits-default">{item}</span>
                    </Link>
                  </li>
                )}
              </ul>
              <ul className={styles.ul_orders}>
                {doneOrdersSecondColumn.map( (item, index) => 
                  <li key={index} className="mt-2 mr-8">
                    <Link to={`${item}`} state={{ background: location }} className={styles.ready_order}>
                      <span className="text text_type_digits-default">{item}</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </section>
          <section>
            <p className="text text_type_main-medium">В работе:</p>
            <div className={styles.list_number_orders}>
              <ul className={styles.ul_orders}>
                {pendingOrdersFirstColumn.map( (item, index) => 
                  <li key={index} className="mt-2 mr-8">
                    <Link to={`${item}`} state={{ background: location }} className={styles.work_order}>
                      <span className="text text_type_digits-default">{item}</span>
                    </Link>
                  </li>
                )}
              </ul>
              <ul className={styles.ul_orders}>
                {pendingOrdersSecondColumn.map( (item, index) => 
                  <li key={index} className="mt-2 mr-8">
                    <Link to={`${item}`} state={{ background: location }} className={styles.work_order}>
                      <span className="text text_type_digits-default">{item}</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </section>
        </div>
        <section>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className={`${styles.text_sh} text text_type_digits-large pb-8`}>{total}</p>
        </section>
        <section>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`${styles.text_sh} text text_type_digits-large pb-8`}>{totalToday}</p>
        </section>

      </section>
    </main>
  );
}
