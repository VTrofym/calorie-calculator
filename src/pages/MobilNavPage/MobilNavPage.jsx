import { Link, useLocation } from 'react-router-dom';
import s from './MobilNavPage.module.css';

const MobilNavPage = ({ handleMenuClose }) => {
  const location = useLocation();
  return (
    <>
      <nav className={s.mobilNav}>
        <Link
          state={{ from: location }}
          className={s.mobLink}
          to="/diary"
          onClick={handleMenuClose}
        >
          Diary
        </Link>
        <Link
          state={{ from: location }}
          className={s.mobLink}
          to="/calculator"
          onClick={handleMenuClose}
        >
          Calculator
        </Link>
      </nav>
    </>
  );
};
export default MobilNavPage;
