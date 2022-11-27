import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { stateAuthToken } from 'redux/auth/auth-selectors';
import PublicRoute from './PublicRoute/PublicRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import NotFound from 'pages/NotFound/NotFound';
import { lazy } from 'react';
import { current } from 'redux/user/user-operation';

import Header from './Header/Header';

const MainPage = lazy(() => import('pages/MainPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const CalculatorPage = lazy(() => import('pages/CalculatorPage'));
const DiaryPage = lazy(() => import('pages/DiaryPage'));

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(stateAuthToken);

  useEffect(() => {
    if (token) {
      dispatch(current());
    }
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <Suspense>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="/" element={<PublicRoute />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/diary" element={<DiaryPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
