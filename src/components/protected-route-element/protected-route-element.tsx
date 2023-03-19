import React, { ReactElement } from 'react';
import { useSelector } from '../../hooks/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { haveUserAccess } from '../../services/actions/user';
import { selectors } from '../../services/selectors';

interface IProtectedRouteElementProps {
  successUsers: boolean;
  children: ReactElement
};

const ProtectedRouteElement = ({
  successUsers,
  children
  }: IProtectedRouteElementProps) => {

  const location = useLocation();
  const successUserLogged = haveUserAccess();
  const userInfo = useSelector(selectors.userInfo);
  const isLoggedIn = (successUserLogged || userInfo);

  if (!successUsers && isLoggedIn) {
    const toPath = location.state?.from || '/';
    return <Navigate to={toPath} />;
  }

  if (successUsers && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}

export default React.memo(ProtectedRouteElement);