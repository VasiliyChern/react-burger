import { useDispatch, useSelector } from '../../hooks/hooks';
import React, { useEffect } from 'react';
import styles from './history-orders-profile.module.css';
import StructureOrder from '../../components/structure-order/structure-order'; 
import { wsPersonStart, wsPersonClosed } from '../../services/actions/ws-person';
import { WS_ORDERS_PERSON_URL } from '../../services/utils/data';
import { getCookie } from '../../services/utils/cookie';
import { TwsOrderType } from '../../services/types/types-burger';
import { selectors } from '../../services/selectors';

const HistoryOrdersProfile = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken'); 

  const personOrders = useSelector(selectors.personOrders);

  useEffect(() => {
    dispatch(wsPersonStart(`${WS_ORDERS_PERSON_URL}?token=${accessToken}`));

    return () => {
      dispatch(wsPersonClosed())
    }
  }, [dispatch, accessToken]);

  return (
    <div className={styles.container}>
      {personOrders && personOrders.slice().reverse().map((elem: TwsOrderType, index: number) => 
        <StructureOrder key={index} order={elem} isPerson={true} />
      )}
    </div>
  );
}

export default React.memo(HistoryOrdersProfile);