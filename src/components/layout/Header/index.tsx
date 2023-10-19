import { useAppDispatch, useAppSelector } from 'app/hooks';
import FlexCenter from 'components/common/center';
import { logout } from 'features/user/userSlide';
import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const handleLogout = ()=>{
    dispatch({
      type:logout().type
    })
  }
  return (
    <header className="h-[70px] w-full ">
      <div className="fixed top-0 left-0 h-[70px] w-full bg-black opacity-70 p-4 flex justify-between z-50">
        <div className="h-full w-fit flex gap-20 text-orange-900 text-lg items-center uppercase font-primary">
          <Link to={'/'} className="h-full w-fit hover:cursor-pointer">
            <img
              src="/images/logoRikkeisoft.png"
              alt="rikkei Logo"
              className="h-full object-contain"
            />
          </Link>
          <NavLink to={'/'} className="hover-animation">
            Product
          </NavLink>
          {userInfo.userInfo.id === -1 ? (
            <NavLink to={'/login'} className="hover-animation">
              Login
            </NavLink>
          ) : (
            userInfo.userInfo.id !== undefined && (
              <span onClick={()=>handleLogout()} className="hover-animation">
                Logout
              </span>
            )
          )}
        </div>
        {userInfo.userInfo.id && userInfo.userInfo.id !== -1 && (
          <FlexCenter className="gap-x-3 capitalize">
            <p className="text-white text-xl ">{userInfo.userInfo.username}</p>
            <span className="h-full w-[38px] rounded-full overflow-hidden bg-white"></span>
          </FlexCenter>
        )}
      </div>
    </header>
  );
}
