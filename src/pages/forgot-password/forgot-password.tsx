import { useDispatch, useSelector } from '../../hooks/hooks';
import React, { useEffect, FormEvent } from 'react';
import styles from './forgot-password.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/actions/user';
import { selectors } from '../../services/selectors';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const {values, handleChange} = useForm({
    email: ''
  });

  const navigate = useNavigate();
  const passwordInfo = useSelector(selectors.passwordInfo);

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(values.email));
  };

  useEffect(() => {
    if (passwordInfo) {
      navigate('/reset-password');
    };
  }, [navigate, passwordInfo]);

  return (
    <section className={styles.section}>
      <h1 className={`${styles.header} text text_type_main-medium`}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={handleResetPassword}>
        <EmailInput
          name={'email'}
          placeholder={`Укажите e-mail`}
          onChange={handleChange}
          value={values.email}
          isIcon={false}
        />
        <div className={styles.button}>
          <Button
            htmlType='submit'
            type="primary"
            size="medium"
            extraClass="mb-20"
            disabled={!values.email}
          >
            Восстановить
          </Button>
        </div>
      </form>
      <p className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive pb-4 pr-2">
          Вспомнили пароль?
        </span>
        <Link to='/login' className={`${styles.link} text text_type_main-default`}>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default React.memo(ForgotPasswordPage);