import { useDispatch, useSelector } from '../../hooks/hooks';
import { useEffect, FormEvent } from 'react';
import styles from './reset-password.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { createNewPassword } from '../../services/actions/user';

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const {values, handleChange} = useForm({
    password: '', 
    token: ''
  });

  const navigate = useNavigate();
  const { passwordInfo, passwordNewInfo } = useSelector(state => state.user);

  const handleSaveNewPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createNewPassword(values));
  };

  useEffect(() => {
    if (passwordNewInfo || passwordInfo === null) {
      navigate('/login');
    };
  }, [navigate, passwordNewInfo, passwordInfo]);

  return (
    <section className={styles.section}>
      {passwordInfo &&
        <>
          <h1 className={`${styles.header} text text_type_main-medium`}>Восстановление пароля</h1>
          <form className={styles.form} onSubmit={handleSaveNewPassword}>
            <PasswordInput
              name={'password'}
              placeholder={`Введите новый пароль`}
              onChange={handleChange}
              value={values.password}
            />
            <Input
              type={'text'}
              name={'token'}
              placeholder={`Введите код из письма`}
              onChange={handleChange}
              value={values.token}
            />
            <div className={styles.button}>
              <Button
                htmlType='submit'
                type="primary"
                size="medium"
                extraClass="mb-20"
                disabled={!values.token || !values.password}
              >
                Сохранить
              </Button>
            </div>
          </form>
        </>
      }
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
