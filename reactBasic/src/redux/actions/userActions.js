import { toast } from "react-toastify";
import { loginApi } from "../../services/UserService";

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const LOGOUT = "LOGOUT";

export const USER_REFRESH = "USER_REFRESH";


export const handleLoginRedux = (email, password) => {
  const emailUser = email.trim();

	return async (dispatch, getState) => {
		dispatch({ type: FETCH_USER_LOGIN });

		let res = await loginApi(emailUser, password);
		if (res && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', emailUser);

			dispatch({
				type: FETCH_USER_SUCCESS,
				data: { email: emailUser, token: res.token }
			});
		} else {
			// error
			if (res && res.status === 400) {
				toast.error(res.data.error);

        dispatch({
          type: FETCH_USER_ERROR,
        });
			}
		}
	};
};

export const handleLogoutRedux = (email, password) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const handleReFresh = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'USER_REFRESH'
    })
  }
}