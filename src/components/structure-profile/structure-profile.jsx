import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './structure-profile.module.css';
import { logoutUser } from '../../services/actions/user';

export const StructureProfile = (props) => {
  const dispatch = useDispatch();

  const exitUser = e => {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
    <div className="styles.container">
      <Link to='/profile' className={styles.profilelink}>
        <h1 className={`${styles.header} text text_type_main-medium ${props.tabActive === 'user' ? styles.active : 'text_color_inactive'}`}>Профиль</h1>
      </Link>
      <Link to='/profile/orders' className={styles.profilelink}>
        <h1 className={`${styles.header} text text_type_main-medium ${props.tabActive === 'orders' ? styles.active : 'text_color_inactive'}`}>История заказов</h1>
      </Link>
      <Link to='/' onClick={exitUser} className={styles.profilelink}>
        <h1 className={`${styles.header} text text_type_main-medium text_color_inactive`}>Выход</h1>
      </Link>
      <p className={`${styles.annotation} text text_type_main-default mt-20`}>В этом разделе Вы можете изменить свои персональные данные</p>
    </div>
  );
};

StructureProfile.propTypes = {
  tabActive: PropTypes.string.isRequired
};
