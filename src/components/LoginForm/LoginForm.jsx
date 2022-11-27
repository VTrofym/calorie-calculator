import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { login } from 'redux/auth/auth-operations';
import s from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const notifySuccess = () => toast('Are you logined!');

  const input = {
    email: setEmail,
    password: setPassword,
  };

  const onInput = evt => {
    input[evt.target.name](evt.target.value.trim());
  };

  const onSubmit = evt => {
    evt.preventDefault();
    dispatch(login({ email, password }));
    notifySuccess();
    setEmail('');
    setPassword('');
  };

  return (
    <section className={s.section}>
      <div className={s.block}>
        <h2 className={s.title}>Sign in</h2>
        <form onSubmit={onSubmit} className={s.form}>
          <TextField
            className={s.label}
            color="warning"
            label="Email"
            minLength={3}
            maxLength={254}
            variant="standard"
            required
            onChange={onInput}
            name="email"
            value={email}
            type="email"
          />
          <TextField
            className={s.label}
            color="warning"
            label="Password"
            minLength={8}
            maxLength={100}
            variant="standard"
            required
            onChange={onInput}
            name="password"
            value={password}
            type="password"
          />
          <div className={s.buttons}>
            <button type="submit" className={s.button}>
              Login
            </button>
            <NavLink className={s.link} to="/register">
              Register
            </NavLink>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} />
    </section>
  );
};

export default LoginForm;
