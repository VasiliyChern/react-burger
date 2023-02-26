import { useEffect, useMemo, FormEvent } from "react";
import { useSelector, useDispatch } from '../../hooks/hooks';
import styles from './user-profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm';
import { renewalInfoUser, updateInfoUser } from '../../services/actions/user';
import { IUpdateInfoUserParams } from '../../services/types/types-api';

export const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, updateInfoUserRequest } = useSelector(state => state.user);

  const valuesFromUserInfo = useMemo(
    () => {
      return {
        email: `${userInfo ? userInfo.email : ''}`,
        password: '',
        name: `${userInfo ? userInfo.name : ''}`
      }
    }, [userInfo]
  );

  const { values, handleChange, setValues } = useForm(valuesFromUserInfo);

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

  const handleUpdateInfoUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateInfoUserRequest) {
      return;
    }
    let toValues: IUpdateInfoUserParams = {};
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
  };

  useEffect(() => {
    dispatch(renewalInfoUser());
  }, [dispatch])

  useEffect(() => {
    setValues(valuesFromUserInfo);
  }, [valuesFromUserInfo, setValues])

  const doCancel = () => {
    setValues(valuesFromUserInfo);
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
            name={'email'}
            placeholder={`Логин`}
            onChange={handleChange}
            value={values.email}
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
