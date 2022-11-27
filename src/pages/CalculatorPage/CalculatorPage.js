import Container from 'components/Container';
// import Header from 'components/Header';
import Modal from 'components/Modal';
import RightSideBar from 'components/RightSideBar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import s from './CalculatePage.module.css';
import DailyCaloriesForm from 'components/DailyCaloriesForm/DailyCaloriesForm';

import { handlesetDataToApiWithId } from 'redux/user/user-operation';
import { selectUserId } from 'redux/user/user-selectors';
// import { useLocation } from 'react-router-dom';

const CalculatorPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userid = useSelector(selectUserId);

  const dispatch = useDispatch();
  // const location = useLocation();

  async function handlesetDataToApiId(data) {
    try {
      await dispatch(handlesetDataToApiWithId({ body: data, userid }));

      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  const kcal = useSelector(state => state.user?.userData?.dailyRate);
  const notAllowedProd = useSelector(state =>
    state?.user?.userData?.notAllowedProducts?.slice(0, 5)
  );

  return (
    <Container>
      <main className={s.containerMain}>
        <div className={s.containerFlex}>
          <div className={s.leftSide}>
            <h1 className={s.title}>
              Calculate your daily calorie intake right now
            </h1>
            <DailyCaloriesForm
              handlesetDataToApi={handlesetDataToApiId}
              setIsModalOpen={setIsModalOpen}
            />
            {notAllowedProd && isModalOpen && (
              <Modal
                kcal={kcal}
                arrNotAllowedProducts={notAllowedProd}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
          <div className={s.containerSideBar}>
            <RightSideBar />
          </div>
        </div>
      </main>
    </Container>
  );
};
export default CalculatorPage;
