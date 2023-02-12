import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import styles from './register.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { registrationUser } from '../../services/actions/user';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const {values, handleChange} = useForm({
    email: '',
    password: '',
    name: ''
  });

  const navigate = useNavigate();
  const { registrationUserRequest } = useSelector(state => state.user);

  const handleRegisterUser = useCallback( e => {
    e.preventDefault();
    if (registrationUserRequest) {
      return;
    }
    dispatch(registrationUser(values));
    navigate('/login');
  }, [dispatch, navigate, values, registrationUserRequest]);

  return (
    <section className={styles.section}>
      <h1 className={`${styles.header} text text_type_main-medium`}>Регистрация</h1>
      <form className={styles.form} onSubmit={handleRegisterUser}>
        <Input
          type={'text'}
          name={'name'}
          placeholder={`Имя`}
          onChange={handleChange}
          value={values.name}
        />
        <EmailInput
          type={'email'}
          name={'email'}
          placeholder={`E-mail`}
          onChange={handleChange}
          value={values.email}
          isIcon={false}
        />
        <PasswordInput
          name={'password'}
          placeholder={`Пароль`}
          onChange={handleChange}
          value={values.password}
        />
        <div className={styles.button}>
          <Button
            htmlType='submit'
            type="primary"
            size="medium"
            extraClass="mb-20"
            disabled={!values.name || !values.email || !values.password}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <p className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive pb-4 pr-2">
          Уже зарегистрированы?
        </span>
        <Link to='/login' className={`${styles.link} text text_type_main-default`}>
          Войти
        </Link>
      </p>
    </section>
  );
}
