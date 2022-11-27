import Container from 'components/Container';
// import Header from 'components/Header';
import Loader from 'components/Loader';
import LoginForm from 'components/LoginForm';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import s from './Login.module.css';

const LoginPage = () => {
  return (
    <main className={s.mainContainer}>
      <Container>
        <LoginForm />
      </Container>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};
export default LoginPage;
