import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from 'redux/auth/auth-operations';
import { register } from 'redux/auth/auth-operations';
import s from 'components/RegistrationForm/RegistrationForm.module.css';

export default function RegistrationForm() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const notifySuccess = () => toast('Are you registered!');

  const inputs = {
    email: setEmail,
    password: setPassword,
    username: setUserName,
  };

  const handleInput = e => {
    inputs[e.target.name](e.target.value.trim());
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const userInfo = {
      username,
      email,
      password,
    };
    dispatch(register(userInfo))
      .unwrap()
      .then(() => {
        dispatch(login({ email, password }));
        notifySuccess();
      })
      .catch(error => console.error(error));
  };

  return (
    <section className={s.section}>
      <div>
        <h2 className={s.title}>Register</h2>
        <form onSubmit={handleFormSubmit} className={s.form}>
          <TextField
            label="Name"
            color="warning"
            type="text"
            variant="standard"
            required
            onChange={handleInput}
            name="username"
            value={username}
            className={s.label}
          />
          <TextField
            label="Email"
            color="warning"
            type="email"
            variant="standard"
            required
            onChange={handleInput}
            name="email"
            value={email}
            className={s.label}
          />
          <TextField
            label="Password"
            color="warning"
            type="password"
            variant="standard"
            required
            onChange={handleInput}
            name="password"
            value={password}
            className={s.label}
            placeholder="enter min 8 digits"
          />
          <div className={s.buttons}>
            <button type="submit" className={s.button}>
              Register
            </button>
            <NavLink className={s.link} to="/login">
              Login
            </NavLink>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} />
    </section>
  );
}
