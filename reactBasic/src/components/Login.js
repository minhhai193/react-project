import { useEffect, useState } from "react";
import "./Login.scss";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Login = () => {
  const { loginContext } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const [loadingApi, setLoadingApi] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [])

	const handleLogin = async () => {
		if (!email || !password) {
			toast.error("Email/Password is empty!");
			return;
		}

    setLoadingApi(true);

		let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      loginContext(email, res.token)
      navigate("/");
    } else {
      // error
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }

    setLoadingApi(false);
	};

  const handleBack = () => {
    navigate("/");
  }

  const handleKeyDown = (event) => {
    if (event && event.key === 'Enter' && email && password) {
      handleLogin();
    }
  }

	return (
		<div className="login-container col-12 mx-auto">
			<h1 className="title">Login</h1>
			<p className="text">Email or username: &nbsp;&nbsp;eve.holt@reqres.in (use this)</p>
			<input
				type="text"
				placeholder="Email or username ...."
				value={email}
				onChange={(event) => setEmail(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
			/>
			<div className="password-block">
				<input
					type={isShowPassword === false ? "password" : "text"}
					placeholder="Password ...."
					value={password}
					onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
				/>
				<div
					className="password-icon"
					onClick={() => setIsShowPassword(!isShowPassword)}
				>
					{isShowPassword === false ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="16"
							width="20"
							viewBox="0 0 640 512"
						>
							<path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="16"
							width="18"
							viewBox="0 0 576 512"
						>
							<path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
						</svg>
					)}
				</div>
			</div>
			<button
				className={email && password ? "active login-button" : "login-button"}
				disabled={email && password ? false: true}
				onClick={() => handleLogin()}
			>
        {loadingApi &&
          <svg className="loading-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
        }
				Login
			</button>
			<div className="back">
        <span className="back-link" onClick={() => handleBack()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
				  Go back
        </span>
			</div>
		</div>
	);
};

export default Login;