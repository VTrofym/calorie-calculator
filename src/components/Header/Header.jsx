import Logo from 'components/Logo';
import Navigation from 'components/Navigation';
import UserInfo from 'components/UserInfo';
import { useSelector } from 'react-redux';
import { stateAuthToken } from 'redux/auth/auth-selectors';
import s from './Header.module.css';
import { useMediaQuery } from 'react-responsive';
import { BurgerBtn } from 'components/BurgerBtn/BurgerBtn';
import { Link, useLocation } from 'react-router-dom';
import GoBack from 'components/GoBack/GoBack';
import MobilNavPage from 'pages/MobilNavPage/MobilNavPage';
import { useState } from 'react';

const Header = ({ setIsModalOpen }) => {
  const [isMobilMenu, setIsMobilMenu] = useState(false);
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isDesctop = useMediaQuery({ query: '(min-width: 1280px)' });
  const token = useSelector(stateAuthToken);
  const location = useLocation();



  const handleMenuTogle = () => setIsMobilMenu(prev => !prev);

  const handleMenuClose = () => setIsMobilMenu(false);

  return (
    <>
      <header className={s.header}>
        <div onClick={handleMenuClose} className={s.wrapper}>
          <Logo state={{ from: location }} />
          <Navigation />
        </div>
        {token && isTablet && <UserInfo />}
        {token && !isDesctop && (
          <Link className={s.burger} onClick={handleMenuTogle}>
            <BurgerBtn />
          </Link>
        )}
      </header>
      {isMobile && token && (
        <div onClick={handleMenuClose} className={s.mobilUser}>
          {location.state?.from ? (
            <Link to={location?.state?.from ?? '/'}>
              <GoBack />
            </Link>
          ) : (
            <div className={s.isHidden}></div>
          )}

          <UserInfo />
        </div>
      )}
      {!isDesctop && isMobilMenu && (
        <div className={s.backdrop}>
          <MobilNavPage handleMenuClose={handleMenuClose} />
        </div>
      )}
    </>
  );
};
export default Header;

// Header.propTypes = {
//   setIsModalOpen: PropTypes.func,
// };
