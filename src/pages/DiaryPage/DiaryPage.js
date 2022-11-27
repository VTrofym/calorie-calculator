import React, { useState } from 'react';
import DiaryDateСalendar from 'components/DiaryDateСalendar';
import DiaryAddProductForm from 'components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductItem from 'components/DiaryProductItem/DiaryProductItem';
import Container from 'components/Container';

// import Header from 'components/Header';

import RightSideBar from 'components/RightSideBar/RightSideBar';
import s from './DiaryPage.module.css';
import { useMediaQuery } from 'react-responsive';
// import { useLocation } from 'react-router-dom';

const DiaryPage = () => {
  const [addDairyProducts, setAddDairyProducts] = useState(false);
  // const location = useLocation();

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const moreMobile = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <main className={s.main}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.leftSide}>
            <DiaryDateСalendar />
            {addDairyProducts && isMobile && (
              <DiaryAddProductForm setAddDairyProducts={setAddDairyProducts} />
            )}
            {moreMobile && (
              <DiaryAddProductForm setAddDairyProducts={setAddDairyProducts} />
            )}
            <DiaryProductItem setAddDairyProducts={setAddDairyProducts} />
          </div>
          <div className={s.containerSideBar}>
            <RightSideBar />
          </div>
        </div>
      </Container>
    </main>
  );
};
export default DiaryPage;
