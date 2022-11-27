import Container from 'components/Container';
// import Header from 'components/Header';
// import Loader from 'components/Loader';
import RegistrationForm from 'components/RegistrationForm';
import React from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <main>
      <Container>
        <RegistrationForm />
      </Container>
      <Suspense>
        <Outlet />
      </Suspense>
    </main>
  );
};
export default RegisterPage;
