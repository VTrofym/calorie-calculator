import s from './UserInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from 'redux/auth/auth-operations';
import { stateAuthToken } from 'redux/auth/auth-selectors';
import { stateAuthUserName } from 'redux/user/user-selectors';

const UserInfo = () => {
  const dispatch = useDispatch();
  const userName = useSelector(stateAuthUserName);
  const token = useSelector(stateAuthToken);

  const userLength = () => {
    if (userName.length >= 15) {
      return `${userName.slice(0, 15)}...`;
    }
    return userName;
  };

  const onLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={s.wrapper}>
      {token && <span className={s.user}>{userLength()}</span>}
      {token && (
        <button className={s.exitBtn} type="button" onClick={onLogout}>
          Exit
        </button>
      )}
    </div>
  );
};
export default UserInfo;
