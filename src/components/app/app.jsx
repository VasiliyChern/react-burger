import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate  } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import { getIngredients } from '../../services/actions/offer';
import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  RegisterPage,
  ProfilePage,
  ProfileHistoryOrdersPage,
  BurgerMainPage,
  NotFound404Page
} from "../../pages";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  
  const handleCloseModalDetail = () => {
    navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route exact path="/login" element={
          <ProtectedRouteElement successUsers={false}>
            <LoginPage />
          </ProtectedRouteElement>
        } />
        <Route exact path="/forgot-password" element={
          <ProtectedRouteElement successUsers={false}>
            <ForgotPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route exact path="/reset-password" element={
          <ProtectedRouteElement successUsers={false}>
            <ResetPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route exact path="/register" element={
          <ProtectedRouteElement successUsers={false}>
            <RegisterPage />
          </ProtectedRouteElement>
        } />
        <Route exact path="/profile" element={
          <ProtectedRouteElement successUsers={true}>
            <ProfilePage />
          </ProtectedRouteElement>
        } />
        <Route exact path="/profile/orders" element={
          <ProtectedRouteElement successUsers={true}>
            <ProfileHistoryOrdersPage />
          </ProtectedRouteElement>
        } />
        <Route exact path={`/ingredients/:id`} element={
          <div className={styles.details}>
            <p className="text text_type_main-large ml-10">Детали ингредиента</p>
            <IngredientDetails />
          </div>
        } />
        <Route path="/" element={<BurgerMainPage />} />
        <Route path="*" element={<NotFound404Page/>}/>
      </Routes>
      {background &&
        <Routes>
          <Route exact path="/ingredients/:id" element={
            <div>
              <Modal onClose={handleCloseModalDetail} title="Детали ингредиента">
                <IngredientDetails className={styles.detailingredient} />
              </Modal>
            </div>
          } />
        </Routes>
      }
    </div>
  );
}

export default App;