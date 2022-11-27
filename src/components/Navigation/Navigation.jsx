import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { stateAuthToken } from 'redux/auth/auth-selectors';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

const Navigation = () => {
  const isDesctop = useMediaQuery({ query: '(min-width: 1280px)' });
  const token = useSelector(stateAuthToken);

  return (
    <nav className={s.siteNav}>
      {!token ? (
        <>
          <NavLink className={s.navLink} to="/login">
            Sign in
          </NavLink>
          <NavLink className={s.navLink} to="/register">
            Registration
          </NavLink>
        </>
      ) : (
        <>
          {isDesctop && (
            <NavLink className={s.navLink} to="/calculator">
              Calculator
            </NavLink>
          )}
          {isDesctop && (
            <NavLink className={s.navLink} to="/diary">
              Diary
            </NavLink>
          )}
        </>
      )}
    </nav>
  );
};
export default Navigation;
