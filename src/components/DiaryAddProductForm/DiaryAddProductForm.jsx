import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import s from 'components/DiaryAddProductForm/DiaryAddProductForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { eatenProduct } from 'redux/diary/diary-operations';
import { useMemo } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';
import { grey, orange } from '@mui/material/colors';

export default function DiaryAddProductForm({ setAddDairyProducts }) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [productId, setProductId] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const { timeDay } = useSelector(state => state.diary);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  const [products, setProducts] = useState([]);

  const fetchProducts = useMemo(
    () =>
      debounce(search => {
        if (!search) return;
        axios
          .get(`https://slimmom-backend.goit.global/product?search=${search}`)
          .then(({ data }) => setProducts(data))
          .catch(err => {
            toast.error(err.response.data.message);
          })
          .finally(() => {});
      }, 300),
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      setIsOpen(false);
    }
  };

  const handelChangeName = e => {
    setName(e.target.value);
    setIsOpen(true);
    fetchProducts(e.target.value.trim());
    if (!name) return setProducts([]);
  };
  const handelChangeWeight = e => {
    setWeight(e.target.value);
  };
  const handlClik = e => {
    setName(e.target.name);
    setProductId(e.target.id);
    setIsOpen(false);
  };
  const handelSubmit = e => {
    e.preventDefault();
    const data = { date: timeDay, productId, weight };
    dispatch(eatenProduct(data));

    setName('');
    setWeight('');
  };

  const checkDisabled = () => {
    if (!weight || !name) {
      return false;
    }
    return true;
  };

  return (
    <div className={s.flexBox}>
      <div className={s.maxBox}>
        {isMobile && (
          <button className={s.exit} onClick={() => setAddDairyProducts(false)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6_1348)">
                <path d="M6 6L18 18" stroke="#212121" strokeWidth="2" />
                <path d="M6 18L18 6" stroke="#212121" strokeWidth="2" />
              </g>
              <defs>
                <clipPath id="clip0_6_1348">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        )}
        <Box
          onSubmit={handelSubmit}
          className={s.form}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, marginLeft: 0 },
            '& #standard-basic-label': {
              color: grey[500],
              fontFamily: 'Arimo',
              fontWeight: 700,
              position: 'relative',
            },
            '& #standard-basic-label.Mui-focused': {
              color: orange[700],
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            color="warning"
            sx={{ width: '240px' }}
            className={s.inName}
            type="text"
            value={name}
            name="name"
            onChange={handelChangeName}
            id="standard-basic"
            label="Enter product name"
            variant="standard"
          />
          {products && name && isOpen && (
            <div className={s.menu}>
              {products.map(e => (
                <button
                  className={s.buttonProducts}
                  type="button"
                  name={e.title.ru}
                  key={e._id}
                  id={e._id}
                  onClick={handlClik}
                >
                  {e.title.ru}
                </button>
              ))}
            </div>
          )}
          <TextField
            color="warning"
            className={s.inGrams + '' + s.myInGrams}
            sx={{
              width: '106px',
              mr: '10px',
              input: {
                '&::placeholder': {
                  color: 'red',
                  textAlign: 'center',
                },
              },
            }}
            type="number"
            onChange={handelChangeWeight}
            value={weight}
            id="standard-basic"
            label="Grams"
            name="grams"
            variant="standard"
          />
          {isTablet && (
            <button
              type="submit"
              disabled={!weight || !name}
              className={checkDisabled() ? s.bt : s.disBt}
              variant="contained"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.72 12.96H12.96V18.72H11.04V12.96H5.28003V11.04H11.04V5.28003H12.96V11.04H18.72V12.96Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
          {isMobile && (
            <div className={s.btnContainer + ' ' + s.container}>
              <Button
                type="submit"
                sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: ' 50%',
                }}
                className={s.btn + ' ' + s.buttonAdd}
                variant="contained"
                disabled={!weight || !name}
              >
                Add
              </Button>
            </div>
          )}
        </Box>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
}

DiaryAddProductForm.propTypes = {
  setAddDairyProducts: PropTypes.func,
};
