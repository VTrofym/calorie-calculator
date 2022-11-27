import notFoundImg from '../../assets/images/notfound.png';
import s from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={s.wrapper}>
      <img src={notFoundImg} alt="Not found" />
      <strong className={s.sorry}>
        Sorry, we did not find such a page! But we found some extra kilograms!
      </strong>
    </div>
  );
};

export default NotFound;
