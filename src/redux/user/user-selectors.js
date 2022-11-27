export const stateAuthUserName = state => state?.user?.username;
export const isLogin = state => state?.user?.isLoggedIn;
export const notAllowedProducts = state =>
  state?.user?.userData?.notAllowedProducts;
export const dailyRate = state => state?.user?.userData?.dailyRate;
export const selectUserId = state => state.user.id;
