import { useEffect } from "react";
import { useDispatch } from "../../hooks/hooks";
import { Routes, Route, useLocation, useNavigate  } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import { UserProfile } from '../user-profile/user-profile';
import { HistoryOrdersProfile } from '../history-orders-profile/history-orders-profile';
import { getIngredients } from '../../services/actions/offer';
import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  RegisterPage,
  ProfilePage,
  FeedPage,
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
        <Route path="/login" element={
          <ProtectedRouteElement successUsers={false}>
            <LoginPage />
          </ProtectedRouteElement>
        } />
        <Route path="/forgot-password" element={
          <ProtectedRouteElement successUsers={false}>
            <ForgotPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path="/reset-password" element={
          <ProtectedRouteElement successUsers={false}>
            <ResetPasswordPage />
          </ProtectedRouteElement>
        } />
        <Route path="/register" element={
          <ProtectedRouteElement successUsers={false}>
            <RegisterPage />
          </ProtectedRouteElement>
        } />

        <Route path="/profile" element={
          <ProtectedRouteElement successUsers={true}>
            <ProfilePage />
          </ProtectedRouteElement>
        }>
          <Route path="" element={<UserProfile />} />
          <Route path="orders" element={<HistoryOrdersProfile />} />
        </Route>

        <Route path="/feed" element={
          <ProtectedRouteElement successUsers={true}>
            <FeedPage />
          </ProtectedRouteElement>
        } />
        <Route path={`/ingredients/:id`} element={
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
          <Route path="/ingredients/:id" element={
            <div>
              <Modal onClose={handleCloseModalDetail} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            </div>
          } />
        </Routes>
      }
    </div>
  );
}

export default App;