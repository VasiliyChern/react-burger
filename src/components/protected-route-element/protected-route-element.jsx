import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { haveUserAccess } from '../../services/actions/user';
import PropTypes from 'prop-types';

const ProtectedRouteElement = ({
  successUsers,
  children
  }) => {

  const location = useLocation();
  const successUserLogged = haveUserAccess();
  const { userInfo } = useSelector(state => state.user);
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

ProtectedRouteElement.propTypes = {
  successUsers: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}

export default ProtectedRouteElement;
