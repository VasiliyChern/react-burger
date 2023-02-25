import { FunctionComponent, FormEvent } from "react";
import { useDispatch, useSelector } from '../../hooks/hooks';
import styles from './login.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { authenticationUser } from '../../services/actions/user';

export const LoginPage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {values, handleChange} = useForm({
    email: '',
    password: ''
  });

  const { authenticationUserRequest, authenticationUserFailed } = useSelector(state => state.user);

  const handleLoginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authenticationUserRequest) {
      return;
    }
    dispatch(authenticationUser(values));
  };

  return (
    <section className={styles.section}>
      <h1 className={`${styles.header} text text_type_main-medium`}>Вход</h1>
      {authenticationUserFailed &&
        <span className={`${styles.messagerror} text text_type_main-default`}>
          Ошибка! Не верно указаны логин или пароль.
        </span>
      }
      <form className={styles.form} onSubmit={handleLoginUser}>
        <EmailInput
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
            disabled={!values.email || !values.password}
          >
            Войти
          </Button>
        </div>
      </form>
      <p className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive pb-4 pr-2">
          Вы - новый пользователь?
        </span>
        <Link to='/register' className={`${styles.link} text text_type_main-default`}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive pb-4 pr-2">
          Забыли пароль?
        </span>
        <Link to='/forgot-password' className={`${styles.link} text text_type_main-default`}>
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
}
