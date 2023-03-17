import { useDispatch, useSelector } from '../../hooks/hooks';
import { useEffect } from 'react';
import styles from './history-orders-profile.module.css';
import StructureOrder from '../../components/structure-order/structure-order'; 
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/ws';
import { WS_ORDERS_PERSON_URL } from '../../services/utils/data';
import { getCookie } from '../../services/utils/cookie';
import { TwsOrderType } from '../../services/types/types-burger';

export const HistoryOrdersProfile = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken'); 

  const { orders } = useSelector(state => state.ws);

  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_ORDERS_PERSON_URL}?token=${accessToken}`));

    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch, accessToken]);

  return (
    <div className={styles.container}>
      {orders && orders.map((elem: TwsOrderType, index: number) => 
        <StructureOrder key={index} order={elem} isPerson={true} />
      )}
    </div>
  );
}
