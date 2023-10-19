import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import HomePage from '../pages/home';
import NotFoundPage from '../pages/notFound';
import Layout from './layout';
import { ROUTES } from 'constants/index';
import LoginPage from 'pages/login';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route element={<PrivateRoute/>}>
        </Route>
        <Route path={ROUTES.HOMEPAGE} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
