import { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from './user-profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm';
import { renewalInfoUser, updateInfoUser } from '../../services/actions/user';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, updateInfoUserRequest } = useSelector(state => state.user);

  const { values, handleChange, setValues } = useForm({
    email: `${userInfo ? userInfo.email : ''}`,
    password: '',
    name: `${userInfo ? userInfo.name : ''}`
  });

  const isEqual = useMemo(
    () => {
      if (userInfo === null) {
        return true;
      }
      if (userInfo.name === values.name && 
          userInfo.email === values.email &&
          values.password === '') {
        return true;
      }
      return false;
    }
    , [userInfo, values]
  );

  const handleUpdateInfoUser = useCallback( e => {
    e.preventDefault();
    if (updateInfoUserRequest) {
      return;
    }
    let toValues = {};
    if (values.email !== '') {
      toValues.email = values.email;
    }
    if (values.name !== '') {
      toValues.name = values.name;
    }
    if (values.password !== '') {
      toValues.password = values.password;
    }
    dispatch(updateInfoUser(toValues));
  }, [dispatch, values, updateInfoUserRequest]);

  useEffect(() => {
    dispatch(renewalInfoUser());
  }, [dispatch])

  useEffect(() => {
    setValues({
      email: `${userInfo ? userInfo.email : ''}`,
      password: '',
      name: `${userInfo ? userInfo.name : ''}`
    });
  }, [userInfo, setValues])

  const doCancel = () => {
    setValues({
      email: `${userInfo ? userInfo.email : ''}`,
      password: '',
      name: `${userInfo ? userInfo.name : ''}`
    });
  };

  return (
    <>
      {userInfo &&
        <form className={styles.form} onSubmit={handleUpdateInfoUser}>
          <Input
            type={'text'}
            name={'name'}
            placeholder={`Имя`}
            onChange={handleChange}
            value={values.name}
            icon="EditIcon"
          />
          <EmailInput
            type={'email'}
            name={'email'}
            placeholder={`Логин`}
            onChange={handleChange}
            value={values.email}
            icon="EditIcon"
          />
          <PasswordInput
            name={'password'}
            placeholder={`Пароль`}
            onChange={handleChange}
            value={values.password}
            icon="EditIcon"
          />
          {!isEqual &&
            <div className={styles.button}>
              <Button
                htmlType='button'
                type="secondary"
                size="large"
                extraClass="mb-30"
                onClick={doCancel}
              >
                Отмена
              </Button>
              <Button
                htmlType='submit'
                type="primary"
                size="medium"
                extraClass="mb-30"
                disabled={isEqual}
              >
                Сохранить
              </Button>
            </div>
          }
        </form>
      }
    </>
  )
}
