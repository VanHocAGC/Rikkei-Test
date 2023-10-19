import { useAppDispatch } from 'app/hooks';
import Header from 'components/layout/Header';
import { TOKEN } from 'constants/index';
import { getUserInfo, resetValue } from 'features/user/userSlide';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
export interface LayoutProps {}

export default function Layout(props: LayoutProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (Cookies.get(TOKEN)) {
      dispatch({
        type: getUserInfo().type,
      });
    } else {
      dispatch({
        type: resetValue().type,
      });
    }
    // eslint-disable-next-line
  }, [location]);
  return (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
    </div>
  );
}
