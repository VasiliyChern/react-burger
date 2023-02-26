import { useMemo, MouseEvent } from 'react';
import { useDispatch } from '../../hooks/hooks';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './structure-profile.module.css';
import { logoutUser } from '../../services/actions/user';

export const StructureProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationPath = useLocation();

  const activeNav = useMemo(
    () => {
      if (locationPath.pathname.toLowerCase().indexOf('/orders') !== -1) {
        return 'orders';
      }
      else if (locationPath.pathname === '/profile') {
        return 'user';
      }
      else {
        return '';
      }
    }
    , [locationPath]
  );

  const exitUser = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutUser({onSuccess: () => navigate('/login')}));
  }

  return (
    <div className="styles.container">
      <Link to='/profile' className={styles.profilelink}>
        <h1 className={`${styles.header} text text_type_main-medium ${activeNav === 'user' ? styles.active : 'text_color_inactive'}`}>Профиль</h1>
      </Link>
      <Link to='/profile/orders' className={styles.profilelink}>
        <h1 className={`${styles.header} text text_type_main-medium ${activeNav === 'orders' ? styles.active : 'text_color_inactive'}`}>История заказов</h1>
      </Link>
      <Link to='/' onClick={exitUser} className={styles.profilelink}>
        <h1 className={`${styles.header} text text_type_main-medium text_color_inactive`}>Выход</h1>
      </Link>
      <p className={`${styles.annotation} text text_type_main-default mt-20`}>В этом разделе Вы можете изменить свои персональные данные</p>
    </div>
  );
};

