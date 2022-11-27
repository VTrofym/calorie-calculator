import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { stateAuthToken } from 'redux/auth/auth-selectors';
import PropTypes from 'prop-types';
// import { stateAuthToken } from 'redux/auth/auth-selectors';
// import { dailyRate, notAllowedProducts } from 'redux/user/user-selectors';
import s from './Modal.module.css';

const Modal = ({ setIsModalOpen, kcal, arrNotAllowedProducts }) => {
  const token = useSelector(stateAuthToken);

  useEffect(() => {
    add();
    return remove();
  });

  function add() {
    window.addEventListener('keydown', onEscape);
  }
  function remove() {
    window.addEventListener('keydown', onEscape);
  }

  const onEscape = event => {
    if (event.code === 'Escape') setIsModalOpen(false);
  };

  const hendleClick = event => {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };

  // const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div onClick={hendleClick} className={s.overlay}>
      <div className={s.modal}>
        {/* {isMobile && <Header />} */}
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
          type="button"
          className={s.btnCloseModal}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_13001_75)">
              <path
                d="M15.8333 5.3415L14.6583 4.1665L9.99996 8.82484L5.34163 4.1665L4.16663 5.3415L8.82496 9.99984L4.16663 14.6582L5.34163 15.8332L9.99996 11.1748L14.6583 15.8332L15.8333 14.6582L11.175 9.99984L15.8333 5.3415Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_13001_75">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <div className={s.containerTitleModal}>
          <h2 className={s.titleModal}>
            Your recommended daily calorie intake is
          </h2>
        </div>

        <p className={s.textKcalModal}>
          <span className={s.modalSpanKcal}>{Math.round(kcal)}</span> kcal
        </p>

        <div className={s.border}>
          <p className={s.listModal}>Foods you should not eat</p>
          <ul>
            {arrNotAllowedProducts &&
              arrNotAllowedProducts?.map((item, index) => {
                return (
                  <li key={item} className={s.itemModal}>
                    {index + 1}. {item}
                  </li>
                );
              })}
          </ul>
        </div>
        {!token ? (
          <NavLink
            to="/register"
            className={s.btnStartLosingWeight}
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Start losing weight
          </NavLink>
        ) : (
          <button
            type="button"
            className={s.btnStartLosingWeight}
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Start losing weight
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  setIsModalOpen: PropTypes.func,
  kcal: PropTypes.number,
  arrNotAllowedProducts: PropTypes.arrayOf(PropTypes.string),
};
