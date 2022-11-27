import { Link } from 'react-router-dom';
import logotype from '../../assets/images/logo.png';
import tabletLogotype from '../../assets/images/logotablet.png';
import mobilLogotype from '../../assets/images/logomobil.png';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/">
      <picture>
        <source srcSet={logotype} media="(min-width: 1280px)" />
        <source srcSet={tabletLogotype} media="(min-width: 768px)" />
        <source srcSet={mobilLogotype} media="(min-width: 100px)" />
        <img className={s.logoImage} src={logotype} alt="logotype Slim Mom" />
      </picture>
    </Link>
  );
};
export default Logo;
