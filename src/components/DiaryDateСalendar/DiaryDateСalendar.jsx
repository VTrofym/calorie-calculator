import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { timeSet } from 'redux/diary/diary-slice';
import { dayInfo } from 'redux/diary/diary-operations';
import s from 'components/DiaryDateСalendar/DiaryDateСalendar.module.css';
import { stateAuthToken } from 'redux/auth/auth-selectors';
import { grey, orange } from '@mui/material/colors';

export default function DiaryDateСalendar() {
  const [value, setValue] = React.useState(dayjs(new Date()));
  const token = useSelector(stateAuthToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(timeSet(value.format('YYYY-MM-DD')));
    dispatch(dayInfo({ date: value.format('YYYY-MM-DD') }));
  }, [dispatch, value, token]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        inputFormat="DD.MM.YYYY"
        className={s.calendar + ' ' + s.mycalendar}
        value={value}
        minDate={dayjs('2017-01-01')}
        maxDate={dayjs(new Date())}
        onChange={newValue => {
          setValue(newValue);
        }}
        sx={{
          '& #standard-basic-label': {
            color: grey[500],
            fontFamily: 'Arimo',
            fontWeight: 700,
          },
          '& #standard-basic-label.Mui-focused': {
            color: orange[700],
          },
        }}
        renderInput={params => (
          <TextField
            {...params}
            sx={{
              div: {
                border: 'none',
              },

              input: {
                width: '220px',
                fontSize: '32px',
                fontWeight: 600,
              },

              '> div::before': {
                display: 'none',
              },

              '> div::after': {
                display: 'none',
              },
            }}
            label={null}
            variant="standard"
          />
        )}
      />
    </LocalizationProvider>
  );
}
